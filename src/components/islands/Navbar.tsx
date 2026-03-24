import React, { useState, useEffect } from "react";
import { NAV_LINKS } from "../../config";
import { cn } from "@/lib/utils";
import { QuickExitButton } from "./QuickExitButton";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  const [currentPath, setCurrentPath] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getHashFromHref = (href: string) => {
    const hashIndex = href.indexOf("#");
    return hashIndex >= 0 ? href.substring(hashIndex + 1) : "";
  };

  useEffect(() => {
    const handleScroll = () => {
      setCurrentPath(window.location.pathname);
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = NAV_LINKS
        .map((link) => getHashFromHref(link.href))
        .filter(Boolean);
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 100)) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = getHashFromHref(href);
    if (!targetId) {
      return;
    }

    if (window.location.pathname !== "/") {
      return;
    }

    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-md border-border/50 py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="text-2xl font-bold tracking-tighter text-primary">
            Portal<span className="text-foreground">Violeta</span>Lavalleja
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 mx-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                getHashFromHref(link.href)
                  ? activeSection === getHashFromHref(link.href)
                    ? "text-primary"
                    : "text-base-content/60"
                  : currentPath === link.href
                    ? "text-primary"
                    : "text-base-content/60"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <div className="block">
            <QuickExitButton />
          </div>

          {/* Mobile Menu */}
          <button
            className="btn btn-ghost btn-square md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-[80%] max-w-[350px] bg-base-100/95 backdrop-blur-xl border-l border-base-300/50 z-50 flex flex-col p-6 md:hidden">
            <button
              className="btn btn-ghost btn-square self-end mb-4"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-base-300/20",
                    getHashFromHref(link.href)
                      ? activeSection === getHashFromHref(link.href)
                        ? "text-primary"
                        : "text-base-content"
                      : currentPath === link.href
                        ? "text-primary"
                        : "text-base-content"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};
