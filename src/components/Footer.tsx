import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CodeIcon, 
  GithubIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  MailIcon,
  HeartIcon,
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  ZapIcon
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    learning: [
      { name: 'Data Structures', href: '/data-structure' },
      { name: 'Operating Systems', href: '/os' },
      { name: 'Computer Networks', href: '/dcn' },
      { name: 'C Programming', href: '/c-skill' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Tutorials', href: '#' },
      { name: 'Examples', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Feedback', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com' },
    { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com' },
    { name: 'Email', icon: MailIcon, href: 'mailto:contact@codehub.com' }
  ];

  const stats = [
    { label: 'Students', value: '10K+', icon: UsersIcon },
    { label: 'Code Examples', value: '500+', icon: CodeIcon },
    { label: 'Learning Paths', value: '4', icon: BookOpenIcon },
    { label: 'Languages', value: '6+', icon: ZapIcon }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <CodeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CodeHub
                </h3>
                <p className="text-sm text-gray-300">Learn • Code • Practice</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering students with interactive coding examples and hands-on learning experiences 
              for computer science concepts.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-lg font-semibold mb-4 capitalize text-blue-300">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
                      >
                        <div className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <SparklesIcon className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold">Stay Updated</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest updates on new features, tutorials, and learning resources delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>&copy; {currentYear} CodeHub. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <HeartIcon className="w-4 h-4 text-red-500 animate-pulse" />
                <span>for students</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
