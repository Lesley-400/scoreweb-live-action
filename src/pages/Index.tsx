
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LiveMatchCard from '../components/LiveMatchCard';
import FixtureCard from '../components/FixtureCard';
import NewsCard from '../components/NewsCard';
import { Circle, Calendar, Newspaper } from 'lucide-react';

// Mock data for demonstration
const liveMatches = [
  {
    homeTeam: { name: 'Manchester United', logo: '🔴', score: 2 },
    awayTeam: { name: 'Arsenal', logo: '🔴', score: 1 },
    time: '60\'',
    status: 'Second Half',
    league: { name: 'Premier League', logo: '⚽' }
  },
  {
    homeTeam: { name: 'Manchester City', logo: '🔵', score: 0 },
    awayTeam: { name: 'Chelsea', logo: '🔵', score: 0 },
    time: '35\'',
    status: 'First Half',
    league: { name: 'Premier League', logo: '⚽' }
  },
  {
    homeTeam: { name: 'Liverpool', logo: '🔴', score: 3 },
    awayTeam: { name: 'Tottenham', logo: '⚪', score: 1 },
    time: '72\'',
    status: 'Second Half',
    league: { name: 'Premier League', logo: '⚽' }
  }
];

const fixtures = [
  {
    homeTeam: { name: 'Real Madrid', logo: '⚪' },
    awayTeam: { name: 'Barcelona', logo: '🔵' },
    date: 'Tomorrow',
    time: '20:00',
    league: 'La Liga | Matchday 30'
  },
  {
    homeTeam: { name: 'Inter Milan', logo: '🔵' },
    awayTeam: { name: 'Juventus', logo: '⚫' },
    date: 'Tomorrow',
    time: '19:45',
    league: 'Serie A | Matchday 28'
  },
  {
    homeTeam: { name: 'Bayern Munich', logo: '🔴' },
    awayTeam: { name: 'Dortmund', logo: '🟡' },
    date: 'Tomorrow',
    time: '17:30',
    league: 'Bundesliga | Matchday 25'
  },
  {
    homeTeam: { name: 'Paris SG', logo: '🔵' },
    awayTeam: { name: 'Lyon', logo: '🔵' },
    date: 'This Week',
    time: '20:00',
    league: 'Ligue 1 | Matchday 27'
  }
];

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
  const [selectedDate, setSelectedDate] = useState('today');

  useEffect(() => {
    // Simulate live score updates
    const interval = setInterval(() => {
      console.log('Updating live scores...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map((match, index) => (
              <LiveMatchCard key={index} {...match} />
            ))}
          </div>
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
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fixtures.map((fixture, index) => (
              <FixtureCard key={index} {...fixture} />
            ))}
          </div>
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
