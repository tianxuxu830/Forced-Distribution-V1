import React, { useState } from 'react';
import { X, Plus, Minus, Users } from 'lucide-react';

export default function CustomGroupModal({ onClose, onSave }: { onClose: () => void, onSave: () => void }) {
  const [groups, setGroups] = useState([{ id: 1, name: '分组1', users: [] }]);

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
          {groups.map((group) => (
            <div key={group.id} className="flex items-start gap-4 mb-4 bg-[#F9FAFB] p-4 rounded-[8px] border border-[#E5E7EB]">
              <div className="w-[60px] text-[14px] text-[#4B5563] pt-1">{group.name}</div>
              <div className="flex-1">
                <div className="w-full min-h-[32px] px-[12px] py-1 border border-[#E5E7EB] bg-white rounded-[4px] text-[14px] flex items-center text-[#9CA3AF] cursor-pointer hover:border-[#15B8A6]">
                  <Users size={14} className="mr-2 text-[#9CA3AF]" />
                  请选择人员
                </div>
              </div>
              <button 
                onClick={() => removeGroup(group.id)}
                className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${groups.length > 1 ? 'border-[#E5E7EB] bg-white text-[#9CA3AF] hover:text-[#EF4444] hover:border-[#EF4444]' : 'border-transparent text-[#D1D5DB] cursor-not-allowed hidden'}`}
                disabled={groups.length <= 1}
              >
                <Minus size={16} />
              </button>
            </div>
          ))}

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
          <button onClick={onSave} className="px-6 py-2 bg-[#15B8A6] hover:bg-[#0D9488] text-white rounded-[4px] text-[14px]">
            确定
          </button>
        </div>
      </div>
    </div>
  );
}
