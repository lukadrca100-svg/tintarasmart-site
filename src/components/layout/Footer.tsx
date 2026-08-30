import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { business, nav } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-elevated py-16">
      <Container className="flex flex-col gap-12 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Smart Film installation for {business.serviceArea}. Instant
            privacy glass for residential and commercial spaces.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <div className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-dim">
              Explore
            </div>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-dim">
              Contact
            </div>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>
                <a href={business.phoneHref} className="hover:text-foreground">
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="hover:text-foreground"
                >
                  {business.email}
                </a>
              </li>
              <li>{business.hours}</li>
            </ul>
          </div>
        </div>
      </Container>

      <Container className="mt-12 flex flex-col-reverse items-center gap-6 border-t border-border pt-6 text-xs text-muted-dim sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </span>
        <SocialIcons />
      </Container>
    </footer>
  );
}
