
import { testModules } from '@/data/testModules';
import { specialties } from '@/data/specialties';
import { TestResponses } from '@/types/test';

export const calculateResults = (responses: TestResponses) => {
  const scores: Record<string, number> = {};
  
  // Initialize scores
  specialties.forEach(specialty => {
    scores[specialty.id] = 0;
  });

  // Calculate weighted scores
  Object.entries(responses).forEach(([questionId, response]) => {
    const question = Object.values(testModules)
      .flatMap(module => module.questions)
      .find(q => q.id === parseInt(questionId));
    
    if (question) {
      Object.entries(question.weights).forEach(([specialtyId, weight]) => {
        if (scores[specialtyId] !== undefined) {
          scores[specialtyId] += (response - 1) * weight * 25; // Convert 1-5 scale to percentage
        }
      });
    }
  });

  // Normalize scores to 0-100 range
  Object.keys(scores).forEach(specialtyId => {
    scores[specialtyId] = Math.min(100, Math.max(0, scores[specialtyId]));
  });

  return scores;
};
