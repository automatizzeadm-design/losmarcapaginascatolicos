import { Estrelas } from "@/components/Estrelas";

/**
 * Carrossel contínuo dos depoimentos.
 *
 * Não é slide a slide: a faixa desliza devagar e sem parar, que é o que
 * mantém a seção viva sem roubar a atenção de quem está lendo a página.
 * O truque do loop é renderizar a lista duas vezes e animar até -50% —
 * ao chegar lá a faixa está idêntica ao ponto inicial e a emenda some.
 *
 * Passar o dedo ou o mouse por cima pausa, senão é impossível terminar de
 * ler um depoimento que está andando.
 */

type Depoimento = {
  initials: string;
  nota: number;
  name: string;
  city: string;
  text: string;
  /** Print do depoimento, quando houver. Entra no lugar do texto. */
  imagem?: { src: string; alt: string };
};

export function CarrosselDepoimentos({ itens }: { itens: readonly Depoimento[] }) {
  // A lista duplicada é só visual — a cópia fica escondida de leitores de tela
  const faixa = [...itens, ...itens];

  return (
    <div
      className="group relative overflow-hidden"
      /* Sangra até a borda da tela: a faixa precisa entrar e sair de cena */
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}
    >
      <div className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused]">
        {faixa.map((t, i) => (
          <figure
            key={`${t.name}-${i}`}
            className="card-soft flex w-[290px] shrink-0 flex-col p-5 sm:w-[330px]"
            aria-hidden={i >= itens.length}
          >
            <Estrelas nota={t.nota} />

            {t.imagem ? (
              <img
                src={t.imagem.src}
                alt={t.imagem.alt}
                loading="lazy"
                className="mt-3 w-full rounded-lg border border-border"
              />
            ) : (
              <blockquote className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-foreground/85">
                “{t.text}”
              </blockquote>
            )}

            <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[0.72rem] font-semibold text-primary">
                {t.initials}
              </span>
              <span className="text-[0.8rem] leading-tight">
                <strong className="block font-medium text-foreground">{t.name}</strong>
                <span className="text-muted-foreground">{t.city}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
