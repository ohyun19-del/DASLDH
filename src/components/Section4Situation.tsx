import React from 'react';
import { SCENARIO_QUESTIONS } from '../data/transportData';
import { Plane, Ship, Train, Sparkles, Check, HelpCircle } from 'lucide-react';

interface Props {
  userScenarios: { [id: number]: { transport: string; reason: string } };
  onChangeTransport: (id: number, transport: string) => void;
  onChangeReason: (id: number, reason: string) => void;
  showAnswers: boolean;
  hasGraded: boolean;
}

const SCENARIO_ICONS: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-4 h-4 text-[#111111]" />,
  Ship: <Ship className="w-4 h-4 text-[#111111]" />,
  Train: <Train className="w-4 h-4 text-[#111111]" />
};

export const Section4Situation: React.FC<Props> = ({
  userScenarios,
  onChangeTransport,
  onChangeReason,
  showAnswers,
  hasGraded
}) => {
  return (
    <section className="mb-8 p-6 bg-[#ffffff] border border-[#111111]">
      <div className="flex items-center justify-between mb-4 border-b border-[#111111] pb-3">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#111111] text-white font-bold flex items-center justify-center text-xs">
            4
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#111111] tracking-tight uppercase">
            [활동 4] 실생활 문제 해결: 상황별 알맞은 교통수단 추천하기
          </h2>
        </div>
        <span className="text-xs px-3 py-1 bg-[#f5f5f5] text-[#111111] border border-[#cacacb] rounded-full font-bold">
          배점 25점
        </span>
      </div>

      <p className="text-sm text-[#39393b] mb-5 leading-relaxed">
        우리는 목적지, 짐의 양, 걸리는 시간에 따라 서로 다른 교통수단을 선택합니다.
        다음 상황에 가장 알맞은 교통수단과 그 <strong>까닭</strong>을 써 보세요.
      </p>

      <div className="space-y-4">
        {SCENARIO_QUESTIONS.map((sc, index) => {
          const current = userScenarios[sc.id] || { transport: '', reason: '' };
          const isTransportFilled = current.transport.trim().length > 0;
          const isReasonFilled = current.reason.trim().length > 4;
          const isWellDone = isTransportFilled && isReasonFilled;

          return (
            <div
              key={sc.id}
              className="p-4 border border-[#cacacb] bg-[#ffffff] hover:border-[#111111] transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center shrink-0">
                  {SCENARIO_ICONS[sc.icon]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#111111] bg-[#f5f5f5] px-2.5 py-0.5 rounded-full border border-[#cacacb]">
                      상황 {index + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#111111] mt-1.5 leading-snug">{sc.situation}</h3>
                </div>
              </div>

              {/* Input areas */}
              <div className="space-y-3 mt-3 pl-0 sm:pl-11">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm">
                  <label htmlFor={`transport-choice-${sc.id}`} className="font-bold text-[#707072] sm:w-28 shrink-0">
                    추천 교통수단:
                  </label>
                  <input
                    id={`transport-choice-${sc.id}`}
                    type="text"
                    value={showAnswers ? sc.suggestedAnswers[0] : current.transport}
                    onChange={(e) => onChangeTransport(sc.id, e.target.value)}
                    placeholder="예: 비행기, 화물선, 지하철 등"
                    className="flex-1 p-2.5 border border-[#cacacb] font-semibold text-[#111111] bg-[#ffffff] focus:outline-none focus:border-[#111111] text-xs sm:text-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 text-xs sm:text-sm">
                  <label htmlFor={`transport-reason-${sc.id}`} className="font-bold text-[#707072] sm:w-28 shrink-0 pt-2">
                    추천하는 까닭:
                  </label>
                  <textarea
                    id={`transport-reason-${sc.id}`}
                    rows={2}
                    value={showAnswers ? sc.sampleReason : current.reason}
                    onChange={(e) => onChangeReason(sc.id, e.target.value)}
                    placeholder="왜 이 교통수단이 가장 알맞을까요? (예: 바다를 건너 가장 빠르게 갈 수 있어서)"
                    className="flex-1 p-2.5 border border-[#cacacb] text-[#111111] bg-[#ffffff] focus:outline-none focus:border-[#111111] text-xs sm:text-sm leading-relaxed"
                  />
                </div>
              </div>

              {/* Answer Guide */}
              {(hasGraded || showAnswers) && (
                <div className="mt-3.5 p-3 bg-[#f5f5f5] border border-[#e5e5e5] text-xs">
                  {showAnswers ? (
                    <p className="text-[#1151ff]">
                      <strong>모범 답안:</strong> [{sc.suggestedAnswers.join(' 또는 ')}] — <em>{sc.sampleReason}</em>
                    </p>
                  ) : isWellDone ? (
                    <p className="text-[#007d48] flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> 멋진 선택과 논리적인 까닭이에요!
                    </p>
                  ) : (
                    <p className="text-[#d30005] flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> 알맞은 교통수단 이름과 까닭을 5자 이상 적어보세요!
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
