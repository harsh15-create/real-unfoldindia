import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/auth/AuthContext";
import { useState, useEffect } from "react";

const Index = () => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Aggressive growth pattern: Trigger auth modal on first interaction if not logged in
  const handleInteraction = (e: React.MouseEvent) => {
    // If modal is already open, allow interactions (like closing it or typing in inputs)
    if (showAuthModal) return;

    // If not logged in and not loading
    if (!loading && !user) {
      // Allow scrolling interactions or clicks on the modal itself (if it were mounted here, but it's a dialog on top)
      // We want to capture clicks on "Start Your Journey" or "Ask Kira" buttons.

      // We stop propagation to prevent links from working
      e.stopPropagation();

      // We prevent default to stop <a> tags or form submissions
      // Note: This might block text selection if triggered on mousedown, but on onClick it blocks navigation.
      e.preventDefault();

      setShowAuthModal(true);
    }
  };

  return (
    <div
      className="min-h-screen bg-background font-sans text-foreground selection:bg-terracotta selection:text-white"
      onClickCapture={handleInteraction}
    >
      <Hero />
      <Features />
      <Testimonials />
      <About />
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      {/* Footer is rendered in Layout, but we can't intercept clicks there easily from inside pages. 
          If the user wants "Anywhere", this wrapper covers the page content. */}
    </div>
  );
};

export default Index;
