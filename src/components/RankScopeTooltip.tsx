import React from 'react';

export default function RankScopeTooltip() {
  return (
    <div className="absolute top-[120%] left-[-100px] w-[560px] p-4 bg-white border border-[#E5E7EB] rounded-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-50 cursor-default opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <div className="grid grid-cols-2 gap-4">
        {/* 全员统排模式 */}
        <div className="border border-[#15B8A6] bg-[#F0FDF8]/50 rounded-[6px] p-3 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-3 h-3 rounded-full bg-[#15B8A6] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white"></div>
            </div>
            <span className="text-[13px] font-medium text-[#1F2937]">全员统排模式</span>
          </div>
          <p className="text-[12px] text-[#6B7280] mb-3 leading-relaxed">
            打破所有物理界限，全公司在一个统一的大池子内按分数高低强制划分等级。
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded p-2 flex flex-col items-center">
            <div className="text-[11px] text-[#4B5563] mb-2 font-medium">全公司统一大池</div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                <div className="w-5 h-5 rounded-full bg-blue-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-blue-500 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-orange-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-purple-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
              <div className="flex gap-1">
                <div className="w-5 h-5 rounded-full bg-blue-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-orange-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-purple-500 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-orange-500 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-[#9CA3AF] flex gap-2">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>研发</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>销售</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>市场</span>
            </div>
          </div>
        </div>

        {/* 按部门独立隔离模式 */}
        <div className="border border-[#E5E7EB] rounded-[6px] p-3 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-3 h-3 rounded-full border border-[#9CA3AF]"></div>
            <span className="text-[13px] font-medium text-[#1F2937]">按部门独立隔离模式</span>
          </div>
          <p className="text-[12px] text-[#6B7280] mb-3 leading-relaxed">
            每个部门各自作为一个独立的排名池，各自按比例分配名额，内部消化互不影响。
          </p>
          <div className="rounded p-2 flex gap-3 justify-center items-center">
            <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded p-2 flex flex-col items-center">
              <div className="text-[11px] text-[#4B5563] mb-2 font-medium">研发部</div>
              <div className="flex justify-center gap-1 mb-1">
                <div className="w-5 h-5 rounded-full bg-blue-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-blue-500 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
              <div className="flex justify-center gap-1">
                <div className="w-5 h-5 rounded-full bg-blue-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-blue-500 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
            </div>
            
            <div className="w-[1px] h-12 border-l border-dashed border-[#D1D5DB] relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-[10px] text-[#9CA3AF]">隔离</span>
            </div>

            <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded p-2 flex flex-col items-center">
              <div className="text-[11px] text-[#4B5563] mb-2 font-medium">销售部</div>
              <div className="flex justify-center gap-1 mb-1">
                <div className="w-5 h-5 rounded-full bg-orange-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-orange-500 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
              <div className="flex justify-center gap-1">
                <div className="w-5 h-5 rounded-full bg-orange-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-orange-500 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* 按考核组独立模式 */}
        <div className="border border-[#E5E7EB] rounded-[6px] p-3 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-3 h-3 rounded-full border border-[#9CA3AF]"></div>
            <span className="text-[13px] font-medium text-[#1F2937]">按考核组独立模式</span>
          </div>
          <p className="text-[12px] text-[#6B7280] mb-3 leading-relaxed">
            跨部门抽出相同类型的员工（如管理层、业务人员）组成同类考核池进行横向比较。
          </p>
          <div className="rounded p-2 flex gap-3 justify-center items-center">
            <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded p-2 flex flex-col items-center">
              <div className="text-[11px] text-[#4B5563] mb-2 font-medium">管理层组</div>
              <div className="flex justify-center gap-1 mb-1">
                <div className="w-5 h-5 rounded-full bg-blue-600 shadow-sm flex items-center justify-center"><div className="w-1.5 h-1.5 bg-yellow-300 rounded-sm rotate-45"></div></div>
                <div className="w-5 h-5 rounded-full bg-orange-600 shadow-sm flex items-center justify-center"><div className="w-1.5 h-1.5 bg-yellow-300 rounded-sm rotate-45"></div></div>
              </div>
              <div className="flex justify-center gap-1">
                <div className="w-5 h-5 rounded-full bg-blue-500 shadow-sm flex items-center justify-center"><div className="w-1.5 h-1.5 bg-yellow-300 rounded-sm rotate-45"></div></div>
                <div className="w-5 h-5 rounded-full bg-purple-600 shadow-sm flex items-center justify-center"><div className="w-1.5 h-1.5 bg-yellow-300 rounded-sm rotate-45"></div></div>
              </div>
            </div>
            
            <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded p-2 flex flex-col items-center">
              <div className="text-[11px] text-[#4B5563] mb-2 font-medium">业务员组</div>
              <div className="flex justify-center gap-1 mb-1">
                <div className="w-5 h-5 rounded-full bg-blue-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-orange-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
              <div className="flex justify-center gap-1">
                <div className="w-5 h-5 rounded-full bg-orange-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-purple-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* 自定义分组模式 */}
        <div className="border border-[#E5E7EB] rounded-[6px] p-3 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-3 h-3 rounded-full border border-[#9CA3AF]"></div>
            <span className="text-[13px] font-medium text-[#1F2937]">自定义分组模式</span>
          </div>
          <p className="text-[12px] text-[#6B7280] mb-3 leading-relaxed">
            手动圈定特定的人员或部门组成一个临时的封闭池，强行进行横跨重组排序。
          </p>
          <div className="rounded p-2 flex gap-3 justify-center items-center">
            <div className="flex-1 bg-[#F0FDF8] border border-[#15B8A6]/30 rounded p-2 flex flex-col items-center relative">
              <div className="absolute top-1 right-1 text-[#15B8A6] text-[10px]">+ 自定义</div>
              <div className="text-[11px] text-[#0F766E] mb-2 font-medium">专项大促组</div>
              <div className="flex justify-center gap-1 mb-1">
                <div className="w-5 h-5 rounded-full bg-pink-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-green-500 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
              <div className="flex justify-center gap-1">
                <div className="w-5 h-5 rounded-full bg-blue-500 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-purple-500 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
            </div>
            
            <div className="flex-1 bg-[#F0FDF8] border border-[#15B8A6]/30 rounded p-2 flex flex-col items-center relative">
              <div className="absolute top-1 right-1 text-[#15B8A6] text-[10px]">+ 自定义</div>
              <div className="text-[11px] text-[#0F766E] mb-2 font-medium">特殊梯队</div>
              <div className="flex justify-center gap-1 mb-1">
                <div className="w-5 h-5 rounded-full bg-purple-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-blue-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
              <div className="flex justify-center gap-1">
                <div className="w-5 h-5 rounded-full bg-green-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
                <div className="w-5 h-5 rounded-full bg-orange-400 shadow-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-white/40 rounded-full"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 箭头装饰 */}
      <div className="absolute -top-[6px] left-[107px] w-3 h-3 bg-white border-l border-t border-[#E5E7EB] rotate-45 z-[-1]"></div>
    </div>
  );
}
