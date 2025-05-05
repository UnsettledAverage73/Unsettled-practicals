
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 flex items-center justify-center gap-2">
          Made by Unsettled Average 
          <Heart size={16} className="text-red-500 fill-red-500 inline-block" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
