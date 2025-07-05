
import React from 'react';

interface Team {
  name: string;
  logo: string;
  score: number;
}

interface LiveMatchCardProps {
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  status: string;
  league: {
    name: string;
    logo: string;
  };
}

const LiveMatchCard: React.FC<LiveMatchCardProps> = ({
  homeTeam,
  awayTeam,
  time,
  status,
  league
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="bg-blue-900 text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">LIVE</span>
        </div>
        <span className="text-sm opacity-90">{time}</span>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 flex-1">
              <img src={homeTeam.logo} alt={`${homeTeam.name} logo`} className="w-6 h-6" />
              <span className="font-semibold truncate">{homeTeam.name}</span>
            </div>
            <span className="text-lg font-bold text-blue-900 ml-2">{homeTeam.score}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 flex-1">
              <img src={awayTeam.logo} alt={`${awayTeam.name} logo`} className="w-6 h-6" />
              <span className="font-semibold truncate">{awayTeam.name}</span>
            </div>
            <span className="text-lg font-bold text-blue-900 ml-2">{awayTeam.score}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center py-2 text-sm text-red-600 font-semibold border-t">
        {status}
      </div>
      
      <div className="flex justify-between items-center px-4 py-2 border-t bg-gray-50 text-sm">
        <div className="flex items-center gap-2">
          <img src={league.logo} alt={`${league.name} logo`} className="w-5 h-5" />
          <span className="font-medium">{league.name}</span>
        </div>
        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
          Match Center
        </a>
      </div>
    </div>
  );
};

export default LiveMatchCard;
