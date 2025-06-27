import React from 'react';
import { uiuxResources } from '../data/uiuxResources';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const grouped = uiuxResources.reduce((acc, res) => {
  acc[res.category] = acc[res.category] || [];
  acc[res.category].push(res);
  return acc;
}, {} as Record<string, typeof uiuxResources>);

const UIUXResources: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">UI/UX Resource Directory</h1>
        {Object.entries(grouped).map(([category, resources]) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {resources.map((res) => (
                <Card key={res.url} className="h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-blue-800">{res.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-700 text-sm">{res.description}</p>
                    <Button asChild variant="outline" className="w-full mt-auto">
                      <a href={res.url} target="_blank" rel="noopener noreferrer">Visit</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UIUXResources; 