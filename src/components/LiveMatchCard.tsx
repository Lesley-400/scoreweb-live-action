
import React from 'react';
import { Clock } from 'lucide-react';

interface Team {
  name: string;
  crest: string;
  score?: number;
}

interface LiveMatchCardProps {
  homeTeam: Team;
  awayTeam: Team;
  minute?: number;
  status: string;
  competition: {
    name: string;
    emblem: string;
  };
  utcDate: string;
}

const LiveMatchCard: React.FC<LiveMatchCardProps> = ({
  homeTeam,
  awayTeam,
  minute,
  status,
  competition,
  utcDate
}) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusDisplay = () => {
    if (status === 'LIVE' || status === 'IN_PLAY') {
      return minute ? `${minute}'` : 'LIVE';
    }
    return status === 'PAUSED' ? 'HT' : status;
  };

  const isLive = status === 'LIVE' || status === 'IN_PLAY';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="bg-blue-900 text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isLive && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
          <span className="text-sm font-medium">
            {isLive ? 'LIVE' : 'SCHEDULED'}
          </span>
        </div>
        <span className="text-sm opacity-90">
          {isLive ? getStatusDisplay() : formatTime(utcDate)}
        </span>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 flex-1">
              <img 
                src={homeTeam.crest || '/placeholder.svg'} 
                alt={`${homeTeam.name} logo`} 
                className="w-6 h-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <span className="font-semibold truncate">{homeTeam.name}</span>
            </div>
            <span className="text-lg font-bold text-blue-900 ml-2">
              {homeTeam.score ?? '-'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 flex-1">
              <img 
                src={awayTeam.crest || '/placeholder.svg'} 
                alt={`${awayTeam.name} logo`} 
                className="w-6 h-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <span className="font-semibold truncate">{awayTeam.name}</span>
            </div>
            <span className="text-lg font-bold text-blue-900 ml-2">
              {awayTeam.score ?? '-'}
            </span>
          </div>
        </div>
      </div>
      
      {isLive && (
        <div className="text-center py-2 text-sm text-red-600 font-semibold border-t">
          {getStatusDisplay()}
        </div>
      )}
      
      <div className="flex justify-between items-center px-4 py-2 border-t bg-gray-50 text-sm">
        <div className="flex items-center gap-2">
          <img 
            src={competition.emblem || '/placeholder.svg'} 
            alt={`${competition.name} logo`} 
            className="w-5 h-5"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <span className="font-medium">{competition.name}</span>
        </div>
        {!isLive && (
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-3 h-3" />
            <span>{formatTime(utcDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMatchCard;
