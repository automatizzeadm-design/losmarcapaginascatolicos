/**
 * Selo de garantia desenhado em SVG — nada de imagem externa.
 *
 * Medalha circular com borda serrilhada (como um selo de lacre), anel duplo,
 * texto curvo em cima e embaixo, e o número grande no centro.
 * Tudo em currentColor + dourado, então herda a cor de quem o envolve.
 */

type GuaranteeSealProps = {
  top: string;
  number: string;
  unit: string;
  bottom: string;
  className?: string;
};

/** Serrilha da borda: 60 dentes ao redor do círculo */
const TEETH = Array.from({ length: 60 }, (_, i) => i * 6);

export function GuaranteeSeal({ top, number, unit, bottom, className }: GuaranteeSealProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={`${top} ${number} ${unit} — ${bottom}`}
    >
      <defs>
        {/* Caminhos invisíveis que curvam o texto */}
        <path id="seal-arc-top" d="M100 100 m-66 0 a66 66 0 0 1 132 0" fill="none" />
        <path id="seal-arc-bottom" d="M100 100 m-62 0 a62 62 0 0 0 124 0" fill="none" />

        <linearGradient id="seal-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.66 0.12 72)" />
          <stop offset="45%" stopColor="oklch(0.86 0.11 88)" />
          <stop offset="100%" stopColor="oklch(0.68 0.13 70)" />
        </linearGradient>
      </defs>

      {/* serrilha */}
      <g fill="url(#seal-gold)">
        {TEETH.map((deg) => (
          <rect
            key={deg}
            x="98.4"
            y="2"
            width="3.2"
            height="9"
            rx="1.4"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
      </g>

      {/* discos */}
      <circle cx="100" cy="100" r="92" fill="url(#seal-gold)" />
      <circle cx="100" cy="100" r="85" fill="currentColor" />
      <circle
        cx="100"
        cy="100"
        r="79"
        fill="none"
        stroke="url(#seal-gold)"
        strokeWidth="1.5"
        opacity="0.75"
      />
      <circle
        cx="100"
        cy="100"
        r="55"
        fill="none"
        stroke="url(#seal-gold)"
        strokeWidth="1"
        opacity="0.45"
      />

      {/* texto curvo */}
      <text
        fill="url(#seal-gold)"
        fontSize="15"
        fontWeight="700"
        letterSpacing="3.4"
        fontFamily="var(--font-display)"
      >
        <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
          {top}
        </textPath>
      </text>

      <text
        fill="url(#seal-gold)"
        fontSize="10.5"
        fontWeight="600"
        letterSpacing="2.2"
        fontFamily="var(--font-display)"
      >
        <textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">
          {bottom}
        </textPath>
      </text>

      {/* número */}
      <text
        x="100"
        y="106"
        textAnchor="middle"
        fill="url(#seal-gold)"
        fontSize="60"
        fontWeight="800"
        letterSpacing="-2"
        fontFamily="var(--font-price)"
      >
        {number}
      </text>

      <text
        x="100"
        y="128"
        textAnchor="middle"
        fill="url(#seal-gold)"
        fontSize="17"
        fontWeight="700"
        letterSpacing="5"
        fontFamily="var(--font-display)"
      >
        {unit}
      </text>

      {/* estrelinhas laterais, pra medalha não ficar chapada */}
      <g fill="url(#seal-gold)" opacity="0.8">
        <path d="m34 100 2.2 4.6L41 107l-4.8 2.4L34 114l-2.2-4.6L27 107l4.8-2.4Z" />
        <path d="m166 100 2.2 4.6 4.8 2.4-4.8 2.4-2.2 4.6-2.2-4.6-4.8-2.4 4.8-2.4Z" />
      </g>
    </svg>
  );
}
