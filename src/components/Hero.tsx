import { motion } from "framer-motion";
import { ArrowRight, Bot, Shield, Languages, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2071"
          alt="India Taj Mahal"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      {/* Floating AI Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 hidden lg:block"
      >
        <div className="glass p-4 rounded-2xl flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-full text-primary">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
            <p className="text-sm font-medium text-white">"Best time to visit Jaipur?"</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 right-10 hidden lg:block"
      >
        <div className="glass p-4 rounded-2xl flex items-center gap-3">
          <div className="bg-secondary/20 p-2 rounded-full text-secondary">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Safety Alert</p>
            <p className="text-sm font-medium text-white">Route Verified Safe</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">


        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          Unfold <span className="text-gradient">India</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl font-light"
        >
          Embark on a journey through the soul of India. From the majestic Himalayas to the serene backwaters, experience a land of timeless beauty.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none rounded-full px-8" asChild>
            <Link to="/explore">
              Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="glass border-white/10 text-white hover:bg-white/10 rounded-full px-8" asChild>
            <a href="#testimonials">
              Our Testimonials
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 w-full flex flex-col items-center"
        >
          <div className="relative w-full sm:w-[450px] group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Button size="lg" className="glass hover:bg-white/10 text-white rounded-full px-6 py-7 text-lg shadow-2xl w-full font-medium tracking-wide font-sans border-white/20 justify-start relative overflow-hidden" asChild>
              <Link to="/chat" className="flex items-center w-full">
                <Search className="mr-4 h-5 w-5 text-white/70" />
                <span className="text-white/90">Ask Kira: Plan my trip to India...</span>
                <div className="ml-auto bg-white/20 p-1.5 rounded-full">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 font-medium tracking-wide">AI-Powered Travel Assistant</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
