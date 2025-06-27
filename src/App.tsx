import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';
import DataStructure from '@/pages/DataStructure';
import OS from '@/pages/OS';
import CSkill from '@/pages/CSkill';
import DataNetworking from '@/pages/DataNetworking';
import PracticalDetails from '@/pages/PracticalDetails';
import CSkillPracticalDetails from '@/pages/CSkillPracticalDetails';
import OSPracticalDetails from '@/pages/OSPracticalDetails';
import DataNetworkingPracticalDetails from '@/pages/DataNetworkingPracticalDetails';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Main Content */}
        <div className="relative flex-1">
          <Navbar />
          
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/data-structure" element={<DataStructure />} />
              <Route path="/os" element={<OS />} />
              <Route path="/c-skill" element={<CSkill />} />
              <Route path="/dcn" element={<DataNetworking />} />
              <Route path="/data-structure/:id" element={<PracticalDetails />} />
              <Route path="/c-skill/:id" element={<CSkillPracticalDetails />} />
              <Route path="/os/:id" element={<OSPracticalDetails />} />
              <Route path="/dcn/:id" element={<DataNetworkingPracticalDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        
        <Footer />
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />
        
        {/* Vercel Analytics */}
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
