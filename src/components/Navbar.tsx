
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const subjects = [
    { name: "Data Structure", path: "/data-structure" },
    { name: "DCN", path: "/dcn" },
    { name: "OS", path: "/os" },
    { name: "C Skill", path: "/c-skill" }
  ];

  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
            Code for Students Hub
          </Link>
          
          <ul className="flex flex-wrap justify-center gap-6">
            {subjects.map((subject) => (
              <li key={subject.path}>
                <Link 
                  to={subject.path} 
                  className={cn(
                    "hover:text-white/80 text-lg font-medium transition-colors",
                    location.pathname.startsWith(subject.path) && "underline underline-offset-4"
                  )}
                >
                  {subject.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
