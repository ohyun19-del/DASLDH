import React from 'react';
import { QuizQuestion } from '../types';
import { Check, HelpCircle, AlertCircle } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  userAnswers: { [questionId: number]: string };
  onAnswer: (questionId: number, answer: string) => void;
  showAnswers: boolean;
  hasGraded: boolean;
}

export const Section3Quiz: React.FC<Props> = ({
  questions,
  userAnswers,
  onAnswer,
  showAnswers,
  hasGraded
}) => {
  return (
    <section className="mb-8 p-6 bg-[#ffffff] border border-[#111111]">
      <div className="flex items-center justify-between mb-4 border-b border-[#111111] pb-3">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#111111] text-white font-bold flex items-center justify-center text-xs">
            3
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#111111] tracking-tight uppercase">
            [활동 3] 생각 쑥쑥! 교통수단 발달과 생활 모습 탐구 퀴즈
          </h2>
        </div>
        <span className="text-xs px-3 py-1 bg-[#f5f5f5] text-[#111111] border border-[#cacacb] rounded-full font-bold">
          배점 25점
        </span>
      </div>

      <p className="text-sm text-[#39393b] mb-5 leading-relaxed">
        교통수단의 발달로 사람들의 생활 모습이 어떻게 달라졌는지 깊이 생각해 보며 퀴즈를 풀어보세요.
      </p>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const currentAnswer = userAnswers[q.id] || '';
          const isCorrect = currentAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

          return (
            <div
              key={q.id}
              className="p-4 border border-[#cacacb] bg-[#ffffff] hover:border-[#111111] transition-colors"
            >
              <div className="flex items-start gap-2.5 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#111111] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <p className="text-sm font-bold text-[#111111] leading-snug">
                  {q.question}
                </p>
              </div>

              {/* Quiz UI based on type */}
              <div className="pl-7 mt-2">
                {q.type === 'OX' && (
                  <div className="flex items-center gap-3">
                    {['O', 'X'].map((option) => {
                      const isSelected = (showAnswers ? q.correctAnswer === option : currentAnswer === option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => onAnswer(q.id, option)}
                          className={`w-14 h-10 rounded-full font-black text-sm border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#111111] text-white border-[#111111]'
                              : 'bg-[#ffffff] border-[#cacacb] text-[#111111] hover:bg-[#f5f5f5]'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.type === 'CHOICE' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = (showAnswers ? opt === q.correctAnswer : currentAnswer === opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => onAnswer(q.id, opt)}
                          className={`p-3 border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-[#111111] border-[#111111] text-white font-bold'
                              : 'bg-[#ffffff] border-[#cacacb] text-[#111111] hover:bg-[#f5f5f5]'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 font-bold ${
                            isSelected ? 'border-white text-white' : 'border-[#cacacb] text-[#707072]'
                          }`}>
                            {oIdx + 1}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.type === 'CHOSUNG' && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 mt-1">
                    <span className="text-xs font-bold text-[#111111] bg-[#f5f5f5] border border-[#cacacb] px-3 py-1.5 rounded-full w-fit">
                      초성 힌트: {q.chosungHint}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={showAnswers ? q.correctAnswer : currentAnswer}
                        onChange={(e) => onAnswer(q.id, e.target.value)}
                        placeholder="정답 5글자 입력"
                        className="px-3 py-1.5 border border-[#cacacb] text-sm font-bold text-[#111111] focus:outline-none focus:border-[#111111] bg-[#ffffff]"
                      />
                    </div>
                  </div>
                )}

                {/* Explanation / Result */}
                {(hasGraded || showAnswers) && (
                  <div className="mt-3 p-3 bg-[#f5f5f5] border border-[#e5e5e5] text-xs">
                    {showAnswers ? (
                      <p className="text-[#1151ff]">
                        <strong>정답:</strong> {q.correctAnswer} — {q.explanation}
                      </p>
                    ) : isCorrect ? (
                      <p className="text-[#007d48] flex items-center gap-1 font-semibold">
                        <Check className="w-3.5 h-3.5" /> 정답입니다! {q.explanation}
                      </p>
                    ) : (
                      <p className="text-[#d30005] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> 정답: [{q.correctAnswer}] — {q.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
