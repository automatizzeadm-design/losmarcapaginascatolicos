import { useCallback, useEffect, useRef, useState } from "react";

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
 */

const VIMEO_ORIGIN = "https://player.vimeo.com";

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
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const post = useCallback((method: string, value?: unknown) => {
    const win = frameRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), VIMEO_ORIGIN);
  }, []);

  // Escuta o player: precisa saber quando ele ficou pronto e quando o
  // estado muda por fora (fim do vídeo, por exemplo).
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== VIMEO_ORIGIN) return;
      let data: { event?: string; method?: string };
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }

      if (data.event === "ready") {
        setReady(true);
        post("addEventListener", "play");
        post("addEventListener", "pause");
        post("addEventListener", "ended");
        return;
      }
      if (data.event === "play") setPlaying(true);
      if (data.event === "pause") setPlaying(false);
      if (data.event === "ended") setPlaying(false);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [post]);

  /** Primeiro toque liga o som; dali em diante alterna pausa. */
  const handleSurfaceClick = () => {
    if (!ready) return;

    if (muted) {
      post("setVolume", 1);
      post("play");
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

  const src =
    `${VIMEO_ORIGIN}/video/${videoId}` +
    "?autoplay=1&muted=1&controls=0&title=0&byline=0&portrait=0&badge=0" +
    "&autopause=0&playsinline=1&dnt=1&transparent=0";

  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-lift)]", className)}>
      <div style={{ paddingTop: `${ratio}%` }} />

      <iframe
        ref={frameRef}
        src={src}
        title="Video"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
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
