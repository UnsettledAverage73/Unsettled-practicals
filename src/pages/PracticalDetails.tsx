
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataStructurePracticals } from '@/data/dataStructurePracticals';
import CodeBlock from '@/components/CodeBlock';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

const PracticalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const practicalId = parseInt(id || '1');
  const practical = dataStructurePracticals.find(p => p.id === practicalId);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link to="/data-structure" className="inline-flex items-center text-primary hover:underline">
            <ChevronLeft size={16} />
            <span>Back to All Practicals</span>
          </Link>
        </div>
        
        <Card className="border-none shadow-md">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="text-2xl">
              Practical {practical.id}: {practical.title}
            </CardTitle>
            <CardDescription className="text-white/80 mt-1">
              {practical.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {practical.explanation && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Explanation</h3>
                <p className="text-gray-700">{practical.explanation}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Code Implementation</h3>
              <CodeBlock code={practical.code} title="Solution" className="shadow-sm" />
            </div>
            
            {practical.output && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Expected Output</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {practical.output}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
        
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
