const API_BASE_URL = 'https://api.football-data.org/v4';
const API_KEY = '336920e9ddcd460ea904b2ab98b1164a';

export interface Match {
  id: number;
  homeTeam: {
    name: string;
    crest: string;
    score?: number;
  };
  awayTeam: {
    name: string;
    crest: string;
    score?: number;
  };
  utcDate: string;
  status: string;
  minute?: number;
  competition: {
    name: string;
    emblem: string;
  };
}

export interface Competition {
  id: number;
  name: string;
  emblem: string;
  area: {
    name: string;
    flag: string;
  };
}

const headers = {
  'X-Auth-Token': API_KEY,
  'Content-Type': 'application/json'
};

export const sportsApi = {
  // Get live matches
  async getLiveMatches(): Promise<Match[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/matches?status=LIVE`, {
        headers
      });
      if (!response.ok) {
        throw new Error('Failed to fetch live matches');
      }
      const data = await response.json();
      return data.matches || [];
    } catch (error) {
      console.error('Error fetching live matches:', error);
      return [];
    }
  },

  // Get upcoming fixtures
  async getUpcomingFixtures(days: number = 7): Promise<Match[]> {
    try {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + days);
      
      const dateFrom = today.toISOString().split('T')[0];
      const dateTo = futureDate.toISOString().split('T')[0];
      
      const response = await fetch(
        `${API_BASE_URL}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}&status=SCHEDULED`, 
        { headers }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch fixtures');
      }
      const data = await response.json();
      return data.matches || [];
    } catch (error) {
      console.error('Error fetching fixtures:', error);
      return [];
    }
  },

  // Get competitions
  async getCompetitions(): Promise<Competition[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/competitions`, {
        headers
      });
      if (!response.ok) {
        throw new Error('Failed to fetch competitions');
      }
      const data = await response.json();
      return data.competitions || [];
    } catch (error) {
      console.error('Error fetching competitions:', error);
      return [];
    }
  }
};
