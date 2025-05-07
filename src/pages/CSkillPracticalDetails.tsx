
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from '@/components/CodeBlock';
import Navbar from '@/components/Navbar';
import { cSkillPracticals } from '@/data/cSkillPracticals';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import Footer from '@/components/Footer';

const OnlineCompiler = ({ code }: { code: string }) => {
  const [editorCode, setEditorCode] = useState(code);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput("Running code...");
    
    try {
      const iframeContainer = document.getElementById('iframe-container');
      if (iframeContainer) {
        iframeContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '300px';
        iframe.style.border = '1px solid #ddd';
        iframe.style.borderRadius = '4px';
        
        iframeContainer.appendChild(iframe);
        
        const iframeDoc = iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(editorCode);
          iframeDoc.close();
          
          setOutput("Code executed successfully!");
          toast.success("Code executed successfully!");
        }
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      toast.error("Error executing code");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="mb-2 font-medium">Code Editor</div>
          <Textarea 
            value={editorCode} 
            onChange={(e) => setEditorCode(e.target.value)}
            className="min-h-[300px] font-mono text-sm p-4"
          />
          <div className="mt-4 flex justify-between gap-2">
            <Button 
              onClick={() => setEditorCode(code)}
              variant="outline"
            >
              Reset Code
            </Button>
            <Button 
              onClick={runCode}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-2 font-medium">Output</div>
          <div id="iframe-container" className="min-h-[300px] bg-gray-50 rounded border p-4">
            {/* iframe will be inserted here */}
          </div>
          <div className="mt-2 text-sm text-gray-500">{output}</div>
        </div>
      </div>
    </div>
  );
};

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
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <Link to="/c-skill" className="text-[#9b87f5] hover:underline mb-4 inline-block">
          &larr; Back to C Skill Practicals
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#9b87f5] mb-4">
            Practical {practical.id}: {practical.title}
          </h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Aim</h2>
            <p className="text-gray-700">{practical.aim}</p>
          </div>
        </div>
        
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            {practical.theory && <TabsTrigger value="theory">Theory</TabsTrigger>}
            {practical.code && <TabsTrigger value="code">Code</TabsTrigger>}
            {practical.code && <TabsTrigger value="try">Try It</TabsTrigger>}
            {practical.output && <TabsTrigger value="output">Output</TabsTrigger>}
            {practical.conclusion && <TabsTrigger value="conclusion">Conclusion</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="description" className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 mb-4">{practical.description}</p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Facilities Required</h3>
              <p className="text-gray-600">{practical.facilities}</p>
            </div>
            
            {practical.scope && (
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold mb-2">Scope</h3>
                <p className="text-gray-600">{practical.scope}</p>
              </div>
            )}
          </TabsContent>
          
          {practical.theory && (
            <TabsContent value="theory" className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Theory</h2>
              <div className="text-gray-700 theory-content">
                {practical.theory.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </TabsContent>
          )}
          
          {practical.code && (
            <TabsContent value="code" className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Code</h2>
              <CodeBlock 
                code={practical.code} 
                language={practical.id <= 6 ? "html" : "javascript"} 
                title={`${practical.title} - Code Implementation`} 
              />
            </TabsContent>
          )}
          
          {practical.code && (
            <TabsContent value="try" className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Try It Yourself</h2>
              <p className="text-gray-700 mb-4">
                You can modify and run the code below to see how it works.
              </p>
              <OnlineCompiler code={practical.code} />
            </TabsContent>
          )}
          
          {practical.output && (
            <TabsContent value="output" className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Expected Output</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{practical.output}</pre>
              </div>
            </TabsContent>
          )}
          
          {practical.conclusion && (
            <TabsContent value="conclusion" className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Conclusion</h2>
              <p className="text-gray-700">{practical.conclusion}</p>
            </TabsContent>
          )}
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default CSkillPracticalDetails;
