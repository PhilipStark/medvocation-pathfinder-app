
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TestContainer from '@/components/test/TestContainer';
import { TestLoadingSkeleton } from '@/components/ui/loading-skeleton';

const Test = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <TestLoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <TestContainer />
      </div>
    </div>
  );
};

export default Test;
