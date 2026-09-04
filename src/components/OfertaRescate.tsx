import { useEffect, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CtaButton } from "@/components/CtaButton";
import { COPY } from "@/data/copy";
import { CHECKOUT, PRICING } from "@/data/offer";
import { rastrearInicioDeCheckout, valorNumerico } from "@/lib/pixel";
import { comRastreio } from "@/lib/rastreio";

/**
 * Pop-up de resgate no clique do pacote básico.
 *
 * O momento é o melhor que existe na página: ela já decidiu comprar, só
 * escolheu a versão menor — a objeção é preço, não desejo. Aqui a distância
 * pro completo cai de $74 para $30, e a decisão vira óbvia.
 *
 * O botão de recusa leva ao checkout do básico de verdade. Prender a venda
 * que ela já quis fazer seria trocar conversão por atrito.
 */

function preencher(texto: string) {
  return texto
    .replaceAll("{precoResgate}", PRICING.rescue.price)
    .replaceAll("{deltaResgate}", PRICING.rescue.deltaVsBasic)
    .replaceAll("{economia}", PRICING.rescue.economia)
    .replaceAll("{delta}", PRICING.upgradeDelta);
}

export function OfertaRescate({
  aberto,
  onFechar,
}: {
  aberto: boolean;
  onFechar: () => void;
}) {
  const t = COPY.offers.rescate;

  // O rastreio só existe no navegador: o link sai do servidor sem ele e
  // ganha o `src` depois da hidratação, como no CtaButton.
  const [hrefBasico, setHrefBasico] = useState<string>(CHECKOUT.basic);
  useEffect(() => setHrefBasico(comRastreio(CHECKOUT.basic)), []);

  return (
    <Dialog open={aberto} onOpenChange={(v) => !v && onFechar()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-2 border-gold bg-card p-0 sm:max-w-[520px]">
        {/* Faixa dourada do topo */}
        <div className="bg-[image:var(--gradient-gold)] px-6 py-3 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
            {t.eyebrow}
          </p>
        </div>

        <div className="px-6 pb-6 pt-5 text-center">
          <h2 className="text-balance font-display text-[1.5rem] font-semibold leading-tight text-foreground sm:text-[1.8rem]">
            {preencher(t.title)}
          </h2>

          <p className="mx-auto mt-3 max-w-[38rem] text-[0.9rem] leading-relaxed text-muted-foreground">
            {preencher(t.lead)}
          </p>

          {/* O que fica de fora no básico — a perda concreta */}
          <div className="mt-5 rounded-xl border border-border bg-background px-4 py-4 text-left">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-destructive">
              {t.perdeTitle}
            </p>
            <ul className="mt-2.5 grid gap-2">
              {t.perde.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-foreground/85"
                >
                  <span className="mt-0.5 shrink-0 text-destructive" aria-hidden>
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Preço */}
          <div className="mt-5">
            <p className="relative inline-block text-[0.95rem] text-muted-foreground">
              {PRICING.full.price}
              <span
                className="absolute inset-x-0 top-1/2 h-[1.5px] -rotate-3 bg-destructive/80"
                aria-hidden
              />
            </p>
            <p className="font-price text-[3rem] font-bold leading-none tracking-tight text-success">
              {PRICING.rescue.price}
            </p>
            <p className="mt-1.5 text-[0.78rem] font-medium text-success">
              {preencher(t.economiaLabel)}
            </p>
          </div>

          <div className="mt-5">
            {/* Link próprio: a oferta de resgate tem preço diferente do
                completo, então precisa do seu próprio `off` na Hotmart. */}
            <CtaButton
              href={CHECKOUT.rescue}
              checkout={{ pacote: "Rescate — Completo", preco: PRICING.rescue.price }}
            >
              {preencher(t.ctaSim)}
            </CtaButton>
          </div>

          {/* A recusa leva ao básico de verdade — a venda dela continua de pé.
              Carrega o mesmo rastreio e dispara o mesmo evento: uma venda do
              básico vinda daqui não pode ficar sem criativo no relatório. */}
          <a
            href={hrefBasico}
            onClick={() =>
              rastrearInicioDeCheckout({
                pacote: "Paquete Básico",
                valor: valorNumerico(PRICING.basic.price),
              })
            }
            className="mt-3 inline-block text-[0.82rem] text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground"
          >
            {t.ctaNao}
          </a>

          <p className="mt-4 text-[0.72rem] text-muted-foreground/70">{t.rodape}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
