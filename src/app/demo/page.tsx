import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  DoorOpen,
  Blinds,
  Users,
  Stethoscope,
  PanelsTopLeft,
  CalendarCheck,
  Hand,
  ReceiptText,
  Check,
  Phone,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DemoForm } from "@/components/demo/DemoForm";
import { business } from "@/lib/constants";

/**
 * Landing page for ads: one message, one action (book a free in-home demo).
 * When the VSL is recorded, export it as /public/media/vsl.mp4 (+ vsl-poster.jpg)
 * and change the two paths below.
 */
const VSL = {
  src: "/media/brand-promo.mp4",
  poster: "/media/brand-promo-poster.jpg",
};

export const metadata: Metadata = {
  title: "Free In-Home Smart Film Demo",
  description:
    "See smart film switch from clear to private on your own glass. Free in-home demo for homes and businesses in the Chicago area.",
};

const problems = {
  homes: [
    { icon: Bath, title: "Bathroom and shower windows", text: "You want daylight, not the neighbors looking in." },
    { icon: DoorOpen, title: "Front doors and patio doors", text: "Glass looks great until everyone can see inside at night." },
    { icon: Blinds, title: "Blinds and curtains", text: "They block the light, collect dust and never look clean." },
  ],
  business: [
    { icon: Users, title: "Conference rooms", text: "Private meetings without covering up beautiful glass walls." },
    { icon: Stethoscope, title: "Exam and treatment rooms", text: "Patient privacy for dental offices, med spas and clinics." },
    { icon: PanelsTopLeft, title: "Glass offices", text: "Open and bright by default, private when the door closes." },
  ],
};

const steps = [
  {
    icon: CalendarCheck,
    title: "Book in 60 seconds",
    text: "Fill out the short form. We call or text you within 24 hours to pick a time.",
  },
  {
    icon: Hand,
    title: "Try it on your own glass",
    text: "We put a test piece right on your window or door. You switch it clear and private yourself.",
  },
  {
    icon: ReceiptText,
    title: "Exact price on the spot",
    text: "We measure everything and give you a clear price. No pressure, no obligation.",
  },
];

const included = [
  "Professional installation on your existing glass",
  "Remote control, with phone and Alexa control available",
  "Clean, flat wiring that blends into the frame",
  "2-year film warranty",
  "Free cleaning kit with every install",
  "Install about 2 weeks after you approve",
];

const faqs = [
  {
    q: "Is the demo really free?",
    a: "Yes. We come to you, show you the film on your own glass and give you a price. You decide later, no obligation.",
  },
  {
    q: "Do I need new windows?",
    a: "No. Smart film goes on the glass you already have: windows, doors, shower glass and office partitions.",
  },
  {
    q: "What happens if the power goes out?",
    a: "The film goes to its private, frosted state. Privacy is the default.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on the size of the glass and how many zones you want to switch separately. You get the exact number at the demo.",
  },
];

export default function DemoPage() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30">
        <Container className="flex items-center justify-between py-5">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/logo-icon.png" alt="" width={1254} height={1254} className="h-9 w-9 object-contain" priority />
            <span className="font-display text-[1.05rem] uppercase tracking-[0.18em] text-foreground">
              {business.shortName}
            </span>
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Phone size={15} className="text-accent-strong" />
            <span className="hidden sm:inline">{business.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </Container>
      </header>

      <main className="pb-24 lg:pb-0">
        {/* Hero + VSL */}
        <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-40 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[160px]" />
          </div>
          <Container className="text-center">
            <div className="flex justify-center">
              <div className="kicker">Free in-home demo · {business.serviceArea}</div>
            </div>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Clear glass. Total privacy.
              <br />
              <span className="italic text-accent-strong">One tap.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              Smart film turns the glass you already have into privacy glass. Watch the 2 minute
              video, then see it on your own windows with a free demo.
            </p>

            <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[3px] border border-border-strong bg-background-elevated shadow-[0_40px_120px_-40px_rgba(201,166,107,0.35)]">
              <video
                src={VSL.src}
                poster={VSL.poster}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-black object-cover"
              />
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Button href="#book" variant="primary" icon>
                See My Price
              </Button>
              <Button href={business.phoneHref} variant="link">
                Or call {business.phone}
              </Button>
            </div>
            <p className="mt-6 text-[0.65rem] uppercase tracking-[0.14em] text-muted-dim">
              Homes &amp; businesses · Works on existing glass · No obligation
            </p>
          </Container>
        </section>

        {/* Booking form */}
        <section id="book" className="border-t border-border py-24 lg:py-32">
          <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div>
              <SectionHeading
                kicker="Free demo"
                title={
                  <>
                    See your price.
                    <br />
                    <span className="italic text-accent-strong">Book your demo.</span>
                  </>
                }
                description="Add your glass sizes to see your price instantly. Then we'll reach out within 24 hours to set up your free in-home demo."
              />
              <a
                href={business.phoneHref}
                className="mt-10 inline-flex items-center gap-3 text-sm text-muted hover:text-foreground"
              >
                <Phone size={16} className="text-accent-strong" />
                Prefer to talk? Call or text {business.phone}
              </a>
            </div>
            <DemoForm />
          </Container>
        </section>
        {/* Problems */}
        <section className="border-t border-border py-24 lg:py-32">
          <Container>
            <SectionHeading
              kicker="Sound familiar?"
              align="center"
              title={
                <>
                  You love the glass.
                  <br />
                  <span className="italic text-accent-strong">Not the lack of privacy.</span>
                </>
              }
            />
            <div className="mt-16 grid gap-12 lg:grid-cols-2">
              {(
                [
                  ["For homes", problems.homes],
                  ["For businesses", problems.business],
                ] as const
              ).map(([label, items]) => (
                <div key={label}>
                  <div className="text-[0.65rem] uppercase tracking-[0.18em] text-accent-strong">{label}</div>
                  <div className="mt-5 space-y-3">
                    {items.map(({ icon: Icon, title, text }) => (
                      <div key={title} className="glass-panel flex gap-4 rounded-[3px] p-5">
                        <Icon size={20} className="mt-0.5 shrink-0 text-accent-strong" />
                        <div>
                          <div className="text-foreground">{title}</div>
                          <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Before / after */}
        <section className="border-t border-border py-24 lg:py-32">
          <Container>
            <SectionHeading
              kicker="Real installs"
              align="center"
              title={
                <>
                  Same glass.
                  <br />
                  <span className="italic text-accent-strong">One button apart.</span>
                </>
              }
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {[
                { src: "/media/bathroom-clear.jpg", label: "On: clear view" },
                { src: "/media/bathroom-frosted.jpg", label: "Off: instant privacy" },
                { src: "/media/living-room-clear.jpg", label: "On: full daylight" },
                { src: "/media/living-room-frosted.jpg", label: "Off: private, still bright" },
              ].map((img) => (
                <figure
                  key={img.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-[3px] border border-border bg-background-elevated"
                >
                  <Image src={img.src} alt={img.label} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  <figcaption className="absolute bottom-3 left-3 rounded-[3px] bg-background/80 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-foreground">
                    {img.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>

        {/* How the demo works */}
        <section className="border-t border-border py-24 lg:py-32">
          <Container>
            <SectionHeading
              kicker="How it works"
              align="center"
              title={
                <>
                  See it on your glass
                  <br />
                  <span className="italic text-accent-strong">before you spend a dollar.</span>
                </>
              }
            />
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="glass-panel rounded-[3px] p-7">
                  <div className="flex items-center justify-between">
                    <Icon size={22} className="text-accent-strong" />
                    <span className="font-display text-3xl text-muted-dim">0{i + 1}</span>
                  </div>
                  <div className="mt-6 text-lg text-foreground">{title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Included + FAQ */}
        <section className="border-t border-border py-24 lg:py-32">
          <Container className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading kicker="What you get" title={<>Done for you, <span className="italic text-accent-strong">start to finish.</span></>} />
              <ul className="mt-10 space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent-strong" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading kicker="Questions" title={<>Quick <span className="italic text-accent-strong">answers.</span></>} />
              <div className="mt-10 divide-y divide-border border-y border-border">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-foreground">
                      {f.q}
                      <span className="ml-4 text-accent-strong transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

      </main>

      <footer className="border-t border-border py-10">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-muted-dim sm:flex-row">
          <span>© {new Date().getFullYear()} {business.name} LLC</span>
          <span>
            {business.phone} · {business.email}
          </span>
        </Container>
      </footer>

      {/* Sticky call-to-action on phones */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        <div className="grid grid-cols-[auto_1fr] gap-3">
          <a
            href={business.phoneHref}
            aria-label="Call Tintara Smart"
            className="flex items-center justify-center rounded-[3px] border border-border-strong px-4 text-foreground"
          >
            <Phone size={18} />
          </a>
          <Button href="#book" variant="primary" className="w-full !px-4 !py-3.5">
            Book My Free Demo
          </Button>
        </div>
      </div>
    </>
  );
}
