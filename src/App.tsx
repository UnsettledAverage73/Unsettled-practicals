
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DataStructure from "./pages/DataStructure";
import PracticalDetails from "./pages/PracticalDetails";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import OS from "./pages/OS";
import OSPracticalDetails from "./pages/OSPracticalDetails";
import CSkill from "./pages/CSkill";
import CSkillPracticalDetails from "./pages/CSkillPracticalDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/data-structure" element={<DataStructure />} />
              <Route path="/data-structure/:id" element={<PracticalDetails />} />
              <Route path="/os" element={<OS />} />
              <Route path="/os/:id" element={<OSPracticalDetails />} />
              <Route path="/c-skill" element={<CSkill />} />
              <Route path="/c-skill/:id" element={<CSkillPracticalDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
