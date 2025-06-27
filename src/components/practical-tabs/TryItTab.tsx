import React, { useState } from 'react';
import LiveCodeEditor from '@/components/LiveCodeEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayIcon, CodeIcon, LightbulbIcon } from 'lucide-react';

interface TryItTabProps {
  code: string;
  language?: string;
  title?: string;
  tips?: string[];
}

const TryItTab: React.FC<TryItTabProps> = ({ 
  code, 
  language = 'javascript',
  title = 'Try It Yourself',
  tips = []
}) => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Try It Yourself</h2>
        <Button
          onClick={() => setShowEditor(!showEditor)}
          variant={showEditor ? 'outline' : 'default'}
          size="sm"
          className="bg-green-600 hover:bg-green-700"
        >
          <PlayIcon size={16} className="mr-2" />
          {showEditor ? 'Hide Editor' : 'Open Live Editor'}
        </Button>
      </div>

      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          <LightbulbIcon size={16} className="inline mr-2" />
          Modify and run the code below to see how it works. Experiment with different values and see the results in real-time!
        </p>
      </div>

      {tips.length > 0 && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <LightbulbIcon size={16} />
              Tips for Experimentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {showEditor ? (
        <LiveCodeEditor
          initialCode={code}
          language={language}
          title={`${title} - Live Code Editor`}
          onClose={() => setShowEditor(false)}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CodeIcon size={20} />
              Ready to Experiment?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <CodeIcon size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">
                Click "Open Live Editor" to start experimenting with the code!
              </p>
              <Button
                onClick={() => setShowEditor(true)}
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                <PlayIcon size={20} className="mr-2" />
                Start Coding
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TryItTab;
