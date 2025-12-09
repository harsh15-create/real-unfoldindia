
import { Link } from "react-router-dom";
import { Instagram, ArrowUp, MapPin, Phone, Mail, Accessibility, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B0B15] text-white pt-12 pb-6 px-4 md:px-8 font-sans border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-3xl font-serif font-bold tracking-tight">
            Unfold <span className="text-primary italic">India</span>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-6 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition-all duration-300 uppercase text-xs font-semibold tracking-wider"
          >
            Back to top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">

          {/* Block 1: Brand & Mission (was Newsletter) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center items-start min-h-[320px] backdrop-blur-sm relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold leading-tight text-white">Reimagining Travel</h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                Making travel across India safer, smarter, and more accessible for everyone through AI.
              </p>
              <Button
                className="mt-4 bg-white text-black hover:bg-white/90 font-bold rounded-full px-8 py-6 uppercase text-sm tracking-wide"
                asChild
              >
                <Link to="/about">About Us &gt;</Link>
              </Button>
            </div>
          </div>

          {/* Block 2: Navigation Links */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs opacity-70">Features</h4>
                <nav className="space-y-3 flex flex-col">
                  <Link to="/chat" state={{ message: "I want to use the AI Assistant." }} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">AI Assistant</Link>
                  <Link to="/trip" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Generate Itinerary</Link>
                  <Link to="/route" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Transport Bookings</Link>
                </nav>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs opacity-70">Essentials</h4>
                <nav className="space-y-3 flex flex-col">
                  <Link to="/guide#visa" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Visa Guide</Link>
                  <Link to="/guide#currency" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Currency</Link>
                  <Link to="/guide#safety" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Safety Tips</Link>
                  <Link to="/settings?tab=billing" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Credit Plans</Link>
                </nav>
              </div>

              <div className="col-span-2 pt-4 border-t border-white/10">
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs opacity-70">Company</h4>
                <nav className="flex gap-6">
                  <Link to="/explore" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Explore Regions</Link>
                  <Link to="/contact" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Contact</Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Block 3: Social & Contact (Right Column) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Social Block */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex-1 flex flex-col justify-center backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 text-white">Follow us</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/_unfoldindia_/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/5">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://github.com/harsh15-create" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/5">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/5">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Details Block (was App) */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex-1 flex flex-col justify-center backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Greater Noida, India 201312</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>+91 9670676930</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>contact@xerces.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/60 font-medium pt-4 pb-8 md:pt-0">
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0 order-2 md:order-1">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>

          <div className="mb-4 md:mb-0 order-1 md:order-2 md:absolute md:left-8">
            {/* Floating icon placeholder if needed */}
          </div>

          <div className="order-3 text-center md:text-right">
            Copyright © {new Date().getFullYear()} Unfold India AI. All Rights Reserved.
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
