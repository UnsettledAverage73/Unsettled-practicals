import React, { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayIcon, CodeIcon, EyeIcon } from 'lucide-react';

interface CodeTabProps {
  code: string;
  title: string;
  language?: string;
  description?: string;
}

const CodeTab: React.FC<CodeTabProps> = ({ 
  code, 
  title, 
  language = 'javascript',
  description 
}) => {
  const [activeTab, setActiveTab] = useState('view');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Code Implementation</h2>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'view' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('view')}
          >
            <EyeIcon size={16} className="mr-2" />
            View Code
          </Button>
          <Button
            variant={activeTab === 'edit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('edit')}
          >
            <CodeIcon size={16} className="mr-2" />
            Live Editor
          </Button>
        </div>
      </div>

      {description && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">{description}</p>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="view" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CodeIcon size={20} />
                {title} - Code Implementation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock 
                code={code} 
                language={language} 
                title={`${title} - Code Implementation`}
                executable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayIcon size={20} />
                Live Code Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock 
                code={code} 
                language={language} 
                title={`${title} - Live Editor`}
                executable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeTab;
