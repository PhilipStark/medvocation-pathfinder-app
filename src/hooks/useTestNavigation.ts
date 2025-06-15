
import { useState } from 'react';
import { testModules } from '@/data/testModules';

export const useTestNavigation = () => {
  const [currentModule, setCurrentModule] = useState<keyof typeof testModules>('personality');
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const moduleKeys = Object.keys(testModules) as Array<keyof typeof testModules>;
  const currentModuleData = testModules[currentModule];
  const currentQuestionData = currentModuleData.questions[currentQuestion];

  const handleNext = () => {
    const currentModuleIndex = moduleKeys.indexOf(currentModule);
    const isLastQuestionInModule = currentQuestion === currentModuleData.questions.length - 1;
    const isLastModule = currentModuleIndex === moduleKeys.length - 1;

    if (isLastQuestionInModule) {
      if (isLastModule) {
        return 'review';
      } else {
        setCurrentModule(moduleKeys[currentModuleIndex + 1]);
        setCurrentQuestion(0);
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
    return 'continue';
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      const currentModuleIndex = moduleKeys.indexOf(currentModule);
      if (currentModuleIndex > 0) {
        const prevModule = moduleKeys[currentModuleIndex - 1];
        setCurrentModule(prevModule);
        setCurrentQuestion(testModules[prevModule].questions.length - 1);
      }
    }
  };

  const canGoBack = !(currentModule === 'personality' && currentQuestion === 0);
  const isLastQuestion = currentModule === moduleKeys[moduleKeys.length - 1] && 
                       currentQuestion === currentModuleData.questions.length - 1;

  return {
    currentModule,
    currentQuestion,
    currentModuleData,
    currentQuestionData,
    moduleKeys,
    handleNext,
    handlePrevious,
    canGoBack,
    isLastQuestion
  };
};
