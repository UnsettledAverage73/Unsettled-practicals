import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CodeIcon, 
  MenuIcon, 
  XIcon, 
  SparklesIcon,
  BookOpenIcon,
  CpuIcon,
  NetworkIcon,
  FileCodeIcon,
  PlayIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: SparklesIcon },
    { name: 'Data Structure', href: '/data-structure', icon: CpuIcon },
    { name: 'OS', href: '/os', icon: FileCodeIcon },
    { name: 'C Skill', href: '/c-skill', icon: CodeIcon },
    { name: 'DCN', href: '/dcn', icon: NetworkIcon },
  ];

  const isActive = (href: string) => location.pathname === href;

  const openLiveEditor = () => {
    window.open('/live-editor', '_blank');
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg" 
        : "bg-white border-b border-gray-100"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <CodeIcon className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">
                CodeHub
              </h1>
              <p className="text-xs text-gray-500">Learn • Code • Practice</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50 shadow-sm"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              onClick={openLiveEditor}
              variant="outline"
              size="sm"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <PlayIcon className="w-4 h-4 mr-2" />
              Live Editor
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              size="sm"
            >
              <BookOpenIcon className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200",
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Button 
                onClick={() => {
                  openLiveEditor();
                  setIsOpen(false);
                }}
                variant="outline"
                className="w-full border-green-200 text-green-700 hover:bg-green-50"
                size="sm"
              >
                <PlayIcon className="w-4 h-4 mr-2" />
                Live Editor
              </Button>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <BookOpenIcon className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
