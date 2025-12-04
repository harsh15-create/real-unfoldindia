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
import ChatbotPage from "./pages/ChatbotPage";
import Guide from "./pages/Guide";
import AIAssistant from "./components/AIAssistant";

import CityPage from "./pages/CityPage";
import EntryGuide from "./pages/EntryGuide";
import SafetyGuide from "./pages/SafetyGuide";
import AboutPage from "./pages/AboutPage";
import Settings from "./pages/Settings";

import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideFooter = location.pathname === "/chat";

  return (
    <>
      {children}
      {!hideFooter && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/route" element={<RoutePlanner />} />
            <Route path="/trip" element={<TripDashboard />} />
            <Route path="/chat" element={<ChatbotPage />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/guide/city/:cityId" element={<CityPage />} />
            <Route path="/guide/entry/:sectionId" element={<EntryGuide />} />
            <Route path="/guide/safety/:sectionId" element={<SafetyGuide />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIAssistant />
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
