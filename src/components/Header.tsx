import { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut, User, Settings, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => {
      setIsAdmin(!!data);
    });
  }, [user]);

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
              <a key={item.label} href={item.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href}
                className={`text-sm transition-colors ${
                  location.pathname.startsWith(item.href) ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                }`}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/search"
            aria-label="Search"
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all">
            <Search size={16} />
          </Link>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin"
                  className="px-3 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5">
                  <Settings size={14} /> Admin CMS
                </Link>
              )}
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <User size={14} /> {user.email?.split("@")[0]}
              </span>
              <button onClick={signOut}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <LogOut size={14} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <LogIn size={14} /> Sign In
              </Link>
              <a href="/#newsletter"
                className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:brightness-110 transition-all hover:shadow-[0_0_20px_hsl(24,85%,55%,0.3)]">
                Join Waitlist
              </a>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link to="/search"
              className="text-sm text-muted-foreground hover:text-primary py-2 flex items-center gap-1.5"
              onClick={() => setMobileOpen(false)}>
              <Search size={14} /> Search
            </Link>
            {navItems.map((item) =>
              isExternal(item.href) ? (
                <a key={item.label} href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary py-2"
                  onClick={() => setMobileOpen(false)}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.href}
                  className="text-sm text-muted-foreground hover:text-primary py-2"
                  onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              )
            )}
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="text-sm text-primary font-medium hover:text-primary/80 py-2 flex items-center gap-1.5"
                    onClick={() => setMobileOpen(false)}>
                    <Settings size={14} /> Admin CMS
                  </Link>
                )}
                <button onClick={() => { signOut(); setMobileOpen(false); }}
                  className="mt-2 px-4 py-2 text-sm text-muted-foreground text-left">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary py-2"
                  onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <a href="/#newsletter"
                  className="mt-2 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground text-center">
                  Join Waitlist
                </a>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
