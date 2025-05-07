
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Index = () => {
  const subjects = [
    {
      name: "Data Structure",
      path: "/data-structure",
      description: "Implementation of sorting algorithms, stacks, queues, and more data structure concepts.",
      status: "Available",
    },
    {
      name: "OS (Operating Systems)",
      path: "/os",
      description: "Linux distributions, commands, shell scripting, process management, and CPU scheduling algorithms.",
      status: "Available",
    },
    {
      name: "DCN (Data Communication and Networks)",
      path: "/dcn",
      description: "Network protocols, socket programming, and network configurations.",
      status: "Coming Soon",
    },
    {
      name: "C Skill",
      path: "/c-skill",
      description: "File handling, structures, unions, pointers, and advanced C programming techniques.",
      status: "Available",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Code for Students Hub
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive collection of practical implementations for computer science students.
            Easy access to code samples, explanations, and outputs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {subjects.map((subject) => (
            <Card 
              key={subject.name} 
              className="practical-transition border border-gray-200 hover:border-primary"
            >
              <CardHeader className="bg-muted">
                <CardTitle className="text-2xl">{subject.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <p className="text-gray-600">
                  {subject.description}
                </p>
                <div className="mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    subject.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {subject.status}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter>
                {subject.status === "Available" ? (
                  <Link to={subject.path} className="w-full">
                    <Button className="w-full">
                      Explore {subject.name}
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full opacity-70">
                    Coming Soon
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
