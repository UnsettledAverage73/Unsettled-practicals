
import React from 'react';
import { Link } from 'react-router-dom';
import { dataStructurePracticals } from '@/data/dataStructurePracticals';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const DataStructure = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-primary">Data Structure Practicals</h1>
          <p className="text-gray-600 mt-2">
            A collection of practical implementations for various data structure concepts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataStructurePracticals.map((practical, index) => (
            <Card 
              key={practical.id} 
              className="practical-transition border border-gray-200 hover:border-primary"
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards'
              }}
            >
              <CardHeader className="bg-muted">
                <CardTitle className="text-xl">
                  Practical {practical.id}: {practical.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-4">
                <p className="text-gray-600 line-clamp-3">
                  {practical.description}
                </p>
              </CardContent>
              
              <CardFooter>
                <Link to={`/data-structure/${practical.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataStructure;
