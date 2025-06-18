
import { useState, useEffect } from 'react';
import { TestResponses } from '@/types/test';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface TestProgressData {
  sessionId: string;
  userId?: string;
  currentModule: string;
  currentQuestion: number;
  responses: TestResponses;
  savedAt: string;
}

export const useTestProgress = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<TestProgressData | null>(null);

  const saveProgress = async (
    currentModule: string,
    currentQuestion: number,
    responses: TestResponses
  ) => {
    if (!user) {
      console.log('No user logged in, saving to localStorage');
      const sessionId = Date.now().toString();
      const data: TestProgressData = {
        sessionId,
        currentModule,
        currentQuestion,
        responses,
        savedAt: new Date().toISOString()
      };
      
      localStorage.setItem('test_progress_guest', JSON.stringify(data));
      setProgressData(data);
      return sessionId;
    }

    try {
      // First, check if there's an existing session in progress
      const { data: existingSessions } = await supabase
        .from('test_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'in_progress')
        .order('created_at', { ascending: false })
        .limit(1);

      let sessionId: string;

      if (existingSessions && existingSessions.length > 0) {
        // Update existing session
        sessionId = existingSessions[0].id;
        await supabase
          .from('test_sessions')
          .update({
            current_module: currentModule,
            current_question: currentQuestion,
            responses: responses,
            updated_at: new Date().toISOString()
          })
          .eq('id', sessionId);
      } else {
        // Create new session
        const { data: newSession } = await supabase
          .from('test_sessions')
          .insert({
            user_id: user.id,
            status: 'in_progress',
            current_module: currentModule,
            current_question: currentQuestion,
            responses: responses
          })
          .select()
          .single();

        sessionId = newSession?.id || Date.now().toString();
      }

      const data: TestProgressData = {
        sessionId,
        userId: user.id,
        currentModule,
        currentQuestion,
        responses,
        savedAt: new Date().toISOString()
      };

      setProgressData(data);
      console.log('Progress saved to Supabase:', sessionId);
      return sessionId;
    } catch (error) {
      console.error('Error saving progress to Supabase:', error);
      // Fallback to localStorage
      return saveProgress(currentModule, currentQuestion, responses);
    }
  };

  const loadProgress = async (): Promise<TestProgressData | null> => {
    if (!user) {
      console.log('No user logged in, loading from localStorage');
      try {
        const saved = localStorage.getItem('test_progress_guest');
        if (saved) {
          const data = JSON.parse(saved);
          setProgressData(data);
          return data;
        }
      } catch (error) {
        console.error('Error loading progress from localStorage:', error);
      }
      return null;
    }

    try {
      const { data: sessions } = await supabase
        .from('test_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'in_progress')
        .order('updated_at', { ascending: false })
        .limit(1);

      if (sessions && sessions.length > 0) {
        const session = sessions[0];
        const data: TestProgressData = {
          sessionId: session.id,
          userId: session.user_id,
          currentModule: session.current_module || '',
          currentQuestion: session.current_question || 0,
          responses: session.responses || {},
          savedAt: session.updated_at
        };
        setProgressData(data);
        console.log('Progress loaded from Supabase:', data.sessionId);
        return data;
      }
    } catch (error) {
      console.error('Error loading progress from Supabase:', error);
    }
    return null;
  };

  const clearProgress = async () => {
    if (!user) {
      localStorage.removeItem('test_progress_guest');
      setProgressData(null);
      return;
    }

    try {
      if (progressData?.sessionId) {
        await supabase
          .from('test_sessions')
          .update({ status: 'completed' })
          .eq('id', progressData.sessionId);
      }
      setProgressData(null);
      console.log('Progress cleared from Supabase');
    } catch (error) {
      console.error('Error clearing progress from Supabase:', error);
    }
  };

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  return {
    progressData,
    saveProgress,
    loadProgress,
    clearProgress
  };
};
