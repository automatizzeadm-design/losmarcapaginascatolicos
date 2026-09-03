/**
 * Eventos do pixel da Meta.
 *
 * O PageView é disparado inline no __root. Aqui ficam os eventos de conversão,
 * que são o que a Meta usa para aprender quem compra — só PageView não ensina
 * nada ao algoritmo.
 *
 * Tudo é defensivo de propósito: se o pixel estiver bloqueado por adblock, ou
 * ainda não tiver carregado, a função sai calada. Rastreamento nunca pode
 * derrubar uma venda.
 */

type Fbq = (...args: unknown[]) => void;

function fbq(): Fbq | null {
  if (typeof window === "undefined") return null;
  const f = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof f === "function" ? f : null;
}

/** Disparado quando ela clica num botão que leva ao checkout. */
export function rastrearInicioDeCheckout(dados: {
  /** Nome do pacote, para separar os funis no gerenciador */
  pacote: string;
  /** Só os dígitos do preço, ex.: 174 */
  valor: number;
}) {
  fbq()?.("track", "InitiateCheckout", {
    content_name: dados.pacote,
    value: dados.valor,
    currency: "MXN",
  });
}

/** Converte "$174 MXN" em 174. Devolve 0 se não achar número. */
export function valorNumerico(preco: string): number {
  const digitos = preco.replace(/[^\d]/g, "");
  return digitos ? Number(digitos) : 0;
}
