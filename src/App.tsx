import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StudentInfo, FutureTransportDesign, SelfEvaluation } from './types';
import {
  INITIAL_TRANSPORT_ITEMS,
  QUIZ_QUESTIONS,
  SCENARIO_QUESTIONS,
  TIMELINE_DATA
} from './data/transportData';
import { WorksheetHeader } from './components/WorksheetHeader';
import { Section1Classification } from './components/Section1Classification';
import { Section2Timeline } from './components/Section2Timeline';
import { Section3Quiz } from './components/Section3Quiz';
import { Section4Situation } from './components/Section4Situation';
import { Section5FutureDrawing } from './components/Section5FutureDrawing';
import { WorksheetFooter } from './components/WorksheetFooter';
import { TeacherAnswerModal } from './components/TeacherAnswerModal';

const STORAGE_KEY = 'TRANSPORTATION_WORKSHEET_V1';

export default function App() {
  // Student Info
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_info');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const today = new Date();
    const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    return { grade: '3', classNum: '', studentNum: '', name: '', date: dateStr };
  });

  // Section 1 State
  const [classifiedEra, setClassifiedEra] = useState<{ [itemId: string]: '옛날' | '오늘날' | null }>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_sec1');
    return saved ? JSON.parse(saved) : {};
  });

  // Section 2 State
  const [userTimelineAnswers, setUserTimelineAnswers] = useState<{ [step: number]: string }>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_sec2');
    return saved ? JSON.parse(saved) : {};
  });

  // Section 3 State
  const [userQuizAnswers, setUserQuizAnswers] = useState<{ [id: number]: string }>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_sec3');
    return saved ? JSON.parse(saved) : {};
  });

  // Section 4 State
  const [userScenarios, setUserScenarios] = useState<{ [id: number]: { transport: string; reason: string } }>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_sec4');
    return saved ? JSON.parse(saved) : {};
  });

  // Section 5 State
  const [futureDesign, setFutureDesign] = useState<FutureTransportDesign>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_sec5');
    return saved ? JSON.parse(saved) : {
      name: '',
      domain: '',
      powerSource: '',
      feature1: '',
      feature2: '',
      feature3: '',
      drawDataUrl: ''
    };
  });

  // Footer Self Eval
  const [selfEval, setSelfEval] = useState<SelfEvaluation>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_eval');
    return saved ? JSON.parse(saved) : { interest: 3, participation: 3, understanding: 3, comment: '' };
  });

  // UI Control states
  const [isPrintOnlyView, setIsPrintOnlyView] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [hasGraded, setHasGraded] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_info', JSON.stringify(studentInfo));
    localStorage.setItem(STORAGE_KEY + '_sec1', JSON.stringify(classifiedEra));
    localStorage.setItem(STORAGE_KEY + '_sec2', JSON.stringify(userTimelineAnswers));
    localStorage.setItem(STORAGE_KEY + '_sec3', JSON.stringify(userQuizAnswers));
    localStorage.setItem(STORAGE_KEY + '_sec4', JSON.stringify(userScenarios));
    localStorage.setItem(STORAGE_KEY + '_sec5', JSON.stringify(futureDesign));
    localStorage.setItem(STORAGE_KEY + '_eval', JSON.stringify(selfEval));
  }, [studentInfo, classifiedEra, userTimelineAnswers, userQuizAnswers, userScenarios, futureDesign, selfEval]);

  // Handle classification
  const handleClassify = (itemId: string, era: '옛날' | '오늘날') => {
    setClassifiedEra((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === era ? null : era
    }));
  };

  // Timeline handler
  const handleSelectPower = (step: number, answer: string) => {
    setUserTimelineAnswers((prev) => ({ ...prev, [step]: answer }));
  };

  // Quiz handler
  const handleQuizAnswer = (id: number, answer: string) => {
    setUserQuizAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  // Scenario handlers
  const handleChangeTransport = (id: number, transport: string) => {
    setUserScenarios((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || { transport: '', reason: '' }), transport }
    }));
  };

  const handleChangeReason = (id: number, reason: string) => {
    setUserScenarios((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || { transport: '', reason: '' }), reason }
    }));
  };

  // Future design handler
  const handleUpdateDesign = (updated: Partial<FutureTransportDesign>) => {
    setFutureDesign((prev) => ({ ...prev, ...updated }));
  };

  // Grade calculation
  const handleGrade = () => {
    let total = 0;

    // Sec 1: 25 pts (8 items)
    let sec1Correct = 0;
    INITIAL_TRANSPORT_ITEMS.forEach((item) => {
      if (classifiedEra[item.id] === item.era) sec1Correct++;
    });
    total += Math.round((sec1Correct / INITIAL_TRANSPORT_ITEMS.length) * 25);

    // Sec 2: 25 pts (5 steps)
    let sec2Correct = 0;
    TIMELINE_DATA.forEach((t) => {
      if (userTimelineAnswers[t.step] === t.power) sec2Correct++;
    });
    total += Math.round((sec2Correct / TIMELINE_DATA.length) * 25);

    // Sec 3: 25 pts (4 questions)
    let sec3Correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      const userAns = (userQuizAnswers[q.id] || '').trim().toLowerCase();
      if (userAns === q.correctAnswer.trim().toLowerCase()) sec3Correct++;
    });
    total += Math.round((sec3Correct / QUIZ_QUESTIONS.length) * 25);

    // Sec 4: 25 pts (3 scenarios)
    let sec4Correct = 0;
    SCENARIO_QUESTIONS.forEach((sc) => {
      const cur = userScenarios[sc.id];
      if (cur && cur.transport.trim().length > 0) {
        const isMatched = sc.suggestedAnswers.some(ans => cur.transport.includes(ans));
        if (isMatched && cur.reason.trim().length >= 3) {
          sec4Correct += 1;
        } else if (isMatched || cur.transport.trim().length > 0) {
          sec4Correct += 0.5;
        }
      }
    });
    total += Math.round((sec4Correct / SCENARIO_QUESTIONS.length) * 25);

    // Bound 0 to 100
    const finalScore = Math.min(100, Math.max(0, total));
    setScore(finalScore);
    setHasGraded(true);

    // Confetti effect on high score
    if (finalScore >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  // Reset
  const handleReset = () => {
    if (window.confirm('작성한 내용을 모두 지우고 처음부터 다시 시작할까요?')) {
      setClassifiedEra({});
      setUserTimelineAnswers({});
      setUserQuizAnswers({});
      setUserScenarios({});
      setFutureDesign({
        name: '',
        domain: '',
        powerSource: '',
        feature1: '',
        feature2: '',
        feature3: '',
        drawDataUrl: ''
      });
      setHasGraded(false);
      setScore(null);
    }
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#111111] py-4 sm:py-10 px-2 sm:px-6">
      {/* Outer wrapper */}
      <main className="worksheet-container max-w-4xl mx-auto bg-[#ffffff] border border-[#111111] p-5 sm:p-10 shadow-none">
        {/* Header */}
        <WorksheetHeader
          studentInfo={studentInfo}
          setStudentInfo={setStudentInfo}
          isPrintOnlyView={isPrintOnlyView}
          setIsPrintOnlyView={setIsPrintOnlyView}
          showAnswers={showAnswers}
          setShowAnswers={setShowAnswers}
          onPrint={handlePrint}
          onReset={handleReset}
          onGrade={handleGrade}
          score={score}
          hasGraded={hasGraded}
        />

        {/* Section 1: Classification */}
        <Section1Classification
          items={INITIAL_TRANSPORT_ITEMS}
          classifiedEra={classifiedEra}
          onClassify={handleClassify}
          showAnswers={showAnswers}
          hasGraded={hasGraded}
          isPrintOnlyView={isPrintOnlyView}
        />

        {/* Section 2: Timeline & Power Source */}
        <Section2Timeline
          userTimelineAnswers={userTimelineAnswers}
          onSelectPower={handleSelectPower}
          showAnswers={showAnswers}
          hasGraded={hasGraded}
        />

        {/* Page Break for Print Formatting */}
        <div className="page-break" />

        {/* Section 3: Quiz */}
        <Section3Quiz
          questions={QUIZ_QUESTIONS}
          userAnswers={userQuizAnswers}
          onAnswer={handleQuizAnswer}
          showAnswers={showAnswers}
          hasGraded={hasGraded}
        />

        {/* Section 4: Situation-based Recommendations */}
        <Section4Situation
          userScenarios={userScenarios}
          onChangeTransport={handleChangeTransport}
          onChangeReason={handleChangeReason}
          showAnswers={showAnswers}
          hasGraded={hasGraded}
        />

        {/* Section 5: Future Transport Creation */}
        <Section5FutureDrawing
          design={futureDesign}
          onChangeDesign={handleUpdateDesign}
          isPrintOnlyView={isPrintOnlyView}
        />

        {/* Footer & Self-Evaluation */}
        <WorksheetFooter
          selfEval={selfEval}
          setSelfEval={setSelfEval}
          score={score}
          hasGraded={hasGraded}
          onGrade={handleGrade}
          onPrint={handlePrint}
        />
      </main>

      {/* Floating Teacher Guide Button (No print) */}
      <div className="no-print fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsTeacherModalOpen(true)}
          className="h-11 px-5 bg-[#111111] hover:bg-[#39393b] text-white rounded-full font-bold border border-[#111111] flex items-center gap-2 text-xs transition-all active:scale-95 cursor-pointer shadow-lg"
        >
          <span>교사용 지도안 & 정답표</span>
        </button>
      </div>

      {/* Teacher Guide Modal */}
      <TeacherAnswerModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
      />
    </div>
  );
}
