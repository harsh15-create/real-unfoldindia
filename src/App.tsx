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


import CityPage from "./pages/CityPage";
import EntryGuide from "./pages/EntryGuide";
import SafetyGuide from "./pages/SafetyGuide";
import AboutPage from "./pages/AboutPage";
import IndianCulture from "./pages/IndianCulture";

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
import RegionDetail from "./pages/regions/RegionDetail";


import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./auth/AuthContext";
import { ExplorationProvider } from "./context/ExplorationContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CompleteProfile from "./pages/CompleteProfile";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";

  return (
    <>
      {children}
      {!isChatPage && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ExplorationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Layout>
              <Header />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/complete-profile" element={
                  <ProtectedRoute>
                    <CompleteProfile />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                {/* Protected Routes */}
                <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
                <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
                <Route path="/route" element={<ProtectedRoute><RoutePlanner /></ProtectedRoute>} />
                <Route path="/trip" element={<ProtectedRoute><TripDashboard /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />

                {/* Guide Routes */}
                <Route path="/guide" element={<ProtectedRoute><Guide /></ProtectedRoute>} />
                <Route path="/guide/city/:cityId" element={<ProtectedRoute><CityPage /></ProtectedRoute>} />
                <Route path="/guide/entry/:sectionId" element={<ProtectedRoute><EntryGuide /></ProtectedRoute>} />
                <Route path="/guide/safety/:sectionId" element={<ProtectedRoute><SafetyGuide /></ProtectedRoute>} />

                {/* Spiritual Journeys */}
                <Route path="/spiritual-journeys" element={<ProtectedRoute><SpiritualJourneys /></ProtectedRoute>} />
                <Route path="/spiritual-journeys/:slug" element={<ProtectedRoute><SpiritualCity /></ProtectedRoute>} />

                {/* Wildlife */}
                <Route path="/wildlife-safaris" element={<ProtectedRoute><WildlifeSafaris /></ProtectedRoute>} />
                <Route path="/wildlife-safaris/:slug" element={<ProtectedRoute><WildlifePark /></ProtectedRoute>} />

                {/* Treks */}
                <Route path="/himalayan-treks" element={<ProtectedRoute><HimalayanTreks /></ProtectedRoute>} />
                <Route path="/himalayan-treks/:slug" element={<ProtectedRoute><TrekDetail /></ProtectedRoute>} />

                {/* Experiences */}
                <Route path="/experiences/royal-luxury" element={<ProtectedRoute><RoyalLuxury /></ProtectedRoute>} />
                <Route path="/experiences/royal-luxury/:cityId" element={<ProtectedRoute><RoyalCity /></ProtectedRoute>} />
                <Route path="/experiences/royal-luxury/:cityId/:propertySlug" element={<ProtectedRoute><RoyalProperty /></ProtectedRoute>} />
                <Route path="/experiences/adventures" element={<ProtectedRoute><AdventuresPage /></ProtectedRoute>} />
                <Route path="/experiences/adventures/:slug" element={<ProtectedRoute><AdventureDetail /></ProtectedRoute>} />

                {/* Culture */}
                <Route path="/culture/festivals" element={<ProtectedRoute><FestivalsPage /></ProtectedRoute>} />
                <Route path="/culture/festivals/:slug" element={<ProtectedRoute><FestivalDetail /></ProtectedRoute>} />
                <Route path="/culture/dance-forms" element={<ProtectedRoute><DanceFormsPage /></ProtectedRoute>} />
                <Route path="/culture/dance-forms/:slug" element={<ProtectedRoute><DanceFormDetail /></ProtectedRoute>} />
                <Route path="/culture/art-and-craft" element={<ProtectedRoute><ArtAndCraftPage /></ProtectedRoute>} />
                <Route path="/culture/art-and-craft/:slug" element={<ProtectedRoute><ArtAndCraftDetail /></ProtectedRoute>} />
                <Route path="/culture/cuisine" element={<ProtectedRoute><CuisinePage /></ProtectedRoute>} />
                <Route path="/culture/cuisine/:slug" element={<ProtectedRoute><CuisineDetail /></ProtectedRoute>} />

                {/* Regions */}
                <Route path="/regions/:slug" element={<ProtectedRoute><RegionDetail /></ProtectedRoute>} />

                <Route path="/about" element={<AboutPage />} />
                <Route path="/indian-culture" element={<IndianCulture />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </ExplorationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
