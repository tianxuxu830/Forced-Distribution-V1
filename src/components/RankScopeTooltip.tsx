import React from 'react';

export default function RankScopeTooltip() {
  return (
    <div className="absolute top-[138%] left-[-40px] w-[700px] p-[20px] bg-[#FFFFFF] border border-neutral-200 rounded-[8px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] z-[999] cursor-default opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out font-sans">
      <div className="grid grid-cols-2 gap-[20px]">
        
        {/* 全员统排模式 (左侧) */}
        <div className="flex flex-col text-left">
          <h3 className="text-[16px] font-bold text-neutral-800 mb-[4px] tracking-tight">
            全员统排模式
          </h3>
          <p className="text-[12px] text-neutral-500 leading-normal mb-[12px]">
            打破所有物理界限，全公司在一个统一的大池子内按分数高低强制划分等级。
          </p>
          
          {/* 内嵌池子容器 */}
          <div className="bg-[#FFFFFF] border border-[#15B8A6] rounded-[6px] p-[16px] flex flex-col items-center justify-center min-h-[160px] shadow-[0_2px_8px_rgba(21,184,166,0.03)] relative">
            <div className="text-[12px] font-bold text-[#115E59] mb-[12px] bg-[#E6F4F1] px-[10px] py-[1.5px] rounded-full">
              全公司统一大池
            </div>
            
            {/* 炫彩泡泡展示区 */}
            <div className="flex flex-col items-center gap-[8px] mb-[12px]">
              <div className="flex gap-[10px]">
                <div className="w-[28px] h-[28px] rounded-full bg-[#60A5FA] shadow-[0_2px_6px_rgba(96,165,250,0.25)] flex items-center justify-center transition-transform hover:scale-110 duration-200">
                  <div className="w-[10px] h-[10px] bg-white/30 rounded-full"></div>
                </div>
                <div className="w-[28px] h-[28px] rounded-full bg-[#3B82F6] shadow-[0_2px_6px_rgba(59,130,246,0.25)] flex items-center justify-center transition-transform hover:scale-110 duration-200">
                  <div className="w-[10px] h-[10px] bg-white/30 rounded-full"></div>
                </div>
                <div className="w-[28px] h-[28px] rounded-full bg-[#FB923C] shadow-[0_2px_6px_rgba(251,146,60,0.25)] flex items-center justify-center transition-transform hover:scale-110 duration-200">
                  <div className="w-[10px] h-[10px] bg-white/30 rounded-full"></div>
                </div>
                <div className="w-[28px] h-[28px] rounded-full bg-[#C084FC] shadow-[0_2px_6px_rgba(192,132,252,0.25)] flex items-center justify-center transition-transform hover:scale-110 duration-200">
                  <div className="w-[10px] h-[10px] bg-white/30 rounded-full"></div>
                </div>
              </div>
              <div className="flex gap-[10px]">
                <div className="w-[28px] h-[28px] rounded-full bg-[#3B82F6] shadow-[0_2px_6px_rgba(59,130,246,0.25)] flex items-center justify-center transition-transform hover:scale-110 duration-200">
                  <div className="w-[10px] h-[10px] bg-white/30 rounded-full"></div>
                </div>
                <div className="w-[28px] h-[28px] rounded-full bg-[#F97316] shadow-[0_2px_6px_rgba(249,115,22,0.25)] flex items-center justify-center transition-transform hover:scale-110 duration-200">
                  <div className="w-[10px] h-[10px] bg-white/30 rounded-full"></div>
                </div>
                <div className="w-[28px] h-[28px] rounded-full bg-[#A855F7] shadow-[0_2px_6px_rgba(168,85,247,0.25)] flex items-center justify-center transition-transform hover:scale-110 duration-200">
                  <div className="w-[10px] h-[10px] bg-white/30 rounded-full"></div>
                </div>
                <div className="w-[28px] h-[28px] rounded-full bg-[#F97316] shadow-[0_2px_6px_rgba(249,115,22,0.25)] flex items-center justify-center transition-transform hover:scale-110 duration-200">
                  <div className="w-[10px] h-[10px] bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* 图例 */}
            <div className="text-[11px] text-neutral-500 flex gap-[12px] font-medium border-t border-neutral-100 w-full pt-[8px] justify-center mt-auto">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
                研发
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                销售
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A855F7]"></span>
                市场
              </span>
            </div>
          </div>
        </div>
        
        {/* 按绩效组隔离模式 (右侧) */}
        <div className="flex flex-col text-left">
          <h3 className="text-[16px] font-bold text-neutral-800 mb-[4px] tracking-tight">
            按绩效组隔离模式
          </h3>
          <p className="text-[12px] text-neutral-500 leading-normal mb-[12px]">
            每个绩效组各自作为一个独立的排名池，在绩效组内按分数高低生成等级。
          </p>
          
          {/* 双池子容器 */}
          <div className="bg-[#FFFFFF] border border-neutral-200 rounded-[6px] p-[12px] flex gap-[10px] justify-between items-stretch min-h-[160px] shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
            
            {/* 绩效组1 */}
            <div className="flex-1 bg-neutral-50 border border-neutral-200/80 rounded-[4px] p-[8px] flex flex-col items-center justify-between">
              <div className="text-[11px] font-bold text-neutral-600 mb-[8px]">
                绩效组1
              </div>
              <div className="flex flex-col gap-[6px] my-auto">
                <div className="flex gap-[6px]">
                  <div className="w-[20px] h-[20px] rounded-full bg-[#60A5FA] flex items-center justify-center">
                    <div className="w-[6px] h-[6px] bg-white/40 rounded-full"></div>
                  </div>
                  <div className="w-[20px] h-[20px] rounded-full bg-[#3B82F6] flex items-center justify-center">
                    <div className="w-[6px] h-[6px] bg-white/40 rounded-full"></div>
                  </div>
                </div>
                <div className="flex gap-[6px]">
                  <div className="w-[20px] h-[20px] rounded-full bg-[#2563EB] flex items-center justify-center">
                    <div className="w-[6px] h-[6px] bg-white/40 rounded-full"></div>
                  </div>
                  <div className="w-[20px] h-[20px] rounded-full bg-[#3B82F6] flex items-center justify-center">
                    <div className="w-[6px] h-[6px] bg-white/40 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 隔离墙 */}
            <div className="flex flex-col justify-center items-center px-0.5">
              <div className="w-[1px] flex-1 border-l border-dashed border-neutral-300 relative flex items-center justify-center">
                <span className="absolute bg-[#FFFFFF] py-[4px] text-[9px] font-bold text-neutral-400 tracking-wider writing-mode-vertical uppercase select-none rounded-[3px] border border-neutral-200 px-1 transform translate-x-[-1px]">
                  隔离
                </span>
              </div>
            </div>
            
            {/* 绩效组2 */}
            <div className="flex-1 bg-neutral-50 border border-neutral-200/80 rounded-[4px] p-[8px] flex flex-col items-center justify-between">
              <div className="text-[11px] font-bold text-neutral-600 mb-[8px]">
                绩效组2
              </div>
              <div className="flex flex-col gap-[6px] my-auto">
                <div className="flex gap-[6px]">
                  <div className="w-[20px] h-[20px] rounded-full bg-[#FB923C] flex items-center justify-center">
                    <div className="w-[6px] h-[6px] bg-white/40 rounded-full"></div>
                  </div>
                  <div className="w-[20px] h-[20px] rounded-full bg-[#F97316] flex items-center justify-center">
                    <div className="w-[6px] h-[6px] bg-white/40 rounded-full"></div>
                  </div>
                </div>
                <div className="flex gap-[6px]">
                  <div className="w-[20px] h-[20px] rounded-full bg-[#EA580C] flex items-center justify-center">
                    <div className="w-[6px] h-[6px] bg-white/40 rounded-full"></div>
                  </div>
                  <div className="w-[20px] h-[20px] rounded-full bg-[#F97316] flex items-center justify-center">
                    <div className="w-[6px] h-[6px] bg-white/40 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
      
      {/* 气泡小三角定位指向器 (left-[42px] exactly targets the Info icon) */}
      <div className="absolute -top-[6px] left-[42px] w-2.5 h-2.5 bg-white border-l border-t border-neutral-200 rotate-45 z-[-1]"></div>
    </div>
  );
}
