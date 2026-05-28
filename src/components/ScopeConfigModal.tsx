import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

export default function ScopeConfigModal({ onClose, onSave }: { onClose: () => void, onSave: () => void }) {
  const [includeRules, setIncludeRules] = useState([{ id: 1, type: 'department', operator: '等于', value: 'Yara的测试公司', level: '7+...' }]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-[8px] w-[800px] shadow-lg flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <h2 className="text-[16px] font-medium text-[#1F2937]">适用范围配置</h2>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#4B5563]">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 h-[400px] overflow-y-auto">
          <div className="flex">
            <div className="w-[100px] text-[14px] text-[#4B5563] pt-2">包含加入：</div>
            <div className="flex-1">
              <div className="flex gap-4 items-start">
                {/* 且 或 选择器 */}
                <div className="flex flex-col items-center mt-2 group relative">
                  <div className="w-6 h-6 rounded bg-[#E6F4FF] text-[#1677FF] border border-[#91CAFF] flex items-center justify-center text-[12px] cursor-pointer relative z-10">且</div>
                  
                  {/* 连接线 - 从"且"向下延伸，在中间分叉向右连接到新增按钮 */}
                  <div className="w-[1px] h-8 bg-[#E5E7EB] absolute top-[24px]"></div>
                  <div className="absolute top-[56px] w-[20px] h-[1px] bg-[#E5E7EB] left-[50%] -z-10"></div>
                  
                  {/* Plus按钮位于线条末端 */}
                  <div className="w-4 h-4 rounded-full border border-[#15B8A6] bg-white flex items-center justify-center cursor-pointer text-[#15B8A6] absolute top-[48px] z-10 hover:bg-[#F0FDF8]">
                    <Plus size={10} />
                  </div>
                  
                  {/* 横向连接到第一条规则 */}
                  <div className="absolute top-[12px] left-[12px] w-[24px] h-[1px] bg-[#E5E7EB] -z-10"></div>
                </div>
                
                {/* 规则体 */}
                <div className="flex-1 pt-1 ml-4 border-l border-[#E5E7EB] pl-6 relative">
                  {/* 连接到第一条规则的短横线 */}
                  <div className="absolute top-[16px] left-0 w-[24px] h-[1px] bg-[#E5E7EB] -z-10"></div>
                  
                  {includeRules.map((rule, idx) => (
                    <div key={rule.id} className="flex items-start gap-2 mb-8">
                      <div className="flex items-center gap-2 relative">
                      <select 
                        value={rule.type}
                        onChange={(e) => {
                          const newRules = [...includeRules];
                          newRules[idx].type = e.target.value;
                          setIncludeRules(newRules);
                        }}
                        className="w-[160px] h-[32px] px-3 border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                      >
                        <option value="all">全员</option>
                        <option value="department">部门</option>
                        <option value="eval_group">考核组</option>
                        <option value="custom">自定义分组</option>
                      </select>
                      
                      {rule.type !== 'all' && rule.type !== 'eval_group' && (
                        <select
                          value={rule.operator}
                          onChange={(e) => {
                            const newRules = [...includeRules];
                            newRules[idx].operator = e.target.value;
                            setIncludeRules(newRules);
                          }}
                          className="w-[120px] h-[32px] px-3 border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                        >
                          <option value="等于">等于</option>
                        </select>
                      )}

                      {rule.type === 'department' && (
                        <div className="relative">
                          <select className="w-[160px] h-[32px] px-3 border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]">
                            <option value="1">第一级部门</option>
                            <option value="2">第二级部门</option>
                            <option value="3">第三级部门</option>
                          </select>
                          <div className="absolute top-[34px] left-0 text-[12px] text-[#9CA3AF] whitespace-nowrap mt-1">以公司的最高部门为第一级</div>
                        </div>
                      )}

                      {rule.type === 'custom' && (
                        <select className="w-[200px] h-[32px] px-3 border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]">
                          <option>选择人员</option>
                        </select>
                      )}

                      <button className="w-6 h-6 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-[#EF4444] hover:border-[#EF4444] transition-colors ml-2 mt-[3px]">
                        <Minus size={14} />
                      </button>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-[160px] h-[32px] border border-dashed border-[#15B8A6] text-[#15B8A6] text-[14px] rounded-[4px] flex items-center justify-center hover:bg-[#F0FDF8] transition-colors mt-2">
                    新增规则
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-8">
            <div className="w-[100px] text-[14px] text-[#4B5563] pt-2">排除删除：</div>
            <div className="flex-1">
              <button className="w-[160px] h-[32px] border border-dashed border-[#15B8A6] text-[#15B8A6] text-[14px] rounded-[4px] flex items-center justify-center hover:bg-[#F0FDF8] transition-colors mt-2">
                新增规则
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end px-6 py-4 border-t border-[#E5E7EB] gap-3">
          <button onClick={onClose} className="px-6 py-2 border border-[#E5E7EB] rounded-[4px] text-[14px] text-[#4B5563] hover:bg-[#F3F4F6]">
            取消
          </button>
          <button onClick={onSave} className="px-6 py-2 bg-[#15B8A6] hover:bg-[#0D9488] text-white rounded-[4px] text-[14px]">
            确定
          </button>
        </div>
      </div>
    </div>
  );
}
