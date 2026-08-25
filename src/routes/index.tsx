import { createFileRoute } from "@tanstack/react-router";

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
      className={`text-balance text-center font-display text-[2rem] leading-[1.15] text-foreground sm:text-[2.5rem] ${className}`}
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
          <p className="mt-3 text-[0.78rem] uppercase tracking-[0.2em] text-muted-foreground">
            {COPY.hero.official}
          </p>
        </div>

        <h1 className="animate-rise-fade mx-auto mt-6 max-w-[22ch] text-balance font-display text-[2.4rem] leading-[1.08] text-foreground sm:text-[3.4rem]">
          150 Separadores Católicos{" "}
          <span className="text-gradient-gold">listos para imprimir</span>
        </h1>

        <p className="animate-rise-fade mx-auto mt-6 max-w-[44rem] text-[1.02rem] leading-relaxed text-muted-foreground">
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
      <Title>{COPY.testimonials.title}</Title>
      <Lead>{COPY.testimonials.lead}</Lead>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COPY.testimonials.items.map((t) => (
          <figure key={t.name} className="card-soft flex flex-col p-5">
            <span className="flex gap-0.5 text-gold" aria-label="5 de 5 estrellas">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                  <path d="m12 2.6 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.7l-5.9 3.1 1.2-6.6-4.8-4.6 6.6-.9Z" />
                </svg>
              ))}
            </span>

            <blockquote className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-foreground/85">
              “{t.text}”
            </blockquote>

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

      <p className="mt-5 text-center text-[0.72rem] text-muted-foreground/70">
        {COPY.testimonials.note}
      </p>
    </Section>
  );
}

/* ---------------- CÓMO USAR ---------------- */

function HowTo() {
  return (
    <Section id="como-usar" className="bg-cream">
      <Title>{COPY.howTo.title}</Title>
      <Lead>{COPY.howTo.lead}</Lead>

      <ol className="mt-9 grid gap-4 sm:grid-cols-3">
        {COPY.howTo.steps.map((s, i) => (
          <li key={s.title} className="card-soft relative p-6 text-center">
            <span className="absolute right-4 top-3 font-price text-[2.4rem] leading-none text-primary/10">
              {i + 1}
            </span>
            <span className="text-[2.2rem] leading-none">{s.emoji}</span>
            <h3 className="mt-3 font-display text-xl text-foreground">{s.title}</h3>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
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

      <p className="mt-6 text-center font-display text-xl text-foreground">
        {COPY.categories.total}
      </p>
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

      <div className="mt-9 grid gap-4 sm:grid-cols-2">
        {COPY.bonuses.items.map((b) => (
          <article
            key={b.title}
            className={`card-soft flex flex-col p-6 ${b.premium ? "border-gold/50" : ""}`}
          >
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-gold">
              {b.tag}
            </p>
            {"badge" in b && b.badge && (
              <p className="mt-1.5 inline-block self-start rounded-full bg-primary/10 px-2.5 py-1 text-[0.68rem] font-medium text-primary">
                {b.badge}
              </p>
            )}
            <h3 className="mt-2 font-display text-xl leading-snug text-foreground">{b.title}</h3>
            <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-muted-foreground">
              {b.text}
            </p>

            {"features" in b && b.features && (
              <ul className="mt-4 grid gap-2">
                {b.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[0.85rem] text-foreground/85">
                    <span className="mt-0.5 shrink-0 text-success" aria-hidden>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {b.premium && (
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
            )}
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
  return (
    <Section id="ofertas">
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
            <p className="relative inline-block text-[0.95rem] text-muted-foreground">
              Antes {PRICING.basic.from}
              <span
                className="absolute inset-x-0 top-1/2 h-[1.5px] -rotate-3 bg-destructive/80"
                aria-hidden
              />
            </p>
            <p className="font-price text-[2.6rem] font-bold leading-none text-foreground">
              {PRICING.basic.price}
            </p>
          </div>

          <div className="mt-5">
            <CtaButton href={CHECKOUT.basic} variant="outline">
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

          <p className="mt-4 text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-gold">
            {COPY.offers.full.premiumLabel}
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {COPY.offers.full.premiumItems.map((p) => (
              <div key={p.title} className="rounded-xl border border-gold/35 bg-accent/40 p-3">
                <p className="text-[0.68rem] font-semibold text-gold">{p.tag}</p>
                <p className="mt-0.5 text-[0.85rem] font-medium leading-snug text-foreground">
                  {p.title}
                </p>
                <p className="text-[0.74rem] text-muted-foreground">{p.note}</p>
              </div>
            ))}
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
            <li className="flex items-start gap-2.5 text-[0.9rem] font-medium text-primary">
              <span className="mt-0.5 shrink-0" aria-hidden>
                ♾️
              </span>
              {COPY.offers.full.lifetime}
            </li>
          </ul>

          <div className="mt-6">
            <p className="relative inline-block text-[0.95rem] text-muted-foreground">
              Antes {PRICING.full.from}
              <span
                className="absolute inset-x-0 top-1/2 h-[1.5px] -rotate-3 bg-destructive/80"
                aria-hidden
              />
            </p>
            <p className="font-price text-[3.4rem] font-bold leading-none text-success">
              {PRICING.full.price}
            </p>
            <p className="mt-1.5 text-[0.78rem] text-muted-foreground">
              {COPY.offers.full.upsellNote}
            </p>
          </div>

          <div className="mt-5">
            <CtaButton href={CHECKOUT.full} sublabel={COPY.offers.full.ctaSub}>
              {COPY.offers.full.cta}
            </CtaButton>
          </div>
        </div>
      </div>

      {/* Empurrão pro pacote completo */}
      <div className="card-soft mx-auto mt-6 max-w-[46rem] border-gold/45 bg-accent/40 p-5 text-center">
        <p className="text-[0.92rem] font-semibold text-foreground">
          ⚠️ {COPY.offers.nudge.warning}
        </p>
        <p className="mt-1.5 text-[0.88rem] leading-relaxed text-muted-foreground">
          {COPY.offers.nudge.text}
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
      <div className="card-soft mx-auto max-w-[46rem] border-success/40 p-7 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-[2rem]">
          🛡️
        </span>
        <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-success">
          {COPY.guarantee.badge}
        </p>
        <h2 className="mt-1 font-display text-2xl text-foreground sm:text-[1.9rem]">
          {COPY.guarantee.title}
        </h2>
        <p className="mx-auto mt-3 max-w-[38rem] text-[0.94rem] leading-relaxed text-muted-foreground">
          {COPY.guarantee.text}
        </p>
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
