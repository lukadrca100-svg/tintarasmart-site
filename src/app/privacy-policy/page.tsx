import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${business.name} collects, uses, and protects the information you share with us.`,
};

const LAST_UPDATED = "September 7, 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12 first:mt-0">
      <h2 className="font-display text-2xl text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-28 lg:pt-48 lg:pb-36">
        <Container className="max-w-3xl">
          <div className="kicker">Legal</div>
          <h1 className="mt-5 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-sm text-muted-dim">
            Last updated: {LAST_UPDATED}
          </p>

          <Section title="Overview">
            <p>
              {business.name} (&ldquo;{business.name}&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, or &ldquo;our&rdquo;) provides Smart Film
              (PDLC) installation services for residential and commercial
              glass. This Privacy Policy explains what information we
              collect through our website, how we use it, and the choices
              you have. By submitting a form on our site or otherwise
              contacting us, you agree to the practices described below.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>
              When you request a quote, ask a question, or otherwise contact
              us through our website, we may collect:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Location (e.g., city or service address)</li>
              <li>
                Optional project details you choose to share, such as
                property type, window count, a message, or photos of your
                space
              </li>
            </ul>
            <p>
              We only collect the information you voluntarily submit through
              our contact and quote request forms. We do not knowingly
              collect information from children.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use the information you provide solely to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Respond to your inquiry and provide a quote or information
                about our services
              </li>
              <li>Schedule consultations, measurements, and installations</li>
              <li>
                Communicate with you about your project by phone, email, or
                text
              </li>
              <li>
                Improve our services and understand how visitors use our
                website
              </li>
            </ul>
            <p>
              We do not use your personal information for any purpose beyond
              responding to your inquiry and delivering our services, unless
              we have your consent to do otherwise.
            </p>
          </Section>

          <Section title="How We Share Your Information">
            <p>
              We do not sell, rent, or trade your personal information to
              third parties. We may share information only in the following
              limited circumstances:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">
                  Service providers:
                </strong>{" "}
                with trusted third-party tools that help us operate our
                business — such as website hosting, email delivery, and
                marketing platforms like Meta Ads (Facebook/Instagram) — who
                process data on our behalf and are bound to keep it
                confidential.
              </li>
              <li>
                <strong className="text-foreground">Legal requirements:</strong>{" "}
                if required to do so by law, or in the good-faith belief that
                such action is necessary to comply with a legal obligation.
              </li>
            </ul>
          </Section>

          <Section title="Cookies & Tracking Technologies">
            <p>
              Our website uses the Meta Pixel and similar tracking
              technologies to understand how visitors interact with our site
              and to measure the effectiveness of our advertising. These
              tools may collect information such as your browser type, pages
              visited, and general interactions with our site, and may set
              cookies on your device. This helps us show relevant ads and
              measure ad performance on platforms like Facebook and
              Instagram.
            </p>
            <p>
              You can control cookies through your browser settings, and you
              can manage how Meta uses your data for ads through your{" "}
              <a
                href="https://www.facebook.com/adpreferences"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2 hover:text-accent-strong"
              >
                Meta Ad Preferences
              </a>
              .
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              We retain the information you provide for as long as necessary
              to respond to your inquiry, complete any requested services,
              and maintain business records, after which it is deleted or
              anonymized.
            </p>
          </Section>

          <Section title="Your Choices">
            <p>
              You may contact us at any time to ask what information we hold
              about you, request a correction, or ask us to delete it. We
              will honor reasonable requests to the extent required by
              applicable law.
            </p>
          </Section>

          <Section title="Data Security">
            <p>
              We take reasonable measures to protect the information you
              share with us. However, no method of transmission over the
              internet is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any
              changes will be posted on this page with an updated
              &ldquo;Last updated&rdquo; date.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              If you have any questions about this Privacy Policy or how we
              handle your information, please contact us at{" "}
              <a
                href={`mailto:${business.email}`}
                className="text-foreground underline underline-offset-2 hover:text-accent-strong"
              >
                {business.email}
              </a>
              .
            </p>
          </Section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
