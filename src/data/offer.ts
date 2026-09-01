/**
 * Preços e links de checkout.
 *
 * O preço definido pelo cliente é 100 MXN para o pacote principal
 * (o Paquete Completo, que é o que a página empurra). O Básico fica
 * abaixo pra sustentar a comparação — é a mecânica de duas ofertas do
 * site original, onde a maioria migra pro completo.
 *
 * Para ajustar preço, mexer só aqui: a página inteira lê deste arquivo.
 */

export const PRICING = {
  currency: "MXN",

  basic: {
    /** Preço de ancoragem, riscado. Fica abaixo do normal do pacote completo
        ($174): o básico entrega menos, então não pode custar mais. */
    from: "$119 MXN",
    /** O que ela paga */
    price: "$69 MXN",
  },

  full: {
    /** Preço normal do produto, riscado na página */
    from: "$174 MXN",
    price: "$100 MXN",
  },

  /** Diferença entre os dois, citada no empurrão pro pacote completo */
  upgradeDelta: "$31 MXN",

  /** Valor de ancoragem de cada bônus premium */
  bonusAnchor: "$259 MXN",
} as const;

/**
 * Enquanto a plataforma de pagamento não estiver criada, os botões
 * apontam pra cá. Trocar pelos links reais (Hotmart / Mercado Pago).
 */
export const CHECKOUT = {
  basic: "#comprar-basico",
  full: "#comprar-completo",
} as const;

/** Contagem regressiva: fecha à meia-noite do dia corrente, no fuso do visitante. */
export function msUntilEndOfDay() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return Math.max(0, end.getTime() - now.getTime());
}

export function formatCountdown(ms: number) {
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/** Data de hoje escrita como o México escreve: 25/08/2026 */
export function todayLabel() {
  return new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
