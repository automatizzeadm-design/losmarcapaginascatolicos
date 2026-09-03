import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * VSL do Vimeo com casca própria.
 *
 * O iframe entra sem nenhum controle do Vimeo (controls=0, sem título, sem
 * autor, sem logo) e por cima vai uma camada nossa que intercepta TODO clique.
 * Assim a visitante nunca chega na barra do Vimeo, não abre em nova aba e não
 * vê "assistir depois". O único controle que existe é pausar e despausar.
 *
 * O vídeo começa sozinho no mudo — que é a única forma de autoplay que os
 * navegadores permitem — e a camada convida a tocar pra ligar o som.
 *
 * A conversa com o player é por postMessage, o protocolo nativo do Vimeo,
 * então não precisa carregar o SDK externo.
 *
 * IMPORTANTE — não voltar a condicionar o clique a um "ready" do Vimeo.
 * O evento nem sempre chega (depende da build do player que o Vimeo serve
 * naquele dia), e quando não chega o player fica morto: a pessoa clica e não
 * acontece nada. Aqui o comando é sempre enviado, com reenvio curto para o
 * caso de o player ainda não estar escutando.
 */

const VIMEO_ORIGIN = "https://player.vimeo.com";

/** Reenvios do comando, em ms. Cobre o player que ainda está subindo. */
const REENVIOS = [0, 250, 700];

type VslPlayerProps = {
  videoId: string;
  /** Convite pra ligar o som, antes do primeiro toque */
  unmutePrompt: string;
  /** Chamada que aparece quando ela pausa */
  pausedTitle: string;
  pausedText: string;
  /** Proporção do vídeo em porcentagem (altura / largura) */
  ratio?: number;
  className?: string;
};

export function VslPlayer({
  videoId,
  unmutePrompt,
  pausedTitle,
  pausedText,
  ratio = 68.75,
  className,
}: VslPlayerProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  /**
   * Último segundo conhecido do vídeo.
   * Ao sair do mudo o player do Vimeo volta pro início — então guardamos a
   * posição a cada tique e devolvemos ela logo depois de ligar o som.
   */
  const timeRef = useRef(0);
  const timers = useRef<number[]>([]);

  /** Envia uma vez, sem reenvio. Usado internamente. */
  const postOnce = useCallback((method: string, value?: unknown) => {
    const win = frameRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      JSON.stringify(value === undefined ? { method } : { method, value }),
      VIMEO_ORIGIN,
    );
  }, []);

  /**
   * Envia agora e repete duas vezes. Se o player ainda não estava escutando
   * no primeiro disparo, um dos seguintes pega. Todos os comandos que usamos
   * são idempotentes, então repetir não causa efeito colateral.
   */
  const post = useCallback(
    (method: string, value?: unknown) => {
      REENVIOS.forEach((atraso) => {
        if (atraso === 0) {
          postOnce(method, value);
          return;
        }
        timers.current.push(window.setTimeout(() => postOnce(method, value), atraso));
      });
    },
    [postOnce],
  );

  const registrarEventos = useCallback(() => {
    postOnce("addEventListener", "play");
    postOnce("addEventListener", "pause");
    postOnce("addEventListener", "ended");
    // Os dois nomes: "playProgress" é o antigo, "timeupdate" o atual.
    // Registrar ambos garante que a posição seja rastreada em qualquer
    // versão do player que o Vimeo sirva.
    postOnce("addEventListener", "playProgress");
    postOnce("addEventListener", "timeupdate");
  }, [postOnce]);

  useEffect(() => {
    const capturados = timers.current;
    return () => capturados.forEach((t) => window.clearTimeout(t));
  }, []);

  // Escuta o player para acompanhar o estado (pausa, fim, posição).
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== VIMEO_ORIGIN) return;
      let data: { event?: string; method?: string; data?: { seconds?: number } };
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }

      if (data.event === "ready") {
        registrarEventos();
        return;
      }

      if (data.event === "playProgress" || data.event === "timeupdate") {
        const seconds = data.data?.seconds;
        if (typeof seconds === "number") timeRef.current = seconds;
        return;
      }

      if (data.event === "play") setPlaying(true);
      if (data.event === "pause") setPlaying(false);
      /* Rede de segurança: com loop=1 o Vimeo emenda sozinho e este evento
         não costuma disparar. Se disparar (versão de player que ignora o
         loop), rebobinamos na mão pra tela de recomendações não aparecer. */
      if (data.event === "ended") {
        timeRef.current = 0;
        post("setCurrentTime", 0);
        post("play");
        setPlaying(true);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [post, registrarEventos]);

  /** Primeiro toque liga o som; dali em diante alterna pausa. */
  const handleSurfaceClick = () => {
    if (muted) {
      // Ligar o som faz o Vimeo rebobinar. Guardamos onde ela estava e
      // devolvemos a posição em seguida. E mandamos play junto: se o autoplay
      // tiver sido bloqueado, este clique é o gesto que finalmente inicia.
      const resumeAt = timeRef.current;
      post("setVolume", 1);
      post("play");
      if (resumeAt > 0.4) {
        timers.current.push(
          window.setTimeout(() => {
            postOnce("setCurrentTime", resumeAt);
            postOnce("play");
          }, 300),
        );
      }
      setMuted(false);
      setPlaying(true);
      return;
    }

    if (playing) {
      post("pause");
      setPlaying(false);
    } else {
      post("play");
      setPlaying(true);
    }
  };

  /* Fixo por videoId: se essa string mudasse entre renders, o iframe
     recarregaria e o vídeo voltaria pro começo.

     `player_id` e `app_id` fazem parte do embed que o próprio Vimeo entrega e
     ajudam no handshake do postMessage — foram removidos uma vez e o player
     parou de responder a comando. Não tirar de novo.

     `loop=1` existe pra matar a tela de recomendações do Vimeo: em loop o
     vídeo emenda no início e a tela final nunca chega a aparecer. */
  const src = useMemo(
    () =>
      `${VIMEO_ORIGIN}/video/${videoId}` +
      "?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&badge=0" +
      "&autopause=0&playsinline=1&dnt=1&transparent=0&player_id=0&app_id=58479",
    [videoId],
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div style={{ paddingTop: `${ratio}%` }} />

      <iframe
        ref={frameRef}
        src={src}
        title="Video"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={registrarEventos}
        className="absolute inset-0 h-full w-full"
        /* O iframe não recebe clique: quem manda é a camada de cima */
        style={{ pointerEvents: "none", border: 0 }}
      />

      {/* Camada que engole todo clique e carrega as mensagens */}
      <button
        type="button"
        onClick={handleSurfaceClick}
        aria-label={muted ? unmutePrompt : playing ? "Pausar video" : "Reanudar video"}
        className="absolute inset-0 flex cursor-pointer items-end justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {/* Antes do primeiro toque: convite pra ligar o som */}
        {muted && (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 px-5 text-center">
            <span className="flex h-16 w-16 animate-soft-pulse items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-[1.9rem] shadow-[var(--shadow-lift)]">
              🔊
            </span>
            <span className="max-w-[22rem] text-[0.95rem] font-semibold leading-snug text-white drop-shadow sm:text-[1.05rem]">
              {unmutePrompt}
            </span>
          </span>
        )}

        {/* Pausado: puxa ela de volta em vez de deixar a tela morta */}
        {!muted && !playing && (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 px-5 text-center">
            <span className="flex h-16 w-16 animate-soft-pulse items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-[1.7rem] shadow-[var(--shadow-lift)]">
              ▶
            </span>
            <span className="font-display text-[1.15rem] font-semibold leading-snug text-white sm:text-[1.35rem]">
              {pausedTitle}
            </span>
            <span className="max-w-[24rem] text-[0.86rem] leading-relaxed text-white/85">
              {pausedText}
            </span>
          </span>
        )}

        {/* Tocando com som: sobra só o pause, discreto no canto */}
        {!muted && playing && (
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-[1.1rem] text-white backdrop-blur-sm transition-colors hover:bg-black/75">
            ❚❚
          </span>
        )}
      </button>
    </div>
  );
}
