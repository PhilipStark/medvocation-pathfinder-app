
import React, { useEffect } from 'react';

declare global {
  interface Window {
    plausible: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

interface AnalyticsProps {
  domain?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ domain = "medvocation.com" }) => {
  useEffect(() => {
    // Load Plausible script
    const script = document.createElement('script');
    script.defer = true;
    script.src = `https://plausible.io/js/script.js`;
    script.setAttribute('data-domain', domain);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [domain]);

  return null;
};

export const trackEvent = (eventName: string, props?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props });
  }
};

export default Analytics;
