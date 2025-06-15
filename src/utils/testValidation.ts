
import { TestResponses } from '@/types/test';
import { testModules } from '@/data/testModules';

export const validateTestResponses = (responses: TestResponses) => {
  const totalQuestions = Object.values(testModules).reduce((acc, module) => acc + module.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  
  return {
    isComplete: answeredQuestions === totalQuestions,
    completionRate: (answeredQuestions / totalQuestions) * 100,
    missingQuestions: totalQuestions - answeredQuestions
  };
};

export const getTestProgress = (responses: TestResponses) => {
  const moduleKeys = Object.keys(testModules) as Array<keyof typeof testModules>;
  const progress: Record<string, { answered: number; total: number; percentage: number }> = {};
  
  moduleKeys.forEach(moduleKey => {
    const module = testModules[moduleKey];
    const answered = module.questions.filter(q => responses[q.id] !== undefined).length;
    const total = module.questions.length;
    
    progress[moduleKey] = {
      answered,
      total,
      percentage: (answered / total) * 100
    };
  });
  
  return progress;
};

export const normalizeScores = (scores: Record<string, number>) => {
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  const range = maxScore - minScore;
  
  if (range === 0) return scores;
  
  const normalized: Record<string, number> = {};
  Object.entries(scores).forEach(([key, value]) => {
    normalized[key] = Math.round(((value - minScore) / range) * 100);
  });
  
  return normalized;
};
