import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

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
};

export function CtaButton({
  children,
  href,
  sublabel,
  variant = "gold",
  className,
}: CtaButtonProps) {
  const isGold = variant === "gold";

  return (
    <span className="block">
      <a
        href={href}
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
