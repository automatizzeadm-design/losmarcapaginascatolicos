import type { ReactNode } from "react";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { rastrearInicioDeCheckout, valorNumerico } from "@/lib/pixel";
import { comRastreio } from "@/lib/rastreio";

/**
 * CTA principal — bloco dourado de largura total.
 * O brilho que atravessa é discreto e espaçado (9s), pra não virar letreiro.
 */

type CtaButtonProps = {
  children: ReactNode;
  href: string;
  sublabel?: ReactNode;
  /** Variante azul mariana, usada no pacote básico */
  variant?: "gold" | "outline";
  className?: string;
  /**
   * Intercepta o clique antes de navegar. Usado pelo pacote básico, que abre
   * o pop-up de resgate em vez de ir direto pro checkout.
   * Chame preventDefault() dentro para segurar a navegação.
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /**
   * Dispara InitiateCheckout no clique. Passe pacote e preço nos botões que
   * levam de fato ao pagamento — é o evento com que a Meta aprende quem compra.
   */
  checkout?: { pacote: string; preco: string };
};

export function CtaButton({
  children,
  href,
  sublabel,
  variant = "gold",
  className,
  onClick,
  checkout,
}: CtaButtonProps) {
  /**
   * O rastreio só existe no navegador, então o href sai do servidor sem ele e
   * ganha o `src` depois da hidratação. Fazer assim (e não no clique) mantém
   * o link normal: abrir em nova aba e copiar o endereço seguem funcionando.
   */
  const [hrefFinal, setHrefFinal] = useState(href);
  useEffect(() => setHrefFinal(comRastreio(href)), [href]);

  const aoClicar = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (checkout) {
      rastrearInicioDeCheckout({
        pacote: checkout.pacote,
        valor: valorNumerico(checkout.preco),
      });
    }
    onClick?.(e);
  };
  const isGold = variant === "gold";

  return (
    <span className="block">
      <a
        href={hrefFinal}
        onClick={aoClicar}
        className={cn(
          "group/cta relative block overflow-hidden rounded-[16px] px-6 py-4 text-center",
          "font-sans text-[0.95rem] font-semibold tracking-wide",
          "transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isGold
            ? "gold-face text-primary-foreground shadow-[var(--shadow-lift)]"
            : "border-2 border-primary/40 bg-card text-primary hover:border-primary/70",
          className,
        )}
      >
        {isGold && (
          <span className="pointer-events-none absolute inset-0 -translate-x-full animate-cta-sheen bg-[linear-gradient(100deg,transparent_25%,oklch(1_0_0/0.35)_50%,transparent_75%)]" />
        )}
        <span className="relative">{children}</span>
      </a>
      {sublabel && (
        <span className="mt-2 block text-center text-[0.74rem] text-muted-foreground">
          {sublabel}
        </span>
      )}
    </span>
  );
}
