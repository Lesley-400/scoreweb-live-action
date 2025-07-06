
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LiveMatchCard from '../components/LiveMatchCard';
import FixtureCard from '../components/FixtureCard';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Calendar, Newspaper } from 'lucide-react';
import { useLiveMatches, useUpcomingFixtures } from '../hooks/useSportsData';

// Mock news data (since we're focusing on sports data for now)
const newsArticles = [
  {
    title: 'Premier League Title Race Heats Up',
    excerpt: 'With just five games remaining, the race for the Premier League title is closer than ever between three top teams...',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop',
    timeAgo: '2 hours ago',
    views: 1245
  },
  {
    title: 'Summer Transfer Window: Rumors Roundup',
    excerpt: 'As the season nears its end, speculation about big-money moves dominates the headlines. Here\'s the latest on potential transfers...',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop',
    timeAgo: '5 hours ago',
    views: 892
  },
  {
    title: 'Key Players Facing Fitness Battles Before Champions League',
    excerpt: 'Several star players from top clubs are in a race against time to be fit for the Champions League semi-finals next week...',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=250&fit=crop',
    timeAgo: '1 day ago',
    views: 1560
  }
];

const Index = () => {
  const [selectedSport, setSelectedSport] = useState('football');
  const [selectedDate, setSelectedDate] = useState(7);
  
  const { 
    data: liveMatches, 
    isLoading: liveLoading, 
    error: liveError, 
    refetch: refetchLive 
  } = useLiveMatches();
  
  const { 
    data: fixtures, 
    isLoading: fixturesLoading, 
    error: fixturesError, 
    refetch: refetchFixtures 
  } = useUpcomingFixtures(selectedDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Live Matches Section */}
        <section id="live" className="mb-12">
          <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-blue-900">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              Live Matches
            </h2>
            <select 
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="hockey">Hockey</option>
            </select>
          </div>
          
          {liveLoading && <LoadingSpinner />}
          {liveError && (
            <ErrorMessage 
              message="Failed to load live matches. Please try again." 
              onRetry={refetchLive}
            />
          )}
          {liveMatches && liveMatches.length === 0 && !liveLoading && (
            <div className="text-center py-8 text-gray-600">
              <p>No live matches at the moment.</p>
              <p className="text-sm mt-2">Check back later for live updates!</p>
            </div>
          )}
          {liveMatches && liveMatches.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMatches.slice(0, 6).map((match) => (
                <LiveMatchCard 
                  key={match.id} 
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  minute={match.minute}
                  status={match.status}
                  competition={match.competition}
                  utcDate={match.utcDate}
                />
              ))}
            </div>
          )}
        </section>

        {/* Fixtures Section */}
        <section id="fixtures" className="mb-12">
          <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-blue-900">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Upcoming Fixtures
            </h2>
            <select 
              value={selectedDate}
              onChange={(e) => setSelectedDate(Number(e.target.value))}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value={1}>Today</option>
              <option value={2}>Tomorrow</option>
              <option value={7}>This Week</option>
              <option value={30}>This Month</option>
            </select>
          </div>
          
          {fixturesLoading && <LoadingSpinner />}
          {fixturesError && (
            <ErrorMessage 
              message="Failed to load fixtures. Please try again." 
              onRetry={refetchFixtures}
            />
          )}
          {fixtures && fixtures.length === 0 && !fixturesLoading && (
            <div className="text-center py-8 text-gray-600">
              <p>No fixtures scheduled for the selected period.</p>
            </div>
          )}
          {fixtures && fixtures.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fixtures.slice(0, 8).map((fixture) => (
                <FixtureCard 
                  key={fixture.id} 
                  homeTeam={fixture.homeTeam}
                  awayTeam={fixture.awayTeam}
                  utcDate={fixture.utcDate}
                  competition={fixture.competition}
                />
              ))}
            </div>
          )}
        </section>

        {/* News Section */}
        <section id="news">
          <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-blue-900">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <Newspaper className="w-6 h-6" />
              Latest News
            </h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, index) => (
              <NewsCard key={index} {...article} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
