import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Fraunces } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${business.name} | Smart Privacy Film & Switchable Glass`,
    template: `%s | ${business.name}`,
  },
  description: `${business.name} installs electrically switchable Smart Film (PDLC) on existing glass — instant privacy at the touch of a button for homes and businesses in ${business.serviceArea}.`,
  keywords: [
    "smart film",
    "PDLC film",
    "switchable privacy glass",
    "smart glass installation",
    "privacy film",
  ],
  openGraph: {
    title: `${business.name} | Smart Privacy Film & Switchable Glass`,
    description:
      "Instant privacy at the touch of a button. Professional Smart Film installation for residential and commercial glass.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
