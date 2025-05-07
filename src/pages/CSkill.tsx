
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { cSkillPracticals } from '@/data/cSkillPracticals';

const CSkill = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-[#9b87f5] mb-4">
            C Skill Practicals
          </h1>
          <p className="text-xl text-gray-600">
            Master C programming and web development skills through hands-on practicals.
            From basic HTML to interactive JavaScript applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {cSkillPracticals.map((practical) => (
            <Card 
              key={practical.id}
              className="practical-transition border border-gray-200 hover:border-[#9b87f5] hover:shadow-md"
            >
              <CardHeader className="bg-[#f5f0ff]">
                <CardTitle className="text-xl">Practical {practical.id}: {practical.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  {practical.description}
                </p>
                <div className="text-sm text-gray-500">
                  <p><strong>Aim:</strong> {practical.aim}</p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Link to={`/c-skill/${practical.id}`} className="w-full">
                  <Button className="w-full" style={{ backgroundColor: "#9b87f5", color: "white" }}>
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

export default CSkill;
