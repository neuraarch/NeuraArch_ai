import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const links = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Courses", href: "/courses" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="NeuraArch" className="h-8" />
        </Link>
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((l) => (
            <Link key={l.label} to={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-8">
        © 2026 NeuraArch. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
