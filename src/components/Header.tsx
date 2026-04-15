import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Learning Paths", href: "/#learning-paths" },
  { label: "Tutorials", href: "/blog" },
  { label: "Insights", href: "/posts" },
  { label: "Courses", href: "/courses" },
  { label: "Events", href: "/events" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isExternal = (href: string) => href.startsWith("/#");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="NeuraArch" className="h-9" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            isExternal(item.href) ? (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm transition-colors ${
                  location.pathname.startsWith(item.href) ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/#newsletter"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:brightness-110 transition-all hover:shadow-[0_0_20px_hsl(24,85%,55%,0.3)]"
          >
            Join Waitlist
          </a>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) =>
              isExternal(item.href) ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-primary py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href="/#newsletter"
              className="mt-2 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground text-center"
            >
              Join Waitlist
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
