import React, { useRef, useState, useEffect } from 'react';
import { FutureTransportDesign } from '../types';
import { FUTURE_INSPIRATIONS } from '../data/transportData';
import { Palette, Eraser, Trash2, Sparkles, Lightbulb, Download, Wand2 } from 'lucide-react';

interface Props {
  design: FutureTransportDesign;
  onChangeDesign: (updated: Partial<FutureTransportDesign>) => void;
  isPrintOnlyView: boolean;
}

const COLORS = ['#1e293b', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
const BRUSH_SIZES = [2, 5, 10];

export const Section5FutureDrawing: React.FC<Props> = ({
  design,
  onChangeDesign,
  isPrintOnlyView
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#111111');
  const [brushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white background once
    if (!design.drawDataUrl) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      const img = new Image();
      img.src = design.drawDataUrl;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#ffffff' : color;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    onChangeDesign({ drawDataUrl: dataUrl });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onChangeDesign({ drawDataUrl: '' });
  };

  const applyInspiration = (item: { name: string; tag: string; desc: string }) => {
    onChangeDesign({
      name: item.name,
      domain: item.tag,
      powerSource: '친환경 태양광 & 수소 복합 에너지',
      feature1: item.desc,
      feature2: '인공지능 자율운항 및 충돌 방지 시스템',
      feature3: '환경오염 물질 배출 0% (탄소 중립)'
    });
  };

  return (
    <section className="mb-8 p-6 bg-[#ffffff] border border-[#111111]">
      <div className="flex items-center justify-between mb-4 border-b border-[#111111] pb-3">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#111111] text-white font-bold flex items-center justify-center text-xs">
            5
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#111111] tracking-tight uppercase">
            [창의 탐구 활동 5] 상상 쑥쑥! 내가 발명하는 미래의 교통수단
          </h2>
        </div>
        <span className="text-xs px-3 py-1 bg-[#f5f5f5] text-[#111111] border border-[#cacacb] rounded-full font-bold">
          창의 표현 활동
        </span>
      </div>

      <p className="text-sm text-[#39393b] mb-5 leading-relaxed">
        미래에는 어떤 새로운 교통수단이 생겨날까요? 사람들을 더 빠르고, 안전하며, 환경을 오염시키지 않는
        나만의 멋진 <strong>미래 교통수단</strong>을 상상하여 디자인하고 그림으로 표현해 보세요!
      </p>

      {/* Idea Sparks */}
      <div className="no-print p-4 bg-[#f5f5f5] border border-[#e5e5e5] mb-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-[#111111] flex items-center gap-1.5 uppercase tracking-wide">
            <Lightbulb className="w-3.5 h-3.5 text-[#111111]" />
            <span>미래 교통수단 아이디어 힌트 (클릭 시 자동 적용)</span>
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {FUTURE_INSPIRATIONS.map((insp) => (
            <button
              key={insp.name}
              type="button"
              onClick={() => applyInspiration(insp)}
              className="p-3 bg-[#ffffff] border border-[#cacacb] hover:border-[#111111] text-left transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-[#111111] flex items-center justify-between">
                <span>{insp.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5f5f5] text-[#39393b] border border-[#e5e5e5]">
                  {insp.tag}
                </span>
              </div>
              <div className="text-[11px] text-[#707072] mt-1.5 line-clamp-2 leading-relaxed">
                {insp.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Canvas Drawing Area */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#111111] flex items-center gap-1.5 uppercase tracking-wide">
              <Palette className="w-3.5 h-3.5 text-[#111111]" />
              <span>미래 교통수단 설계도 스케치</span>
            </span>

            {/* Drawing Tools (no-print) */}
            {!isPrintOnlyView && (
              <div className="no-print flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#f5f5f5] border border-[#e5e5e5] p-1 rounded-full">
                  {['#111111', '#d30005', '#1151ff', '#007d48', '#ff8c00', '#7c3aed'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setColor(c);
                        setIsEraser(false);
                      }}
                      style={{ backgroundColor: c }}
                      className={`w-4 h-4 rounded-full transition-all cursor-pointer ${
                        !isEraser && color === c ? 'scale-125 ring-2 ring-[#111111]' : ''
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsEraser(!isEraser)}
                  className={`h-7 px-3 rounded-full border text-xs flex items-center gap-1 transition-all cursor-pointer ${
                    isEraser ? 'bg-[#111111] text-white border-[#111111]' : 'bg-[#ffffff] border-[#cacacb] text-[#111111]'
                  }`}
                  title="지우개"
                >
                  <Eraser className="w-3 h-3" />
                  <span>지우개</span>
                </button>

                <button
                  type="button"
                  onClick={clearCanvas}
                  className="h-7 px-3 rounded-full border border-[#cacacb] bg-[#ffffff] text-[#707072] hover:text-[#111111] text-xs transition-all cursor-pointer flex items-center gap-1"
                  title="전체 지우기"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>지우기</span>
                </button>
              </div>
            )}
          </div>

          {/* HTML5 Canvas Box */}
          <div className="relative border border-[#111111] bg-[#ffffff] overflow-hidden">
            <canvas
              ref={canvasRef}
              width={460}
              height={300}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-[280px] sm:h-[300px] touch-none cursor-crosshair bg-white"
            />
            <div className="absolute bottom-2 right-2 pointer-events-none text-[11px] text-[#707072] bg-[#ffffff] border border-[#cacacb] px-2 py-0.5">
              마우스나 터치로 자유롭게 설계도를 그려보세요
            </div>
          </div>
        </div>

        {/* Right: Design Specs & Features */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
          <div>
            <label htmlFor="future-name-input" className="block text-xs font-bold text-[#707072] mb-1.5 uppercase tracking-wide">
              내가 지은 미래 교통수단 이름:
            </label>
            <input
              id="future-name-input"
              type="text"
              value={design.name}
              onChange={(e) => onChangeDesign({ name: e.target.value })}
              placeholder="예: 하늘을 나는 수소 에어택시"
              className="w-full p-2.5 text-sm font-bold text-[#111111] border border-[#cacacb] bg-[#ffffff] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="future-domain-select" className="block text-xs font-bold text-[#707072] mb-1.5 uppercase tracking-wide">
                이동 공간 (육상/해상/항공/복합):
              </label>
              <input
                id="future-domain-select"
                type="text"
                value={design.domain}
                onChange={(e) => onChangeDesign({ domain: e.target.value })}
                placeholder="예: 하늘 + 땅 복합 이동"
                className="w-full p-2.5 text-xs font-medium text-[#111111] border border-[#cacacb] bg-[#ffffff] focus:outline-none focus:border-[#111111]"
              />
            </div>
            <div>
              <label htmlFor="future-power-input" className="block text-xs font-bold text-[#707072] mb-1.5 uppercase tracking-wide">
                움직이는 친환경 에너지:
              </label>
              <input
                id="future-power-input"
                type="text"
                value={design.powerSource}
                onChange={(e) => onChangeDesign({ powerSource: e.target.value })}
                placeholder="예: 태양광, 수소 연료전지"
                className="w-full p-2.5 text-xs font-medium text-[#111111] border border-[#cacacb] bg-[#ffffff] focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-bold text-[#707072] uppercase tracking-wide">
              이 교통수단만의 특별한 기능 3가지:
            </span>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                1
              </span>
              <input
                id="future-feature-1"
                type="text"
                value={design.feature1}
                onChange={(e) => onChangeDesign({ feature1: e.target.value })}
                placeholder="특징 1: 인공지능이 스스로 운전해서 사고가 나지 않아요."
                className="flex-1 p-2 text-xs border border-[#cacacb] text-[#111111] bg-[#ffffff] focus:outline-none focus:border-[#111111]"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                2
              </span>
              <input
                id="future-feature-2"
                type="text"
                value={design.feature2}
                onChange={(e) => onChangeDesign({ feature2: e.target.value })}
                placeholder="특징 2: 매연 대신 깨끗한 물과 산소를 내뿜어요."
                className="flex-1 p-2 text-xs border border-[#cacacb] text-[#111111] bg-[#ffffff] focus:outline-none focus:border-[#111111]"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                3
              </span>
              <input
                id="future-feature-3"
                type="text"
                value={design.feature3}
                onChange={(e) => onChangeDesign({ feature3: e.target.value })}
                placeholder="특징 3: 버튼 하나로 날개를 접어 주차장에 쏙 들어가요."
                className="flex-1 p-2 text-xs border border-[#cacacb] text-[#111111] bg-[#ffffff] focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
