import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, Settings as SettingsIcon, LogOut, Bot, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Route", path: "/route" },
    { name: "Map", path: "/map" },
    { name: "Trip", path: "/trip" },
  ];

  const cityItems = [
    { name: "Delhi", path: "/guide/city/delhi" },
    { name: "Mumbai", path: "/guide/city/mumbai" },
    { name: "Jaipur", path: "/guide/city/jaipur" },
    { name: "Agra", path: "/guide/city/agra" },
    { name: "Goa", path: "/guide/city/goa" },
    { name: "Kerala", path: "/guide/city/kerala" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0B0B15]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#0B0B15]/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Unfold India Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold">
            Unfold <span className="text-primary">India</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.path) ? "text-primary" : "text-gray-300"
                }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Cities Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-300 hover:text-primary transition-colors focus:outline-none">
              Cities <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#0B0B15]/95 border-white/10 text-white backdrop-blur-xl rounded-xl shadow-2xl shadow-primary/10 p-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {cityItems.map((city) => (
                  <motion.div key={city.path} variants={itemVariants}>
                    <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer mb-1">
                      <Link to={city.path} className="w-full block">{city.name}</Link>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
                <DropdownMenuSeparator className="bg-white/10 my-2" />
                <motion.div variants={itemVariants}>
                  <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                    <Link to="/guide#cities" className="text-primary w-full block font-semibold">View All Cities</Link>
                  </DropdownMenuItem>
                </motion.div>
              </motion.div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:flex text-white hover:text-primary hover:bg-white/5 gap-2" asChild>
            <Link to="/chat">
              <Bot className="h-4 w-4" /> Chat with Kira
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer border border-white/10 hover:border-primary transition-colors">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-white/10 text-white backdrop-blur-xl">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Vedant</p>
                  <p className="w-[200px] truncate text-xs text-white/70">vedant@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-white/10" />
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/70">Credits Left</span>
                  <span className="text-xs font-bold text-primary">1,250</span>
                </div>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white h-7 text-xs">
                  Upgrade Plan
                </Button>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-xs text-white/50">Need more?</span>
                  <Button size="sm" variant="outline" className="flex-1 border-primary/20 hover:bg-primary/10 text-primary h-7 text-[10px] whitespace-nowrap">
                    20 Credits - $5
                  </Button>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                <Link to="/settings" className="flex items-center">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer text-red-400 focus:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B0B15]">
          <nav className="container flex flex-col space-y-4 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/chat"
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Bot className="h-4 w-4" />
              Chat with Kira
            </Link>
            <div className="pt-2 border-t border-white/10">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Popular Cities</p>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/guide/city/delhi" className="text-sm text-gray-300 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Delhi</Link>
                <Link to="/guide/city/mumbai" className="text-sm text-gray-300 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Mumbai</Link>
                <Link to="/guide/city/jaipur" className="text-sm text-gray-300 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Jaipur</Link>
                <Link to="/guide/city/agra" className="text-sm text-gray-300 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Agra</Link>
                <Link to="/guide/city/goa" className="text-sm text-gray-300 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Goa</Link>
                <Link to="/guide/city/kerala" className="text-sm text-gray-300 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Kerala</Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
