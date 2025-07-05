
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { enforceHttps, SecurityMonitor } from '../utils/security';

interface SecurityContextType {
  reportSecurityEvent: (event: string, details?: Record<string, any>) => void;
  isSecureConnection: boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const isSecureConnection = location.protocol === 'https:' || location.hostname === 'localhost';

  useEffect(() => {
    // Enforce HTTPS in production
    if (process.env.NODE_ENV === 'production') {
      enforceHttps();
    }

    // Initialize security monitoring
    SecurityMonitor.logSecurityEvent('APP_INITIALIZED', {
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      secure: isSecureConnection,
    });

    // Monitor for console tampering attempts
    const originalConsole = { ...console };
    let consoleWarningShown = false;

    Object.keys(console).forEach(key => {
      const originalMethod = (console as any)[key];
      (console as any)[key] = function(...args: any[]) {
        if (!consoleWarningShown && args.some(arg => 
          typeof arg === 'string' && (
            arg.includes('script') || 
            arg.includes('javascript:') ||
            arg.includes('eval(')
          )
        )) {
          SecurityMonitor.logSecurityEvent('CONSOLE_TAMPERING_DETECTED', { method: key, args });
          consoleWarningShown = true;
        }
        return originalMethod.apply(console, args);
      };
    });

    // Clean up on unmount
    return () => {
      Object.assign(console, originalConsole);
    };
  }, [isSecureConnection]);

  const reportSecurityEvent = (event: string, details?: Record<string, any>) => {
    SecurityMonitor.logSecurityEvent(event, details);
  };

  const contextValue: SecurityContextType = {
    reportSecurityEvent,
    isSecureConnection,
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
