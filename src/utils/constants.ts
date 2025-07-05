
/**
 * Application constants and configuration
 */

// Security configuration
export const SECURITY_CONFIG = {
  // Session timeout (in milliseconds)
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  
  // Rate limiting
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  MAX_LOGIN_ATTEMPTS: 5,
  MAX_API_REQUESTS: 100,
  
  // Password requirements
  MIN_PASSWORD_LENGTH: 8,
  
  // File upload limits (when implemented)
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Input validation
  MAX_INPUT_LENGTH: 1000,
  MAX_COMMENT_LENGTH: 500,
} as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
  MATCHES: '/api/matches',
  FIXTURES: '/api/fixtures',
  NEWS: '/api/news',
  LEAGUES: '/api/leagues',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'An error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMITED: 'Too many requests. Please wait and try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  DELETED: 'Item deleted successfully.',
  UPDATED: 'Updated successfully.',
} as const;
