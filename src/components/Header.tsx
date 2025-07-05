
import React, { useState } from 'react';
import { Menu, X, Home, Circle, Calendar, Newspaper, Trophy } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-900 font-bold text-lg">SW</span>
            </div>
            <h1 className="text-xl font-bold">ScoreWeb</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
              <Home className="w-4 h-4" />
              Home
            </a>
            <a href="#live" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
              <Circle className="w-4 h-4" />
              Live Scores
            </a>
            <a href="#fixtures" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
              <Calendar className="w-4 h-4" />
              Fixtures
            </a>
            <a href="#news" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
              <Newspaper className="w-4 h-4" />
              News
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
              <Trophy className="w-4 h-4" />
              Leagues
            </a>
          </nav>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-blue-800">
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                <Home className="w-4 h-4" />
                Home
              </a>
              <a href="#live" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                <Circle className="w-4 h-4" />
                Live Scores
              </a>
              <a href="#fixtures" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                <Calendar className="w-4 h-4" />
                Fixtures
              </a>
              <a href="#news" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                <Newspaper className="w-4 h-4" />
                News
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                <Trophy className="w-4 h-4" />
                Leagues
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
