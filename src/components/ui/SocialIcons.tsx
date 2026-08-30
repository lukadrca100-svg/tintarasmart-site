import { business } from "@/lib/constants";

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function InstagramIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M14.5 21v-7.5h2.4l.4-3H14.5V8.4c0-.9.3-1.5 1.7-1.5h1.3V4.3C17.2 4.2 16.2 4 15.1 4c-2.4 0-4 1.4-4 4.1v2.4H8.5v3H11V21" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M14 4v10.5a3 3 0 1 1-2.5-3" />
      <path d="M14 4c.4 2.3 2 4 4.5 4.3" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="M10.5 9.8v4.4l4-2.2z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const links = [
  { key: "instagram", href: business.social.instagram, Icon: InstagramIcon, label: "Instagram" },
  { key: "facebook", href: business.social.facebook, Icon: FacebookIcon, label: "Facebook" },
  { key: "tiktok", href: business.social.tiktok, Icon: TikTokIcon, label: "TikTok" },
  { key: "youtube", href: business.social.youtube, Icon: YouTubeIcon, label: "YouTube" },
];

export function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {links.map(({ key, href, Icon, label }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-muted-dim transition-colors hover:text-accent-strong"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
