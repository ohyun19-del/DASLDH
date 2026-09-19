import React from 'react';
import { SelfEvaluation } from '../types';
import { Star, Award, Heart, CheckCircle, Printer } from 'lucide-react';

interface Props {
  selfEval: SelfEvaluation;
  setSelfEval: React.Dispatch<React.SetStateAction<SelfEvaluation>>;
  score: number | null;
  hasGraded: boolean;
  onGrade: () => void;
  onPrint: () => void;
}

export const WorksheetFooter: React.FC<Props> = ({
  selfEval,
  setSelfEval,
  score,
  hasGraded,
  onGrade,
  onPrint
}) => {
  const renderStarRating = (
    value: number,
    onChange: (v: number) => void,
    label: string
  ) => {
    return (
      <div className="flex items-center justify-between py-2 text-xs">
        <span className="text-[#39393b] font-medium">{label}</span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="p-1 hover:scale-110 transition-transform cursor-pointer"
            >
              <Star
                className={`w-4 h-4 ${
                  star <= value
                    ? 'fill-[#111111] text-[#111111]'
                    : 'text-[#cacacb]'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const getStampMessage = () => {
    if (score === null) return '선생님 확인';
    if (score >= 90) return '참 잘했어요!';
    if (score >= 70) return '아주 훌륭해요!';
    return '조금 더 힘내요!';
  };

  return (
    <footer className="mt-8 border-t border-[#111111] pt-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Self Evaluation */}
        <div className="md:col-span-8 p-5 bg-[#ffffff] border border-[#111111]">
          <h3 className="text-xs sm:text-sm font-bold text-[#111111] mb-3 flex items-center gap-2 uppercase tracking-wide">
            <Heart className="w-4 h-4 text-[#111111]" />
            <span>스스로 돌아보기 (자기 평가)</span>
          </h3>

          <div className="divide-y divide-[#e5e5e5] mb-4">
            {renderStarRating(
              selfEval.interest,
              (v) => setSelfEval({ ...selfEval, interest: v }),
              '1. 교통수단의 발달 탐구 활동에 흥미를 갖고 즐겁게 참여했나요?'
            )}
            {renderStarRating(
              selfEval.understanding,
              (v) => setSelfEval({ ...selfEval, understanding: v }),
              '2. 옛날과 오늘날 교통수단의 다른 점과 발전 과정을 잘 이해했나요?'
            )}
            {renderStarRating(
              selfEval.participation,
              (v) => setSelfEval({ ...selfEval, participation: v }),
              '3. 미래의 교통수단을 창의적이고 상상력 넘치게 설계해 보았나요?'
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-[#e5e5e5] text-xs">
            <span className="font-bold text-[#707072] shrink-0 uppercase tracking-wide">
              오늘의 한 줄 소감:
            </span>
            <input
              type="text"
              value={selfEval.comment}
              onChange={(e) => setSelfEval({ ...selfEval, comment: e.target.value })}
              placeholder="예: 옛날에는 가마나 말을 탔는데 오늘날 KTX와 비행기가 있어 정말 편리하다는 것을 배웠어요!"
              className="flex-1 p-2 border-b border-[#111111] focus:outline-none bg-transparent text-[#111111]"
            />
          </div>
        </div>

        {/* Teacher Stamp Box */}
        <div className="md:col-span-4 p-5 bg-[#ffffff] border border-[#111111] flex flex-col items-center justify-center min-h-[170px] relative text-center">
          <div className="text-[11px] font-bold text-[#707072] uppercase tracking-wider mb-2">
            선생님 확인 도장
          </div>

          {hasGraded && score !== null ? (
            <div className="animate-stamp flex flex-col items-center justify-center border-4 border-[#d30005] rounded-full w-24 h-24 p-1 text-[#d30005] font-black">
              <span className="text-[10px] leading-none mb-0.5 tracking-wider uppercase">VERIFIED</span>
              <span className="text-sm font-black tracking-tight">{getStampMessage()}</span>
              <span className="text-xs font-bold mt-0.5">{score}점</span>
            </div>
          ) : (
            <div className="border border-dashed border-[#cacacb] rounded-full w-24 h-24 flex flex-col items-center justify-center text-[#707072] p-2 text-center">
              <Award className="w-6 h-6 text-[#cacacb] mb-1" />
              <span className="text-[10px] leading-tight text-[#9e9ea0]">채점 후 도장 날인</span>
            </div>
          )}

          <div className="mt-3 text-[10px] text-[#707072]">
            초등학교 3학년 사회과 과정중심평가
          </div>
        </div>
      </div>

      {/* Screen action footer (hidden when printed) */}
      <div className="no-print mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={onGrade}
          className="h-12 px-8 rounded-full font-bold bg-[#111111] text-white hover:bg-[#39393b] active:scale-95 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-none"
        >
          <CheckCircle className="w-4 h-4" />
          <span>활동지 전체 채점하기</span>
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="h-12 px-8 rounded-full font-bold bg-[#ffffff] text-[#111111] border border-[#111111] hover:bg-[#f5f5f5] active:scale-95 transition-all flex items-center gap-2 text-sm cursor-pointer shadow-none"
        >
          <Printer className="w-4 h-4" />
          <span>A4 활동지 인쇄하기</span>
        </button>
      </div>
    </footer>
  );
};
