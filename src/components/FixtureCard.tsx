
import React from 'react';

interface Team {
  name: string;
  logo: string;
}

interface FixtureCardProps {
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  league: string;
}

const FixtureCard: React.FC<FixtureCardProps> = ({
  homeTeam,
  awayTeam,
  date,
  time,
  league
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-3 text-blue-900 font-medium">
        <span>{date}</span>
        <span>{time}</span>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <img src={homeTeam.logo} alt={`${homeTeam.name} logo`} className="w-6 h-6" />
          <span className="font-semibold">{homeTeam.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={awayTeam.logo} alt={`${awayTeam.name} logo`} className="w-6 h-6" />
          <span className="font-semibold">{awayTeam.name}</span>
        </div>
      </div>
      
      <div className="text-sm text-gray-600">
        {league}
      </div>
    </div>
  );
};

export default FixtureCard;
