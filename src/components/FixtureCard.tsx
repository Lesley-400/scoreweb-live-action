
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface Team {
  name: string;
  crest: string;
}

interface FixtureCardProps {
  homeTeam: Team;
  awayTeam: Team;
  utcDate: string;
  competition: {
    name: string;
    emblem: string;
  };
}

const FixtureCard: React.FC<FixtureCardProps> = ({
  homeTeam,
  awayTeam,
  utcDate,
  competition
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString([], {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-3 text-blue-900 font-medium">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(utcDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{formatTime(utcDate)}</span>
        </div>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <img 
            src={homeTeam.crest || '/placeholder.svg'} 
            alt={`${homeTeam.name} logo`} 
            className="w-6 h-6"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <span className="font-semibold">{homeTeam.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <img 
            src={awayTeam.crest || '/placeholder.svg'} 
            alt={`${awayTeam.name} logo`} 
            className="w-6 h-6"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <span className="font-semibold">{awayTeam.name}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <img 
          src={competition.emblem || '/placeholder.svg'} 
          alt={`${competition.name} logo`} 
          className="w-4 h-4"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <span>{competition.name}</span>
      </div>
    </div>
  );
};

export default FixtureCard;
