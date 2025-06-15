
import { testModules } from '@/data/testModules';
import { specialties } from '@/data/specialties';
import { TestResponses } from '@/types/test';
import { normalizeScores } from './testValidation';

export const calculateResults = (responses: TestResponses) => {
  const scores: Record<string, number> = {};
  const moduleWeights: Record<string, number> = {
    personality: 1.2,
    interests: 1.5,
    lifestyle: 1.0,
    values: 1.1
  };
  
  // Initialize scores
  specialties.forEach(specialty => {
    scores[specialty.id] = 0;
  });

  // Calculate weighted scores by module
  Object.entries(testModules).forEach(([moduleKey, module]) => {
    const moduleWeight = moduleWeights[moduleKey] || 1.0;
    
    module.questions.forEach(question => {
      const response = responses[question.id];
      if (response !== undefined) {
        Object.entries(question.weights).forEach(([specialtyId, weight]) => {
          if (scores[specialtyId] !== undefined) {
            // Convert 1-5 scale to 0-1, then apply weights and module importance
            const normalizedResponse = (response - 1) / 4;
            scores[specialtyId] += normalizedResponse * weight * moduleWeight * 25;
          }
        });
      }
    });
  });

  // Normalize scores to 0-100 range for better comparison
  const normalizedScores = normalizeScores(scores);

  // Ensure minimum variance for meaningful results
  Object.keys(normalizedScores).forEach(specialtyId => {
    normalizedScores[specialtyId] = Math.min(100, Math.max(5, normalizedScores[specialtyId]));
  });

  return normalizedScores;
};

export const getTopSpecialties = (scores: Record<string, number>, limit: number = 5) => {
  return Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([id, score]) => ({
      specialty: specialties.find(s => s.id === id),
      score: Math.round(score)
    }))
    .filter(item => item.specialty);
};

export const getScoreInterpretation = (score: number) => {
  if (score >= 85) return { level: 'Excelente', color: 'text-green-600', bg: 'bg-green-100' };
  if (score >= 70) return { level: 'Muito Bom', color: 'text-blue-600', bg: 'bg-blue-100' };
  if (score >= 55) return { level: 'Bom', color: 'text-yellow-600', bg: 'bg-yellow-100' };
  if (score >= 40) return { level: 'Moderado', color: 'text-orange-600', bg: 'bg-orange-100' };
  return { level: 'Baixo', color: 'text-red-600', bg: 'bg-red-100' };
};
