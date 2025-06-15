
export interface TestQuestion {
  id: number;
  text: string;
  weights: Record<string, number>;
}

export interface TestModule {
  title: string;
  icon: any;
  description: string;
  questions: TestQuestion[];
}

export interface Specialty {
  id: string;
  name: string;
  category: string;
}

export interface TestResponses {
  [questionId: number]: number;
}

export interface TestResults {
  sessionId: string;
  userId?: string;
  responses: TestResponses;
  scores: Record<string, number>;
  completedAt: string;
  testDuration: number;
}
