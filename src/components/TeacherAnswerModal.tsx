import React from 'react';
import { X, CheckCircle, BookOpen, Lightbulb } from 'lucide-react';
import { INITIAL_TRANSPORT_ITEMS, QUIZ_QUESTIONS, SCENARIO_QUESTIONS, TIMELINE_DATA } from '../data/transportData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherAnswerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-none">
      <div className="bg-[#ffffff] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-[#111111] shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#111111] mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#f5f5f5] border border-[#cacacb] flex items-center justify-center text-[#111111]">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#111111] tracking-tight uppercase">
                교사용 정답 및 지도 가이드
              </h2>
              <p className="text-xs text-[#707072]">초등학교 3학년 사회 - 교통수단의 발달과 생활 모습의 변화</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#cacacb] flex items-center justify-center text-[#707072] hover:text-[#111111] hover:border-[#111111] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Curriculum Standard */}
        <div className="p-3.5 bg-[#f5f5f5] border border-[#cacacb] text-xs text-[#111111] mb-5">
          <div className="font-bold flex items-center gap-1.5 mb-1.5 uppercase tracking-wide">
            <Lightbulb className="w-3.5 h-3.5 text-[#111111]" />
            <span>교육과정 성취기준 연계 안내</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-[#39393b]">
            <li><strong>[4사02-01]</strong> 옛날과 오늘날의 교통수단에 관한 자료를 바탕으로 교통수단의 발달 과정을 파악한다.</li>
            <li><strong>[4사02-02]</strong> 교통수단의 발달로 나타난 생활 모습의 변화(일일생활권, 환경 문제 등)를 이해한다.</li>
          </ul>
        </div>

        {/* Section 1 Answers */}
        <div className="mb-4">
          <h3 className="font-bold text-xs sm:text-sm text-[#111111] mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <CheckCircle className="w-3.5 h-3.5 text-[#007d48]" />
            <span>[활동 1 정답] 옛날과 오늘날 분류</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-[#ffffff] border border-[#cacacb]">
              <strong className="text-[#111111] block mb-1">옛날 교통수단:</strong>
              <p className="text-[#39393b]">가마, 뗏목/나룻배, 소달구지, 돛단배</p>
            </div>
            <div className="p-3 bg-[#ffffff] border border-[#cacacb]">
              <strong className="text-[#111111] block mb-1">오늘날 교통수단:</strong>
              <p className="text-[#39393b]">고속열차(KTX), 비행기, 친환경 전기버스, 컨테이너 화물선</p>
            </div>
          </div>
        </div>

        {/* Section 2 Answers */}
        <div className="mb-4">
          <h3 className="font-bold text-xs sm:text-sm text-[#111111] mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <CheckCircle className="w-3.5 h-3.5 text-[#007d48]" />
            <span>[활동 2 정답] 동력(힘)의 발달 순서</span>
          </h3>
          <div className="text-xs space-y-1 bg-[#ffffff] p-3 border border-[#cacacb]">
            {TIMELINE_DATA.map((t) => (
              <div key={t.step} className="flex justify-between items-center py-1 border-b border-[#e5e5e5] last:border-0">
                <span className="font-medium text-[#39393b]">{t.step}단계 ({t.title})</span>
                <span className="font-bold text-[#111111]">→ {t.power}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 Answers */}
        <div className="mb-4">
          <h3 className="font-bold text-xs sm:text-sm text-[#111111] mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <CheckCircle className="w-3.5 h-3.5 text-[#007d48]" />
            <span>[활동 3 정답] 탐구 퀴즈</span>
          </h3>
          <div className="text-xs space-y-2 bg-[#ffffff] p-3 border border-[#cacacb]">
            {QUIZ_QUESTIONS.map((q, idx) => (
              <div key={q.id}>
                <span className="font-bold text-[#111111]">Q{idx + 1}. 정답: [{q.correctAnswer}]</span>
                <p className="text-[#707072] text-[11px] mt-0.5">{q.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 Answers */}
        <div className="mb-5">
          <h3 className="font-bold text-xs sm:text-sm text-[#111111] mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <CheckCircle className="w-3.5 h-3.5 text-[#007d48]" />
            <span>[활동 4 모범 답안] 상황별 알맞은 교통수단</span>
          </h3>
          <div className="text-xs space-y-2 bg-[#ffffff] p-3 border border-[#cacacb]">
            {SCENARIO_QUESTIONS.map((sc, idx) => (
              <div key={sc.id} className="pb-1.5 border-b border-[#e5e5e5] last:border-0">
                <div className="font-bold text-[#111111]">상황 {idx + 1}: {sc.suggestedAnswers.join(' / ')}</div>
                <div className="text-[#707072] text-[11px] mt-0.5">이유: {sc.sampleReason}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-6 rounded-full bg-[#111111] hover:bg-[#39393b] text-white text-xs font-bold cursor-pointer transition-all"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
