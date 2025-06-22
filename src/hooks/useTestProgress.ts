
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
            responses: responses as any,
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
            responses: responses as any
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
          responses: session.responses as TestResponses || {},
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

  const saveTestResults = async (
    responses: TestResponses,
    scores: Record<string, number>,
    testDuration: number
  ) => {
    if (!user) {
      console.log('No user logged in, cannot save results to database');
      return null;
    }

    try {
      // First, get or create a test session
      let sessionId = progressData?.sessionId;
      
      if (!sessionId) {
        // Create a new session if one doesn't exist
        const { data: newSession } = await supabase
          .from('test_sessions')
          .insert({
            user_id: user.id,
            status: 'completed',
            responses: responses as any,
            completed_at: new Date().toISOString()
          })
          .select()
          .single();
        
        sessionId = newSession?.id;
      } else {
        // Update existing session to mark as completed
        await supabase
          .from('test_sessions')
          .update({
            status: 'completed',
            responses: responses as any,
            completed_at: new Date().toISOString()
          })
          .eq('id', sessionId);
      }

      if (!sessionId) {
        throw new Error('Failed to create or update test session');
      }

      // Save the test results with new columns
      const { data: results } = await supabase
        .from('test_results')
        .insert({
          session_id: sessionId,
          user_id: user.id,
          specialty_scores: scores as any,
          recommendations: null,
          is_unlocked: false, // Default to locked
          download_count: 0
        })
        .select()
        .single();

      console.log('Test results saved to Supabase:', results?.id);
      return sessionId;
    } catch (error) {
      console.error('Error saving test results to Supabase:', error);
      return null;
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
    clearProgress,
    saveTestResults
  };
};
