
/**
 * Security utilities for the ScoreWeb application
 */

// Rate limiting configuration
export const RATE_LIMITS = {
  GENERAL_API: 100, // requests per minute
  AUTH_ATTEMPTS: 5, // login attempts per 15 minutes
  FORM_SUBMISSIONS: 10, // form submissions per minute
} as const;

// Input validation utilities
export const InputValidation = {
  /**
   * Sanitize HTML to prevent XSS attacks
   */
  sanitizeHtml: (input: string): string => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  /**
   * Validate password strength
   */
  isValidPassword: (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return { valid: errors.length === 0, errors };
  },

  /**
   * Sanitize user input to prevent injection attacks
   */
  sanitizeInput: (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .slice(0, 1000); // Limit input length
  },
};

// Security monitoring
export const SecurityMonitor = {
  /**
   * Log security events for monitoring
   */
  logSecurityEvent: (event: string, details: Record<string, any> = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // In production, this would send to a security monitoring service
    console.warn('[SECURITY EVENT]', logEntry);
  },

  /**
   * Detect potential security threats
   */
  detectSuspiciousActivity: (action: string, metadata: Record<string, any> = {}) => {
    const suspiciousPatterns = [
      /script/i,
      /javascript:/i,
      /on\w+=/i,
      /<.*>/,
      /union.*select/i,
      /drop.*table/i,
    ];

    const actionString = JSON.stringify({ action, ...metadata });
    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(actionString));

    if (isSuspicious) {
      SecurityMonitor.logSecurityEvent('SUSPICIOUS_ACTIVITY_DETECTED', {
        action,
        metadata,
        patterns: suspiciousPatterns.filter(p => p.test(actionString)),
      });
    }

    return isSuspicious;
  },
};

// Error handling utilities
export const SecureErrorHandler = {
  /**
   * Handle errors without exposing sensitive information
   */
  handleError: (error: Error | unknown, context: string = 'Unknown') => {
    const errorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Log the full error for debugging (server-side in production)
    console.error(`[${errorId}] Error in ${context}:`, error);
    
    // Log security event if error might be security-related
    if (error instanceof Error && (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('unauthorized')
    )) {
      SecurityMonitor.logSecurityEvent('POTENTIAL_SECURITY_ERROR', {
        errorId,
        context,
        message: error.message,
      });
    }

    // Return user-friendly error message
    return {
      success: false,
      message: 'An error occurred. Please try again.',
      errorId,
    };
  },
};

// HTTPS enforcement
export const enforceHttps = () => {
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
  }
};
