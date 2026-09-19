export interface StudentInfo {
  grade: string;
  classNum: string;
  studentNum: string;
  name: string;
  date: string;
}

export type Era = '옛날' | '오늘날';
export type Domain = '땅' | '바다' | '하늘';

export interface TransportItem {
  id: string;
  name: string;
  era: Era;
  domain: Domain;
  powerSource: string;
  iconName: string;
  description: string;
}

export interface TimelineStage {
  step: number;
  title: string;
  eraText: string;
  powerSource: string;
  example: string;
  hint: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'OX' | 'CHOICE' | 'CHOSUNG';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  chosungHint?: string;
}

export interface ScenarioQuestion {
  id: number;
  situation: string;
  targetEra: string;
  suggestedAnswers: string[];
  sampleReason: string;
  icon: string;
}

export interface FutureTransportDesign {
  name: string;
  domain: string;
  powerSource: string;
  feature1: string;
  feature2: string;
  feature3: string;
  drawDataUrl?: string;
}

export interface SelfEvaluation {
  interest: number; // 1 to 3
  participation: number; // 1 to 3
  understanding: number; // 1 to 3
  comment: string;
}
