import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleAskKira = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);

    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate("/chat");
    }, 1200);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={isNavigating ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2071"
          alt="India Taj Mahal"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </motion.div>



      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">


        <motion.div
          animate={isNavigating ? { opacity: 0, y: -150 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
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
            className="flex flex-col gap-4 sm:flex-row justify-center"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isNavigating ? {
            y: "40vh", // Move down significantly
            scale: 1.05,
            zIndex: 50
          } : {
            opacity: 1,
            y: 0,
            scale: 1,
            zIndex: 10
          }}
          transition={{ duration: 1.0, delay: isNavigating ? 0 : 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 w-full flex flex-col items-center"
        >
          <motion.div
            className="relative w-full sm:w-[450px] group"
            animate={isNavigating ? {
              width: "100%",
              maxWidth: "56rem", // max-w-4xl
              y: 0
            } : {}}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-md transition-opacity duration-500 ${isNavigating ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />

            <Button
              size="lg"
              className={`glass hover:bg-white/10 text-white rounded-full px-6 py-7 text-lg shadow-2xl w-full font-medium tracking-wide font-sans border-white/20 justify-start relative overflow-hidden transition-all duration-500 ${isNavigating ? 'bg-card/50 backdrop-blur-md border-border/50' : ''}`}
              onClick={handleAskKira}
            >
              <div className="flex items-center w-full">
                <Search className={`mr-4 h-5 w-5 ${isNavigating ? 'text-white/0 w-0 mr-0' : 'text-white/70'} transition-all duration-500`} />

                {/* Text content that fades out */}
                <span className={`${isNavigating ? 'opacity-0 w-0' : 'opacity-100'} text-white/90 transition-all duration-500 whitespace-nowrap`}>
                  Ask Kira: Plan my trip to India...
                </span>

                {/* Simulated Input that fades in */}
                <span className={`${isNavigating ? 'opacity-100 w-full' : 'opacity-0 w-0'} text-left text-base text-white/80 transition-all duration-500 absolute left-6`}>
                  Ask Kira anything about your trip...
                </span>

                <div className={`ml-auto bg-white/20 p-1.5 rounded-full ${isNavigating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>

                {/* Send button that appears */}
                <div className={`ml-auto bg-primary p-2 rounded-full ${isNavigating ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} transition-all duration-500 absolute right-2`}>
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </Button>
          </motion.div>

          <motion.p
            animate={isNavigating ? { opacity: 0 } : { opacity: 1 }}
            className="text-xs text-muted-foreground mt-3 font-medium tracking-wide"
          >
            AI-Powered Travel Assistant
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
