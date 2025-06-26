import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataStructurePracticals } from '@/data/dataStructurePracticals';
import CodeBlock from '@/components/CodeBlock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, BookmarkIcon, BookmarkCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';
import GameComponent from '@/components/games/GameComponent';
import InteractiveTab from '@/components/practical-tabs/InteractiveTab';

const PracticalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const practicalId = parseInt(id || '1');
  const practical = dataStructurePracticals.find(p => p.id === practicalId);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!practical) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Practical not found</h2>
          <Link to="/data-structure">
            <Button>Go back to Data Structure</Button>
          </Link>
        </div>
      </div>
    );
  }

  const prevPractical = practicalId > 1 ? 
    dataStructurePracticals.find(p => p.id === practicalId - 1) : null;
    
  const nextPractical = practicalId < dataStructurePracticals.length ? 
    dataStructurePracticals.find(p => p.id === practicalId + 1) : null;

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleGameComplete = (score: number) => {
    toast.success(`Game completed with score: ${score}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center">
          <Link to="/data-structure" className="inline-flex items-center text-primary hover:underline">
            <ChevronLeft size={16} />
            <span>Back to All Practicals</span>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleBookmark}
            className="flex items-center gap-1"
          >
            {isBookmarked ? 
              <><BookmarkCheck size={18} /> <span>Bookmarked</span></> : 
              <><BookmarkIcon size={18} /> <span>Bookmark</span></>
            }
          </Button>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">
            Practical {practical.id}: {practical.title}
          </h1>
          <p className="text-gray-600 mt-2">
            {practical.description}
          </p>
        </div>
        
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-6">
            <TabsTrigger value="code">💻 Code</TabsTrigger>
            <TabsTrigger value="interactive">🚀 Try It</TabsTrigger>
            <TabsTrigger value="explanation">🧠 Explanation</TabsTrigger>
            <TabsTrigger value="advantages">✅ Advantages</TabsTrigger>
            <TabsTrigger value="applications">📌 Applications</TabsTrigger>
            <TabsTrigger value="game">🎮 Game</TabsTrigger>
            <TabsTrigger value="viva">🎤 Viva</TabsTrigger>
          </TabsList>
          
          <Card className="border-none shadow-md">
            <TabsContent value="code" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">C Program</h2>
                <CodeBlock 
                  code={practical.code} 
                  title={`${practical.title} Implementation`} 
                  className="shadow-sm" 
                />
                
                {practical.output && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Expected Output</h3>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto border border-gray-200">
                      {practical.output}
                    </pre>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="interactive" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <InteractiveTab
                  code={practical.code}
                  title={practical.title}
                  testCases={[
                    { input: "Sample input", expectedOutput: "Expected output" },
                  ]}
                />
              </CardContent>
            </TabsContent>
            
            <TabsContent value="explanation" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">Line-by-Line Explanation</h2>
                {practical.lineByLineExplanation ? (
                  <ol className="list-decimal pl-5 space-y-2">
                    {practical.lineByLineExplanation.map((line, index) => (
                      <li key={index} className="text-gray-700">{line}</li>
                    ))}
                  </ol>
                ) : (
                  <div className="text-gray-700">
                    <p>{practical.explanation}</p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                      <p className="text-sm text-yellow-700">
                        Detailed line-by-line explanation coming soon. For now, please refer to the general explanation above.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="advantages" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">Advantages</h2>
                {practical.advantages ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {practical.advantages.map((advantage, index) => (
                      <li key={index} className="text-gray-700">{advantage}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-sm text-yellow-700">
                      Advantages section for this practical is coming soon. Check back later!
                    </p>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="applications" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">Applications</h2>
                {practical.applications ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {practical.applications.map((application, index) => (
                      <li key={index} className="text-gray-700">{application}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-sm text-yellow-700">
                      Applications section for this practical is coming soon. Check back later!
                    </p>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="game" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">Interactive Learning Game</h2>
                <GameComponent
                  gameType="memory"
                  practicalId={practical.id}
                  practicalTitle={practical.title}
                  onComplete={handleGameComplete}
                />
              </CardContent>
            </TabsContent>
            
            <TabsContent value="viva" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">Viva Questions & Answers</h2>
                {practical.vivaQuestions ? (
                  <div className="space-y-6">
                    {practical.vivaQuestions.map((qa, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                        <h3 className="font-semibold text-primary">Q: {qa.question}</h3>
                        <p className="mt-2 text-gray-700">A: {qa.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-sm text-yellow-700">
                      Viva questions and answers for this practical are coming soon. Check back later!
                    </p>
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
        
        <div className="mt-6 flex justify-between">
          {prevPractical ? (
            <Link to={`/data-structure/${prevPractical.id}`}>
              <Button variant="outline" className="flex items-center gap-2">
                <ChevronLeft size={16} />
                Practical {prevPractical.id}: {prevPractical.title}
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
          
          {nextPractical ? (
            <Link to={`/data-structure/${nextPractical.id}`}>
              <Button variant="outline" className="flex items-center gap-2">
                Practical {nextPractical.id}: {nextPractical.title}
                <ChevronLeft size={16} className="rotate-180" />
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticalDetails;
