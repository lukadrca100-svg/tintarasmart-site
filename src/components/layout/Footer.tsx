import { Container } from "@/components/ui/Container";
import { business, nav } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-elevated py-14">
      <Container className="flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <div className="font-display text-lg text-foreground">
            {business.shortName}
          </div>
          <p className="mt-3 text-sm text-muted">
            Smart Film installation for {business.serviceArea}. Instant
            privacy glass for residential and commercial spaces.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-dim">
              Explore
            </div>
            <ul className="mt-4 space-y-2.5">
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
            <div className="text-xs uppercase tracking-wider text-muted-dim">
              Contact
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
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

      <Container className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-border pt-6 text-xs text-muted-dim sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </span>
      </Container>
    </footer>
  );
}
