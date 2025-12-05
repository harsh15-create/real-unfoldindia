import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B0B15] border-t border-white/10 pt-16 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Unfold <span className="text-primary">India</span></h3>
            <p className="text-gray-400 mb-6">
              Making travel across India safer, smarter, and more accessible for everyone through AI.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Features</h4>
            <ul className="space-y-2">
              <li><Link to="/chat" className="text-gray-400 hover:text-primary transition-colors">AI Assistant</Link></li>
              <li><Link to="/trip" className="text-gray-400 hover:text-primary transition-colors">Generate Itinerary</Link></li>
              <li><Link to="/route" className="text-gray-400 hover:text-primary transition-colors">Transport Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Essentials</h4>
            <ul className="space-y-2">
              <li><Link to="/guide#visa" className="text-gray-400 hover:text-primary transition-colors">Visa Guide</Link></li>
              <li><Link to="/guide#currency" className="text-gray-400 hover:text-primary transition-colors">Currency Converter</Link></li>
              <li><Link to="/guide#safety" className="text-gray-400 hover:text-primary transition-colors">Safety Tips</Link></li>
              <li><Link to="/settings?tab=billing" className="text-gray-400 hover:text-primary transition-colors">Credit Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <span className="text-gray-400">Greater Noida, India 201312</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">+91 9670676930</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">contact@xerces.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Unfold India AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
