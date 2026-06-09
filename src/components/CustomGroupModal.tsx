import React, { useState } from 'react';
import { X, Plus, Minus, Users } from 'lucide-react';

export default function CustomGroupModal({ onClose, onSave, initialGroups }: { onClose: () => void, onSave: (configuredGroups?: any[]) => void, initialGroups?: any[] }) {
  const [groups, setGroups] = useState(initialGroups || [{ id: 1, name: '分组1', users: [] }]);

  const addGroup = () => {
    setGroups([...groups, { id: Date.now(), name: `分组${groups.length + 1}`, users: [] }]);
  };

  const removeGroup = (id: number) => {
    if (groups.length > 1) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-[8px] w-[600px] shadow-lg flex flex-col animate-scale-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <h2 className="text-[16px] font-medium text-[#1F2937]">配置自定义分组</h2>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#4B5563]">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 max-h-[400px] overflow-y-auto">
          <div className="flex items-center gap-4 mb-3 px-2">
            <div className="w-[120px] text-[13px] font-medium text-[#4B5563]">分组名称</div>
            <div className="flex-1 text-[13px] font-medium text-[#4B5563]">组内人员</div>
            <div className="w-8"></div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {groups.map((group) => (
              <div key={group.id} className="flex items-start gap-4 p-2 bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB]">
                <div className="w-[120px]">
                  <input 
                    type="text" 
                    value={group.name}
                    onChange={(e) => {
                      const newGroups = groups.map(g => g.id === group.id ? { ...g, name: e.target.value } : g);
                      setGroups(newGroups);
                    }}
                    className="w-full h-[32px] px-2 text-[14px] border border-[#E5E7EB] bg-white rounded-[4px] focus:outline-none focus:border-[#15B8A6] transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <div className="w-full min-h-[32px] px-[12px] py-1 border border-[#E5E7EB] bg-white rounded-[4px] text-[14px] flex items-center text-[#9CA3AF] cursor-pointer hover:border-[#15B8A6] transition-colors">
                    <Users size={14} className="mr-2 text-[#9CA3AF]" />
                    请选择人员
                  </div>
                </div>
                <div className="w-8 flex items-center pt-1">
                  <button 
                    onClick={() => removeGroup(group.id)}
                    className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${groups.length > 1 ? 'text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#FEE2E2]' : 'text-[#D1D5DB] cursor-not-allowed opacity-50'}`}
                    disabled={groups.length <= 1}
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={addGroup}
            className="w-full h-[36px] border border-dashed border-[#15B8A6] text-[#15B8A6] text-[14px] rounded-[4px] flex items-center justify-center hover:bg-[#F0FDF8] transition-colors"
          >
            <Plus size={16} className="mr-1" />
            新增分组
          </button>
        </div>
        
        <div className="flex items-center justify-end px-6 py-4 border-t border-[#E5E7EB] gap-3">
          <button onClick={onClose} className="px-6 py-2 border border-[#E5E7EB] rounded-[4px] text-[14px] text-[#4B5563] hover:bg-[#F3F4F6]">
            取消
          </button>
          <button onClick={() => onSave(groups)} className="px-6 py-2 bg-[#15B8A6] hover:bg-[#0D9488] text-white rounded-[4px] text-[14px]">
            确定
          </button>
        </div>
      </div>
    </div>
  );
}
