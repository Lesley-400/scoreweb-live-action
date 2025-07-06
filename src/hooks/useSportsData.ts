
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sportsApi, Match } from '../services/sportsApi';

export const useLiveMatches = () => {
  return useQuery({
    queryKey: ['liveMatches'],
    queryFn: sportsApi.getLiveMatches,
    refetchInterval: 30000, // Refetch every 30 seconds for live updates
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};

export const useUpcomingFixtures = (days: number = 7) => {
  return useQuery({
    queryKey: ['fixtures', days],
    queryFn: () => sportsApi.getUpcomingFixtures(days),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCompetitions = () => {
  return useQuery({
    queryKey: ['competitions'],
    queryFn: sportsApi.getCompetitions,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
