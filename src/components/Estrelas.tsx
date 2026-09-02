import { cn } from "@/lib/utils";

/**
 * Estrelas com preenchimento parcial.
 *
 * A nota é desenhada de verdade: uma camada de estrelas vazias e, por cima,
 * a mesma fileira preenchida recortada na largura da nota. Uma nota 4,7
 * mostra quatro estrelas cheias e 70% da quinta — não arredonda para 5.
 */

const CAMINHO_ESTRELA =
  "m12 2.6 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.7l-5.9 3.1 1.2-6.6-4.8-4.6 6.6-.9Z";

function Fileira({ classe, tamanho }: { classe: string; tamanho: string }) {
  return (
    <span className={cn("flex gap-0.5", classe)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={tamanho} fill="currentColor" aria-hidden>
          <path d={CAMINHO_ESTRELA} />
        </svg>
      ))}
    </span>
  );
}

export function Estrelas({
  nota,
  mostrarNumero = true,
  tamanho = "h-3.5 w-3.5",
  className,
}: {
  /** De 0 a 5, com uma casa decimal */
  nota: number;
  mostrarNumero?: boolean;
  tamanho?: string;
  className?: string;
}) {
  const limitada = Math.max(0, Math.min(5, nota));
  const pct = (limitada / 5) * 100;

  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <span
        className="relative inline-flex"
        role="img"
        aria-label={`${limitada.toFixed(1).replace(".", ",")} de 5 estrellas`}
      >
        <Fileira classe="text-gold/25" tamanho={tamanho} />
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pct}%` }}
          aria-hidden
        >
          <Fileira classe="text-gold" tamanho={tamanho} />
        </span>
      </span>

      {mostrarNumero && (
        <span className="font-medium tabular-nums text-[0.76rem] text-muted-foreground">
          {limitada.toFixed(1).replace(".", ",")}
        </span>
      )}
    </span>
  );
}
