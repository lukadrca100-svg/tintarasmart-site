"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { business, nav } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Slim utility bar */}
      <div
        className={`hidden overflow-hidden border-b border-border bg-background transition-[max-height,opacity] duration-300 lg:block ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <Container className="flex h-10 items-center justify-between text-[0.7rem] tracking-[0.08em] text-muted-dim">
          <span>Serving {business.serviceArea}</span>
          <div className="flex items-center gap-6">
            <span>{business.hours}</span>
            <a
              href={business.phoneHref}
              className="flex items-center gap-1.5 hover:text-accent-strong"
            >
              <Phone size={11} /> {business.phone}
            </a>
          </div>
        </Container>
      </div>

      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-20 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.8rem] tracking-wide text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="#contact" variant="primary" className="px-6 py-3">
              Get a Quote
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-[3px] border border-border-strong p-2 text-foreground lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </Container>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button
              href="#contact"
              variant="primary"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
