
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import { cSkillPracticals } from '@/data/cSkillPracticals';
import Footer from '@/components/Footer';
import GameComponent from '@/components/games/GameComponent';

// Import the tab content components
import DescriptionTab from '@/components/practical-tabs/DescriptionTab';
import TheoryTab from '@/components/practical-tabs/TheoryTab';
import CodeTab from '@/components/practical-tabs/CodeTab';
import TryItTab from '@/components/practical-tabs/TryItTab';
import OutputTab from '@/components/practical-tabs/OutputTab';
import ConclusionTab from '@/components/practical-tabs/ConclusionTab';
import PracticalHeader from '@/components/PracticalHeader';

const CSkillPracticalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const practicalId = parseInt(id || "0");
  
  const practical = cSkillPracticals.find(p => p.id === practicalId);
  
  if (!practical) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl text-red-500">Practical not found!</h1>
        <p className="mt-4">
          <Link to="/c-skill" className="text-blue-500 underline">
            Return to C Skill Practicals
          </Link>
        </p>
      </div>
    );
  }
  
  const handleGameComplete = (score: number) => {
    toast.success(`Game completed with score: ${score}!`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <Link to="/c-skill" className="text-[#9b87f5] hover:underline mb-4 inline-block">
          &larr; Back to C Skill Practicals
        </Link>
        
        <PracticalHeader id={practical.id} title={practical.title} aim={practical.aim} />
        
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            {practical.theory && <TabsTrigger value="theory">Theory</TabsTrigger>}
            {practical.code && <TabsTrigger value="code">Code</TabsTrigger>}
            {practical.code && <TabsTrigger value="try">Try It</TabsTrigger>}
            <TabsTrigger value="game">🎮 Game</TabsTrigger>
            <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description">
            <DescriptionTab 
              description={practical.description}
              facilities={practical.facilities}
              scope={practical.scope}
            />
          </TabsContent>
          
          {practical.theory && (
            <TabsContent value="theory">
              <TheoryTab theory={practical.theory} />
            </TabsContent>
          )}
          
          {practical.code && (
            <TabsContent value="code">
              <CodeTab 
                code={practical.code} 
                language={practical.id <= 6 ? "html" : "javascript"}
                title={practical.title}
              />
            </TabsContent>
          )}
          
          {practical.code && (
            <TabsContent value="try">
              <TryItTab code={practical.code} />
            </TabsContent>
          )}
          
          <TabsContent value="game">
            <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Interactive Learning Game</h2>
              <GameComponent
                gameType="coding"
                practicalId={practical.id}
                practicalTitle={practical.title}
                onComplete={handleGameComplete}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="conclusion">
            <ConclusionTab conclusion={practical.conclusion} />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default CSkillPracticalDetails;
