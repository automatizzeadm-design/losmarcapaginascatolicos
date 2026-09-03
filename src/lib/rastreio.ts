/**
 * Rastreio de criativo da página até o checkout.
 *
 * A Hotmart lê dois parâmetros no link de pagamento e mostra os dois no
 * relatório de vendas: `src` e `sck`. Quem anuncia usa o `src` para saber
 * QUAL criativo vendeu — sem isso o relatório diz quanto você vendeu, mas
 * não de onde veio, e não dá para desligar anúncio ruim.
 *
 * O fluxo é: a pessoa cai em /?src=video-guadalupe-01, guardamos isso, e todo
 * botão de checkout sai carregando o mesmo valor.
 *
 * Guardamos em sessionStorage porque ela pode navegar, abrir o pop-up de
 * resgate e voltar — o parâmetro sai da barra de endereço mas a origem
 * continua sendo a mesma visita.
 */

const CHAVE_SRC = "rastreio:src";
const CHAVE_SCK = "rastreio:sck";

/** Lê um parâmetro da URL atual, sem quebrar no servidor. */
function daUrl(nome: string): string | null {
  if (typeof window === "undefined") return null;
  const valor = new URLSearchParams(window.location.search).get(nome);
  return valor && valor.trim() ? valor.trim() : null;
}

function guardar(chave: string, valor: string) {
  try {
    window.sessionStorage.setItem(chave, valor);
  } catch {
    /* modo privado ou storage cheio: seguimos sem persistir */
  }
}

function ler(chave: string): string | null {
  try {
    return window.sessionStorage.getItem(chave);
  } catch {
    return null;
  }
}

/**
 * Captura os parâmetros de origem na chegada. Chamar uma vez, no topo da app.
 *
 * Se não vier `src` explícito, cai para `utm_content` — que é onde as
 * plataformas de anúncio costumam mandar a identificação do criativo.
 */
export function capturarOrigem() {
  if (typeof window === "undefined") return;

  const src = daUrl("src") ?? daUrl("utm_content");
  if (src) guardar(CHAVE_SRC, src);

  const sck = daUrl("sck") ?? daUrl("utm_campaign");
  if (sck) guardar(CHAVE_SCK, sck);
}

/**
 * Acrescenta o rastreio a um link de checkout.
 *
 * Só mexe em link http — âncora interna (#comprar-basico) passa intacta.
 * Se o link já trouxer `src` próprio, o dele vence: alguém escreveu de
 * propósito e não cabe a nós sobrescrever.
 */
export function comRastreio(url: string): string {
  if (typeof window === "undefined") return url;
  if (!/^https?:\/\//i.test(url)) return url;

  try {
    const destino = new URL(url);

    const src = ler(CHAVE_SRC);
    if (src && !destino.searchParams.has("src")) destino.searchParams.set("src", src);

    const sck = ler(CHAVE_SCK);
    if (sck && !destino.searchParams.has("sck")) destino.searchParams.set("sck", sck);

    return destino.toString();
  } catch {
    return url;
  }
}
