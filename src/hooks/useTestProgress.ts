
import { useState, useEffect } from 'react';
import { TestResponses } from '@/types/test';

interface TestProgressData {
  sessionId: string;
  userId?: string;
  currentModule: string;
  currentQuestion: number;
  responses: TestResponses;
  savedAt: string;
}

export const useTestProgress = (userId?: string) => {
  const [progressData, setProgressData] = useState<TestProgressData | null>(null);

  const saveProgress = (
    currentModule: string,
    currentQuestion: number,
    responses: TestResponses
  ) => {
    const sessionId = Date.now().toString();
    const data: TestProgressData = {
      sessionId,
      userId,
      currentModule,
      currentQuestion,
      responses,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`test_progress_${userId || 'guest'}`, JSON.stringify(data));
    setProgressData(data);
    return sessionId;
  };

  const loadProgress = (): TestProgressData | null => {
    try {
      const saved = localStorage.getItem(`test_progress_${userId || 'guest'}`);
      if (saved) {
        const data = JSON.parse(saved);
        setProgressData(data);
        return data;
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    return null;
  };

  const clearProgress = () => {
    localStorage.removeItem(`test_progress_${userId || 'guest'}`);
    setProgressData(null);
  };

  useEffect(() => {
    loadProgress();
  }, [userId]);

  return {
    progressData,
    saveProgress,
    loadProgress,
    clearProgress
  };
};
