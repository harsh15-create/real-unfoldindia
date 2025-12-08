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
import IndianCulture from "./pages/IndianCulture";
import Settings from "./pages/Settings";
import SpiritualJourneys from "./pages/SpiritualJourneys";
import SpiritualCity from "./pages/SpiritualCity";
import WildlifeSafaris from "./pages/WildlifeSafaris";
import WildlifePark from "./pages/WildlifePark";
import HimalayanTreks from "./pages/HimalayanTreks";
import TrekDetail from "./pages/TrekDetail";
import RoyalLuxury from "./pages/RoyalLuxury";
import RoyalCity from "./pages/RoyalCity";
import RoyalProperty from "./pages/RoyalProperty";
import AdventuresPage from "./pages/experiences/AdventuresPage";
import AdventureDetail from "./pages/experiences/AdventureDetail";
import FestivalsPage from "./pages/culture/FestivalsPage";
import FestivalDetail from "./pages/culture/FestivalDetail";
import DanceFormsPage from "./pages/culture/DanceFormsPage";
import DanceFormDetail from "./pages/culture/DanceFormDetail";
import ArtAndCraftPage from "./pages/culture/ArtAndCraftPage";
import ArtAndCraftDetail from "./pages/culture/ArtAndCraftDetail";
import CuisinePage from "./pages/culture/CuisinePage";
import CuisineDetail from "./pages/culture/CuisineDetail";


import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";

  return (
    <>
      {children}
      {!isChatPage && <Footer />}
      {!isChatPage && <AIAssistant />}
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
            <Route path="/spiritual-journeys" element={<SpiritualJourneys />} />
            <Route path="/spiritual-journeys/:slug" element={<SpiritualCity />} />
            <Route path="/wildlife-safaris" element={<WildlifeSafaris />} />
            <Route path="/wildlife-safaris/:slug" element={<WildlifePark />} />
            <Route path="/himalayan-treks" element={<HimalayanTreks />} />
            <Route path="/himalayan-treks/:slug" element={<TrekDetail />} />
            <Route path="/experiences/royal-luxury" element={<RoyalLuxury />} />
            <Route path="/experiences/royal-luxury/:cityId" element={<RoyalCity />} />
            <Route path="/experiences/royal-luxury/:cityId/:propertySlug" element={<RoyalProperty />} />
            <Route path="/experiences/adventures" element={<AdventuresPage />} />
            <Route path="/experiences/adventures/:slug" element={<AdventureDetail />} />
            <Route path="/culture/festivals" element={<FestivalsPage />} />
            <Route path="/culture/festivals/:slug" element={<FestivalDetail />} />
            <Route path="/culture/dance-forms" element={<DanceFormsPage />} />
            <Route path="/culture/dance-forms/:slug" element={<DanceFormDetail />} />
            <Route path="/culture/art-and-craft" element={<ArtAndCraftPage />} />
            <Route path="/culture/art-and-craft/:slug" element={<ArtAndCraftDetail />} />
            <Route path="/culture/cuisine" element={<CuisinePage />} />
            <Route path="/culture/cuisine/:slug" element={<CuisineDetail />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/indian-culture" element={<IndianCulture />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
