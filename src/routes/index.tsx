import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COPY } from "@/data/copy";
import { CHECKOUT, PRICING } from "@/data/offer";
import { CtaButton } from "@/components/CtaButton";
import { TopBar } from "@/components/TopBar";
import { GuaranteeSeal } from "@/components/GuaranteeSeal";
import { VslPlayer } from "@/components/VslPlayer";
import { OfertaRescate } from "@/components/OfertaRescate";
import { Estrelas } from "@/components/Estrelas";
import { CarrosselDepoimentos } from "@/components/CarrosselDepoimentos";
import comoUsarAsset from "@/assets/como-usar.png.asset.json";
import bonusImpresionAsset from "@/assets/bonus-impresion-es.webp.asset.json";
import bonusNinosAsset from "@/assets/bonus-ninos-es.webp.asset.json";
import bonusSalmosAsset from "@/assets/bonus-salmos-es.webp.asset.json";
import bonusPlaylistAsset from "@/assets/bonus-playlist-es.webp.asset.json";
import capaAsset from "@/assets/capa-es.webp.asset.json";
import bundleMockupAsset from "@/assets/bundle-mockup-es.webp.asset.json";
import testimoniosAsset from "@/assets/testimonios-es.png.asset.json";

/* Imagen de cada bono, mapeada por título. */
const BONUS_IMAGES: Record<string, { src: string; alt: string }> = {
  "Guía de Impresión Perfecta": {
    src: bonusImpresionAsset.url,
    alt: "Guía de Impresión Perfecta: papel recomendado, gramaje ideal, plastificado, recorte y cuidados",
  },
  "16 Separadores Infantiles — Historias Bíblicas": {
    src: bonusNinosAsset.url,
    alt: "16 separadores infantiles con historias bíblicas: el Arca de Noé, Jesús y los niños, el Buen Pastor y más",
  },
  "Los 150 Salmos Explicados Versículo por Versículo": {
    src: bonusSalmosAsset.url,
    alt: "150 Salmos Explicados: guía versículo por versículo con el rey David y la Biblia",
  },
  "Playlist con +100 Canciones Marianas y Católicas": {
    src: bonusPlaylistAsset.url,
    alt: "Playlist con más de 100 canciones marianas y católicas para rezar y meditar",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: COPY.meta.title },
      { name: "description", content: COPY.meta.description },
      { property: "og:title", content: COPY.meta.title },
      { property: "og:description", content: COPY.meta.description },
      { property: "og:type", content: "product" },
      { property: "og:locale", content: "es_MX" },
    ],
  }),
  component: Landing,
});

/* ============================================================
   Peças de layout
   ============================================================ */

function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-14 sm:py-16 ${className}`}>
      <div className="mx-auto w-full max-w-[980px]">{children}</div>
    </section>
  );
}

function Title({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-balance text-center font-display text-[1.7rem] leading-[1.2] text-foreground sm:text-[2.15rem] ${className}`}
    >
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto mt-4 max-w-[46rem] text-center text-[1rem] leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-gold" aria-hidden>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/50" />
      <span className="text-sm">✦</span>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
}

/* ============================================================
   Página
   ============================================================ */

function Landing() {
  return (
    <main className="min-h-screen bg-background">
      <TopBar label={COPY.topBar.label} countdownLabel={COPY.topBar.countdownLabel} />
      <Hero />
      <Testimonials />
      <HowTo />
      <Audience />
      <Categories />
      <Package />
      <Bonuses />
      <Offers />
      <Payment />
      <Guarantee />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-border bg-[radial-gradient(90%_70%_at_50%_0%,oklch(0.95_0.03_85),transparent_70%)] px-5 pb-14 pt-12 sm:pb-16">
      <div className="mx-auto w-full max-w-[980px] text-center">
        <div className="animate-rise-fade">
          <span className="pill">{COPY.hero.eyebrow}</span>
        </div>

        <h1 className="animate-rise-fade mx-auto mt-6 max-w-[26ch] text-balance font-display text-[2rem] leading-[1.14] text-foreground sm:text-[2.9rem]">
          150 Separadores Católicos{" "}
          <span className="text-gradient-gold">listos para imprimir</span>
        </h1>

        {/* VSL logo abaixo do título, antes de qualquer texto de apoio */}
        <VslPlayer
          className="animate-rise-fade mx-auto mt-8 max-w-[680px]"
          videoId={COPY.hero.vsl.videoId}
          unmutePrompt={COPY.hero.vsl.unmutePrompt}
          pausedTitle={COPY.hero.vsl.pausedTitle}
          pausedText={COPY.hero.vsl.pausedText}
        />

        <p className="animate-rise-fade mx-auto mt-8 max-w-[42rem] text-[0.88rem] leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {COPY.hero.lead}
        </p>

        <div className="mx-auto mt-8 max-w-[26rem]">
          <CtaButton href={CHECKOUT.full} sublabel={COPY.hero.ctaSub}>
            {COPY.hero.cta}
          </CtaButton>
        </div>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {COPY.hero.badges.map((b) => (
            <li key={b} className="flex items-center gap-1.5 text-[0.8rem] text-muted-foreground">
              <span className="text-gold" aria-hidden>
                ✦
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

/* ---------------- TESTIMONIOS ---------------- */

function Testimonials() {
  return (
    <Section id="testimonios">
      <img
        src={testimoniosAsset.url}
        alt="Separadores católicos en uso: Biblia abierta con rosario y vela, mostrando seis modelos devocionales como el Salmo 23, Nuestra Señora de Aparecida, Jesús de la Divina Misericordia, Filipenses 4:13, San Miguel Arcángel y Santa Teresita"
        className="animate-rise-fade hover-scale mx-auto mb-8 w-full max-w-[640px]"
        loading="lazy"
      />
      <Title>{COPY.testimonials.title}</Title>
      <Lead>{COPY.testimonials.lead}</Lead>

      {/* Carrossel contínuo, sangrando até a borda da tela */}
      <div className="mt-9 -mx-5 sm:-mx-[calc((100vw-980px)/2+1.25rem)]">
        <CarrosselDepoimentos itens={COPY.testimonials.items} />
      </div>

      {COPY.testimonials.note && (
        <p className="mt-5 text-center text-[0.72rem] text-muted-foreground/70">
          {COPY.testimonials.note}
        </p>
      )}
    </Section>
  );
}

/* ---------------- CÓMO USAR ---------------- */

function HowTo() {
  return (
    <Section id="como-usar" className="bg-cream">
      <img
        src={comoUsarAsset.url}
        alt="3 pasos simples para usar tus separadores católicos: imprime, recorta y utiliza"
        className="mx-auto w-full max-w-[560px] rounded-[18px] border border-border shadow-[var(--shadow-soft)]"
        loading="lazy"
      />
    </Section>
  );
}

/* ---------------- PARA QUIÉN ---------------- */

function Audience() {
  return (
    <Section id="para-quien">
      <Title>{COPY.audience.title}</Title>
      <Lead>{COPY.audience.lead}</Lead>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COPY.audience.items.map((item) => (
          <article key={item.title} className="card-soft p-6 text-center">
            <span className="text-[2rem] leading-none">{item.emoji}</span>
            <h3 className="mt-3 font-display text-lg text-foreground">{item.title}</h3>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- CATEGORÍAS ---------------- */

function Categories() {
  return (
    <Section id="categorias" className="bg-cream">
      <p className="text-center">
        <span className="pill">{COPY.categories.eyebrow}</span>
      </p>
      <Title className="mt-3">{COPY.categories.title}</Title>
      <Lead>{COPY.categories.lead}</Lead>

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COPY.categories.items.map((c) => (
          <div key={c.name} className="card-soft flex items-center gap-3 p-4">
            <span className="text-[1.6rem] leading-none">{c.emoji}</span>
            <span className="flex-1 text-[0.92rem] font-medium text-foreground">{c.name}</span>
            <span className="font-price text-[1.5rem] font-bold leading-none text-primary">
              {c.count}
            </span>
          </div>
        ))}
      </div>

      <div className="card-soft mx-auto mt-6 max-w-[46rem] border-gold/40 bg-accent/50 p-5 text-center">
        <p className="text-[0.92rem] leading-relaxed text-foreground/90">
          {COPY.categories.highlight}
        </p>
      </div>

      {/* Fecho da contagem — é o número que prova a promessa do título,
          então ganha faixa própria em vez de virar mais uma linha de texto */}
      <p className="mt-7 text-center">
        <span className="inline-block rounded-2xl border-2 border-gold bg-[image:var(--gradient-gold)] px-6 py-4 text-[1.05rem] font-bold leading-snug text-primary-foreground shadow-[var(--shadow-lift)] sm:text-[1.25rem]">
          {COPY.categories.total}
        </span>
      </p>

      {/* Exclusividade: vem logo depois de ela ver os 150 modelos listados,
          que é o momento em que passa pela cabeça "isso deve ter em qualquer lugar" */}
      <div className="card-soft mx-auto mt-6 max-w-[46rem] border-gold/40 p-6 text-center">
        <h3 className="font-display text-[1.25rem] text-foreground sm:text-[1.4rem]">
          {COPY.categories.exclusividad.titulo}
        </h3>
        <p className="mx-auto mt-2.5 max-w-[42rem] text-[0.92rem] leading-relaxed text-muted-foreground">
          {COPY.categories.exclusividad.texto}
        </p>
      </div>
    </Section>
  );
}

/* ---------------- PAQUETE ---------------- */

function Package() {
  return (
    <Section id="paquete">
      <p className="text-center">
        <span className="pill">{COPY.package.eyebrow}</span>
      </p>
      <Title className="mt-3">{COPY.package.title}</Title>
      <Lead>{COPY.package.lead}</Lead>

      <div className="card-soft mx-auto mt-9 max-w-[46rem] p-6 sm:p-8">
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">
          {COPY.package.mainLabel}
        </p>
        <h3 className="mt-2 font-display text-2xl text-foreground sm:text-[1.8rem]">
          {COPY.package.mainTitle}
        </h3>
        <img
          src={capaAsset.url}
          alt="150 Separadores Católicos para Imprimir — muestras con la Virgen, Jesús y santos sobre una Biblia abierta"
          className="mx-auto mt-4 w-full max-w-[420px] rounded-xl border border-border shadow-[var(--shadow-soft)]"
          loading="lazy"
        />
        <p className="mt-3 text-[0.94rem] leading-relaxed text-muted-foreground">
          {COPY.package.mainText}
        </p>

        <ul className="mt-5 grid gap-2.5">
          {COPY.package.mainFeatures.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[0.92rem] text-foreground/90">
              <span className="mt-0.5 shrink-0 text-success" aria-hidden>
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------- BONOS ---------------- */

function Bonuses() {
  return (
    <Section id="bonos" className="bg-cream">
      <p className="text-center">
        <span className="pill">{COPY.bonuses.eyebrow}</span>
      </p>
      <Title className="mt-3">{COPY.bonuses.title}</Title>
      <Lead>{COPY.bonuses.lead}</Lead>

      {/* Bônus 1 e 2 lado a lado já no celular, com tipografia compacta.
          Os premium (3 e 4) ficam abaixo em largura cheia, como estavam:
          eles trazem imagem, lista de itens e preço, e não cabem em meia
          largura sem virar sopa de letrinha. */}
      <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4">
        {COPY.bonuses.items
          .filter((b) => !b.premium)
          .map((b) => (
            <article key={b.title} className="card-soft flex flex-col p-4 sm:p-6">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-gold sm:text-[0.74rem] sm:tracking-[0.12em]">
                {b.tag}
              </p>
              <h3 className="mt-2 font-display text-[0.98rem] leading-snug text-foreground sm:text-xl">
                {b.title}
              </h3>

              {(() => {
                const img = BONUS_IMAGES[b.title];
                return img ? (
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="mt-3 w-full rounded-xl border border-border shadow-[var(--shadow-soft)]"
                    loading="lazy"
                  />
                ) : null;
              })()}

              <p className="mt-2 flex-1 text-[0.78rem] leading-relaxed text-muted-foreground sm:text-[0.88rem]">
                {b.text}
              </p>
            </article>
          ))}
      </div>

      <div className="mt-4 grid gap-4">
        {COPY.bonuses.items
          .filter((b) => b.premium)
          .map((b) => (
            <article key={b.title} className="card-soft flex flex-col border-gold/50 p-6">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-gold">
                {b.tag}
              </p>
              {"badge" in b && b.badge && (
                <p className="mt-1.5 inline-block self-start rounded-full bg-primary/10 px-2.5 py-1 text-[0.68rem] font-medium text-primary">
                  {b.badge}
                </p>
              )}
              <h3 className="mt-2 font-display text-xl leading-snug text-foreground">{b.title}</h3>

              {(() => {
                const img = BONUS_IMAGES[b.title];
                return img ? (
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="mt-3 w-full rounded-xl border border-border shadow-[var(--shadow-soft)]"
                    loading="lazy"
                  />
                ) : null;
              })()}

              <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-muted-foreground">
                {b.text}
              </p>

              {"features" in b && b.features && (
                <ul className="mt-4 grid gap-2">
                  {b.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-[0.85rem] text-foreground/85"
                    >
                      <span className="mt-0.5 shrink-0 text-success" aria-hidden>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-4 flex items-baseline gap-2 border-t border-border pt-3">
                <span className="relative text-[0.9rem] text-muted-foreground">
                  Antes {PRICING.bonusAnchor}
                  <span
                    className="absolute inset-x-0 top-1/2 h-[1.5px] -rotate-3 bg-destructive/80"
                    aria-hidden
                  />
                </span>
                <span className="font-price text-[1.2rem] font-bold text-success">
                  {COPY.bonuses.freeLabel}
                </span>
              </p>
            </article>
          ))}
      </div>

      <div className="mx-auto mt-8 max-w-[22rem]">
        <CtaButton href="#ofertas">{COPY.bonuses.cta}</CtaButton>
      </div>
    </Section>
  );
}

/* ---------------- OFERTAS ---------------- */

function Offers() {
  const [resgateAberto, setResgateAberto] = useState(false);

  return (
    <Section id="ofertas">
      <OfertaRescate aberto={resgateAberto} onFechar={() => setResgateAberto(false)} />

      <Title>{COPY.offers.title}</Title>
      <Lead>{COPY.offers.lead}</Lead>

      <div className="mt-9 grid items-start gap-5 lg:grid-cols-2">
        {/* Básico */}
        <div className="card-soft p-6 sm:p-7">
          <p className="text-[0.74rem] uppercase tracking-[0.16em] text-muted-foreground">
            {COPY.offers.basic.label}
          </p>
          <h3 className="mt-1.5 font-display text-2xl text-foreground">
            {COPY.offers.basic.title}
          </h3>

          <ul className="mt-5 grid gap-2.5">
            {COPY.offers.basic.includes.map((i) => (
              <li key={i} className="flex items-start gap-2.5 text-[0.9rem] text-foreground/90">
                <span className="mt-0.5 shrink-0 text-success" aria-hidden>
                  ✓
                </span>
                {i}
              </li>
            ))}
            {COPY.offers.basic.excludes.map((i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[0.9rem] text-muted-foreground/60 line-through"
              >
                <span className="mt-0.5 shrink-0 text-destructive/70 no-underline" aria-hidden>
                  ✕
                </span>
                {i}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-[0.7rem] uppercase tracking-[0.14em] text-gold">
              {COPY.offers.contributionLabel}
            </p>
            <p className="relative mt-1 inline-block text-[0.95rem] text-muted-foreground">
              Antes {PRICING.basic.from}
              <span
                className="absolute inset-x-0 top-1/2 h-[1.5px] -rotate-3 bg-destructive/80"
                aria-hidden
              />
            </p>
            <p className="font-price text-[2.3rem] font-bold leading-none tracking-tight text-foreground">
              {PRICING.basic.price}
            </p>
          </div>

          <div className="mt-5">
            {/* Segura a navegação e abre o resgate: ela já quis comprar,
                só escolheu a versão menor. */}
            <CtaButton
              href={CHECKOUT.basic}
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                setResgateAberto(true);
              }}
            >
              {COPY.offers.basic.cta}
            </CtaButton>
          </div>
        </div>

        {/* Completo */}
        <div className="relative rounded-[18px] border-2 border-gold bg-card p-6 shadow-[var(--shadow-lift)] sm:p-7">
          <p className="animate-soft-pulse absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[image:var(--gradient-gold)] px-4 py-1 text-[0.72rem] font-semibold text-primary-foreground shadow-[var(--shadow-soft)]">
            {COPY.offers.full.badge}
          </p>

          <h3 className="mt-3 font-display text-2xl text-foreground">{COPY.offers.full.title}</h3>

          <div className="animate-soft-pulse mt-4">
            <img
              src={bundleMockupAsset.url}
              alt="Paquete Completo: 150 separadores católicos más 4 bonos en un mockup con encuadernador y tarjetas"
              className="mx-auto w-full max-w-[440px] rounded-xl border border-gold/40 shadow-[var(--shadow-lift)]"
              loading="lazy"
            />
          </div>

          <ul className="mt-5 grid gap-2.5">
            {COPY.offers.full.includes.map((i) => (
              <li key={i} className="flex items-start gap-2.5 text-[0.9rem] text-foreground/90">
                <span className="mt-0.5 shrink-0 text-success" aria-hidden>
                  ✓
                </span>
                {i}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-[0.7rem] uppercase tracking-[0.14em] text-gold">
              {COPY.offers.contributionLabel}
            </p>
            {/* Empilhamento de valor. Somar item a item faz o mesmo preço ser
                lido como 80% de desconto — um "antes" solto ninguém acredita. */}
            <div className="mt-3 rounded-xl border border-border bg-background/60 p-4 text-left">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {COPY.offers.full.stackLabel}
              </p>

              <ul className="mt-2.5 grid gap-1.5">
                {PRICING.valueStack.map((linha) => (
                  <li
                    key={linha.item}
                    className="flex items-baseline justify-between gap-3 text-[0.82rem]"
                  >
                    <span className="text-foreground/85">{linha.item}</span>
                    <span className="shrink-0 font-price tabular-nums text-muted-foreground">
                      {linha.valor}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-border pt-2.5">
                <span className="text-[0.84rem] font-semibold text-foreground">
                  {COPY.offers.full.stackTotalLabel}
                </span>
                <span className="relative shrink-0 font-price text-[1.05rem] font-bold tabular-nums text-muted-foreground">
                  {PRICING.valueTotal}
                  <span
                    className="absolute inset-x-0 top-1/2 h-[1.5px] -rotate-3 bg-destructive/80"
                    aria-hidden
                  />
                </span>
              </div>
            </div>

            <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {COPY.offers.full.stackTodayLabel}
            </p>
            <p className="font-price text-[3rem] font-bold leading-none tracking-tight text-success">
              {PRICING.full.price}
            </p>
            <p className="mt-1.5 text-[0.78rem] text-muted-foreground">
              {COPY.offers.full.upsellNote.replace("{delta}", PRICING.upgradeDelta)}
            </p>
          </div>

          <div className="mt-5">
            <CtaButton href={CHECKOUT.full} sublabel={COPY.offers.full.ctaSub}>
              {COPY.offers.full.cta}
            </CtaButton>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-5 max-w-[42rem] text-center text-[0.82rem] leading-relaxed text-muted-foreground">
        {COPY.offers.contributionNote}
      </p>

      {/* Empurrão pro pacote completo */}
      <div className="card-soft mx-auto mt-6 max-w-[46rem] border-gold/45 bg-accent/40 p-5 text-center">
        <p className="text-[0.92rem] font-semibold text-foreground">
          ⚠️ {COPY.offers.nudge.warning}
        </p>
        <p className="mt-1.5 text-[0.88rem] leading-relaxed text-muted-foreground">
          {COPY.offers.nudge.text.replace("{delta}", PRICING.upgradeDelta)}
        </p>
      </div>
    </Section>
  );
}

/* ---------------- PAGO ---------------- */

function Payment() {
  return (
    <Section id="pago" className="bg-cream">
      <div className="card-soft mx-auto max-w-[46rem] p-6 text-center">
        <h2 className="font-display text-2xl text-foreground">{COPY.payment.title}</h2>
        <p className="mt-3 text-[1rem] font-medium text-foreground/90">{COPY.payment.methods}</p>
        <p className="mt-2 text-[0.85rem] text-muted-foreground">{COPY.payment.note}</p>
      </div>
    </Section>
  );
}

/* ---------------- GARANTÍA ---------------- */

function Guarantee() {
  return (
    <Section id="garantia">
      {/* Couro escuro + selo dourado: o bloco tem que parecer um certificado,
          não mais um cartão da página. É o que tira o medo antes do preço. */}
      <div className="relative mx-auto max-w-[52rem] overflow-hidden rounded-[24px] bg-[image:var(--gradient-brown)] p-7 text-center shadow-[var(--shadow-lift)] sm:p-10">
        {/* moldura dupla, como borda de diploma */}
        <span className="pointer-events-none absolute inset-3 rounded-[18px] border border-gold/45" />
        <span className="pointer-events-none absolute inset-[18px] rounded-[13px] border border-gold/20" />
        {/* brilho no topo, pra o marrom não ficar chapado */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(70%_100%_at_50%_0%,oklch(0.82_0.13_85/0.16),transparent_70%)]" />

        <div className="relative flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-9 sm:text-left">
          <GuaranteeSeal
            {...COPY.guarantee.seal}
            className="h-36 w-36 shrink-0 text-brown-deep drop-shadow-[0_10px_24px_oklch(0.2_0.04_50/0.65)] sm:h-44 sm:w-44"
          />

          <div className="flex-1">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {COPY.guarantee.badge}
            </p>
            <h2 className="mt-2 font-display text-[1.65rem] leading-tight text-cream sm:text-[2.1rem]">
              {COPY.guarantee.title}
            </h2>
            <p className="mt-2 font-display text-[1.05rem] italic text-gold/90">
              {COPY.guarantee.lead}
            </p>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-cream/75">
              {COPY.guarantee.text}
            </p>
            <p className="mt-4 text-[1rem] font-semibold text-cream">
              {COPY.guarantee.highlight}
            </p>
          </div>
        </div>

        {/* três pilares da garantia */}
        <div className="relative mt-8 grid gap-3 border-t border-gold/25 pt-7 sm:grid-cols-3">
          {COPY.guarantee.points.map((p) => (
            <div key={p.title} className="rounded-2xl bg-cream/[0.07] px-4 py-4 text-center">
              <span className="text-[1.6rem] leading-none">{p.emoji}</span>
              <p className="mt-1.5 text-[0.92rem] font-semibold text-cream">{p.title}</p>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-cream/65">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */

function Faq() {
  return (
    <Section id="preguntas" className="bg-cream">
      <Title>{COPY.faq.title}</Title>

      <Accordion type="single" collapsible className="mx-auto mt-8 grid max-w-[46rem] gap-2.5">
        {COPY.faq.items.map((item, i) => (
          <AccordionItem
            key={item.q}
            value={`item-${i}`}
            className="card-soft overflow-hidden px-5 data-[state=open]:border-primary/40"
          >
            <AccordionTrigger className="py-4 text-left font-display text-[1.1rem] leading-snug text-foreground hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[0.9rem] leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

/* ---------------- CIERRE ---------------- */

function FinalCta() {
  return (
    <Section id="final">
      <Ornament />
      <Title className="mt-5">{COPY.finalCta.title}</Title>
      <Lead>{COPY.finalCta.text}</Lead>

      <div className="mx-auto mt-8 max-w-[26rem]">
        <CtaButton href={CHECKOUT.full} sublabel={COPY.hero.ctaSub}>
          {COPY.finalCta.cta}
        </CtaButton>
      </div>
    </Section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-card px-5 py-9">
      <div className="mx-auto max-w-[46rem] text-center">
        <p className="font-display text-xl text-primary">{COPY.brand.name}</p>
        <p className="mt-3 text-[0.78rem] text-muted-foreground">{COPY.footer.rights}</p>
        <p className="mx-auto mt-2 max-w-[36rem] text-[0.74rem] leading-relaxed text-muted-foreground/70">
          {COPY.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
