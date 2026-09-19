import React from 'react';
import { Printer, RotateCcw, CheckCircle2, BookOpen, Eye, EyeOff, Sparkles, Award } from 'lucide-react';
import { StudentInfo } from '../types';

interface Props {
  studentInfo: StudentInfo;
  setStudentInfo: React.Dispatch<React.SetStateAction<StudentInfo>>;
  isPrintOnlyView: boolean;
  setIsPrintOnlyView: React.Dispatch<React.SetStateAction<boolean>>;
  showAnswers: boolean;
  setShowAnswers: React.Dispatch<React.SetStateAction<boolean>>;
  onPrint: () => void;
  onReset: () => void;
  onGrade: () => void;
  score: number | null;
  hasGraded: boolean;
}

export const WorksheetHeader: React.FC<Props> = ({
  studentInfo,
  setStudentInfo,
  isPrintOnlyView,
  setIsPrintOnlyView,
  showAnswers,
  setShowAnswers,
  onPrint,
  onReset,
  onGrade,
  score,
  hasGraded
}) => {
  return (
    <header className="mb-8">
      {/* Top Utility / Action Bar (Hidden on print) */}
      <div className="no-print mb-6 p-4 bg-[#f5f5f5] border border-[#e5e5e5] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#707072]">
                EDUCATION STUDIO
              </span>
              <span className="w-1 h-1 rounded-full bg-[#cacacb]" />
              <span className="text-xs font-semibold text-[#111111]">사회 3학년 탐구</span>
            </div>
            <p className="text-xs text-[#707072]">
              온라인 실시간 풀이 및 A4 인쇄용 활동지 지원
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          {/* Answer Toggle Pill */}
          <button
            id="toggle-answers-btn"
            type="button"
            onClick={() => setShowAnswers(!showAnswers)}
            className={`h-9 px-4 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              showAnswers
                ? 'bg-[#111111] text-white'
                : 'bg-[#ffffff] text-[#111111] border border-[#cacacb] hover:bg-[#f5f5f5]'
            }`}
          >
            {showAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showAnswers ? '정답 숨기기' : '정답 보기'}</span>
          </button>

          {/* View mode toggle Pill */}
          <button
            id="toggle-view-mode-btn"
            type="button"
            onClick={() => setIsPrintOnlyView(!isPrintOnlyView)}
            className={`h-9 px-4 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              isPrintOnlyView
                ? 'bg-[#111111] text-white'
                : 'bg-[#ffffff] text-[#111111] border border-[#cacacb] hover:bg-[#f5f5f5]'
            }`}
          >
            {isPrintOnlyView ? '인터랙티브 모드' : '인쇄용 빈 양식'}
          </button>

          {/* Reset Pill */}
          <button
            id="reset-form-btn"
            type="button"
            onClick={onReset}
            className="h-9 px-4 rounded-full bg-[#ffffff] text-[#707072] hover:text-[#111111] border border-[#cacacb] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>

          {/* Grade Pill (Primary) */}
          <button
            id="grade-btn"
            type="button"
            onClick={onGrade}
            className="h-9 px-5 rounded-full bg-[#111111] text-white hover:bg-[#39393b] active:scale-95 transition-all flex items-center gap-1.5 font-semibold cursor-pointer shadow-none"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>채점하기</span>
          </button>

          {/* Print button Pill (Secondary) */}
          <button
            id="print-btn"
            type="button"
            onClick={onPrint}
            className="h-9 px-5 rounded-full bg-[#ffffff] text-[#111111] border border-[#111111] hover:bg-[#f5f5f5] active:scale-95 transition-all flex items-center gap-1.5 font-semibold cursor-pointer shadow-none"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>A4 인쇄</span>
          </button>
        </div>
      </div>

      {/* Main Worksheet Title Block */}
      <div className="border-b border-[#111111] pb-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#111111] text-white text-[11px] font-bold tracking-wider uppercase">
                GRADE 3 · SOCIAL STUDIES
              </span>
              <span className="px-3 py-1 rounded-full bg-[#f5f5f5] border border-[#e5e5e5] text-[11px] text-[#707072] font-medium">
                단원 2. 교통수단의 발달과 생활 모습의 변화
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight uppercase">
              교통수단의 발달 탐구 활동지
            </h1>
            <p className="text-sm text-[#707072] mt-1 font-medium">
              옛날과 오늘날의 교통수단 비교 · 동력의 변천사 · 생활 모습의 변화 · 미래 교통수단 설계
            </p>
          </div>

          {/* Student Info Box - Clean Flat Box with 1px border */}
          <div className="border border-[#111111] bg-[#ffffff] p-3 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <input
                id="student-grade"
                type="text"
                value={studentInfo.grade}
                onChange={(e) => setStudentInfo({ ...studentInfo, grade: e.target.value })}
                className="w-7 text-center font-bold border-b border-[#111111] focus:outline-none bg-transparent"
                placeholder="3"
              />
              <span className="font-semibold text-[#707072]">학년</span>
            </div>

            <div className="flex items-center gap-1">
              <input
                id="student-class"
                type="text"
                value={studentInfo.classNum}
                onChange={(e) => setStudentInfo({ ...studentInfo, classNum: e.target.value })}
                className="w-8 text-center font-bold border-b border-[#111111] focus:outline-none bg-transparent"
                placeholder=" "
              />
              <span className="font-semibold text-[#707072]">반</span>
            </div>

            <div className="flex items-center gap-1">
              <input
                id="student-num"
                type="text"
                value={studentInfo.studentNum}
                onChange={(e) => setStudentInfo({ ...studentInfo, studentNum: e.target.value })}
                className="w-8 text-center font-bold border-b border-[#111111] focus:outline-none bg-transparent"
                placeholder=" "
              />
              <span className="font-semibold text-[#707072]">번</span>
            </div>

            <div className="flex items-center gap-1.5 pl-3 border-l border-[#cacacb]">
              <span className="font-semibold text-[#707072]">이름:</span>
              <input
                id="student-name"
                type="text"
                value={studentInfo.name}
                onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                className="w-24 font-bold border-b border-[#111111] focus:outline-none px-1 bg-transparent text-[#111111]"
                placeholder="성명 기재"
              />
            </div>

            <div className="flex items-center gap-1.5 pl-3 border-l border-[#cacacb] text-[#707072]">
              <span>날짜:</span>
              <input
                id="worksheet-date"
                type="text"
                value={studentInfo.date}
                onChange={(e) => setStudentInfo({ ...studentInfo, date: e.target.value })}
                className="w-28 text-center border-b border-[#111111] focus:outline-none px-1 bg-transparent text-[#111111] text-[11px]"
              />
            </div>

            {hasGraded && score !== null && (
              <div className="pl-3 border-l border-[#cacacb] flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#111111] text-white font-bold text-xs">
                  {score}점
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Learning Goal Strip */}
        <div className="mt-4 p-3 bg-[#f5f5f5] border border-[#e5e5e5] text-xs text-[#39393b] flex items-start gap-2.5">
          <span className="font-bold text-[#111111] uppercase tracking-wide shrink-0">
            [배움 목표]
          </span>
          <p className="leading-relaxed">
            옛날과 오늘날의 교통수단 특징과 발달 과정을 비교하고, 교통수단의 발달로 나타난 생활 모습의 변화(일일생활권 등)를 이해하며, 미래의 친환경 교통수단을 창의적으로 상상해 봅시다.
          </p>
        </div>
      </div>
    </header>
  );
};
