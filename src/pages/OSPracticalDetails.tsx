
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { osPracticals } from '@/data/osPracticals';
import CodeBlock from '@/components/CodeBlock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, BookmarkIcon, BookmarkCheck, Code, Play } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { toast } from '@/components/ui/sonner';

const OSPracticalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const practicalId = parseInt(id || '1');
  const practical = osPracticals.find(p => p.id === practicalId);
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
          <Link to="/os">
            <Button style={{ backgroundColor: "#9b87f5" }}>Go back to OS Practicals</Button>
          </Link>
        </div>
      </div>
    );
  }

  const prevPractical = practicalId > 1 ? 
    osPracticals.find(p => p.id === practicalId - 1) : null;
    
  const nextPractical = practicalId < osPracticals.length ? 
    osPracticals.find(p => p.id === practicalId + 1) : null;

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleRunCode = () => {
    toast.info('Online compiler feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between items-center">
          <Link to="/os" className="inline-flex items-center text-[#9b87f5] hover:underline">
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
              <><BookmarkCheck size={18} className="text-[#9b87f5]" /> <span>Bookmarked</span></> : 
              <><BookmarkIcon size={18} /> <span>Bookmark</span></>
            }
          </Button>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#9b87f5]">
            Practical {practical.id}: {practical.title}
          </h1>
          <p className="text-gray-600 mt-2">
            {practical.description}
          </p>
        </div>
        
        <Tabs defaultValue="aim" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-6">
            <TabsTrigger value="aim">🎯 Aim</TabsTrigger>
            <TabsTrigger value="facilities">🛠️ Facilities</TabsTrigger>
            <TabsTrigger value="theory">📚 Theory</TabsTrigger>
            {practical.code && <TabsTrigger value="code">💻 Code</TabsTrigger>}
            <TabsTrigger value="conclusion">📝 Conclusion</TabsTrigger>
            <TabsTrigger value="viva">🎤 Viva</TabsTrigger>
          </TabsList>
          
          <Card className="border-none shadow-md">
            <TabsContent value="aim" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">Aim</h2>
                <div className="bg-[#f5f0ff] border-l-4 border-[#9b87f5] p-4 rounded">
                  <p className="text-gray-700">{practical.aim}</p>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="facilities" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">Facilities Required</h2>
                <div className="bg-[#f5f0ff] border-l-4 border-[#9b87f5] p-4 rounded">
                  <p className="text-gray-700">{practical.facilities}</p>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="theory" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">Theory</h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {practical.theory}
                </div>
              </CardContent>
            </TabsContent>
            
            {practical.code && (
              <TabsContent value="code" className="mt-0">
                <CardContent className="p-6 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Code Implementation</h2>
                    <Button 
                      onClick={handleRunCode} 
                      className="flex items-center gap-2"
                      style={{ backgroundColor: "#9b87f5" }}
                    >
                      <Play size={16} /> Run Code
                    </Button>
                  </div>
                  <CodeBlock 
                    code={practical.code} 
                    title={`${practical.title} Implementation`}
                    language="c" 
                    className="shadow-sm" 
                  />
                  
                  {practical.output && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Expected Output</h3>
                      <pre className="bg-[#f5f0ff] p-4 rounded-lg text-sm overflow-x-auto border border-gray-200">
                        {practical.output}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </TabsContent>
            )}
            
            <TabsContent value="conclusion" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
                <div className="text-gray-700">
                  <p>{practical.conclusion}</p>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="viva" className="mt-0">
              <CardContent className="p-6 animate-fade-in">
                <h2 className="text-2xl font-semibold mb-4">Viva Questions & Answers</h2>
                {practical.vivaQuestions ? (
                  <div className="space-y-6">
                    {practical.vivaQuestions.map((qa, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                        <h3 className="font-semibold text-[#9b87f5]">Q: {qa.question}</h3>
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
            <Link to={`/os/${prevPractical.id}`}>
              <Button variant="outline" className="flex items-center gap-2 border-[#9b87f5] text-[#9b87f5]">
                <ChevronLeft size={16} />
                Practical {prevPractical.id}: {prevPractical.title}
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
          
          {nextPractical ? (
            <Link to={`/os/${nextPractical.id}`}>
              <Button variant="outline" className="flex items-center gap-2 border-[#9b87f5] text-[#9b87f5]">
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

export default OSPracticalDetails;
