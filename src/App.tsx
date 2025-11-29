import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Destinations from "./pages/Destinations";
import Experiences from "./pages/Experiences";
import Culture from "./pages/Culture";
import Guides from "./pages/Guides";
import RegionPage from "./pages/RegionPage";
import Tips from "./pages/Tips";
import Cuisine from "./pages/Cuisine";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/north-india" element={<RegionPage />} />
          <Route path="/south-india" element={<RegionPage />} />
          <Route path="/east-india" element={<RegionPage />} />
          <Route path="/west-india" element={<RegionPage />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/cuisine" element={<Cuisine />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
