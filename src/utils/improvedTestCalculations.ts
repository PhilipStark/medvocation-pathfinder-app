
import { testModules } from '@/data/testModules';
import { TestResponses } from '@/types/test';
import { improvedQuestions } from '@/data/improvedTestQuestions';

export const calculateImprovedResults = (responses: TestResponses) => {
  const scores: Record<string, number> = {};
  
  // Module weights
  const moduleWeights: Record<string, number> = {
    personality: 1.0,
    interests: 1.3,
    lifestyle: 1.1,
    values: 1.2
  };
  
  // Initialize scores
  const allSpecialties = [
    'emergency', 'surgery', 'cardiology', 'anesthesiology', 'psychiatry',
    'dermatology', 'radiology', 'pathology', 'pediatrics', 'family_medicine',
    'internal_medicine', 'orthopedics', 'neurology', 'oncology'
  ];
  
  allSpecialties.forEach(specialty => {
    scores[specialty] = 0;
  });

  // Process original questions
  Object.entries(testModules).forEach(([moduleKey, module]) => {
    const moduleWeight = moduleWeights[moduleKey] || 1.0;
    
    module.questions.forEach(question => {
      const response = responses[question.id];
      if (response !== undefined) {
        Object.entries(question.weights).forEach(([specialtyId, weight]) => {
          if (scores[specialtyId] !== undefined) {
            const normalizedResponse = (response - 1) / 4;
            const contributionScore = normalizedResponse * weight * moduleWeight;
            scores[specialtyId] += contributionScore * 100;
          }
        });
      }
    });
  });

  // Process improved questions with negative weights and knockout logic
  Object.values(improvedQuestions).forEach(question => {
    const response = responses[question.id];
    if (response !== undefined) {
      Object.entries(question.weights).forEach(([specialtyId, weight]) => {
        if (scores[specialtyId] !== undefined) {
          const normalizedResponse = (response - 1) / 4;
          
          // Handle negative weights
          if (weight < 0) {
            // Strong agreement (response 4-5) with negative weight statements
            // heavily penalizes incompatible specialties
            if (response >= 4) {
              const penalty = Math.abs(weight) * normalizedResponse * 150; // Amplified penalty
              scores[specialtyId] -= penalty;
            }
          } else {
            // Positive weights work as before
            const contributionScore = normalizedResponse * weight * 100;
            scores[specialtyId] += contributionScore;
          }
          
          // Knockout logic for critical questions
          if (question.id === 94 && response <= 2) { // Low commitment to long training
            // Heavily penalize specialties requiring extensive training
            const highTrainingSpecialties = ['surgery', 'cardiology', 'neurology', 'orthopedics'];
            if (highTrainingSpecialties.includes(specialtyId)) {
              scores[specialtyId] -= 200; // Heavy knockout penalty
            }
          }
        }
      });
    }
  });

  // Ensure no negative scores
  Object.keys(scores).forEach(specialtyId => {
    scores[specialtyId] = Math.max(0, scores[specialtyId]);
  });

  // Normalize scores to 0-100 range
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  const range = maxScore - minScore;
  
  const normalizedScores: Record<string, number> = {};
  
  if (range > 0) {
    Object.entries(scores).forEach(([specialtyId, score]) => {
      const normalizedScore = ((score - minScore) / range) * 85 + 15;
      normalizedScores[specialtyId] = Math.round(normalizedScore);
    });
  } else {
    Object.keys(scores).forEach(specialtyId => {
      normalizedScores[specialtyId] = 50;
    });
  }

  return normalizedScores;
};
