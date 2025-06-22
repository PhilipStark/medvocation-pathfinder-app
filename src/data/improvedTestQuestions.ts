
export const improvedQuestions = {
  // Split the generic technology question into two specific ones
  diagnosticTechnology: {
    id: 91,
    text: "Tenho interesse em tecnologias de diagnóstico por imagem (ultrassom, ressonância, tomografia)",
    category: "interests",
    weights: {
      'radiology': 0.9,
      'cardiology': 0.6,
      'neurology': 0.5,
      'emergency': 0.4,
      'internal_medicine': 0.4
    }
  },
  
  proceduralTechnology: {
    id: 92,
    text: "Tenho interesse em tecnologias cirúrgicas e procedimentais (robótica, laparoscopia, endoscopia)",
    category: "interests", 
    weights: {
      'surgery': 0.9,
      'orthopedics': 0.8,
      'anesthesiology': 0.3,
      'emergency': 0.4,
      'cardiology': 0.6
    }
  },

  // New questions for better differentiation
  workSchedulePreference: {
    id: 93,
    text: "Prefiro um horário de trabalho previsível e estruturado (9h às 17h)",
    category: "lifestyle",
    weights: {
      'family_medicine': 0.8,
      'dermatology': 0.9,
      'psychiatry': 0.7,
      'pathology': 0.8,
      'radiology': 0.7,
      'emergency': -0.8, // Negative weight - actively subtracts points
      'surgery': -0.6,
      'anesthesiology': -0.5
    }
  },

  longTermTrainingCommitment: {
    id: 94,
    text: "Estou disposto(a) a dedicar muitos anos (8+) para uma formação altamente especializada",
    category: "values",
    weights: {
      'surgery': 0.9,
      'cardiology': 0.8,
      'neurology': 0.8,
      'orthopedics': 0.7,
      'anesthesiology': 0.6,
      'family_medicine': -0.3,
      'emergency': 0.4
    }
  }
};
