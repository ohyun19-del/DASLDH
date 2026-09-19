import React from 'react';
import { TIMELINE_DATA } from '../data/transportData';
import { ArrowRight, Flame, Footprints, Sparkles, Zap, ShieldAlert, Check } from 'lucide-react';

interface Props {
  userTimelineAnswers: { [step: number]: string };
  onSelectPower: (step: number, answer: string) => void;
  showAnswers: boolean;
  hasGraded: boolean;
}

const POWER_CHOICES = [
  '사람의 근육 힘',
  '가축과 자연의 힘',
  '증기기관 (석탄과 기계)',
  '석유 엔진과 전기',
  '친환경 에너지와 AI'
];

export const Section2Timeline: React.FC<Props> = ({
  userTimelineAnswers,
  onSelectPower,
  showAnswers,
  hasGraded
}) => {
  return (
    <section className="mb-8 p-6 bg-[#ffffff] border border-[#111111]">
      <div className="flex items-center justify-between mb-4 border-b border-[#111111] pb-3">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#111111] text-white font-bold flex items-center justify-center text-xs">
            2
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#111111] tracking-tight uppercase">
            [활동 2] 교통수단은 무엇을 힘(동력)으로 움직였을까요?
          </h2>
        </div>
        <span className="text-xs px-3 py-1 bg-[#f5f5f5] text-[#111111] border border-[#cacacb] rounded-full font-bold">
          배점 25점
        </span>
      </div>

      <p className="text-sm text-[#39393b] mb-5 leading-relaxed">
        교통수단은 움직이는 <strong>‘힘(에너지원)’</strong>이 발전하면서 더욱 빠르고 편리해졌습니다.
        발달 순서에 맞추어 각 단계에 알맞은 힘의 원동력을 찾아 연결해 보세요.
      </p>

      {/* Timeline Steps */}
      <div className="space-y-3">
        {TIMELINE_DATA.map((item) => {
          const userAnswer = userTimelineAnswers[item.step];
          const isCorrect = userAnswer === item.power;

          return (
            <div
              key={item.step}
              className="p-4 border border-[#cacacb] bg-[#ffffff] hover:border-[#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#111111] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  {item.step}단계
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111111]">{item.title}</span>
                    <span className="text-[11px] text-[#707072] bg-[#f5f5f5] px-2 py-0.5 rounded-full border border-[#e5e5e5]">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-[#707072] text-xs mt-1">{item.features}</p>
                </div>
              </div>

              {/* Power source selection */}
              <div className="sm:w-64 shrink-0 flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-[#707072] uppercase tracking-wide">
                  움직이는 힘(동력):
                </span>
                <select
                  value={showAnswers ? item.power : (userAnswer || '')}
                  onChange={(e) => onSelectPower(item.step, e.target.value)}
                  className={`w-full p-2 text-xs font-medium border bg-[#ffffff] transition-colors cursor-pointer ${
                    hasGraded
                      ? isCorrect
                        ? 'border-[#007d48] text-[#007d48] bg-[#ffffff]'
                        : 'border-[#d30005] text-[#d30005] bg-[#ffffff]'
                      : 'border-[#cacacb] focus:outline-none focus:border-[#111111]'
                  }`}
                >
                  <option value="">[선택] 어떤 힘으로 움직였을까요?</option>
                  {POWER_CHOICES.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>

                {(hasGraded || showAnswers) && (
                  <div className="text-[11px] font-bold">
                    {showAnswers ? (
                      <span className="text-[#1151ff]">정답: {item.power}</span>
                    ) : isCorrect ? (
                      <span className="text-[#007d48] flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> 정답입니다!
                      </span>
                    ) : (
                      <span className="text-[#d30005] flex items-center gap-0.5">
                        <ShieldAlert className="w-3 h-3" /> 정답: {item.power}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3.5 bg-[#f5f5f5] border border-[#e5e5e5] text-xs text-[#39393b] flex items-center gap-2.5">
        <span className="font-bold text-[#111111] uppercase tracking-wide shrink-0">
          [핵심 정리]
        </span>
        <span className="leading-relaxed">
          사람의 힘 → 동물과 자연(바람)의 힘 → 기계 엔진(증기/석유) → 친환경 전기 및 인공지능으로 발달하고 있어요!
        </span>
      </div>
    </section>
  );
};
