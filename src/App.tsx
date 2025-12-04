import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Explore from "./pages/Explore";
import MapPage from "./pages/MapPage";
import RoutePlanner from "./pages/RoutePlanner";
import TripDashboard from "./pages/TripDashboard";
import Guide from "./pages/Guide";
import FAB from "./components/FAB";

import AboutPage from "./pages/AboutPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/route" element={<RoutePlanner />} />
          <Route path="/trip" element={<TripDashboard />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <FAB />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
