
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold">SW</span>
              </div>
              <h3 className="text-lg font-bold">ScoreWeb</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Your ultimate destination for live sports scores, match fixtures, and breaking news from the world of football and other major sports.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Live Scores</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Fixtures</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Results</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">News</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Leagues</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Premier League</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">La Liga</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Serie A</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Bundesliga</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ligue 1</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Advertise</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-slate-700 text-center text-sm text-gray-400">
          © 2024 ScoreWeb. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
