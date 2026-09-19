import React from 'react';
import { TransportItem } from '../types';
import { Users, Train, Ship, Plane, Footprints, Bus, Wind, Anchor, Check, AlertCircle } from 'lucide-react';

interface Props {
  items: TransportItem[];
  classifiedEra: { [itemId: string]: '옛날' | '오늘날' | null };
  onClassify: (itemId: string, era: '옛날' | '오늘날') => void;
  showAnswers: boolean;
  hasGraded: boolean;
  isPrintOnlyView: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Users: <Users className="w-4 h-4 text-[#111111]" />,
  Train: <Train className="w-4 h-4 text-[#111111]" />,
  Ship: <Ship className="w-4 h-4 text-[#111111]" />,
  Plane: <Plane className="w-4 h-4 text-[#111111]" />,
  Footprints: <Footprints className="w-4 h-4 text-[#111111]" />,
  Bus: <Bus className="w-4 h-4 text-[#111111]" />,
  Wind: <Wind className="w-4 h-4 text-[#111111]" />,
  Anchor: <Anchor className="w-4 h-4 text-[#111111]" />
};

export const Section1Classification: React.FC<Props> = ({
  items,
  classifiedEra,
  onClassify,
  showAnswers,
  hasGraded,
  isPrintOnlyView
}) => {
  return (
    <section className="mb-8 p-6 bg-[#ffffff] border border-[#111111]">
      <div className="flex items-center justify-between mb-4 border-b border-[#111111] pb-3">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#111111] text-white font-bold flex items-center justify-center text-xs">
            1
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#111111] tracking-tight uppercase">
            [활동 1] 옛날과 오늘날의 교통수단 분류하기
          </h2>
        </div>
        <span className="text-xs px-3 py-1 bg-[#f5f5f5] text-[#111111] border border-[#cacacb] rounded-full font-bold">
          배점 25점
        </span>
      </div>

      <p className="text-sm text-[#39393b] mb-5 leading-relaxed">
        아래 보기 카드의 교통수단을 확인하고, <strong>[옛날]</strong>에 주로 쓰였던 교통수단과 <strong>[오늘날]</strong>에 주로 쓰이는 교통수단으로 알맞게 분류해 보세요.
      </p>

      {/* Word Bank / Items List */}
      <div className="p-4 bg-[#f5f5f5] border border-[#e5e5e5] mb-6">
        <div className="text-xs font-bold text-[#111111] mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider">보기 카드</span>
            <span className="text-[#707072] font-normal text-[11px]">각 카드의 분류 버튼을 눌러보세요</span>
          </div>
          <span className="text-[11px] text-[#707072]">총 8개 항목</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map((item) => {
            const currentChoice = classifiedEra[item.id];
            const isCorrect = currentChoice === item.era;

            return (
              <div
                key={item.id}
                id={`card-${item.id}`}
                className="p-3 bg-[#ffffff] border border-[#cacacb] text-xs flex flex-col justify-between transition-all"
              >
                <div className="flex items-start justify-between gap-1 mb-1.5">
                  <span className="font-bold text-[#111111] text-sm">{item.name}</span>
                  <div className="w-6 h-6 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0">
                    {ICON_MAP[item.iconName]}
                  </div>
                </div>
                <div className="text-[#707072] text-[11px] mb-3 flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded-full bg-[#f5f5f5] text-[#39393b] border border-[#e5e5e5] font-medium">
                    {item.domain}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#f5f5f5] text-[#707072] border border-[#e5e5e5]">
                    동력: {item.powerSource}
                  </span>
                </div>

                {/* Interactive Selection Buttons (hidden on print) */}
                {!isPrintOnlyView && (
                  <div className="no-print flex items-center gap-1.5 pt-2 border-t border-[#e5e5e5]">
                    <button
                      type="button"
                      onClick={() => onClassify(item.id, '옛날')}
                      className={`flex-1 h-7 rounded-full text-center font-bold text-[11px] transition-all cursor-pointer ${
                        currentChoice === '옛날'
                          ? 'bg-[#111111] text-white'
                          : 'bg-[#ffffff] text-[#111111] border border-[#cacacb] hover:bg-[#f5f5f5]'
                      }`}
                    >
                      옛날
                    </button>
                    <button
                      type="button"
                      onClick={() => onClassify(item.id, '오늘날')}
                      className={`flex-1 h-7 rounded-full text-center font-bold text-[11px] transition-all cursor-pointer ${
                        currentChoice === '오늘날'
                          ? 'bg-[#111111] text-white'
                          : 'bg-[#ffffff] text-[#111111] border border-[#cacacb] hover:bg-[#f5f5f5]'
                      }`}
                    >
                      오늘날
                    </button>
                  </div>
                )}

                {/* Graded / Answer Feedback */}
                {(hasGraded || showAnswers) && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-bold">
                    {showAnswers ? (
                      <span className="text-[#1151ff]">정답: {item.era}</span>
                    ) : isCorrect ? (
                      <span className="text-[#007d48] flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> 정답
                      </span>
                    ) : (
                      <span className="text-[#d30005] flex items-center gap-0.5">
                        <AlertCircle className="w-3 h-3" /> 오답 ({item.era})
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Sorting Buckets (Print and Interactive Table) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ancient Bucket */}
        <div className="border border-[#111111] p-4 bg-[#ffffff]">
          <div className="flex items-center justify-between pb-3 border-b border-[#111111] mb-3">
            <h3 className="font-bold text-[#111111] text-sm flex items-center gap-2">
              <span>옛날의 교통수단</span>
              <span className="text-xs text-[#707072] font-normal">
                (사람, 동물, 자연력)
              </span>
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#f5f5f5] text-[#111111] border border-[#cacacb] rounded-full">
              {items.filter(i => (showAnswers ? i.era === '옛날' : classifiedEra[i.id] === '옛날')).length}개
            </span>
          </div>

          <div className="min-h-[120px] space-y-2">
            {items
              .filter(i => (showAnswers ? i.era === '옛날' : classifiedEra[i.id] === '옛날'))
              .map(i => (
                <div key={i.id} className="p-2.5 bg-[#f5f5f5] border border-[#e5e5e5] text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111111]">{i.name}</span>
                    <span className="text-[#707072]">[{i.domain}]</span>
                  </div>
                  <span className="text-[#39393b] text-[11px] bg-[#ffffff] border border-[#e5e5e5] px-2 py-0.5 rounded-full">
                    {i.powerSource}
                  </span>
                </div>
              ))}

            {items.filter(i => (showAnswers ? i.era === '옛날' : classifiedEra[i.id] === '옛날')).length === 0 && (
              <div className="h-28 border border-dashed border-[#cacacb] flex flex-col items-center justify-center text-xs text-[#707072] p-3 text-center">
                <span>인쇄 시 여기에 연필로 이름을 적어 넣으세요.</span>
                <span className="text-[11px] text-[#9e9ea0] mt-1">(보기 카드의 '옛날' 버튼을 눌러 선택)</span>
              </div>
            )}
          </div>
        </div>

        {/* Modern Bucket */}
        <div className="border border-[#111111] p-4 bg-[#ffffff]">
          <div className="flex items-center justify-between pb-3 border-b border-[#111111] mb-3">
            <h3 className="font-bold text-[#111111] text-sm flex items-center gap-2">
              <span>오늘날의 교통수단</span>
              <span className="text-xs text-[#707072] font-normal">
                (기계, 엔진, 전기)
              </span>
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#f5f5f5] text-[#111111] border border-[#cacacb] rounded-full">
              {items.filter(i => (showAnswers ? i.era === '오늘날' : classifiedEra[i.id] === '오늘날')).length}개
            </span>
          </div>

          <div className="min-h-[120px] space-y-2">
            {items
              .filter(i => (showAnswers ? i.era === '오늘날' : classifiedEra[i.id] === '오늘날'))
              .map(i => (
                <div key={i.id} className="p-2.5 bg-[#f5f5f5] border border-[#e5e5e5] text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111111]">{i.name}</span>
                    <span className="text-[#707072]">[{i.domain}]</span>
                  </div>
                  <span className="text-[#39393b] text-[11px] bg-[#ffffff] border border-[#e5e5e5] px-2 py-0.5 rounded-full">
                    {i.powerSource}
                  </span>
                </div>
              ))}

            {items.filter(i => (showAnswers ? i.era === '오늘날' : classifiedEra[i.id] === '오늘날')).length === 0 && (
              <div className="h-28 border border-dashed border-[#cacacb] flex flex-col items-center justify-center text-xs text-[#707072] p-3 text-center">
                <span>인쇄 시 여기에 연필로 이름을 적어 넣으세요.</span>
                <span className="text-[11px] text-[#9e9ea0] mt-1">(보기 카드의 '오늘날' 버튼을 눌러 선택)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
