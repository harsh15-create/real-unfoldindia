import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">
            <span className="text-primary">Discover</span>{" "}
            <span className="text-secondary">India</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/destinations" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Destinations
          </Link>
          <Link to="/experiences" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Experiences
          </Link>
          <Link to="/culture" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Culture
          </Link>
          <Link to="/guides" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Travel Guides
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container flex flex-col space-y-4 px-4 py-4">
            <Link to="/destinations" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              Destinations
            </Link>
            <Link to="/experiences" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              Experiences
            </Link>
            <Link to="/culture" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              Culture
            </Link>
            <Link to="/guides" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
              Travel Guides
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
