import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./auth/AuthContext";
import { ExplorationProvider } from "./context/ExplorationContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PageLoader } from "./components/PageLoader";

// Lazy Load Pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Explore = lazy(() => import("./pages/Explore"));
const MapPage = lazy(() => import("./pages/MapPage"));
const RoutePlanner = lazy(() => import("./pages/RoutePlanner"));
const TripDashboard = lazy(() => import("./pages/TripDashboard"));
const ChatbotPage = lazy(() => import("./pages/ChatbotPage"));
const Guide = lazy(() => import("./pages/Guide"));
const CityPage = lazy(() => import("./pages/CityPage"));
const EntryGuide = lazy(() => import("./pages/EntryGuide"));
const SafetyGuide = lazy(() => import("./pages/SafetyGuide"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const IndianCulture = lazy(() => import("./pages/IndianCulture"));
const Login = lazy(() => import("./pages/Login"));
const CompleteProfile = lazy(() => import("./pages/CompleteProfile"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Settings = lazy(() => import("./pages/Settings"));

// Spiritual Pages
const SpiritualJourneys = lazy(() => import("./pages/SpiritualJourneys"));
const SpiritualCity = lazy(() => import("./pages/SpiritualCity"));

// Wildlife Pages
const WildlifeSafaris = lazy(() => import("./pages/WildlifeSafaris"));
const WildlifePark = lazy(() => import("./pages/WildlifePark"));

// Trek Pages
const HimalayanTreks = lazy(() => import("./pages/HimalayanTreks"));
const TrekDetail = lazy(() => import("./pages/TrekDetail"));

// Experience Pages
const RoyalLuxury = lazy(() => import("./pages/RoyalLuxury"));
const RoyalCity = lazy(() => import("./pages/RoyalCity"));
const RoyalProperty = lazy(() => import("./pages/RoyalProperty"));
const AdventuresPage = lazy(() => import("./pages/experiences/AdventuresPage"));
const AdventureDetail = lazy(() => import("./pages/experiences/AdventureDetail"));

// Culture Pages
const FestivalsPage = lazy(() => import("./pages/culture/FestivalsPage"));
const FestivalDetail = lazy(() => import("./pages/culture/FestivalDetail"));
const DanceFormsPage = lazy(() => import("./pages/culture/DanceFormsPage"));
const DanceFormDetail = lazy(() => import("./pages/culture/DanceFormDetail"));
const ArtAndCraftPage = lazy(() => import("./pages/culture/ArtAndCraftPage"));
const ArtAndCraftDetail = lazy(() => import("./pages/culture/ArtAndCraftDetail"));
const CuisinePage = lazy(() => import("./pages/culture/CuisinePage"));
const CuisineDetail = lazy(() => import("./pages/culture/CuisineDetail"));
const RegionDetail = lazy(() => import("./pages/regions/RegionDetail"));

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
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />

                  {/* Top Level Protected Routes */}
                  <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
                  <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
                  <Route path="/route" element={<ProtectedRoute><RoutePlanner /></ProtectedRoute>} />
                  <Route path="/trip" element={<ProtectedRoute><TripDashboard /></ProtectedRoute>} />
                  <Route path="/chat" element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

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
              </Suspense>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </ExplorationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
