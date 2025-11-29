import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-primary-foreground">Discover</span>{" "}
              <span className="text-secondary">India</span>
            </h3>
            <p className="text-sm text-primary-foreground/80">
              Your ultimate guide to exploring the incredible diversity and beauty of India.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/north-india" className="hover:text-secondary transition-colors">Northern India</Link></li>
              <li><Link to="/south-india" className="hover:text-secondary transition-colors">Southern India</Link></li>
              <li><Link to="/east-india" className="hover:text-secondary transition-colors">Eastern India</Link></li>
              <li><Link to="/west-india" className="hover:text-secondary transition-colors">Western India</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Travel Info</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/guides" className="hover:text-secondary transition-colors">Travel Guides</Link></li>
              <li><Link to="/tips" className="hover:text-secondary transition-colors">Travel Tips</Link></li>
              <li><Link to="/culture" className="hover:text-secondary transition-colors">Culture</Link></li>
              <li><Link to="/cuisine" className="hover:text-secondary transition-colors">Cuisine</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 Discover India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
