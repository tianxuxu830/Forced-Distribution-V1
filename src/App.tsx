import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  ChevronRight,
  HelpCircle,
  Settings,
  Users,
  FileText,
  Target,
  BarChart2,
  MessageSquare,
  Bell,
  User,
  GitMerge,
  UserCheck,
  Database,
  List,
  Signal,
  Calendar,
  Clock,
  Hash,
  Sliders,
  Link,
  PieChart,
  Plus,
  Search,
  Info,
  X,
  BookOpen,
  Minus,
  Trash2,
  History,
  Layers,
  Maximize2,
  Filter,
  SlidersHorizontal,
  MoreHorizontal,
  Pencil,
  ChevronDown,
} from "lucide-react";
import ScopeConfigModal from "./components/ScopeConfigModal";
import CustomGroupModal from "./components/CustomGroupModal";
import RankScopeTooltip from "./components/RankScopeTooltip";

const ALL_LEVELS = [
  "S",
  "A",
  "B",
  "C",
  "D",
  "一类",
  "二类",
  "三类",
  "四类",
  "五类",
  "优秀 (A)",
  "良好 (B)",
  "待改进 (C)",
];

const getCalculatedLevel = (score: number, task: string) => {
  if (task === "task1") {
    if (score >= 90) return "S";
    if (score >= 81) return "A";
    if (score >= 80) return "B";
    return "C";
  } else {
    if (score >= 90) return "优秀";
    if (score >= 81) return "良好";
    if (score >= 60) return "一般";
    return "不合格";
  }
};

export default function App() {
  const [changeLogs, setChangeLogs] = useState([
    {
      id: 1,
      type: "create",
      time: "2024-03-15 10:00:00",
      operator: "张三",
      content: "创建了规则 [271分布规则]",
    },
    {
      id: 2,
      type: "update",
      time: "2024-03-16 11:30:00",
      operator: "李四",
      content: "修改了规则 [361分布规则]：更改了绩效等级范围",
    },
    {
      id: 3,
      type: "delete",
      time: "2024-03-18 09:15:00",
      operator: "王五",
      content: "删除了规则 [高管特殊分布规则]",
    },
    {
      id: 4,
      type: "status",
      time: "2024-03-20 14:00:00",
      operator: "张三",
      content: "停用了规则 [271分布规则]",
    },
  ]);

  // 简单的路由状态管理：'index' 为考核设置首页，'list' 为规则列表页，'createRule' 为新建强制分布规则页
  const [currentView, setCurrentView] = useState("index");
  const [previousView, setPreviousView] = useState("index");
  const [toastMessage, setToastMessage] = useState("");
  const [newlyCreatedRule, setNewlyCreatedRule] = useState("");
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [autoOpenUsageRuleName, setAutoOpenUsageRuleName] = useState<string | null>(null);

  const [gradeSettingsList, setGradeSettingsList] = useState([
    {
      id: "1",
      name: "测试等级",
      rule: "score_range",
      status: true,
      admin: "Yara",
      updatedAt: "2026-05-25 20:07:47",
      updatedBy: "Yara",
      desc: "",
      levels: [
        { id: 1, name: "S", engName: "", rankRatioMin: "", rankRatioMax: "", scoreMin: "90", scoreMinInclude: false, scoreMax: "100", scoreMaxInclude: true, coefficient: "1.0", coefficientMin: "0", coefficientMax: "不限", desc: "优秀" },
        { id: 2, name: "A", engName: "", rankRatioMin: "", rankRatioMax: "", scoreMin: "80", scoreMinInclude: false, scoreMax: "90", scoreMaxInclude: true, coefficient: "1.0", coefficientMin: "0", coefficientMax: "不限", desc: "良好" }
      ]
    },
    {
      id: "2",
      name: "2个等级",
      rule: "disabled",
      status: true,
      admin: "Yara",
      updatedAt: "2026-05-12 18:53:56",
      updatedBy: "Yara",
      desc: "",
      levels: [
        { id: 1, name: "S", engName: "", rankRatioMin: "", rankRatioMax: "", scoreMin: "", scoreMinInclude: false, scoreMax: "", scoreMaxInclude: true, coefficient: "", coefficientMin: "0", coefficientMax: "不限", desc: "" },
        { id: 2, name: "A", engName: "", rankRatioMin: "", rankRatioMax: "100", scoreMin: "", scoreMinInclude: false, scoreMax: "", scoreMaxInclude: true, coefficient: "", coefficientMin: "0", coefficientMax: "不限", desc: "" }
      ]
    },
    {
      id: "3",
      name: "2个等级测",
      rule: "score_range",
      status: true,
      admin: "Yara",
      updatedAt: "2026-01-22 11:20:54",
      updatedBy: "Yara",
      desc: "",
      levels: [
        { id: 1, name: "S", engName: "", rankRatioMin: "", rankRatioMax: "", scoreMin: "90", scoreMinInclude: false, scoreMax: "100", scoreMaxInclude: true, coefficient: "", coefficientMin: "0", coefficientMax: "不限", desc: "" },
        { id: 2, name: "A", engName: "", rankRatioMin: "", rankRatioMax: "", scoreMin: "80", scoreMinInclude: false, scoreMax: "90", scoreMaxInclude: true, coefficient: "", coefficientMin: "0", coefficientMax: "不限", desc: "" }
      ]
    },
    {
      id: "4",
      name: "429",
      rule: "disabled",
      status: true,
      admin: "Yara",
      updatedAt: "2025-04-29 14:27:37",
      updatedBy: "Yara",
      desc: "",
      levels: [
        { id: 1, name: "S", engName: "", rankRatioMin: "", rankRatioMax: "", scoreMin: "", scoreMinInclude: false, scoreMax: "", scoreMaxInclude: true, coefficient: "", coefficientMin: "0", coefficientMax: "不限", desc: "" }
      ]
    },
    {
      id: "5",
      name: "4.29",
      rule: "score_range",
      status: true,
      admin: "Yara",
      updatedAt: "2025-04-29 14:26:50",
      updatedBy: "Yara",
      desc: "",
      levels: [
        { id: 1, name: "S", engName: "", rankRatioMin: "", rankRatioMax: "", scoreMin: "95", scoreMinInclude: false, scoreMax: "100", scoreMaxInclude: true, coefficient: "", coefficientMin: "0", coefficientMax: "不限", desc: "" }
      ]
    },
    {
      id: "6",
      name: "符合预期",
      rule: "score_range",
      status: true,
      admin: "Yara",
      updatedAt: "2024-08-28 11:47:54",
      updatedBy: "Yara",
      desc: "",
      levels: [
        { id: 1, name: "符合预期", engName: "", rankRatioMin: "", rankRatioMax: "", scoreMin: "60", scoreMinInclude: true, scoreMax: "100", scoreMaxInclude: true, coefficient: "", coefficientMin: "0", coefficientMax: "不限", desc: "" }
      ]
    },
    {
      id: "7",
      name: "类别",
      rule: "rank_ratio",
      status: true,
      admin: "Yara",
      updatedAt: "2023-12-08 16:41:21",
      updatedBy: "Yara",
      desc: "",
      levels: [
        { id: 1, name: "A", engName: "", rankRatioMin: "0", rankRatioMax: "30", scoreMin: "", scoreMinInclude: false, scoreMax: "", scoreMaxInclude: true, coefficient: "", coefficientMin: "0", coefficientMax: "不限", desc: "" }
      ]
    },
    {
      id: "8",
      name: "等级比例",
      rule: "disabled",
      status: true,
      admin: "Yara",
      updatedAt: "2023-12-01 15:25:05",
      updatedBy: "Yara",
      desc: "",
      levels: [
        { id: 1, name: "合格", engName: "", rankRatioMin: "", rankRatioMax: "", scoreMin: "", scoreMinInclude: false, scoreMax: "", scoreMaxInclude: true, coefficient: "", coefficientMin: "0", coefficientMax: "不限", desc: "" }
      ]
    }
  ]);
  const [selectedGradeSettingId, setSelectedGradeSettingId] = useState<string | null>(null);

  const [rulesList, setRulesList] = useState([
    {
      id: 1,
      name: "271分布规则",
      description: "适用于常规部门的年度绩效考核",
      ruleType: "range",
      levelRule: "3等级(ABC)",
      updater: "张三",
      updateTime: "2024-03-15 10:00:00",
      status: "enabled",
    },
    {
      id: 2,
      name: "361分布规则",
      description: "适用于核心业务部门的季度考核",
      ruleType: "rank",
      levelRule: "3等级(ABC)",
      updater: "李四",
      updateTime: "2024-03-14 15:30:00",
      status: "enabled",
    },
    {
      id: 3,
      name: "高管特殊分布规则",
      description: "仅适用于高管团队的年度考核",
      ruleType: "range",
      levelRule: "2个等级测",
      updater: "王五",
      updateTime: "2024-03-10 09:15:00",
      status: "enabled",
    },
  ]);

  const navigateTo = (view: string) => {
    setPreviousView(currentView);
    setCurrentView(view);
  };

  const handleSaveRule = (ruleData: any) => {
    let savedId = ruleData.id;
    if (ruleData.id) {
      setRulesList(
        rulesList.map((r) =>
          r.id === ruleData.id
            ? {
                ...r,
                ...ruleData,
                updater: "当前用户",
                updateTime: new Date().toLocaleString(),
              }
            : r,
        ),
      );
      setChangeLogs([
        {
          id: Date.now(),
          type: "update",
          time: new Date().toLocaleString(),
          operator: "当前用户",
          content: `修改了规则 [${ruleData.name}]`,
        },
        ...changeLogs,
      ]);
      if (ruleData.triggerAutoUsageModal) {
        setAutoOpenUsageRuleName(ruleData.name);
      }
    } else {
      savedId = Date.now();
      const newRule = {
        ...ruleData,
        id: savedId,
        levelRule: "3等级(ABC)", // Mock value for now
        updater: "当前用户",
        updateTime: new Date().toLocaleString(),
        status: "enabled",
      };
      setRulesList([newRule, ...rulesList]);
      setChangeLogs([
        {
          id: Date.now(),
          type: "create",
          time: new Date().toLocaleString(),
          operator: "当前用户",
          content: `创建了规则 [${ruleData.name}]`,
        },
        ...changeLogs,
      ]);
    }
    setToastMessage("保存成功");
    setTimeout(() => setToastMessage(""), 3000);
    setNewlyCreatedRule(String(savedId));
    setCurrentView(previousView);
  };

  const handleToggleRuleStatus = (id: number) => {
    const rule = rulesList.find((r) => r.id === id);
    if (!rule) return;
    const newStatus = rule.status === "enabled" ? "disabled" : "enabled";
    setRulesList(
      rulesList.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              updater: "当前用户",
              updateTime: new Date().toLocaleString(),
            }
          : r,
      ),
    );
    setChangeLogs([
      {
        id: Date.now(),
        type: "status",
        time: new Date().toLocaleString(),
        operator: "当前用户",
        content: `${newStatus === "enabled" ? "启用" : "停用"}了规则 [${rule.name}]`,
      },
      ...changeLogs,
    ]);
    setToastMessage("状态更新成功");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCopyRule = (ruleId: number, newName: string) => {
    const ruleToCopy = rulesList.find((r) => r.id === ruleId);
    if (!ruleToCopy) return false;

    if (rulesList.some((r) => r.name === newName)) {
      setToastMessage("强制分布规则名称已存在，请重新输入");
      setTimeout(() => setToastMessage(""), 3000);
      return false;
    }

    const newRule = {
      ...ruleToCopy,
      id: Date.now(),
      name: newName,
      updater: "当前用户",
      updateTime: new Date().toLocaleString(),
      status: "enabled",
    };
    setRulesList([newRule, ...rulesList]);
    setChangeLogs([
      {
        id: Date.now(),
        type: "create",
        time: new Date().toLocaleString(),
        operator: "当前用户",
        content: `复制了规则 [${ruleToCopy.name}] 为 [${newName}]`,
      },
      ...changeLogs,
    ]);
    setToastMessage("复制成功");
    setTimeout(() => setToastMessage(""), 3000);
    return true;
  };

  const handleDeleteRule = (id: number) => {
    const rule = rulesList.find((r) => r.id === id);
    if (!rule) return;
    setRulesList(rulesList.filter((r) => r.id !== id));
    setChangeLogs([
      {
        id: Date.now(),
        type: "delete",
        time: new Date().toLocaleString(),
        operator: "当前用户",
        content: `删除了规则 [${rule.name}]`,
      },
      ...changeLogs,
    ]);
    setToastMessage("删除成功");
    setTimeout(() => setToastMessage(""), 3000);
  };

  if (currentView === "employeeDistributionView") {
    return (
      <EmployeeDistributionImmersiveView
        onBack={() => setCurrentView(previousView)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans text-[#1F2937]">
      {/* 顶部通栏 */}
      <header
        className="h-[48px] px-[16px] flex items-center justify-between shrink-0"
        style={{
          background: "linear-gradient(180deg, #50CABC -32%, #15B8A6 121%)",
          boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-center gap-2 text-white">
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center font-bold">
            HR
          </div>
          <span className="font-medium">智慧绩效管理系统</span>
        </div>
        <div className="flex items-center gap-4 text-white">
          <button
            onClick={() => navigateTo("employeeDistributionView")}
            className="text-[13px] border border-white/40 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-[16px] transition-colors flex items-center gap-1"
          >
            <User size={14} /> 前往员工端
          </button>
          <Bell size={18} className="cursor-pointer hover:text-white/80" />
          <HelpCircle
            size={18}
            className="cursor-pointer hover:text-white/80"
          />
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center cursor-pointer">
            <User size={16} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 左侧菜单栏 */}
        <aside className="w-[220px] bg-[#FFFFFF] m-[16px] mr-0 rounded-[8px] flex flex-col shrink-0 overflow-y-auto shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)]">
          <div className="p-[16px] flex flex-col gap-2">
            <MenuItem
              icon={<BarChart2 size={18} />}
              text="智慧绩效"
              active={false}
            />
            <MenuItem icon={<Target size={18} />} text="目标管理" />
            <MenuItem icon={<Target size={18} />} text="OKR管理" />
            <MenuItem
              icon={<FileText size={18} />}
              text="考核管理"
              expanded={currentView.startsWith("assessment")}
              active={currentView.startsWith("assessment")}
              onClick={() => navigateTo("assessmentScheme")}
            />
            {currentView.startsWith("assessment") && (
              <div className="pl-[34px] flex flex-col gap-1">
                <SubMenuItem
                  text="员工考核"
                  active={currentView === "assessmentScheme"}
                  onClick={() => navigateTo("assessmentScheme")}
                />
                <SubMenuItem
                  text="考核结果设置模拟"
                  active={currentView === "assessmentResultSettingSim"}
                  onClick={() => navigateTo("assessmentResultSettingSim")}
                />
                <SubMenuItem text="组织考核" />
              </div>
            )}
            <MenuItem
              icon={<Settings size={18} />}
              text="设置"
              expanded={!currentView.startsWith("assessment")}
              active={!currentView.startsWith("assessment")}
              onClick={() => navigateTo("index")}
            />
            {!currentView.startsWith("assessment") && (
              <div className="pl-[34px] flex flex-col gap-1">
                <SubMenuItem
                  text="考核设置"
                  active={
                    currentView === "index" ||
                    currentView === "list" ||
                    currentView === "createRule" ||
                    currentView === "editRule" ||
                    currentView === "levelSettingList" ||
                    currentView === "editLevelSetting"
                  }
                  onClick={() => navigateTo("index")}
                />
                <SubMenuItem text="目标设置" />
              </div>
            )}
            <MenuItem icon={<MessageSquare size={18} />} text="绩效咨询" />
          </div>
        </aside>

        {/* 右侧内容区 */}
        <main className="flex-1 flex flex-col p-[16px] overflow-y-auto relative">
          {toastMessage && (
            <div className="absolute top-[20px] left-1/2 -translate-x-1/2 bg-[#15B8A6] text-white px-[24px] py-[10px] rounded-[4px] shadow-lg z-50 flex items-center gap-2 transition-all">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {toastMessage}
            </div>
          )}

          {currentView === "index" && (
            <AssessmentSettingsIndex navigateTo={navigateTo} />
          )}
          {currentView === "list" && (
            <ForcedDistributionRuleList
              rulesList={rulesList}
              changeLogs={changeLogs}
              autoOpenUsageRuleName={autoOpenUsageRuleName}
              onClearAutoOpenUsage={() => setAutoOpenUsageRuleName(null)}
              onBack={() => navigateTo("index")}
              onCreate={() => navigateTo("createRule")}
              onEdit={(rule) => {
                setSelectedRule(rule);
                navigateTo("editRule");
              }}
              onToggleStatus={handleToggleRuleStatus}
              onDelete={handleDeleteRule}
              onCopy={handleCopyRule}
            />
          )}
          {currentView === "createRule" && (
            <ForcedDistributionRuleSetting
              mode="create"
              onBack={() => setCurrentView(previousView)}
              onSave={handleSaveRule}
            />
          )}
          {currentView === "editRule" && (
            <ForcedDistributionRuleSetting
              mode="edit"
              ruleData={selectedRule}
              onBack={() => setCurrentView(previousView)}
              onSave={handleSaveRule}
            />
          )}
          {currentView === "viewRule" && (
            <ForcedDistributionRuleSetting
              mode="view"
              ruleData={selectedRule}
              onBack={() => setCurrentView(previousView)}
            />
          )}
          {currentView === "levelSettingList" && (
            <LevelSettingList
              gradeSettingsList={gradeSettingsList}
              setGradeSettingsList={setGradeSettingsList}
              onBack={() => setCurrentView("index")}
              onCreate={() => {
                setSelectedGradeSettingId(null);
                setCurrentView("editLevelSetting");
              }}
              onEdit={(id) => {
                setSelectedGradeSettingId(id);
                setCurrentView("editLevelSetting");
              }}
            />
          )}
          {currentView === "editLevelSetting" && (
            <LevelSettingEdit
              editId={selectedGradeSettingId}
              gradeSettingsList={gradeSettingsList}
              setGradeSettingsList={setGradeSettingsList}
              onBack={() => setCurrentView("levelSettingList")}
            />
          )}
          {currentView === "assessmentResultSettingSim" && (
            <AssessmentResultSettingSim
              onBack={() => setCurrentView("assessmentScheme")}
            />
          )}

          <div
            style={{
              display: currentView === "assessmentScheme" ? "flex" : "none",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <AssessmentScheme
              setCurrentView={navigateTo}
              newlyCreatedRule={newlyCreatedRule}
              rulesList={rulesList}
              setRulesList={setRulesList}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

function FormulaModal({
  formula,
  onSave,
  onClose,
}: {
  formula: string;
  onSave: (f: string) => void;
  onClose: () => void;
}) {
  const [currentFormula, setCurrentFormula] = useState(formula);

  const insertText = (text: string) => {
    setCurrentFormula((prev) => prev + text);
  };

  const fields = ["指标得分", "目标值", "完成值", "保底值", "挑战值"];
  const symbols = [
    "+",
    "-",
    "*",
    "/",
    "(",
    ")",
    ":",
    ",",
    "=",
    "<",
    ">",
    "<=",
    ">=",
    "≠",
  ];
  const functions = [
    "AVERAGE",
    "MAX",
    "MIN",
    "IF",
    "AND",
    "OR",
    "MATCH",
    "CHOOSE",
    "ROUND",
    "ROUNDUP",
    "ROUNDDOWN",
    "HLOOKUP",
    "VLOOKUP",
    "MONTH",
    "HOUR",
    "EOMONTH",
    "NETWORKDAYS",
    "VALUE",
    "SMALL",
    "YEAR",
    "LOOKUP",
    "LARGE",
    "RIGHT",
    "MINUTE",
    "LHOLIDAY",
    "WEEKNUM",
    "DATEDIF",
    "WEEKDAY",
    "LEFT",
    "TODAY",
    "SEARCH",
    "MID",
    "NETWORKDAYS.INTL",
    "SUMIF",
    "DATE",
    "DAY",
  ];

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[8px] w-[900px] shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-[16px] border-b border-[#E5E7EB] shrink-0">
          <h3 className="text-[16px] font-medium text-[#1F2937]">
            计算公式配置
          </h3>
          <X
            size={20}
            className="text-[#9CA3AF] cursor-pointer hover:text-[#4B5563]"
            onClick={onClose}
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden min-h-[500px]">
          {/* Left panel */}
          <div className="w-[180px] border-r border-[#E5E7EB] flex flex-col shrink-0 bg-[#F9FAFB]">
            <div className="font-medium text-[#1F2937] text-[14px] p-[12px] border-b border-[#E5E7EB] bg-white flex-1">
              字段列表
              <div className="overflow-y-auto flex-1 py-2 font-normal">
                {fields.map((f) => (
                  <div
                    key={f}
                    onClick={() => insertText(f)}
                    className="px-[12px] py-[8px] text-[13px] text-[#4B5563] cursor-pointer hover:bg-white hover:text-[#15B8A6]"
                  >
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-medium text-[#1F2937] text-[14px] p-[12px] border-y border-[#E5E7EB] bg-white">
              指标分类
            </div>
            <div className="font-medium text-[#1F2937] text-[14px] p-[12px] border-b border-[#E5E7EB] bg-white">
              目标名称
            </div>
            <div className="font-medium text-[#1F2937] text-[14px] p-[12px] border-b border-[#E5E7EB] bg-white">
              指标说明
            </div>
            <div className="font-medium text-[#1F2937] text-[14px] p-[12px] border-b border-[#E5E7EB] bg-white">
              评分标准
            </div>
            <div className="font-medium text-[#1F2937] text-[14px] p-[12px] bg-white">
              自定义指标
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-1 flex flex-col bg-white">
            <div className="p-[16px] border-b border-[#E5E7EB] flex flex-col gap-[12px]">
              <div className="border border-[#E5E7EB] rounded-[4px] p-[12px] min-h-[120px] focus-within:border-[#15B8A6] transition-colors">
                <textarea
                  value={currentFormula}
                  onChange={(e) => setCurrentFormula(e.target.value)}
                  placeholder="请输入字段"
                  className="w-full h-[100px] resize-none outline-none text-[14px] text-[#1F2937]"
                />
              </div>
              <div className="flex items-center gap-[12px]">
                <button className="px-[16px] py-[6px] bg-[#E8F8F6] text-[#15B8A6] rounded-[4px] text-[13px] font-medium border border-[#15B8A6]/20">
                  AI检查/纠错
                </button>
                <button className="px-[16px] py-[6px] border border-[#E5E7EB] text-[#4B5563] rounded-[4px] text-[13px] hover:bg-[#F9FAFB] bg-white">
                  试算
                </button>
                <button
                  onClick={() => setCurrentFormula("")}
                  className="px-[16px] py-[6px] border border-[#E5E7EB] text-[#4B5563] rounded-[4px] text-[13px] hover:bg-[#F9FAFB] bg-white"
                >
                  重置
                </button>

                <div className="flex items-center gap-[8px] ml-4 text-[13px] text-[#4B5563]">
                  <span className="border border-[#E5E7EB] rounded-[4px] px-[8px] py-[4px] flex items-center gap-2 bg-white">
                    四舍五入
                    <ChevronRight
                      size={14}
                      className="rotate-90 text-[#9CA3AF]"
                    />
                  </span>
                  <span className="ml-[4px]">保留</span>
                  <select className="border border-[#E5E7EB] rounded-[4px] px-[8px] py-[4px] outline-none focus:border-[#15B8A6] bg-white">
                    <option>2</option>
                    <option>1</option>
                    <option>0</option>
                  </select>
                  <span>位小数</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-[16px] bg-[#F9FAFB]">
              <div className="mb-[24px]">
                <div className="text-[14px] text-[#1F2937] font-medium mb-[12px]">
                  常用符号
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {symbols.map((s) => (
                    <button
                      key={s}
                      onClick={() => insertText(s)}
                      className="px-[12px] py-[6px] border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#15B8A6] hover:bg-[#F3F4F6] min-w-[32px] font-mono bg-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[14px] text-[#1F2937] font-medium mb-[12px]">
                  常用函数
                </div>
                <div className="flex flex-wrap gap-[8px] gap-y-[12px]">
                  {functions.map((f) => (
                    <button
                      key={f}
                      onClick={() => insertText(f + "()")}
                      className="px-[12px] py-[6px] border border-[#E5E7EB] rounded-[4px] text-[12px] text-[#4B5563] hover:bg-[#F3F4F6] min-w-[70px] bg-white text-center whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-[16px] border-t border-[#E5E7EB] flex justify-end gap-[12px] shrink-0 bg-[#F9FAFB] rounded-b-[8px]">
          <button
            onClick={onClose}
            className="px-[20px] py-[6px] text-[#4B5563] hover:opacity-80 font-medium text-[14px] bg-white border border-[#E5E7EB] rounded-[4px]"
          >
            取消
          </button>
          <button
            onClick={() => onSave(currentFormula)}
            className="px-[20px] py-[6px] bg-[#15B8A6] text-white rounded-[4px] font-medium text-[14px] hover:bg-[#0F9688]"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 等级设置列表页 ---
function LevelSettingList({
  gradeSettingsList,
  setGradeSettingsList,
  onBack,
  onCreate,
  onEdit,
}: {
  gradeSettingsList: any[];
  setGradeSettingsList: React.Dispatch<React.SetStateAction<any[]>>;
  onBack: () => void;
  onCreate: () => void;
  onEdit: (id: string) => void;
}) {
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);
  const [showUsageModalOf, setShowUsageModalOf] = React.useState<any>(null);

  const toggleStatus = (id: string) => {
    setGradeSettingsList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("确定要删除该绩效等级设置吗？")) {
      setGradeSettingsList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] -m-[16px] p-[16px]">
      {/* 面包屑 */}
      <div className="flex items-center text-[12px] text-[#6B7280] mb-[16px] shrink-0 font-sans">
        <span className="cursor-pointer hover:text-[#15B8A6]" onClick={onBack}>智慧绩效</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="cursor-pointer hover:text-[#15B8A6]" onClick={onBack}>设置</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="cursor-pointer hover:text-[#15B8A6]" onClick={onBack}>考核设置</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="text-[#1F2937]">绩效等级</span>
      </div>

      {/* 白色内容卡片 */}
      <div className="bg-[#FFFFFF] p-[16px] rounded-[8px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex-1 flex flex-col overflow-hidden">
        {/* 表格顶栏 */}
        <div className="flex items-center justify-between mb-[16px] shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[16px] font-bold text-[#1F2937]">
              绩效等级({gradeSettingsList.length})
            </span>
          </div>
          
          <div className="flex items-center gap-[12px]">
            <button
              onClick={onCreate}
              className="h-[32px] px-[16px] bg-[#15B8A6] text-white text-[13px] rounded-[4px] hover:bg-[#0F9688] transition-colors flex items-center gap-1 font-medium shadow-sm cursor-pointer"
            >
              <Plus size={14} /> 创建
            </button>
            
            <button
              className="h-[32px] px-[16px] border border-[#E5E7EB] bg-white text-[#4B5563] text-[13px] rounded-[4px] hover:bg-[#F9FAFB] transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              分享权限
            </button>

            {/* 操作图标组 */}
            <div className="flex items-center gap-1 border-l border-[#E5E7EB] pl-[12px] h-[20px]">
              <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors cursor-pointer" title="筛选">
                <SlidersHorizontal size={14} />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors cursor-pointer" title="字段配置">
                <Settings size={14} />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors cursor-pointer" title="全屏">
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 数据表格区域 */}
        <div className="flex-1 overflow-auto border border-neutral-200 rounded-[4px]">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 bg-[#F9FAFB] z-10">
              <tr className="border-b border-[#E5E7EB]">
                <th className="py-[10px] px-[16px] w-[50px] text-center">
                  <input
                    type="checkbox"
                    className="rounded border-[#E5E7EB] text-[#15B8A6] focus:ring-[#15B8A6] w-3.5 h-3.5 cursor-pointer"
                  />
                </th>
                <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563]">等级名称</th>
                <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563]">等级生成规则</th>
                <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563]">状态</th>
                <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563]">管理员</th>
                <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563]">最近修改时间</th>
                <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563]">修改人</th>
                <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563]">说明</th>
                <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[120px] text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] bg-white">
              {gradeSettingsList.map((item) => {
                let ruleDisplay = "仅等级";
                if (item.rule === "score_range") ruleDisplay = "按分数范围";
                else if (item.rule === "rank_ratio") ruleDisplay = "按分数排名";

                return (
                   <tr
                     key={item.id}
                     className="hover:bg-teal-50/[0.15] transition-colors group text-[13px] text-gray-700"
                   >
                     <td className="py-[12px] px-[16px] text-center">
                       <input
                         type="checkbox"
                         className="rounded border-[#E5E7EB] text-[#15B8A6] focus:ring-[#15B8A6] w-3.5 h-3.5 cursor-pointer"
                       />
                     </td>
                     <td
                       className="py-[12px] px-[16px] font-medium text-[#15B8A6] hover:underline cursor-pointer"
                       onClick={() => onEdit(item.id)}
                     >
                       {item.name}
                     </td>
                     <td className="py-[12px] px-[16px] text-[#4B5563]">
                       {ruleDisplay}
                     </td>
                     <td className="py-[12px] px-[16px]">
                       <div className="flex items-center gap-2">
                         <button
                           className={`w-[36px] h-[18px] rounded-full p-[2px] cursor-pointer transition-colors flex items-center outline-none ${item.status ? "bg-[#15B8A6]" : "bg-[#D1D5DB]"}`}
                           onClick={() => toggleStatus(item.id)}
                         >
                           <div
                             className={`w-[14px] h-[14px] bg-white rounded-full shadow-sm transition-transform ${item.status ? "translate-x-[18px]" : "translate-x-[0px]"}`}
                           />
                         </button>
                         <span className={item.status ? "text-[#15B8A6] text-[12px]" : "text-[#9CA3AF] text-[12px]"}>
                           {item.status ? "启用" : "停用"}
                         </span>
                       </div>
                     </td>
                     <td className="py-[12px] px-[16px] text-[#4B5563]">{item.admin || "Yara"}</td>
                     <td className="py-[12px] px-[16px] text-[#4B5563]">{item.updatedAt || "2026-05-25 20:07:47"}</td>
                     <td className="py-[12px] px-[16px] text-[#4B5563]">{item.updatedBy || "Yara"}</td>
                     <td className="py-[12px] px-[16px] text-gray-400 max-w-[200px] truncate" title={item.desc}>
                       {item.desc || "--"}
                     </td>
                     <td className="py-[12px] px-[16px] text-center">
                       <div className="flex items-center justify-center gap-2">
                         <button
                           title="编辑"
                           onClick={() => onEdit(item.id)}
                           className="p-1 hover:text-[#15B8A6] text-gray-400 hover:bg-teal-50 rounded transition-colors cursor-pointer"
                         >
                           <Pencil size={13} />
                         </button>
                         <button
                           title="删除"
                           onClick={() => handleDelete(item.id)}
                           className="p-1 hover:text-red-500 text-gray-400 hover:bg-red-50 rounded transition-colors cursor-pointer"
                         >
                           <Trash2 size={13} />
                         </button>
                         <div className="relative">
                           <button
                             title="更多"
                             onClick={(e) => {
                               e.stopPropagation();
                               setActiveMenuId(activeMenuId === item.id ? null : item.id);
                             }}
                             className="p-1 hover:text-[#15B8A6] text-gray-400 hover:bg-teal-50 rounded transition-colors cursor-pointer"
                           >
                             <MoreHorizontal size={13} />
                           </button>
                           {activeMenuId === item.id && (
                             <>
                               <div className="fixed inset-0 z-20" onClick={() => setActiveMenuId(null)} />
                               <div className="absolute right-0 mt-1 w-[120px] bg-white border border-[#E5E7EB] rounded-[4px] shadow-lg py-1 z-30 font-sans text-left">
                                 <button
                                   onClick={() => {
                                     setActiveMenuId(null);
                                     setShowUsageModalOf(item);
                                   }}
                                   className="w-full px-4 py-2 text-[13px] text-[#4B5563] hover:bg-[#F0FDFA] hover:text-[#15B8A6] flex items-center gap-1.5 transition-colors cursor-pointer"
                                 >
                                   引用情况
                                 </button>
                                 <button
                                   onClick={() => {
                                     setActiveMenuId(null);
                                     alert("复制等级配置成功");
                                   }}
                                   className="w-full px-4 py-2 text-[13px] text-[#4B5563] hover:bg-[#F0FDFA] hover:text-[#15B8A6] flex items-center gap-1.5 transition-colors cursor-pointer"
                                 >
                                   复制等级
                                 </button>
                                 <button
                                   onClick={() => {
                                     setActiveMenuId(null);
                                     alert("暂无操作日志记录");
                                   }}
                                   className="w-full px-4 py-2 text-[13px] text-[#4B5563] hover:bg-[#F0FDFA] hover:text-[#15B8A6] flex items-center gap-1.5 transition-colors cursor-pointer"
                                 >
                                   操作日志
                                 </button>
                               </div>
                             </>
                           )}
                         </div>
                       </div>
                     </td>
                   </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showUsageModalOf && (
        <GradeUsageReferencesModal
          ruleName={showUsageModalOf.name}
          onClose={() => setShowUsageModalOf(null)}
        />
      )}
    </div>
  );
}

// --- 等级设置编辑页 ---
function LevelSettingEdit({
  editId,
  gradeSettingsList,
  setGradeSettingsList,
  onBack,
}: {
  editId: string | null;
  gradeSettingsList: any[];
  setGradeSettingsList: React.Dispatch<React.SetStateAction<any[]>>;
  onBack: () => void;
}) {
  const existing = gradeSettingsList.find((g) => g.id === editId);

  const [levelName, setLevelName] = useState(existing ? existing.name : "新绩效等级");
  const [scoreMatchRule, setScoreMatchRule] = useState(existing ? existing.rule : "disabled");
  const [tieRule, setTieRule] = useState(existing ? (existing.tieRule || "keep") : "keep");
  const [remainderRule, setRemainderRule] = useState(existing ? (existing.remainderRule || "next") : "next");
  const [matchCoefficientEnabled, setMatchCoefficientEnabled] = useState(existing ? !!existing.matchCoefficientEnabled : false);
  const [matchCoefficientType, setMatchCoefficientType] = useState(existing ? (existing.matchCoefficientType || "fixed") : "fixed");
  const [admin, setAdmin] = useState(existing ? (existing.admin || "Yara") : "Yara");
  const [description, setDescription] = useState(existing ? (existing.desc || "") : "");

  const [calculationFormula, setCalculationFormula] = useState(existing ? (existing.calculationFormula || "") : "");
  const [allowEmployeeModifyFormula, setAllowEmployeeModifyFormula] =
    useState(existing ? !!existing.allowEmployeeModifyFormula : false);
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  const [showBanner, setShowBanner] = useState(true);

  const [levels, setLevels] = useState(
    existing && existing.levels
      ? existing.levels
      : [
          {
            id: 1,
            name: "S",
            engName: "",
            rankRatioMin: "",
            rankRatioMax: "",
            scoreMin: "",
            scoreMinInclude: false,
            scoreMax: "",
            scoreMaxInclude: true,
            coefficient: "",
            coefficientMin: "0",
            coefficientMax: "不限",
            desc: "",
          },
          {
            id: 2,
            name: "A",
            engName: "",
            rankRatioMin: "",
            rankRatioMax: "100",
            scoreMin: "",
            scoreMinInclude: false,
            scoreMax: "",
            scoreMaxInclude: true,
            coefficient: "",
            coefficientMin: "0",
            coefficientMax: "不限",
            desc: "",
          },
        ]
  );

  const addLevel = () => {
    setLevels([
      ...levels,
      {
        id: Date.now(),
        name: "",
        engName: "",
        rankRatioMin: "",
        rankRatioMax: "",
        scoreMin: "",
        scoreMinInclude: false,
        scoreMax: "",
        scoreMaxInclude: true,
        coefficient: "",
        coefficientMin: "0",
        coefficientMax: "不限",
        desc: "",
      },
    ]);
  };

  const removeLevel = (id: number) => {
    if (levels.length > 1) {
      setLevels(levels.filter((l) => l.id !== id));
    }
  };

  const updateLevel = (id: number, field: string, value: string | boolean) => {
    setLevels(levels.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const handleSave = () => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    if (editId) {
      // Edit existing
      setGradeSettingsList((prev) =>
        prev.map((g) =>
          g.id === editId
            ? {
                ...g,
                name: levelName,
                rule: scoreMatchRule,
                tieRule,
                remainderRule,
                matchCoefficientEnabled,
                matchCoefficientType,
                admin,
                desc: description,
                levels,
                updatedAt: timeStr,
                updatedBy: "Yara",
              }
            : g
        )
      );
    } else {
      // Create new
      const newId = String(Date.now());
      setGradeSettingsList((prev) => [
        ...prev,
        {
          id: newId,
          name: levelName === "新绩效等级" ? `新绩效等级_${prev.length + 1}` : levelName,
          rule: scoreMatchRule,
          status: true,
          admin,
          updatedAt: timeStr,
          updatedBy: "Yara",
          desc: description,
          tieRule,
          remainderRule,
          matchCoefficientEnabled,
          matchCoefficientType,
          levels,
        },
      ]);
    }
    onBack();
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] -m-[16px]">
      <div className="bg-white px-[24px] py-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] border-b border-[#E5E7EB] shrink-0">
        <div className="flex items-center text-[12px] text-[#6B7280] mb-[12px]">
          <span
            className="cursor-pointer hover:text-[#15B8A6]"
            onClick={onBack}
          >
            智慧绩效
          </span>
          <ChevronRight size={14} className="mx-1" />
          <span
            className="cursor-pointer hover:text-[#15B8A6]"
            onClick={onBack}
          >
            设置
          </span>
          <ChevronRight size={14} className="mx-1" />
          <span
            className="cursor-pointer hover:text-[#15B8A6]"
            onClick={onBack}
          >
            考核设置
          </span>
          <ChevronRight size={14} className="mx-1" />
          <span className="cursor-pointer hover:text-[#15B8A6]" onClick={onBack}>绩效等级</span>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-[#1F2937]">{editId ? "编辑" : "创建"}</span>
        </div>
        <div className="text-[20px] font-medium text-[#1F2937]">
          {editId ? "编辑绩效等级" : "创建绩效等级"}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-[24px]">
        {showBanner && (
          <div className="bg-[#E8F8F6] border border-[#B2DFDB] rounded-[4px] p-[12px_16px] mb-[20px] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#009688] text-[13px]">
              <Info size={16} />
              <span>
                修改绩效等级不会对已经引用的考核方案与模板生效，需要去重新选择引用
              </span>
            </div>
            <X
              size={16}
              className="text-[#009688] cursor-pointer hover:opacity-80"
              onClick={() => setShowBanner(false)}
            />
          </div>
        )}

        <div className="bg-white rounded-[8px] p-[24px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] mb-[20px]">
          <div className="flex items-center gap-2 mb-[24px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#15B8A6]"
            >
              <path d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <h3 className="text-[16px] font-medium text-[#1F2937]">基本信息</h3>
          </div>

          <div className="flex gap-[40px]">
            <div className="flex-1 max-w-[600px] flex flex-col gap-[20px]">
              <FormRow label="绩效等级名称" required>
                <div className="flex items-center gap-2 pt-[6px]">
                  <input
                    type="text"
                    value={levelName}
                    onChange={(e) => setLevelName(e.target.value)}
                    className="flex-1 h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[13px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] outline-none"
                    placeholder="请输入绩效等级名称"
                  />
                  <HelpCircle
                    size={14}
                    className="text-[#9CA3AF] cursor-help"
                  />
                </div>
              </FormRow>

              <FormRow label="等级生成规则" required>
                <div className="flex items-center gap-2 pt-[6px]">
                  <RadioGroup
                    name="scoreMatchRule"
                    value={scoreMatchRule}
                    onChange={(val) => setScoreMatchRule(val)}
                    options={[
                      { label: "按分数范围", value: "score_range" },
                      { label: "按分数排名", value: "rank_ratio" },
                      { label: "仅等级", value: "disabled" },
                    ]}
                  />
                  <HelpCircle
                    size={14}
                    className="text-[#9CA3AF] cursor-help"
                  />
                </div>
              </FormRow>

              <FormRow label="匹配系数">
                <div className="pt-[6px]">
                  <div
                    className={`w-[40px] h-[20px] rounded-full p-[2px] cursor-pointer transition-colors flex items-center ${matchCoefficientEnabled ? "bg-[#15B8A6]" : "bg-[#D1D5DB]"}`}
                    onClick={() =>
                      setMatchCoefficientEnabled(!matchCoefficientEnabled)
                    }
                  >
                    <div
                      className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform ${matchCoefficientEnabled ? "translate-x-[20px]" : "translate-x-[2px]"}`}
                    />
                  </div>
                </div>
              </FormRow>

              {matchCoefficientEnabled && (
                <FormRow label="匹配方式">
                  <div className="pt-[6px]">
                    <div className="bg-[#15B8A6]/[0.05] p-[8px_16px] rounded-[4px] border border-[#15B8A6]/20 inline-block">
                      <RadioGroup
                        name="matchCoefficientType"
                        value={matchCoefficientType}
                        onChange={setMatchCoefficientType}
                        options={[
                          { label: "固定系数", value: "fixed" },
                          { label: "手动输入", value: "custom" },
                          { label: "自动计算", value: "calculated" },
                        ]}
                      />
                    </div>
                  </div>
                </FormRow>
              )}

              {matchCoefficientEnabled &&
                matchCoefficientType === "calculated" && (
                  <FormRow label="计算公式配置" required>
                    <div className="flex flex-col gap-2 pt-[6px] w-full relative">
                      <div className="flex justify-end items-center mb-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={allowEmployeeModifyFormula}
                            onChange={(e) =>
                              setAllowEmployeeModifyFormula(e.target.checked)
                            }
                            className="text-[#15B8A6] rounded border-[#E5E7EB] focus:ring-[#15B8A6] w-3.5 h-3.5"
                          />
                          <span className="text-[13px] text-[#4B5563]">
                            允许员工修改公式
                          </span>
                        </label>
                      </div>
                      <div
                        onClick={() => setShowFormulaModal(true)}
                        className="w-full border border-[#E5E7EB] rounded-[4px] p-3 text-[14px] min-h-[50px] bg-white cursor-pointer hover:border-[#15B8A6] transition-colors flex items-center"
                      >
                        {calculationFormula ? (
                          `指标得分=${calculationFormula}`
                        ) : (
                          <span className="text-[#9CA3AF]">指标得分=</span>
                        )}
                      </div>
                    </div>
                  </FormRow>
                )}

              <FormRow label="管理员" required>
                <div className="pt-[6px]">
                  <CustomSelect
                    options={[{ label: "Yara", value: "Yara" }]}
                    value={admin}
                    onChange={setAdmin}
                  />
                </div>
              </FormRow>

              <FormRow label="说明">
                <div className="pt-[6px]">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="请输入"
                    className="w-full h-[80px] border border-[#E5E7EB] rounded-[4px] p-[10px] text-[13px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] resize-none"
                  />
                  <div className="text-right text-[12px] text-[#9CA3AF] mt-1">
                    {description.length} / 2000
                  </div>
                </div>
              </FormRow>
            </div>

            <div className="w-[400px] border-l border-[#E5E7EB] pl-[40px] py-[10px]">
              <div className="flex items-center gap-2 text-[14px] font-medium text-[#1F2937] mb-[12px]">
                <BookOpen size={16} className="text-[#15B8A6]" />
                配置说明
              </div>
              <div className="text-[13px] text-[#6B7280] space-y-[12px] leading-relaxed">
                {scoreMatchRule === "score_range" && (
                  <div className="space-y-[12px]">
                    <p>
                      1、绩效等级生成规则：在「等级生成规则」中选择匹配方式即可
                    </p>
                    <p>
                      2、[按分数范围]填写规则：
                      <br />
                      等级需要按照分数区间从高到低填写
                      <br />
                      两个连续的等级，前一等级的最小分数的包含关系不能和后一等级的最大分数重复
                      <br />
                      后一等级的最大分数必须=上一等级的最小分数
                    </p>
                    <div className="text-[#3B82F6] space-y-1 mt-2 bg-[#EFF6FF] p-3 rounded-[4px]">
                      <p>举例：S：90~100（包含），A：80~90（包含）</p>
                      <p>先添加S（最小分数：不包含90，最大分数：包含100）</p>
                      <p>再增加A（最小分数：不包含80，最大分数：包含90）</p>
                    </div>
                  </div>
                )}
                {scoreMatchRule === "rank_ratio" && (
                  <div className="space-y-[12px]">
                    <p>
                      1、绩效等级生成规则：在「等级生成规则」中选择匹配方式即可
                    </p>
                    <p>
                      2、[按分数排名]填写规则：
                      <br />
                      等级需要按照排名从高到低填写
                      <br />
                      排名比例按累计区间生效，前一等级的右侧边界即为后一等级的左侧边界
                      <br />
                      同分跨级时，按“同分超人数规则”自动判定
                    </p>
                    <div className="text-[#3B82F6] space-y-1 mt-2 bg-[#EFF6FF] p-3 rounded-[4px]">
                      <p>举例：S：前10%，A：前10%~30%，B：前30%~70%</p>
                      <p>若第10名与第11名同分，则按同分超人数规则决定第10名和第11名的等级</p>
                    </div>
                  </div>
                )}
                {scoreMatchRule === "disabled" && (
                  <div className="space-y-[12px]">
                    <p>
                      1、绩效等级生成规则：在「等级生成规则」中选择匹配方式即可
                    </p>
                    <p>
                      2、[仅等级]填写规则：
                      <br />
                      此模式为纯定性评价，考核全过程不涉及任何分数，也不存在自动换算逻辑。
                    </p>
                    <div className="text-[#3B82F6] space-y-1 mt-2 bg-[#EFF6FF] p-3 rounded-[4px]">
                      <p>举例：评价人直接选择“优秀/良好/一般”即可，不关联分数。</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[8px] p-[24px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] mb-[60px]">
          <div className="flex items-center gap-2 mb-[16px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#15B8A6]"
            >
              <path d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <h3 className="text-[16px] font-medium text-[#1F2937]">等级配置</h3>
          </div>

          {scoreMatchRule === "rank_ratio" && (
            <div className="flex flex-col gap-4 mb-[20px] max-w-[800px]">
              <div className="flex items-center">
                <div className="w-[180px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                  <span className="text-red-500 mr-1">*</span>
                  <span className="text-[14px] text-[#4B5563]">
                    同分超人数规则 :
                  </span>
                </div>
                <select
                  value={tieRule}
                  onChange={(e) => setTieRule(e.target.value)}
                  className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                >
                  <option value="keep">均保持当前等级</option>
                  <option value="down">均降到下一等级</option>
                </select>
              </div>
              <div className="flex items-center mt-[-8px]">
                <div className="w-[180px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                  <span className="text-red-500 mr-1">*</span>
                  <span className="text-[14px] text-[#4B5563]">余数处理 :</span>
                </div>
                <select
                  value={remainderRule}
                  onChange={(e) => setRemainderRule(e.target.value)}
                  className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                >
                  <option value="next">迁移到下一等级</option>
                  <option value="specific">迁移到指定等级</option>
                </select>
              </div>
            </div>
          )}

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="py-[12px] px-[16px] w-[60px] text-[13px] font-medium text-[#4B5563] text-center">
                  序号
                </th>
                <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                  等级名称
                </th>
                <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                  英文名称
                  <HelpCircle
                    size={12}
                    className="inline ml-1 text-[#9CA3AF] cursor-help"
                  />
                </th>
                {scoreMatchRule === "score_range" && (
                  <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                    分数区间
                    <HelpCircle
                      size={12}
                      className="inline ml-1 text-[#9CA3AF] cursor-help"
                    />
                  </th>
                )}
                {scoreMatchRule === "rank_ratio" && (
                  <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                    排名比例
                  </th>
                )}
                {matchCoefficientEnabled && scoreMatchRule !== "rank_ratio" && (
                  <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                    匹配系数
                  </th>
                )}
                <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                  等级说明
                </th>
                <th className="py-[12px] px-[16px] w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level, index) => (
                <tr
                  key={level.id}
                  className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]/50"
                >
                  <td className="py-[16px] px-[16px] text-center text-[13px] text-[#4B5563] font-medium">
                    {index + 1}
                  </td>
                  <td className="py-[16px] px-[16px]">
                    <input
                      type="text"
                      value={level.name}
                      onChange={(e) =>
                        updateLevel(level.id, "name", e.target.value)
                      }
                      className="w-full h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[13px] focus:outline-none focus:border-[#15B8A6]"
                    />
                  </td>
                  <td className="py-[16px] px-[16px]">
                    <input
                      type="text"
                      value={level.engName}
                      onChange={(e) =>
                        updateLevel(level.id, "engName", e.target.value)
                      }
                      className="w-full h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[13px] focus:outline-none focus:border-[#15B8A6]"
                    />
                  </td>
                  {scoreMatchRule === "score_range" && (
                    <td className="py-[16px] px-[16px]">
                      <div className="flex items-center gap-1">
                        <select
                          className="h-[32px] px-1 border border-[#E5E7EB] rounded-[4px] text-[12px] focus:outline-none bg-white text-[#4B5563]"
                          value={level.scoreMinInclude ? "inc" : "exc"}
                          onChange={(e) =>
                            updateLevel(
                              level.id,
                              "scoreMinInclude",
                              e.target.value === "inc",
                            )
                          }
                        >
                          <option value="inc">包含</option>
                          <option value="exc">不包含</option>
                        </select>
                        <input
                          type="text"
                          value={level.scoreMin}
                          onChange={(e) =>
                            updateLevel(level.id, "scoreMin", e.target.value)
                          }
                          className="w-[40px] h-[32px] px-1 border border-[#E5E7EB] rounded-[4px] text-[13px] text-center focus:outline-none focus:border-[#15B8A6]"
                        />
                        <span className="text-[#9CA3AF]">-</span>
                        <select
                          className="h-[32px] px-1 border border-[#E5E7EB] rounded-[4px] text-[12px] focus:outline-none bg-white text-[#4B5563]"
                          value={level.scoreMaxInclude ? "inc" : "exc"}
                          onChange={(e) =>
                            updateLevel(
                              level.id,
                              "scoreMaxInclude",
                              e.target.value === "inc",
                            )
                          }
                        >
                          <option value="inc">包含</option>
                          <option value="exc">不包含</option>
                        </select>
                        <input
                          type="text"
                          value={level.scoreMax}
                          onChange={(e) =>
                            updateLevel(level.id, "scoreMax", e.target.value)
                          }
                          className="w-[40px] h-[32px] px-1 border border-[#E5E7EB] rounded-[4px] text-[13px] text-center focus:outline-none focus:border-[#15B8A6]"
                        />
                      </div>
                    </td>
                  )}
                  {scoreMatchRule === "rank_ratio" && (
                    <td className="py-[16px] px-[16px]">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex items-center gap-1 border border-[#E5E7EB] rounded-[4px] pr-[8px] focus-within:border-[#15B8A6] ${index !== 0 ? "bg-[#F9FAFB]" : "bg-white"}`}
                        >
                          <input
                            type="number"
                            placeholder="请输入比例"
                            value={
                              index !== 0
                                ? levels[index - 1].rankRatioMax
                                : level.rankRatioMin
                            }
                            onChange={(e) =>
                              updateLevel(
                                level.id,
                                "rankRatioMin",
                                e.target.value,
                              )
                            }
                            disabled={index !== 0}
                            className={`w-[110px] h-[32px] px-[12px] text-[13px] focus:outline-none bg-transparent ${index !== 0 ? "text-[#9CA3AF] cursor-not-allowed" : "text-[#1F2937]"}`}
                          />
                          <span className="text-[#9CA3AF] text-[13px]">%</span>
                        </div>
                        <span className="text-[#9CA3AF]">~</span>
                        <div
                          className={`flex items-center gap-1 border border-[#E5E7EB] rounded-[4px] pr-[8px] focus-within:border-[#15B8A6] ${index === levels.length - 1 ? "bg-[#F9FAFB]" : "bg-white"}`}
                        >
                          <input
                            type="number"
                            placeholder="请输入比例"
                            value={
                              index === levels.length - 1
                                ? "100"
                                : level.rankRatioMax
                            }
                            onChange={(e) =>
                              updateLevel(
                                level.id,
                                "rankRatioMax",
                                e.target.value,
                              )
                            }
                            disabled={index === levels.length - 1}
                            className={`w-[110px] h-[32px] px-[12px] text-[13px] focus:outline-none bg-transparent ${index === levels.length - 1 ? "text-[#9CA3AF] cursor-not-allowed" : "text-[#1F2937]"}`}
                          />
                          <span className="text-[#9CA3AF] text-[13px]">%</span>
                        </div>
                      </div>
                    </td>
                  )}
                  {matchCoefficientEnabled &&
                    scoreMatchRule !== "rank_ratio" && (
                      <td className="py-[16px] px-[16px]">
                        {matchCoefficientType === "custom" ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={level.coefficientMin}
                              onChange={(e) =>
                                updateLevel(
                                  level.id,
                                  "coefficientMin",
                                  e.target.value,
                                )
                              }
                              className="flex-1 w-[60px] h-[32px] px-2 border border-[#E5E7EB] rounded-[4px] text-[13px] text-center focus:outline-none focus:border-[#15B8A6]"
                            />
                            <span className="text-[#9CA3AF]">-</span>
                            <input
                              type="text"
                              value={level.coefficientMax}
                              onChange={(e) =>
                                updateLevel(
                                  level.id,
                                  "coefficientMax",
                                  e.target.value,
                                )
                              }
                              className="flex-1 w-[60px] h-[32px] px-2 border border-[#E5E7EB] rounded-[4px] text-[13px] text-center focus:outline-none focus:border-[#15B8A6]"
                            />
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={level.coefficient}
                            onChange={(e) =>
                              updateLevel(
                                level.id,
                                "coefficient",
                                e.target.value,
                              )
                            }
                            className="w-full h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[13px] focus:outline-none focus:border-[#15B8A6]"
                          />
                        )}
                      </td>
                    )}
                  <td className="py-[16px] px-[16px]">
                    <input
                      type="text"
                      value={level.desc}
                      onChange={(e) =>
                        updateLevel(level.id, "desc", e.target.value)
                      }
                      className="w-full h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[13px] focus:outline-none focus:border-[#15B8A6]"
                    />
                  </td>
                  <td className="py-[16px] px-[16px] flex items-center gap-2">
                    <button
                      onClick={addLevel}
                      className="text-[#15B8A6] hover:opacity-80 border border-[#15B8A6] rounded-full p-1 flex items-center justify-center bg-white"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeLevel(level.id)}
                      disabled={levels.length === 1}
                      className="text-[#EF4444] hover:opacity-80 border border-[#EF4444] rounded-full p-1 flex items-center justify-center bg-white disabled:opacity-50 disabled:border-[#E5E7EB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
                    >
                      <Minus size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-[16px]">
            <button
              onClick={addLevel}
              className="px-4 py-1.5 border border-[#15B8A6] text-[#15B8A6] bg-[#E8F8F6] rounded-[4px] text-[13px] flex items-center gap-1 transition-colors"
            >
              <Plus size={14} className="text-[#15B8A6]" /> 新增
            </button>
          </div>
        </div>
      </div>

      {/* 底部操作区 */}
      <div className="h-[60px] bg-white border-t border-[#E5E7EB] flex items-center justify-end px-[24px] gap-[12px] mt-auto shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] relative z-20">
        <button
          onClick={onBack}
          className="px-[20px] h-[32px] text-[#4B5563] text-[14px] hover:text-[#1F2937] transition-colors focus:outline-none"
        >
          取消
        </button>
        <button
          onClick={handleSave}
          className="px-[20px] h-[32px] bg-[#15B8A6] text-white rounded-[4px] text-[14px] hover:bg-[#0F9688] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#15B8A6] focus:ring-offset-2"
        >
          保存
        </button>
      </div>

      {showFormulaModal && (
        <FormulaModal
          formula={calculationFormula}
          onSave={(f) => {
            setCalculationFormula(f);
            setShowFormulaModal(false);
          }}
          onClose={() => setShowFormulaModal(false)}
        />
      )}
    </div>
  );
}

// --- 考核设置首页 (图1还原) ---
function AssessmentSettingsIndex({
  navigateTo,
}: {
  navigateTo: (view: string) => void;
}) {
  return (
    <>
      {/* 面包屑 */}
      <div className="flex items-center text-[12px] text-[#6B7280] mb-[16px]">
        <span className="cursor-pointer hover:text-[#15B8A6]">智慧绩效</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="cursor-pointer hover:text-[#15B8A6]">设置</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="text-[#1F2937]">考核设置</span>
      </div>

      {/* 白色内容卡片 */}
      <div className="bg-[#FFFFFF] rounded-[8px] p-[16px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex-1 overflow-y-auto">
        <SettingSection title="流程规则设置">
          <SettingCard
            icon={<GitMerge size={24} />}
            title="流程设置"
            color="bg-[#4EA8F5]"
          />
          <SettingCard
            icon={<UserCheck size={24} />}
            title="考核角色"
            color="bg-[#4EA8F5]"
          />
        </SettingSection>

        <SettingSection title="考核模板设置">
          <SettingCard
            icon={<FileText size={24} />}
            title="模板设置"
            color="bg-[#4EA8F5]"
          />
          <SettingCard
            icon={<Database size={24} />}
            title="字段库"
            color="bg-[#F5A623]"
          />
          <SettingCard
            icon={<Target size={24} />}
            title="目标模板设置"
            color="bg-[#F5A623]"
          />
        </SettingSection>

        <SettingSection title="考核结果设置">
          <SettingCard
            icon={<List size={24} />}
            title="评分规则"
            color="bg-[#67C23A]"
          />
          <SettingCard
            icon={<Signal size={24} />}
            title="等级设置"
            color="bg-[#F5A623]"
            onClick={() => navigateTo("levelSettingList")}
          />
          {/* 新增的强制分布规则入口 */}
          <SettingCard
            icon={<PieChart size={24} />}
            title="强制分布规则"
            color="bg-[#15B8A6]"
            onClick={() => navigateTo("list")}
            isNew
          />
        </SettingSection>

        <SettingSection title="基础配置">
          <SettingCard
            icon={<Calendar size={24} />}
            title="周期设置"
            color="bg-[#4EA8F5]"
          />
          <SettingCard
            icon={<Clock size={24} />}
            title="计量单位设置"
            color="bg-[#4EA8F5]"
          />
          <SettingCard
            icon={<Hash size={24} />}
            title="指标编码设置"
            color="bg-[#67C23A]"
          />
          <SettingCard
            icon={<Sliders size={24} />}
            title="偏好设置"
            color="bg-[#4EA8F5]"
          />
          <SettingCard
            icon={<Link size={24} />}
            title="数据引用规则"
            color="bg-[#4EA8F5]"
          />
        </SettingSection>
      </div>
    </>
  );
}

function SettingSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-[32px]">
      <div className="flex items-center gap-2 mb-[16px]">
        <div className="w-[4px] h-[14px] bg-[#15B8A6] rounded-full"></div>
        <h2 className="text-[14px] font-bold text-[#1F2937]">{title}</h2>
      </div>
      <div className="flex flex-wrap gap-[16px]">{children}</div>
    </div>
  );
}

function SettingCard({
  icon,
  title,
  color,
  onClick,
  isNew,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  onClick?: () => void;
  isNew?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className="relative w-[260px] h-[80px] border border-[#E5E7EB] rounded-[4px] flex items-center px-[20px] cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-[#15B8A6] transition-all bg-white group"
    >
      <div
        className={`w-[48px] h-[48px] rounded-full flex items-center justify-center text-white ${color} group-hover:scale-105 transition-transform`}
      >
        {icon}
      </div>
      <span className="ml-[16px] text-[14px] font-medium text-[#1F2937]">
        {title}
      </span>

      {isNew && (
        <span className="absolute top-0 right-0 bg-[#FF4D4F] text-white text-[10px] px-2 py-0.5 rounded-bl-[4px] rounded-tr-[4px]">
          NEW
        </span>
      )}
    </div>
  );
}

// --- 分享权限弹窗 ---
function SharePermissionModal({
  onClose,
  selectedCount,
}: {
  onClose: () => void;
  selectedCount: number;
}) {
  const [searchKey, setSearchKey] = useState("");
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);

  // 模拟管理员列表
  const adminList = [
    { id: "1", name: "张三", role: "主管理员" },
    { id: "2", name: "李四", role: "子管理员" },
    { id: "3", name: "王五", role: "子管理员" },
    { id: "4", name: "赵六", role: "子管理员" },
  ];

  const filteredAdmins = adminList.filter((a) => a.name.includes(searchKey));

  const toggleAdmin = (id: string) => {
    if (selectedAdmins.includes(id)) {
      setSelectedAdmins(selectedAdmins.filter((aId) => aId !== id));
    } else {
      setSelectedAdmins([...selectedAdmins, id]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center font-sans">
      <div className="bg-white rounded-[8px] w-[500px] flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <div className="px-[24px] py-[20px] border-b border-[#E5E7EB] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-[#1F2937]">分享权限</h2>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#4B5563]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-[24px] flex flex-col gap-[20px] overflow-y-auto max-h-[60vh]">
          <div className="text-[14px] text-[#4B5563] bg-[#F9FAFB] p-3 rounded">
            已选择{" "}
            <span className="text-[#15B8A6] font-medium mx-1">
              {selectedCount}
            </span>{" "}
            个规则进行分享
          </div>

          <div>
            <div className="mb-2 text-[14px] text-[#1F2937] font-medium">
              选择管理员
            </div>
            <div className="relative mb-3">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="搜索管理员"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="w-full h-[36px] pl-[32px] pr-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6]"
              />
            </div>

            <div className="border border-[#E5E7EB] rounded-[4px] max-h-[240px] overflow-y-auto">
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <label
                    key={admin.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-[#F9FAFB] cursor-pointer border-b border-[#E5E7EB] last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-[32px] h-[32px] rounded-full bg-[#15B8A6]/10 text-[#15B8A6] flex items-center justify-center text-[12px] font-medium">
                        {admin.name.slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-[14px] text-[#1F2937]">
                          {admin.name}
                        </div>
                        <div className="text-[12px] text-[#9CA3AF] mt-0.5">
                          {admin.role}
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedAdmins.includes(admin.id)}
                      onChange={() => toggleAdmin(admin.id)}
                      className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] rounded focus:ring-[#15B8A6]"
                    />
                  </label>
                ))
              ) : (
                <div className="py-8 text-center text-[#9CA3AF] text-[13px]">
                  未找到匹配的管理员
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-[24px] py-[16px] flex justify-end gap-[12px] border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="px-[16px] h-[32px] bg-white border border-[#E5E7EB] text-[#4B5563] rounded-[4px] text-[14px] hover:bg-[#F9FAFB] transition-colors"
          >
            取消
          </button>
          <button
            onClick={onClose}
            disabled={selectedAdmins.length === 0}
            className="px-[16px] h-[32px] bg-[#15B8A6] text-white rounded-[4px] text-[14px] hover:bg-[#0F9688] transition-colors disabled:bg-[#A7F3D0] disabled:cursor-not-allowed"
          >
            确认分享
          </button>
        </div>
      </div>
    </div>
  );
}

function CopyRuleModal({
  onClose,
  onConfirm,
  defaultName,
}: {
  onClose: () => void;
  onConfirm: (newName: string) => void;
  defaultName: string;
}) {
  const [name, setName] = useState(defaultName + " (副本)");
  const [error, setError] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[8px] w-[520px] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-[20px] border-b border-[#E5E7EB]">
          <h3 className="text-[16px] font-medium text-[#1F2937]">
            复制强制分布规则
          </h3>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#4B5563]"
          >
            <span className="text-[20px] leading-none">×</span>
          </button>
        </div>
        <div className="p-[24px]">
          <div className="flex items-center mb-[8px]">
            <span className="text-red-500 mr-1">*</span>
            <span className="text-[14px] text-[#4B5563]">强制分布规则名称</span>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            className={`w-full h-[32px] px-[12px] border ${error ? "border-[#FF4D4F]" : "border-[#E5E7EB]"} rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]`}
            placeholder="请输入规则名称"
            maxLength={50}
          />
          {error && (
            <div className="text-[#FF4D4F] text-[12px] mt-1">{error}</div>
          )}
        </div>
        <div className="p-[20px] border-t border-[#E5E7EB] flex items-center justify-end bg-[#F9FAFB] rounded-b-[8px]">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-[16px] h-[32px] bg-white border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#4B5563] hover:bg-[#F9FAFB]"
            >
              取消
            </button>
            <button
              onClick={() => {
                if (!name.trim()) {
                  setError("请输入规则名称");
                  return;
                }
                onConfirm(name.trim());
              }}
              className="px-[16px] h-[32px] bg-[#15B8A6] rounded-[4px] text-[13px] text-white hover:bg-[#15B8A6]/90"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChangeLogModal({
  onClose,
  logs,
}: {
  onClose: () => void;
  logs: any[];
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-[8px] shadow-lg flex flex-col">
        <div className="px-[24px] py-[16px] border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-medium text-[#1F2937]">变更记录</h3>
            <span className="text-[#9CA3AF] text-[13px]">
              最近30天内的操作记录
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#4B5563]"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-[24px] max-h-[500px] overflow-y-auto">
          <div className="relative border-l border-[#E5E7EB] ml-[10px] pl-[20px] pb-[16px]">
            {logs.map((log, index) => (
              <div key={log.id} className="mb-[24px] last:mb-0 relative">
                <div className="absolute left-[-26px] top-1 w-3 h-3 rounded-full bg-[#15B8A6] ring-4 ring-white" />
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[14px] font-medium text-[#1F2937]">
                    {log.operator}
                  </span>
                  <span className="text-[12px] text-[#9CA3AF]">{log.time}</span>
                </div>
                <div className="text-[14px] text-[#4B5563] bg-[#F9FAFB] p-3 rounded-[4px] mt-2 border border-[#E5E7EB]">
                  {log.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-[24px] py-[16px] border-t border-[#E5E7EB] flex justify-end gap-3 rounded-b-[8px] bg-[#F9FAFB]">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#E5E7EB] rounded bg-white text-[#4B5563] hover:bg-gray-50 text-[14px]"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 强制分布规则列表页 ---
function ForcedDistributionRuleList({
  rulesList,
  changeLogs = [],
  onBack,
  onCreate,
  onEdit,
  onToggleStatus,
  onDelete,
  onCopy,
  autoOpenUsageRuleName,
  onClearAutoOpenUsage,
}: {
  rulesList: any[];
  changeLogs?: any[];
  onBack: () => void;
  onCreate: () => void;
  onEdit: (rule: any) => void;
  onToggleStatus: (id: number) => void;
  onDelete?: (id: number) => void;
  onCopy?: (ruleId: number, newName: string) => boolean;
  autoOpenUsageRuleName?: string | null;
  onClearAutoOpenUsage?: () => void;
}) {
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [selectedRuleName, setSelectedRuleName] = useState("");

  useEffect(() => {
    if (autoOpenUsageRuleName) {
      setSelectedRuleName(autoOpenUsageRuleName);
      setShowUsageModal(true);
    }
  }, [autoOpenUsageRuleName]);

  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showChangeLogModal, setShowChangeLogModal] = useState(false);
  const [copyModalData, setCopyModalData] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const [columns, setColumns] = useState([
    { key: "name", label: "规则名称", visible: true },
    { key: "description", label: "规则说明", visible: true },
    { key: "levelRule", label: "等级规则", visible: true },
    { key: "status", label: "状态", visible: true },
    { key: "updater", label: "更新人", visible: true },
    { key: "updateTime", label: "更新时间", visible: true },
    { key: "actions", label: "操作", visible: true },
  ]);

  const toggleColumn = (key: string) => {
    setColumns(
      columns.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col,
      ),
    );
  };

  const toggleRowSelection = (id: number) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter((rowId) => rowId !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  const toggleAllRows = () => {
    if (selectedRowIds.length === rulesList.length && rulesList.length > 0) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(rulesList.map((r) => r.id));
    }
  };

  return (
    <>
      {/* 面包屑 */}
      <div className="flex items-center text-[12px] text-[#6B7280] mb-[16px]">
        <span className="cursor-pointer hover:text-[#15B8A6]">智慧绩效</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="cursor-pointer hover:text-[#15B8A6]">设置</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="cursor-pointer hover:text-[#15B8A6]" onClick={onBack}>
          考核设置
        </span>
        <ChevronRight size={14} className="mx-1" />
        <span className="text-[#1F2937]">强制分布规则</span>
      </div>

      {/* 白色内容卡片 */}
      <div className="bg-[#FFFFFF] rounded-[8px] p-[16px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex-1 flex flex-col">
        {/* 头部操作区 */}
        <div className="flex items-center justify-between mb-[16px]">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center text-[#15B8A6] hover:opacity-80 text-[14px] font-medium"
            >
              <ChevronRight size={16} className="rotate-180 mr-1" />
              返回
            </button>
            <h1 className="text-[16px] font-medium text-[#1F2937] border-l border-[#E5E7EB] pl-4">
              强制分布规则
            </h1>
          </div>
          <div className="flex items-center gap-3 relative">
            <button
              onClick={() => {
                if (selectedRowIds.length > 0) {
                  setShowShareModal(true);
                }
              }}
              className={`px-[16px] h-[32px] border rounded-[4px] text-[14px] transition-colors flex items-center gap-1 ${
                selectedRowIds.length > 0
                  ? "border-[#E5E7EB] bg-white text-[#1F2937] hover:bg-[#F9FAFB]"
                  : "border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF] cursor-not-allowed"
              }`}
              disabled={selectedRowIds.length === 0}
            >
              分享权限
            </button>
            <button
              onClick={() => setShowColumnSettings(!showColumnSettings)}
              className="w-[32px] h-[32px] flex items-center justify-center border border-[#E5E7EB] rounded-[4px] text-[#4B5563] hover:bg-[#F9FAFB] transition-colors"
            >
              <Settings size={16} />
            </button>

            {showColumnSettings && (
              <div className="absolute top-[40px] right-[100px] w-[200px] bg-white border border-[#E5E7EB] rounded-[4px] shadow-lg z-10 p-2">
                <div className="text-[12px] font-medium text-[#6B7280] mb-2 px-2">
                  列设置
                </div>
                {columns.map((col) => (
                  <label
                    key={col.key}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#F9FAFB] cursor-pointer rounded"
                  >
                    <input
                      type="checkbox"
                      checked={col.visible}
                      onChange={() => toggleColumn(col.key)}
                      className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] rounded focus:ring-[#15B8A6]"
                    />
                    <span className="text-[13px] text-[#4B5563]">
                      {col.label}
                    </span>
                  </label>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowChangeLogModal(true)}
              className="px-[16px] h-[32px] border border-[#E5E7EB] bg-[#FFFFFF] text-[#4B5563] hover:bg-[#F9FAFB] rounded-[4px] text-[14px] transition-colors flex items-center gap-1"
            >
              <History size={16} /> 变更记录
            </button>
            <button
              onClick={onCreate}
              className="px-[16px] h-[32px] bg-[#15B8A6] text-white rounded-[4px] text-[14px] hover:bg-[#15B8A6]/90 transition-colors flex items-center gap-1"
            >
              <Plus size={16} /> 新建规则
            </button>
          </div>
        </div>

        {/* 列表区 */}
        <div className="border border-[#E5E7EB] rounded-[4px] overflow-hidden flex-1 flex flex-col">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="py-[12px] px-[16px] w-[50px] text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] rounded focus:ring-[#15B8A6]"
                    checked={
                      selectedRowIds.length === rulesList.length &&
                      rulesList.length > 0
                    }
                    onChange={toggleAllRows}
                  />
                </th>
                {columns.map(
                  (col) =>
                    col.visible && (
                      <th
                        key={col.key}
                        className={`py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563] ${col.key === "actions" ? "w-[180px]" : ""}`}
                      >
                        {col.label}
                      </th>
                    ),
                )}
              </tr>
            </thead>
            <tbody>
              {rulesList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]/50 transition-colors"
                >
                  <td className="py-[12px] px-[16px] w-[50px] text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] rounded focus:ring-[#15B8A6]"
                      checked={selectedRowIds.includes(item.id)}
                      onChange={() => toggleRowSelection(item.id)}
                    />
                  </td>
                  {columns.find((c) => c.key === "name")?.visible && (
                    <td className="py-[12px] px-[16px] text-[13px] text-[#1F2937]">
                      {item.name}
                    </td>
                  )}
                  {columns.find((c) => c.key === "description")?.visible && (
                    <td
                      className="py-[12px] px-[16px] text-[13px] text-[#4B5563] max-w-[200px] truncate"
                      title={item.description}
                    >
                      {item.description || "-"}
                    </td>
                  )}
                  {columns.find((c) => c.key === "levelRule")?.visible && (
                    <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">
                      {item.levelRule}
                    </td>
                  )}
                  {columns.find((c) => c.key === "status")?.visible && (
                    <td className="py-[12px] px-[16px] text-[13px]">
                      <button
                        onClick={() => onToggleStatus(item.id)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#15B8A6] focus:ring-offset-2 ${item.status === "enabled" ? "bg-[#15B8A6]" : "bg-gray-200"}`}
                        role="switch"
                        aria-checked={item.status === "enabled"}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.status === "enabled" ? "translate-x-2" : "-translate-x-2"}`}
                        />
                      </button>
                    </td>
                  )}
                  {columns.find((c) => c.key === "updater")?.visible && (
                    <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">
                      {item.updater || "-"}
                    </td>
                  )}
                  {columns.find((c) => c.key === "updateTime")?.visible && (
                    <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">
                      {item.updateTime}
                    </td>
                  )}
                  {columns.find((c) => c.key === "actions")?.visible && (
                    <td className="py-[12px] px-[16px] text-[13px]">
                      <button
                        onClick={() => onEdit(item)}
                        className="text-[#15B8A6] hover:opacity-80 mr-[12px]"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() =>
                          setCopyModalData({ id: item.id, name: item.name })
                        }
                        className="text-[#15B8A6] hover:opacity-80 mr-[12px]"
                      >
                        复制
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRuleName(item.name);
                          setShowUsageModal(true);
                        }}
                        className="text-[#15B8A6] hover:opacity-80 mr-[12px]"
                      >
                        引用情况
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(item.id)}
                        className="text-[#FF4D4F] hover:opacity-80"
                      >
                        删除
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {rulesList.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.filter((c) => c.visible).length}
                    className="py-[32px] text-center text-[13px] text-[#9CA3AF]"
                  >
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showUsageModal && (
        <UsageReferencesModal
          ruleName={selectedRuleName}
          onClose={() => {
            setShowUsageModal(false);
            if (onClearAutoOpenUsage) onClearAutoOpenUsage();
          }}
        />
      )}

      {showShareModal && (
        <SharePermissionModal
          onClose={() => setShowShareModal(false)}
          selectedCount={selectedRowIds.length}
        />
      )}

      {showChangeLogModal && (
        <ChangeLogModal
          logs={changeLogs}
          onClose={() => setShowChangeLogModal(false)}
        />
      )}

      {copyModalData && (
        <CopyRuleModal
          defaultName={copyModalData.name}
          onClose={() => setCopyModalData(null)}
          onConfirm={(newName) => {
            if (onCopy && onCopy(copyModalData.id, newName)) {
              setCopyModalData(null);
            }
          }}
        />
      )}
    </>
  );
}

// --- 新建/编辑/查看强制分布规则页 ---
function ForcedDistributionRuleSetting({
  onBack,
  onSave,
  mode = "create",
  ruleData,
}: {
  onBack: () => void;
  onSave?: (data: any) => void;
  mode?: "create" | "edit" | "view";
  ruleData?: any;
}) {
  const [controlRule, setControlRule] = useState("ratio"); // 'ratio', 'number'
  const [levelRule, setLevelRule] = useState("range");
  const [tieRule, setTieRule] = useState("allow");
  const [remainderRule, setRemainderRule] = useState("round");
  const [remainderSpecificLevel, setRemainderSpecificLevel] = useState("一类");
  const [name, setName] = useState(ruleData?.name || "");
  const [description, setDescription] = useState(ruleData?.description || "");
  const [admin, setAdmin] = useState(ruleData?.admin || "当前用户");
  const [enableCount, setEnableCount] = useState(ruleData?.enableCount || 0);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);

  const title =
    mode === "view"
      ? "查看强制分布规则"
      : mode === "edit"
        ? "编辑强制分布规则"
        : "新建强制分布规则";

  return (
    <>
      {/* 面包屑 */}
      <div className="flex items-center text-[12px] text-[#6B7280] mb-[16px]">
        <span className="cursor-pointer hover:text-[#15B8A6]">智慧绩效</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="cursor-pointer hover:text-[#15B8A6]">设置</span>
        <ChevronRight size={14} className="mx-1" />
        <span
          className="cursor-pointer hover:text-[#15B8A6]"
          onClick={() => window.location.reload()}
        >
          考核设置
        </span>
        <ChevronRight size={14} className="mx-1" />
        <span className="cursor-pointer hover:text-[#15B8A6]" onClick={onBack}>
          强制分布规则
        </span>
        <ChevronRight size={14} className="mx-1" />
        <span className="text-[#1F2937]">{title}</span>
      </div>

      {/* 白色内容卡片 */}
      <div className="bg-[#FFFFFF] rounded-[8px] p-[16px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex-1 flex flex-col">
        {/* 标题区 */}
        <div className="flex items-center gap-4 mb-[24px] pb-[16px] border-b border-[#E5E7EB]">
          <button
            onClick={onBack}
            className="flex items-center text-[#15B8A6] hover:opacity-80 text-[14px] font-medium"
          >
            <ChevronRight size={16} className="rotate-180 mr-1" />
            返回
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-[16px] font-medium text-[#1F2937]">{title}</h1>
          </div>
        </div>

        {/* 表单内容区 */}
        <div className="flex-1 overflow-y-auto pr-2">
          {/* 基础设置 */}
          <div className="mb-[32px]">
            <div className="flex items-center gap-2 mb-[16px]">
              <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
              <h2 className="text-[16px] font-medium text-[#1F2937]">
                基础设置
              </h2>
            </div>

            <div className="flex flex-col gap-[20px] pl-[12px]">
              <FormRow label="规则名称" required>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={mode === "view"}
                  placeholder="请输入规则名称，如：通用271分布规则"
                  className="w-[400px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] disabled:bg-[#F9FAFB] disabled:text-[#6B7280]"
                />
              </FormRow>

              <FormRow label="规则说明">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={mode === "view"}
                  placeholder="请输入规则说明，如适用场景或具体要求（非必填）"
                  className="w-[400px] h-[80px] p-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] resize-none focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] disabled:bg-[#F9FAFB] disabled:text-[#6B7280]"
                />
              </FormRow>

              <FormRow label="管理员" required>
                <input
                  type="text"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                  disabled={mode === "view"}
                  placeholder="请输入管理员，默认为创建人"
                  className="w-[400px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] disabled:bg-[#F9FAFB] disabled:text-[#6B7280]"
                />
              </FormRow>

              <FormRow label="等级规则" required>
                <select className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]">
                  <option>所有等级规则</option>
                  <option>2个等级测</option>
                  <option>3等级(ABC)</option>
                  <option>4等级规则</option>
                  <option>5等级(SABCD)</option>
                </select>
              </FormRow>
            </div>
          </div>

          {/* 强制分布规则明细 */}
          <div>
            <div className="flex items-center gap-2 mb-[16px]">
              <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
              <h2 className="text-[16px] font-medium text-[#1F2937]">
                强制分布规则明细
              </h2>
            </div>

            <div className="pl-[12px]">
              <div className="flex flex-col gap-[16px] mb-[24px]">
                <FormRow label="启用人数" required>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={enableCount}
                      onChange={(e) =>
                        setEnableCount(
                          e.target.value ? parseInt(e.target.value) : 0,
                        )
                      }
                      disabled={mode === "view"}
                      className="w-[120px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] disabled:bg-[#F9FAFB] disabled:text-[#6B7280]"
                    />
                    <div className="relative group flex items-center">
                      <HelpCircle
                        size={14}
                        className="text-[#6B7280] cursor-pointer"
                      />
                      <div className="absolute left-[100%] ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-[#1F2937] text-white text-[12px] px-2 py-1 rounded w-max z-10 shadow-lg">
                        当待审核人员≥启用人数时，该强制分布规则生效；否则不生效
                        <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-[#1F2937]"></div>
                      </div>
                    </div>
                  </div>
                </FormRow>

                <FormRow label="控制规则" required>
                  <select
                    value={controlRule}
                    onChange={(e) => setControlRule(e.target.value)}
                    className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                  >
                    <option value="ratio">按等级比例分布</option>
                    <option value="number">按人数分布</option>
                  </select>
                </FormRow>

                {controlRule === "ratio" && (
                  <>
                    <FormRow label="余数处理" required>
                      <select
                        value={remainderRule}
                        onChange={(e) => setRemainderRule(e.target.value)}
                        className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                      >
                        <option value="next">迁移到下一等级</option>
                        <option value="specific">迁移到指定等级</option>
                      </select>
                    </FormRow>
                    {remainderRule === "specific" && (
                      <FormRow label="指定等级" required>
                        <select
                          value={remainderSpecificLevel}
                          onChange={(e) =>
                            setRemainderSpecificLevel(e.target.value)
                          }
                          className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                        >
                          {ALL_LEVELS.slice(0, 5).map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </FormRow>
                    )}
                  </>
                )}
              </div>
              <DistributionTable
                mode={mode}
                controlRule={controlRule}
                ruleName={name}
                levelRule={levelRule}
                hideScoreRules={true}
              />
            </div>
          </div>
        </div>

        {/* 底部操作区 */}
        <div className="pt-[16px] mt-[16px] border-t border-[#E5E7EB] flex justify-end gap-[12px]">
          <button
            onClick={onBack}
            className="px-[20px] h-[32px] border border-[#E5E7EB] text-[#4B5563] rounded-[4px] text-[14px] hover:bg-[#F9FAFB] transition-colors"
          >
            {mode === "view" ? "返回" : "取消"}
          </button>
          {mode !== "view" && (
            <button
              onClick={() => {
                if (mode === "edit") {
                  setShowConfirmSaveModal(true);
                } else {
                  onSave &&
                  onSave({
                    id: ruleData?.id,
                    name,
                    description,
                    admin,
                    enableCount,
                  });
                }
              }}
              className="px-[20px] h-[32px] bg-[#15B8A6] text-white rounded-[4px] text-[14px] hover:bg-[#15B8A6]/90 transition-colors"
            >
              保存
            </button>
          )}
        </div>
      </div>

      {showConfirmSaveModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[8px] w-[460px] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-[18px] border-b border-[#E5E7EB]">
              <h3 className="text-[16px] font-medium text-[#1F2937]">
                确认保存
              </h3>
              <button
                onClick={() => setShowConfirmSaveModal(false)}
                className="text-[#9CA3AF] hover:text-[#4B5563]"
              >
                <span className="text-[20px] leading-none">×</span>
              </button>
            </div>
            <div className="p-[24px] text-[14px] text-[#4B5563] leading-relaxed flex gap-3 items-start">
              <div className="text-[#FF9900] mt-[2px] shrink-0">
                <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <div>
                已有进行中的任务使用该规则，保存后请在该规则的引用情况里手动更新。
              </div>
            </div>
            <div className="p-[16px] border-t border-[#E5E7EB] flex items-center justify-end bg-[#F9FAFB] gap-3">
              <button
                onClick={() => setShowConfirmSaveModal(false)}
                className="px-[16px] h-[32px] bg-white border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#4B5563] hover:bg-[#F9FAFB] transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowConfirmSaveModal(false);
                  onSave &&
                  onSave({
                    id: ruleData?.id,
                    name,
                    description,
                    admin,
                    enableCount,
                    triggerAutoUsageModal: true,
                  });
                }}
                className="px-[16px] h-[32px] bg-[#15B8A6] text-white rounded-[4px] text-[13px] hover:bg-[#15B8A6]/90 transition-colors"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// --- 子组件 ---

function MenuItem({
  icon,
  text,
  active,
  expanded,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  expanded?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`h-[40px] px-[12px] flex items-center justify-between rounded-[8px] cursor-pointer transition-colors ${active ? "bg-[#E8F8F6] text-[#15B8A6]" : "text-[#4B5563] hover:bg-[#F3F4F6]"}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[14px] font-medium">{text}</span>
      </div>
      {expanded !== undefined && (
        <ChevronRight
          size={16}
          className={`transition-transform ${expanded ? "-rotate-90" : "rotate-90"}`}
        />
      )}
    </div>
  );
}

function SubMenuItem({
  text,
  active,
  onClick,
}: {
  text: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`h-[36px] px-[12px] flex items-center rounded-[8px] cursor-pointer text-[14px] transition-colors ${active ? "bg-[#E8F8F6] text-[#15B8A6]" : "text-[#6B7280] hover:bg-[#F3F4F6]"}`}
    >
      {text}
    </div>
  );
}

function FormRow({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start">
      <div className="w-[140px] pt-[6px] flex justify-end pr-[16px] shrink-0">
        {required && <span className="text-red-500 mr-1">*</span>}
        <span className="text-[14px] text-[#4B5563] whitespace-nowrap">
          {label} :
        </span>
      </div>
      <div className="flex-1 flex items-center flex-wrap">{children}</div>
    </div>
  );
}

// --- 自定义下拉框组件 ---
function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "请选择",
  onCreate,
  createLabel,
  className = "w-[400px]",
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onCreate?: () => void;
  createLabel?: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`w-full h-[32px] px-[12px] border rounded-[4px] text-[14px] flex items-center justify-between cursor-pointer bg-white transition-colors ${isOpen ? "border-[#15B8A6] ring-1 ring-[#15B8A6]" : "border-[#E5E7EB] hover:border-[#15B8A6]"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-[#1F2937]" : "text-[#9CA3AF]"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronRight
          size={16}
          className={`text-[#6B7280] transition-transform ${isOpen ? "-rotate-90" : "rotate-90"}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E5E7EB] rounded-[4px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-1 max-h-[240px] flex flex-col">
          <div className="overflow-y-auto flex-1">
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`px-[12px] py-[8px] text-[14px] cursor-pointer hover:bg-[#F9FAFB] ${value === opt.value ? "text-[#15B8A6] bg-[#F0FDF4]" : "text-[#1F2937]"}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
          {onCreate && createLabel && (
            <div className="border-t border-[#E5E7EB] p-[8px] flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCreate();
                  setIsOpen(false);
                }}
                className="text-[13px] text-[#15B8A6] hover:text-[#0F9688] font-medium flex items-center gap-1"
              >
                {createLabel}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- 考核结果设置模拟页 ---
function AssessmentResultSettingSim({ onBack }: { onBack: () => void }) {
  const [levelRuleType, setLevelRuleType] = useState("range");
  const [activeNodeId, setActiveNodeId] = useState("hr");
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [rankScope, setRankScope] = useState("all");
  const [showRankScopeModal, setShowRankScopeModal] = useState(false);
  const [showCustomGroupModal, setShowCustomGroupModal] = useState(false);
  const [nodeCustomGroups, setNodeCustomGroups] = useState<Record<string, any[]>>({});
  const [selectedLevelRule, setSelectedLevelRule] = useState("");
  const [showCreateLevelRuleSimModal, setShowCreateLevelRuleSimModal] = useState(false);
  const [showCreateForcedRuleSimModal, setShowCreateForcedRuleSimModal] = useState(false);
  const [levelRuleOptions, setLevelRuleOptions] = useState([
    { value: "4.29", label: "4.29等级规则" },
    { value: "test", label: "测试等级" },
    { value: "ratio_SC", label: "S-C等级比例规则" },
  ]);
  const [levelRulesMap, setLevelRulesMap] = useState<Record<string, { name: string; min: number; max: number }[]>>({
    "4.29": [
      { name: "S", min: 0, max: 10 },
      { name: "A", min: 10, max: 30 },
      { name: "B", min: 30, max: 90 },
      { name: "C", min: 90, max: 100 },
    ],
    "test": [
      { name: "S", min: 0, max: 15 },
      { name: "A", min: 15, max: 40 },
      { name: "B", min: 40, max: 80 },
      { name: "C", min: 80, max: 100 },
    ],
    "ratio_SC": [
      { name: "S", min: 0, max: 10 },
      { name: "A", min: 10, max: 20 },
      { name: "C", min: 20, max: 100 },
    ],
  });
  const [simForcedRules, setSimForcedRules] = useState([
    { value: "default", label: "默认结果 (2-7-1分布规则)" },
    { value: "361", label: "361分布规则" },
    { value: "special", label: "高管特殊分布规则" },
  ]);
  const [selectedSimForcedRule, setSelectedSimForcedRule] = useState("default");
  const [isGlobalForcedDistEnabled, setIsGlobalForcedDistEnabled] = useState(true);
  const [rankRatios, setRankRatios] = useState([
    { name: "S", min: 0, max: 10 },
    { name: "A", min: 10, max: 20 },
    { name: "C", min: 20, max: 100 },
  ]);
  const [editingRatio, setEditingRatio] = useState<{ name: string; min: number; max: number } | null>(null);
  const [isBatchEditingRatios, setIsBatchEditingRatios] = useState(false);
  const [sameScoreRule, setSameScoreRule] = useState("allow_exceed"); // allow_exceed | push_to_next
  const [remainderRule, setRemainderRule] = useState("next"); // next | specific
  const [remainderSpecificLevel, setRemainderSpecificLevel] = useState("A");

  const [groupRatiosOverride, setGroupRatiosOverride] = useState<Record<string, { name: string; min: number; max: number }[]>>({});
  const [editingGroupRatios, setEditingGroupRatios] = useState<{ groupName: string; ratios: { name: string; min: number; max: number }[] } | null>(null);

  const [groupSameScoreRule, setGroupSameScoreRule] = useState<Record<string, string>>({});
  const [groupRemainderRule, setGroupRemainderRule] = useState<Record<string, string>>({});
  const [groupRemainderSpecificLevel, setGroupRemainderSpecificLevel] = useState<Record<string, string>>({});

  const [tempGroupSameScoreRule, setTempGroupSameScoreRule] = useState("allow_exceed");
  const [tempGroupRemainderRule, setTempGroupRemainderRule] = useState("next");
  const [tempGroupRemainderSpecificLevel, setTempGroupRemainderSpecificLevel] = useState("A");

  const [inlineEditingGroup, setInlineEditingGroup] = useState<string | null>(null);
  const [inlineGroupRatios, setInlineGroupRatios] = useState<{ name: string; min: number; max: number }[]>([]);
  const [showGlobalPanel, setShowGlobalPanel] = useState(false);

  const [showBreakdownDrawer, setShowBreakdownDrawer] = useState(false);
  const [selectedRatioName, setSelectedRatioName] = useState<string | null>(null);
  const [drawerSearchQuery, setDrawerSearchQuery] = useState("");
  const [drawerViewMode, setDrawerViewMode] = useState<"level" | "group" | "config">("level");

  const [previewGroupIndex, setPreviewGroupIndex] = useState(0);
  const [groupSearchQuery, setGroupSearchQuery] = useState("");
  const [isGroupsExpanded, setIsGroupsExpanded] = useState(false);

  const [tempRankRatios, setTempRankRatios] = useState(rankRatios);
  const [tempSameScoreRule, setTempSameScoreRule] = useState("allow_exceed");
  const [tempRemainderRule, setTempRemainderRule] = useState("next");
  const [tempRemainderSpecificLevel, setTempRemainderSpecificLevel] = useState("A");
  const mockGroups = ["Yara的测试公司", "鸭鸭部", "鸭鸭分部"];
  const getActiveGroups = () => {
    if (rankScope === "dept") {
      return [
        { name: "研发部", size: 30 },
        { name: "销售部", size: 45 },
        { name: "运营部", size: 15 },
        { name: "市场部", size: 22 },
        { name: "客服部", size: 28 },
        { name: "人力资源部", size: 8 },
        { name: "财务部", size: 6 },
        { name: "技术支持部", size: 18 },
        { name: "产品部", size: 12 },
        { name: "设计部", size: 10 },
        { name: "法务部", size: 4 },
        { name: "行政部", size: 9 },
      ];
    } else if (rankScope === "eval_group") {
      return [
        { name: "核心高管组", size: 10 },
        { name: "业务骨干组", size: 40 },
        { name: "普通员工组", size: 25 },
        { name: "中层管理组", size: 15 },
        { name: "技术专家组", size: 20 },
        { name: "新入职培训组", size: 35 },
        { name: "销售精英组", size: 18 },
        { name: "支撑后勤组", size: 12 },
      ];
    } else if (rankScope === "custom") {
      return [
        { name: "自定义A组", size: 15 },
        { name: "自定义B组", size: 22 },
        { name: "自定义C组", size: 18 },
        { name: "自定义D组", size: 25 },
        { name: "自定义E组", size: 30 },
        { name: "自定义F组", size: 14 },
        { name: "自定义G组", size: 10 },
        { name: "自定义H组", size: 16 },
      ];
    }
    return [];
  };

  const [nodes, setNodes] = useState([
    {
      id: "hr",
      name: "HR调整",
      enabled: true,
      controlMethod: "warn",
      controlRule: "ratio",
      remainderRule: "round",
      tieRule: "keep",
      remainderSpecificLevel: "一类",
    },
    {
      id: "audit1",
      name: "直接上级审核",
      enabled: false,
      controlMethod: "warn",
      controlRule: "ratio",
      remainderRule: "round",
      tieRule: "keep",
      remainderSpecificLevel: "一类",
    },
    {
      id: "audit2",
      name: "部门负责人审核",
      enabled: false,
      controlMethod: "warn",
      controlRule: "ratio",
      remainderRule: "round",
      tieRule: "keep",
      remainderSpecificLevel: "一类",
    },
  ]);

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];
  const showGroupSplit =
    levelRuleType !== "none" && activeNode.controlScope === "group";

  const updateActiveNode = (updates: any) => {
    setNodes(
      nodes.map((n) => (n.id === activeNodeId ? { ...n, ...updates } : n)),
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] font-sans text-[#1F2937]">
      <div className="h-[48px] px-[24px] bg-white flex items-center justify-between border-b border-[#E5E7EB] shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-[16px] font-medium text-[#1F2937]">
            考核结果设置模拟
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-[16px] h-[32px] border border-[#E5E7EB] rounded-[4px] text-[14px] text-[#4B5563] hover:bg-[#F9FAFB] cursor-pointer"
          >
            取消
          </button>
          <button
            onClick={onBack}
            className="px-[16px] h-[32px] bg-[#15B8A6] rounded-[4px] text-[14px] text-white hover:bg-[#0F9688] cursor-pointer"
          >
            确定
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-[24px]">
        <div className="bg-white rounded-[8px] p-[24px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] max-w-[1200px] mx-auto flex flex-col gap-[32px]">
          {/* 等级生成设置 */}
          <div>
            <div className="flex items-center gap-2 mb-[24px]">
              <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
              <h2 className="text-[16px] font-medium text-[#1F2937]">
                等级生成设置
              </h2>
            </div>

            <div className="flex flex-col gap-[20px] pl-[12px]">
              <div className="flex items-center">
                <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[6px]">
                  <span className="text-red-500 mr-1">*</span>
                  <span className="text-[14px] text-[#4B5563]">
                    绩效等级规则 :
                  </span>
                </div>
                <div className="flex items-center gap-6 pt-[6px]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={levelRuleType === "none"}
                      onChange={() => setLevelRuleType("none")}
                      className="w-4 h-4 text-[#15B8A6] focus:ring-[#15B8A6] rounded text-primary-500"
                    />
                    <span className="text-[14px]">不开启</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={levelRuleType === "range"}
                      onChange={() => setLevelRuleType("range")}
                      className="w-4 h-4 text-[#15B8A6] focus:ring-[#15B8A6] rounded text-primary-500"
                    />
                    <span className="text-[14px]">按分数区间生成</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={levelRuleType === "rank"}
                      onChange={() => setLevelRuleType("rank")}
                      className="w-4 h-4 text-[#15B8A6] focus:ring-[#15B8A6] rounded text-primary-500"
                    />
                    <span className="text-[14px]">按分数排名生成</span>
                  </label>
                </div>
              </div>

              {levelRuleType !== "none" && (
                <>
                  <div className="flex items-center mt-[2px]">
                    <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                      <span className="text-red-500 mr-1">*</span>
                      <span className="text-[14px] text-[#4B5563]">
                        等级规则 :
                      </span>
                    </div>
                    {levelRuleType === "rank" ? (
                      <CustomSelect
                        options={levelRuleOptions}
                        value={selectedLevelRule}
                        onChange={(val) => {
                          setSelectedLevelRule(val);
                          const ratios = levelRulesMap[val];
                          if (ratios) {
                            setRankRatios(ratios);
                          } else {
                            // default fallback
                            setRankRatios([
                              { name: "S", min: 0, max: 10 },
                              { name: "A", min: 10, max: 30 },
                              { name: "B", min: 30, max: 90 },
                              { name: "C", min: 90, max: 100 },
                            ]);
                          }
                        }}
                        placeholder="请选择等级规则"
                        className="w-full max-w-[320px]"
                        onCreate={() => setShowCreateLevelRuleSimModal(true)}
                        createLabel="+ 快捷创建等级规则"
                      />
                    ) : (
                      <div className="h-[32px] flex items-center px-[8px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-[4px] text-[14px] text-[#6B7280] cursor-not-allowed w-full max-w-[320px]">
                        4.29
                      </div>
                    )}
                  </div>

                  {levelRuleType === "rank" && selectedLevelRule !== "" && (
                    <>
                      <div className="flex items-center">
                        <div className="w-[120px] flex items-center justify-end pr-[16px] shrink-0 pt-[8px]">
                          <span className="text-red-500 mr-1">*</span>
                          <span className="text-[14px] text-[#4B5563]">
                            等级排名生成范围 :
                          </span>
                          <div className="group relative ml-1 flex items-center mt-[-2px]">
                            <Info
                              size={14}
                              className="text-[#15B8A6] cursor-help"
                            />
                            <RankScopeTooltip />
                          </div>
                        </div>
                        <div className="flex items-start gap-2 pt-[8px]">
                          <select
                            value={rankScope}
                            onChange={(e) => setRankScope(e.target.value)}
                            className="w-[160px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                          >
                            <option value="all">全员</option>
                            <option value="dept">部门</option>
                            <option value="eval_group">考核组</option>
                            <option value="custom">自定义分组</option>
                          </select>
                          {rankScope === "dept" && (
                            <div className="flex flex-col gap-1">
                              <select
                                className="w-[160px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                                defaultValue="default"
                              >
                                <option
                                  value="default"
                                  disabled
                                  className="hidden"
                                >
                                  请选择部门层级
                                </option>
                                <option value="1">第一级</option>
                                <option value="2">第二级</option>
                                <option value="3">第三级</option>
                              </select>
                              <span className="text-[12px] text-[#9CA3AF]">
                                自下往上（员工所在部门设为第一级）
                              </span>
                            </div>
                          )}
                          {rankScope === "custom" && (
                            <span
                              className="text-[#15B8A6] text-[14px] cursor-pointer hover:opacity-80 pt-[6px]"
                              onClick={() => setShowCustomGroupModal(true)}
                            >
                              配置自定义分组
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex">
                        <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                          <span className="text-[14px] text-[#4B5563]">
                            等级排名比例 :
                          </span>
                        </div>
                        <div className="flex-1 max-w-[760px] pt-[8px] flex flex-col gap-4">
                          <div className="border border-neutral-200 rounded-[8px] overflow-hidden bg-white shadow-[1px_1px_4px_rgba(0,0,0,0.015)]">
                            <div className="flex items-center justify-between px-4 py-2.5 bg-[#F9FAFB] border-b border-neutral-200">
                              <span className="text-[13px] font-semibold text-[#4B5563]">
                                等级排名比例与预计人数
                              </span>
                              {levelRuleType === "rank" && rankScope === "all" ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTempRankRatios([...rankRatios]);
                                    setTempSameScoreRule(sameScoreRule);
                                    setTempRemainderRule(remainderRule);
                                    setTempRemainderSpecificLevel(remainderSpecificLevel);
                                    setIsBatchEditingRatios(true);
                                  }}
                                  className="text-[13px] text-[#15B8A6] hover:opacity-85 font-semibold cursor-pointer"
                                >
                                  调整排名比例
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDrawerViewMode((levelRuleType === "rank" && rankScope !== "all") ? "group" : "config");
                                    setShowBreakdownDrawer(true);
                                  }}
                                  className="flex items-center gap-1.5 text-[13px] text-[#15B8A6] hover:opacity-85 font-semibold cursor-pointer"
                                >
                                  <SlidersHorizontal size={13} />
                                  更多配置与各组比例
                                </button>
                              )}
                            </div>
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-[#F9FAFB] border-b border-neutral-200 text-[12px] text-[#4B5563]">
                                  <th className="py-2.5 px-4 font-semibold text-[#4B5563] w-[120px]">等级</th>
                                  <th className="py-2.5 px-4 font-semibold text-[#4B5563] w-[280px]">
                                    <div className="flex items-center gap-2">
                                      <span>排名比例</span>
                                      {levelRuleType === "rank" && (
                                        rankScope === "all" ? (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setTempRankRatios([...rankRatios]);
                                              setTempSameScoreRule(sameScoreRule);
                                              setTempRemainderRule(remainderRule);
                                              setTempRemainderSpecificLevel(remainderSpecificLevel);
                                              setIsBatchEditingRatios(true);
                                            }}
                                            className="text-[#15B8A6] hover:text-[#0f9688] ml-2 flex items-center justify-center p-1 rounded hover:bg-teal-50 transition-colors cursor-pointer border border-transparent"
                                            title="调整排名比例"
                                          >
                                            <Pencil size={12} className="text-[#15B8A6]" />
                                          </button>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setTempRankRatios([...rankRatios]);
                                              setTempSameScoreRule(sameScoreRule);
                                              setTempRemainderRule(remainderRule);
                                              setTempRemainderSpecificLevel(remainderSpecificLevel);
                                              setIsBatchEditingRatios(true);
                                            }}
                                            className="text-[11px] text-[#15B8A6] hover:text-[#0f9688] font-semibold flex items-center gap-0.5 cursor-pointer border border-[#15B8A6]/20 bg-[#15B8A6]/5 hover:bg-[#15B8A6]/10 px-2 py-0.5 rounded transition-all font-sans shrink-0 ml-1.5"
                                          >
                                            <SlidersHorizontal size={11} />
                                            调整排名比例
                                          </button>
                                        )
                                      )}
                                    </div>
                                  </th>
                                  {rankScope === "all" ? (
                                    <th className="py-2.5 px-4 font-semibold text-[#4B5563]">预计占比人数 (全员100人)</th>
                                  ) : (
                                    <th className="py-2.5 px-4 font-semibold text-[#4B5563] text-right">
                                      预计总人数 (各组之和)
                                    </th>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {rankRatios.map((ratio, index) => {
                                  const pct = Math.max(0, ratio.max - ratio.min);
                                  return (
                                    <tr key={index} className="border-b border-neutral-200 last:border-b-0 hover:bg-[#F9FAFB]/50 text-[13px] text-[#1F2937]">
                                      <td className="py-2.5 px-4 font-medium">{ratio.name}</td>
                                      <td className="py-2.5 px-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-xs font-semibold bg-[#15B8A6]/10 text-[#15B8A6]">
                                          {ratio.min}% - {ratio.max}%
                                        </span>
                                      </td>
                                      {rankScope === "all" ? (
                                        <td className="py-2.5 px-4 font-semibold text-[#15B8A6]">
                                          {Math.round((pct * 100) / 100)}人
                                        </td>
                                      ) : (
                                        (() => {
                                          const originalGroups = getActiveGroups();
                                          const sumExpected = originalGroups.reduce((acc, g) => {
                                            const gRatios = groupRatiosOverride[g.name] || rankRatios;
                                            const matchRatio = gRatios.find(r => r.name === ratio.name) || ratio;
                                            const pctForGroup = Math.max(0, matchRatio.max - matchRatio.min);
                                            return acc + Math.round((pctForGroup * g.size) / 100);
                                          }, 0);
                                          return (
                                            <td className="py-2.5 px-4 text-right">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  setSelectedRatioName(ratio.name);
                                                  setDrawerViewMode("level");
                                                  setShowBreakdownDrawer(true);
                                                }}
                                                className="inline-flex items-center gap-1.5 text-[#15B8A6] hover:opacity-85 font-semibold bg-teal-50/50 hover:bg-teal-50 px-2 py-1 rounded border border-[#15B8A6]/20 transition-all cursor-pointer font-sans"
                                              >
                                                <span>{sumExpected}人</span>
                                                <span className="text-[11px] text-[#4B5563] font-normal flex items-center gap-0.5 border-l border-[#15B8A6]/20 pl-1.5 ml-1 select-none">
                                                  各组明细
                                                  <ChevronRight size={12} />
                                                </span>
                                              </button>
                                            </td>
                                          );
                                        })()
                                      )}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>

                            {/* Integrated compact rules status footer built into the table */}
                            <div className="bg-[#F9FAFB] px-4 py-2.5 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[12px] text-[#4B5563] gap-2">
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                <span className="flex items-center gap-1 font-sans">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#15B8A6] mt-[1px]"></span>
                                  同分规则：<strong className="text-[#1F2937] font-semibold">{sameScoreRule === "allow_exceed" ? "占满当前等级" : "顺延至下一等级"}</strong>
                                </span>
                                <span className="flex items-center gap-1 font-sans">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#15B8A6] mt-[1px] ml-4"></span>
                                  余数处理：<strong className="text-[#1F2937] font-semibold">{remainderRule === "next" ? "迁移到下一等级" : `迁移至指定等级 [${remainderSpecificLevel}]`}</strong>
                                </span>
                                {rankScope !== "all" && Object.keys(groupRatiosOverride).length > 0 && (
                                  <span className="flex items-center gap-1 font-sans">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#15B8A6] mt-[1px]"></span>
                                    独立比例: <strong className="text-amber-600 font-semibold">{Object.keys(groupRatiosOverride).length}组已设</strong>
                                  </span>
                                )}
                              </div>
                              {rankScope !== "all" && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDrawerViewMode((levelRuleType === "rank" && rankScope !== "all") ? "group" : "config");
                                    setShowBreakdownDrawer(true);
                                  }}
                                  className="text-[#15B8A6] hover:text-[#0f9688] font-semibold flex items-center gap-1 transition-colors cursor-pointer text-left self-start sm:self-auto font-sans"
                                >
                                  <SlidersHorizontal size={12} />
                                  详细配置
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* 强制分布设置 */}
          <div>
            <div className="flex items-center justify-between mb-[24px]">
              <div className="flex items-center gap-2">
                <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
                <h2 className="text-[16px] font-medium text-[#1F2937]">
                  强制分布控制
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-[#4B5563]">强制分布 :</span>
                <button
                  className={`w-10 h-5 rounded-full relative transition-colors ${isGlobalForcedDistEnabled ? "bg-[#15B8A6]" : "bg-[#E5E7EB]"}`}
                  onClick={() => setIsGlobalForcedDistEnabled(!isGlobalForcedDistEnabled)}
                  type="button"
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-transform ${isGlobalForcedDistEnabled ? "translate-x-[22px]" : "translate-x-[2px]"}`}
                  ></div>
                </button>
              </div>
            </div>

            <div className="pl-[12px]">
              {!isGlobalForcedDistEnabled ? (
                <div className="p-[24px] bg-white rounded-[8px] border border-[#E5E7EB] text-center text-[#4B5563] text-[14px]">
                  开启后可设置等级分布控制。
                </div>
              ) : (
                <>
              {/* 节点 Tabs */}
              <div className="flex border-b border-[#E5E7EB] mb-[24px]">
                {nodes.map((node) => {
                  let auditIndex = 0;
                  if (node.id !== "hr") {
                    auditIndex =
                      nodes
                        .filter((n) => n.id !== "hr")
                        .findIndex((n) => n.id === node.id) + 1;
                  }
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveNodeId(node.id)}
                      className={`h-[40px] px-6 text-[14px] font-medium transition-colors relative flex items-center justify-center gap-1.5 ${activeNodeId === node.id ? "text-[#15B8A6]" : "text-[#4B5563] hover:text-[#1F2937]"}`}
                    >
                      {node.id !== "hr"
                        ? `${auditIndex}.${node.name}`
                        : node.name}
                      {node.enabled && (
                        <span
                          className={`text-[10px] px-[4px] py-[2px] leading-none rounded-[2px] border ${node.controlMethod === "warn" ? "bg-[#FFFBE6] text-[#FAAD14] border-[#FFE58F]" : "bg-[#E6F4FF] text-[#1677FF] border-[#91CAFF]"}`}
                        >
                          {node.controlMethod === "warn" ? "仅提醒" : "强控"}
                        </span>
                      )}
                      {activeNodeId === node.id && (
                        <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#15B8A6]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 当前节点的配置 */}
              <div className="flex flex-col gap-[20px] p-6 bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB]">
                <div className="flex items-center">
                  <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[2px]">
                    <span className="text-red-500 mr-1">*</span>
                    <span className="text-[14px] text-[#4B5563]">
                      强制控制 :
                    </span>
                  </div>
                  <button
                    className={`w-10 h-5 rounded-full relative transition-colors ${activeNode.enabled ? "bg-[#15B8A6]" : "bg-[#E5E7EB]"}`}
                    onClick={() =>
                      updateActiveNode({ enabled: !activeNode.enabled })
                    }
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-transform ${activeNode.enabled ? "translate-x-[22px]" : "translate-x-[2px]"}`}
                    ></div>
                  </button>
                </div>

                {activeNode.enabled && (
                  <div className="flex flex-col gap-8 mt-[20px]">
                    {/* 分布设置 */}
                    <div className="border-t border-[#E5E7EB] pt-[20px] flex flex-col gap-[20px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-[4px] h-[14px] bg-[#15B8A6] rounded-[2px]"></div>
                        <span className="text-[14px] font-bold text-[#1F2937]">分布设置</span>
                      </div>

                      {levelRuleType !== "none" && (
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center">
                            <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[6px]">
                              <span className="text-red-500 mr-1">*</span>
                              <span className="text-[14px] text-[#4B5563]">
                                控制范围 :
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 pt-[6px]">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={activeNode.controlScope === "all" || !activeNode.controlScope}
                                  onChange={() =>
                                    updateActiveNode({ controlScope: "all", groupMethod: undefined })
                                  }
                                  className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                                />
                                <span className="text-[14px] text-[#4B5563]">全部参与人员</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={activeNode.controlScope === "group" && activeNode.groupMethod === "dept"}
                                  onChange={() =>
                                    updateActiveNode({ controlScope: "group", groupMethod: "dept" })
                                  }
                                  className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                                />
                                <span className="text-[14px] text-[#4B5563]">按部门</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={activeNode.controlScope === "group" && activeNode.groupMethod === "eval_group"}
                                  onChange={() =>
                                    updateActiveNode({ controlScope: "group", groupMethod: "eval_group" })
                                  }
                                  className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                                />
                                <span className="text-[14px] text-[#4B5563]">按考核组</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={activeNode.controlScope === "group" && activeNode.groupMethod === "custom"}
                                  onChange={() =>
                                    updateActiveNode({ controlScope: "group", groupMethod: "custom" })
                                  }
                                  className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                                />
                                <span className="text-[14px] text-[#4B5563]">按自定义分组</span>
                              </label>
                            </div>
                          </div>

                          {activeNode.controlScope === "group" && activeNode.groupMethod === "dept" && (
                            <div className="flex items-center">
                              <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[6px]">
                                <span className="text-red-500 mr-1">*</span>
                                <span className="text-[14px] text-[#4B5563]">
                                  部门层级 :
                                </span>
                              </div>
                              <div className="flex flex-col gap-1 pt-[6px]">
                                <select
                                  value={activeNode.deptLevel || "1"}
                                  onChange={(e) => updateActiveNode({ deptLevel: e.target.value })}
                                  className="w-[140px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] bg-white text-[#4B5563]"
                                >
                                  <option value="1">第一级</option>
                                  <option value="last">最末级</option>
                                  <option value="2">第二级</option>
                                  <option value="3">第三级</option>
                                </select>
                                <span className="text-[12px] text-[#9CA3AF]">
                                  自下往上（员工所在部门设为第一级）
                                </span>
                              </div>
                            </div>
                          )}

                          {activeNode.controlScope === "group" && activeNode.groupMethod === "custom" && (
                            <div className="flex items-start">
                              <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[6px]">
                                <span className="text-red-500 mr-1">*</span>
                                <span className="text-[14px] text-[#4B5563]">
                                  自定义分组 :
                                </span>
                              </div>
                              <div className="flex flex-col gap-2 pt-[6px]">
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => setShowCustomGroupModal(true)}
                                    type="button"
                                    className="text-[#15B8A6] text-[14px] font-medium hover:opacity-80 flex items-center gap-1 border border-[#15B8A6]/20 bg-[#15B8A6]/5 px-3 h-[32px] rounded-[4px] cursor-pointer"
                                  >
                                    配置自定义分组
                                  </button>
                                  {nodeCustomGroups[activeNode.id] && nodeCustomGroups[activeNode.id].length > 0 ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                      已配置
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                      未配置
                                    </span>
                                  )}
                                </div>
                                {nodeCustomGroups[activeNode.id] && nodeCustomGroups[activeNode.id].length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-1 max-w-[500px]">
                                    {nodeCustomGroups[activeNode.id].map((g, gi) => (
                                      <div key={gi} className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#4B5563] shadow-sm">
                                        <span className="font-medium text-[#111827]">{g.name}</span>
                                        <span className="text-[#9CA3AF] text-[11px] bg-[#F3F4F6] px-1.5 py-0.5 rounded">
                                          {(g.users && g.users.length) || 0}人
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center">
                        <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[6px]">
                          <span className="text-red-500 mr-1">*</span>
                          <span className="text-[14px] text-[#4B5563]">
                            控制方式 :
                          </span>
                        </div>
                        <div className="flex items-center gap-6 pt-[6px]">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              checked={activeNode.controlMethod === "warn"}
                              onChange={() =>
                                updateActiveNode({ controlMethod: "warn" })
                              }
                              className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                            />
                            <span className="text-[14px]">仅提醒</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              checked={activeNode.controlMethod === "block"}
                              onChange={() =>
                                updateActiveNode({ controlMethod: "block" })
                              }
                              className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                            />
                            <span className="text-[14px]">阻止提交</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* 强制分布明细设置 */}
                    <div className="border-t border-[#E5E7EB] pt-[20px] flex flex-col gap-[20px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-[4px] h-[14px] bg-[#15B8A6] rounded-[2px]"></div>
                        <span className="text-[14px] font-bold text-[#1F2937]">强制分布明细设置</span>
                      </div>

                      {showGroupSplit ? (
                        <div className="flex border border-[#E5E7EB] rounded-[8px] overflow-hidden bg-white mt-2 shadow-sm">
                          <div className="w-[200px] border-r border-[#E5E7EB] flex flex-col bg-[#F9FAFB] shrink-0">
                            <div className="p-3 text-[14px] font-medium border-b border-[#E5E7EB] text-[#4B5563]">
                              绩效组
                            </div>
                            <div className="flex-1 overflow-y-auto">
                              {mockGroups.map((g, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => setActiveGroupIndex(idx)}
                                  className={`px-4 py-3 text-[13px] cursor-pointer flex justify-between items-center transition-colors ${activeGroupIndex === idx ? 'bg-[#E8F8F6] text-[#15B8A6] relative after:content-[""] after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[3px] after:bg-[#15B8A6]' : "text-[#4B5563] hover:bg-[#F3F4F6]"}`}
                                >
                                  {g}
                                  <span className="text-[#9CA3AF]">...</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex-1 p-6 flex flex-col gap-[20px]">
                            <div className="flex items-start">
                              <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                                <span className="text-[14px] text-[#4B5563]">
                                  强制分布规则 :
                                </span>
                              </div>
                              <div className="flex-1 max-w-[320px]">
                                <CustomSelect
                                  options={simForcedRules}
                                  value={selectedSimForcedRule}
                                  onChange={setSelectedSimForcedRule}
                                  placeholder="请选择"
                                  className="w-full"
                                  onCreate={() => setShowCreateForcedRuleSimModal(true)}
                                  createLabel="+ 快捷创建强制分布规则"
                                />
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                                <span className="text-red-500 mr-1">*</span>
                                <span className="text-[14px] text-[#4B5563]">
                                  控制规则 :
                                </span>
                              </div>
                              <select
                                value={activeNode.controlRule}
                                onChange={(e) =>
                                  updateActiveNode({
                                    controlRule: e.target.value,
                                  })
                                }
                                className="w-full max-w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] bg-white"
                              >
                                <option value="ratio">按等级分布比例</option>
                                <option value="number">按等级分布人数</option>
                              </select>
                            </div>

                            {activeNode.controlRule === "ratio" && (
                              <>
                                <div className="flex items-center">
                                  <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                                    <span className="text-red-500 mr-1">*</span>
                                    <span className="text-[14px] text-[#4B5563]">
                                      余数处理 :
                                    </span>
                                  </div>
                                  <select
                                    value={activeNode.remainderRule}
                                    onChange={(e) =>
                                      updateActiveNode({
                                        remainderRule: e.target.value,
                                      })
                                    }
                                    className="w-full max-w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] bg-white"
                                  >
                                    <option value="next">迁移到下一等级</option>
                                    <option value="specific">
                                      迁移到指定等级
                                    </option>
                                  </select>
                                </div>
                                {activeNode.remainderRule === "specific" && (
                                  <div className="flex items-center mt-[20px]">
                                    <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                                      <span className="text-red-500 mr-1">*</span>
                                      <span className="text-[14px] text-[#4B5563]">
                                        指定等级 :
                                      </span>
                                    </div>
                                    <select
                                      value={activeNode.remainderSpecificLevel}
                                      onChange={(e) =>
                                        updateActiveNode({
                                          remainderSpecificLevel: e.target.value,
                                        })
                                      }
                                      className="w-full max-w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] bg-white"
                                    >
                                      {ALL_LEVELS.slice(0, 5).map((l) => (
                                        <option key={l} value={l}>
                                          {l}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                              </>
                            )}

                            <div className="mt-4 p-4 rounded-[8px] bg-white border border-[#E5E7EB]">
                              <DistributionTable
                                mode="edit"
                                ruleName=""
                                levelRule={levelRuleType}
                                showExpectedNumber={true}
                                totalParticipants={
                                  activeGroupIndex === 0
                                    ? 10
                                    : activeGroupIndex === 1
                                      ? 4
                                      : 3
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-[20px]">
                          <div className="flex items-center mt-[12px]">
                            <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                              <span className="text-[14px] text-[#4B5563]">
                                强制分布规则 :
                              </span>
                            </div>
                            <CustomSelect
                              options={simForcedRules}
                              value={selectedSimForcedRule}
                              onChange={setSelectedSimForcedRule}
                              placeholder="请选择"
                              className="w-[320px]"
                              onCreate={() => setShowCreateForcedRuleSimModal(true)}
                              createLabel="+ 快捷创建强制分布规则"
                            />
                          </div>

                          <div className="flex items-center">
                            <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                              <span className="text-red-500 mr-1">*</span>
                              <span className="text-[14px] text-[#4B5563]">
                                控制规则 :
                              </span>
                            </div>
                            <select
                              value={activeNode.controlRule}
                              onChange={(e) =>
                                updateActiveNode({ controlRule: e.target.value })
                              }
                              className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] bg-white"
                            >
                              <option value="ratio">按等级分布比例</option>
                              <option value="number">按等级分布人数</option>
                            </select>
                          </div>

                          {activeNode.controlRule === "ratio" && (
                            <>
                              <div className="flex items-center">
                                <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                                  <span className="text-red-500 mr-1">*</span>
                                  <span className="text-[14px] text-[#4B5563]">
                                    余数处理 :
                                  </span>
                                </div>
                                <select
                                  value={activeNode.remainderRule}
                                  onChange={(e) =>
                                    updateActiveNode({
                                      remainderRule: e.target.value,
                                    })
                                  }
                                  className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] bg-white"
                                >
                                  <option value="next">迁移到下一等级</option>
                                  <option value="specific">迁移到指定等级</option>
                                </select>
                              </div>
                              {activeNode.remainderRule === "specific" && (
                                <div className="flex items-center mt-[20px]">
                                  <div className="w-[120px] flex justify-end pr-[16px] shrink-0 pt-[8px]">
                                    <span className="text-red-500 mr-1">*</span>
                                    <span className="text-[14px] text-[#4B5563]">
                                      指定等级 :
                                    </span>
                                  </div>
                                  <select
                                    value={activeNode.remainderSpecificLevel}
                                    onChange={(e) =>
                                      updateActiveNode({
                                        remainderSpecificLevel: e.target.value,
                                      })
                                    }
                                    className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6] bg-white"
                                  >
                                    {ALL_LEVELS.slice(0, 5).map((l) => (
                                      <option key={l} value={l}>
                                        {l}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </>
                          )}

                          <div className="mt-4 bg-white p-4 rounded-[8px] border border-[#E5E7EB]">
                            <DistributionTable
                              mode="edit"
                              ruleName=""
                              levelRule={levelRuleType}
                              showExpectedNumber={true}
                              totalParticipants={17}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
        </div>
      </div>
      {showRankScopeModal && (
        <ScopeConfigModal
          onClose={() => setShowRankScopeModal(false)}
          onSave={() => {
            setRankScope("custom");
            setShowRankScopeModal(false);
          }}
        />
      )}
      {showCustomGroupModal && (
        <CustomGroupModal
          initialGroups={nodeCustomGroups[activeNode.id]}
          onClose={() => setShowCustomGroupModal(false)}
          onSave={(groups) => {
            if (groups) {
              setNodeCustomGroups((prev) => ({
                ...prev,
                [activeNode.id]: groups,
              }));
            }
            setShowCustomGroupModal(false);
          }}
        />
      )}
      {editingGroupRatios && (
        <div className="fixed inset-0 bg-black/50 z-[120] flex items-center justify-center">
          <div className="bg-white rounded-[8px] w-[620px] shadow-2xl flex flex-col p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-100">
              <h3 className="text-[16px] font-semibold text-[#1F2937]">调整排名比例 — {editingGroupRatios.groupName}</h3>
              <button
                onClick={() => setEditingGroupRatios(null)}
                className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors cursor-pointer"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4 font-sans">
              {/* Rules selectors matching Figure 2 exactly */}
              <div className="flex items-center gap-2">
                <div className="w-[140px] text-right text-[13px] text-[#4B5563]">
                  <span className="text-red-500 mr-1">*</span>同分超人数规则：
                </div>
                <div className="flex-1">
                  <select
                    value={tempGroupSameScoreRule}
                    onChange={(e) => setTempGroupSameScoreRule(e.target.value)}
                    className="w-full max-w-[320px] h-[32px] px-[12px] border border-neutral-200 rounded-[4px] text-[13px] bg-white text-[#1F2937] focus:outline-none focus:border-[#15B8A6] cursor-pointer"
                  >
                    <option value="allow_exceed">占满当前等级</option>
                    <option value="push_to_next">顺延至下一等级</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-[140px] text-right text-[13px] text-[#4B5563]">
                  <span className="text-red-500 mr-1">*</span>余数处理：
                </div>
                <div className="flex-1">
                  <select
                    value={tempGroupRemainderRule}
                    onChange={(e) => setTempGroupRemainderRule(e.target.value)}
                    className="w-full max-w-[320px] h-[32px] px-[12px] border border-neutral-200 rounded-[4px] text-[13px] bg-white text-[#1F2937] focus:outline-none focus:border-[#15B8A6] cursor-pointer"
                  >
                    <option value="next">迁移到下一等级</option>
                    <option value="specific">迁移到指定等级</option>
                  </select>
                </div>
              </div>

              {tempGroupRemainderRule === "specific" && (
                <div className="flex items-center gap-2">
                  <div className="w-[140px] text-right text-[13px] text-[#4B5563]">
                    指定归属等级：
                  </div>
                  <div className="flex-1">
                    <select
                      value={tempGroupRemainderSpecificLevel}
                      onChange={(e) => setTempGroupRemainderSpecificLevel(e.target.value)}
                      className="w-full max-w-[320px] h-[32px] px-[10px] border border-neutral-200 rounded-[4px] text-[13px] bg-white text-[#1F2937] focus:outline-none focus:border-[#15B8A6] cursor-pointer"
                    >
                      {editingGroupRatios.ratios.map((r, i) => (
                        <option key={i} value={r.name}>
                          {r.name} 等级
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Grid-based table listing levels matching Figure 2 */}
              <div className="mt-4">
                <table className="w-full text-center border-collapse border border-neutral-200">
                  <thead>
                    <tr className="bg-neutral-50 text-[12px] text-[#4B5563] font-medium border-b border-neutral-200">
                      <th className="py-2.5 px-4 border-r border-neutral-200 w-[120px]">等级名称</th>
                      <th className="py-2.5 px-4 border-r border-neutral-200">排名比例</th>
                      <th className="py-2.5 px-4 w-[150px]">预计人数</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editingGroupRatios.ratios.map((ratio, index) => {
                      const isLast = index === editingGroupRatios.ratios.length - 1;
                      const pct = Math.max(0, (isLast ? 100 : ratio.max) - ratio.min);
                      const groupObj = getActiveGroups().find(g => g.name === editingGroupRatios.groupName);
                      const gSize = groupObj ? groupObj.size : 20;
                      const expectedCount = Math.round((pct * gSize) / 100);

                      return (
                        <tr key={index} className="border-b border-neutral-200 last:border-b-0 text-[13px] text-[#1F2937]">
                          <td className="py-2.5 px-4 border-r border-neutral-200 bg-white font-medium">
                            {ratio.name}
                          </td>
                          <td className="py-2 px-4 border-r border-neutral-200 bg-white">
                            <div className="flex items-center justify-center gap-1.5">
                              <div className="relative w-[110px]">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={ratio.min}
                                  onChange={(e) => {
                                    const val = Math.min(100, Math.max(0, Number(e.target.value)));
                                    const updated = editingGroupRatios.ratios.map((r, i) =>
                                      i === index ? { ...r, min: val } : r
                                    );
                                    setEditingGroupRatios({ ...editingGroupRatios, ratios: updated });
                                  }}
                                  placeholder="请输入比例"
                                  className="w-full h-[32px] pl-2 pr-[16px] border border-neutral-200 rounded-[4px] text-center text-[13px] focus:outline-none focus:border-[#15B8A6]"
                                />
                                <span className="absolute right-1.5 top-1.5 text-[11px] text-[#9CA3AF] pointer-events-none">%</span>
                              </div>
                              <span className="text-neutral-400 font-sans">~</span>
                              <div className="relative w-[110px]">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={isLast ? 100 : ratio.max}
                                  disabled={isLast}
                                  onChange={(e) => {
                                    const val = Math.min(100, Math.max(0, Number(e.target.value)));
                                    const updated = editingGroupRatios.ratios.map((r, i) =>
                                      i === index ? { ...r, max: val } : r
                                    );
                                    setEditingGroupRatios({ ...editingGroupRatios, ratios: updated });
                                  }}
                                  placeholder="请输入比例"
                                  className={`w-full h-[32px] pl-2 pr-[16px] border border-neutral-200 rounded-[4px] text-center text-[13px] focus:outline-none focus:border-[#15B8A6] ${isLast ? "bg-neutral-50 text-neutral-400 cursor-not-allowed" : ""}`}
                                />
                                <span className="absolute right-1.5 top-1.5 text-[11px] text-[#9CA3AF] pointer-events-none">%</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-4 bg-white font-medium text-neutral-600">
                            {expectedCount}人
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-100">
              {groupRatiosOverride[editingGroupRatios.groupName] ? (
                <button
                  type="button"
                  onClick={() => {
                    const updatedOverrides = { ...groupRatiosOverride };
                    delete updatedOverrides[editingGroupRatios.groupName];
                    setGroupRatiosOverride(updatedOverrides);

                    const updatedSame = { ...groupSameScoreRule };
                    delete updatedSame[editingGroupRatios.groupName];
                    setGroupSameScoreRule(updatedSame);

                    const updatedRem = { ...groupRemainderRule };
                    delete updatedRem[editingGroupRatios.groupName];
                    setGroupRemainderRule(updatedRem);

                    const updatedSpec = { ...groupRemainderSpecificLevel };
                    delete updatedSpec[editingGroupRatios.groupName];
                    setGroupRemainderSpecificLevel(updatedSpec);

                    setEditingGroupRatios(null);
                  }}
                  className="text-red-500 hover:text-red-600 text-[13px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Trash2 size={13} />
                  清除重置，共享统一比例
                </button>
              ) : (
                <div className="text-[12px] text-[#9CA3AF] select-none flex items-center gap-1 font-sans">
                  <Info size={12} className="text-[#15B8A6]" />
                  当前正共享统一比例
                </div>
              )}

              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setEditingGroupRatios(null)}
                  className="text-[#15B8A6] hover:opacity-80 text-[14px] font-medium transition-colors cursor-pointer border border-transparent"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGroupRatiosOverride(prev => ({
                      ...prev,
                      [editingGroupRatios.groupName]: editingGroupRatios.ratios
                    }));
                    setGroupSameScoreRule(prev => ({
                      ...prev,
                      [editingGroupRatios.groupName]: tempGroupSameScoreRule
                    }));
                    setGroupRemainderRule(prev => ({
                      ...prev,
                      [editingGroupRatios.groupName]: tempGroupRemainderRule
                    }));
                    setGroupRemainderSpecificLevel(prev => ({
                      ...prev,
                      [editingGroupRatios.groupName]: tempGroupRemainderSpecificLevel
                    }));
                    setEditingGroupRatios(null);
                  }}
                  className="px-[16px] h-[32px] bg-[#15B8A6] hover:bg-[#12a191] rounded-[4px] text-[14px] text-white font-medium transition-colors cursor-pointer"
                >
                  确认修改
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isBatchEditingRatios && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-[8px] w-[620px] shadow-lg flex flex-col p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-100">
              <h3 className="text-[16px] font-semibold text-[#1F2937]">调整排名比例</h3>
              <button
                onClick={() => setIsBatchEditingRatios(false)}
                className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4 font-sans">
              {/* Rules selectors matching Figure 2 exactly */}
              <div className="flex items-center gap-2">
                <div className="w-[140px] text-right text-[13px] text-[#4B5563]">
                  <span className="text-red-500 mr-1">*</span>同分超人数规则：
                </div>
                <div className="flex-1">
                  <select
                    value={tempSameScoreRule}
                    onChange={(e) => setTempSameScoreRule(e.target.value)}
                    className="w-full max-w-[320px] h-[32px] px-[12px] border border-neutral-200 rounded-[4px] text-[13px] bg-white text-[#1F2937] focus:outline-none focus:border-[#15B8A6] cursor-pointer"
                  >
                    <option value="allow_exceed">占满当前等级</option>
                    <option value="push_to_next">顺延至下一等级</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-[140px] text-right text-[13px] text-[#4B5563]">
                  <span className="text-red-500 mr-1">*</span>余数处理：
                </div>
                <div className="flex-1">
                  <select
                    value={tempRemainderRule}
                    onChange={(e) => setTempRemainderRule(e.target.value)}
                    className="w-full max-w-[320px] h-[32px] px-[12px] border border-neutral-200 rounded-[4px] text-[13px] bg-white text-[#1F2937] focus:outline-none focus:border-[#15B8A6] cursor-pointer"
                  >
                    <option value="next">迁移到下一等级</option>
                    <option value="specific">迁移到指定等级</option>
                  </select>
                </div>
              </div>

              {tempRemainderRule === "specific" && (
                <div className="flex items-center gap-2">
                  <div className="w-[140px] text-right text-[13px] text-[#4B5563]">
                    指定归属等级：
                  </div>
                  <div className="flex-1">
                    <select
                      value={tempRemainderSpecificLevel}
                      onChange={(e) => setTempRemainderSpecificLevel(e.target.value)}
                      className="w-full max-w-[320px] h-[32px] px-[10px] border border-neutral-200 rounded-[4px] text-[13px] bg-white text-[#1F2937] focus:outline-none focus:border-[#15B8A6] cursor-pointer"
                    >
                      {tempRankRatios.map((r, i) => (
                        <option key={i} value={r.name}>
                          {r.name} 等级
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Grid-based table listing levels matching Figure 2 */}
              <div className="mt-4">
                <table className="w-full text-center border-collapse border border-neutral-200">
                  <thead>
                    <tr className="bg-neutral-50 text-[12px] text-[#4B5563] font-medium border-b border-neutral-200">
                      <th className="py-2.5 px-4 border-r border-neutral-200 w-[120px]">等级名称</th>
                      <th className="py-2.5 px-4 border-r border-neutral-200">排名比例</th>
                      <th className="py-2.5 px-4 w-[150px]">预计人数</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tempRankRatios.map((ratio, index) => {
                      const isLast = index === tempRankRatios.length - 1;
                      const pct = Math.max(0, (isLast ? 100 : ratio.max) - ratio.min);
                      const expectedCount = Math.round((pct * 100) / 100);

                      return (
                        <tr key={index} className="border-b border-neutral-200 last:border-b-0 text-[13px] text-[#1F2937]">
                          <td className="py-2.5 px-4 border-r border-neutral-200 bg-white font-medium">
                            {ratio.name}
                          </td>
                          <td className="py-2 px-4 border-r border-neutral-200 bg-white">
                            <div className="flex items-center justify-center gap-1.5">
                              <div className="relative w-[110px]">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={ratio.min}
                                  onChange={(e) => {
                                    const val = Math.min(100, Math.max(0, Number(e.target.value)));
                                    setTempRankRatios(tempRankRatios.map((r, i) => i === index ? { ...r, min: val } : r));
                                  }}
                                  placeholder="请输入比例"
                                  className="w-full h-[32px] pl-2 pr-[16px] border border-neutral-200 rounded-[4px] text-center text-[13px] focus:outline-none focus:border-[#15B8A6]"
                                />
                                <span className="absolute right-1.5 top-1.5 text-[11px] text-[#9CA3AF] pointer-events-none">%</span>
                              </div>
                              <span className="text-neutral-400 font-sans">~</span>
                              <div className="relative w-[110px]">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={isLast ? 100 : ratio.max}
                                  disabled={isLast}
                                  onChange={(e) => {
                                    const val = Math.min(100, Math.max(0, Number(e.target.value)));
                                    setTempRankRatios(tempRankRatios.map((r, i) => i === index ? { ...r, max: val } : r));
                                  }}
                                  placeholder="请输入比例"
                                  className={`w-full h-[32px] pl-2 pr-[16px] border border-neutral-200 rounded-[4px] text-center text-[13px] focus:outline-none focus:border-[#15B8A6] ${isLast ? "bg-neutral-50 text-neutral-400 cursor-not-allowed" : ""}`}
                                />
                                <span className="absolute right-1.5 top-1.5 text-[11px] text-[#9CA3AF] pointer-events-none">%</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-4 bg-white font-medium text-neutral-600">
                            {expectedCount}人
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-6 mt-6 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setIsBatchEditingRatios(false)}
                className="text-[#15B8A6] hover:opacity-80 text-[14px] font-medium transition-colors cursor-pointer border border-transparent"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => {
                  setRankRatios(tempRankRatios);
                  setSameScoreRule(tempSameScoreRule);
                  setRemainderRule(tempRemainderRule);
                  setRemainderSpecificLevel(tempRemainderSpecificLevel);
                  setIsBatchEditingRatios(false);
                }}
                className="px-[16px] h-[32px] bg-[#15B8A6] hover:bg-[#12a191] rounded-[4px] text-[14px] text-white font-medium transition-colors cursor-pointer"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 每个等级在各绩效组的预计人数明细抽屉 */}
      {showBreakdownDrawer && (
        <div 
          className="fixed inset-0 bg-black/40 z-[100] flex justify-end transition-opacity cursor-pointer"
          onClick={() => setShowBreakdownDrawer(false)}
        >
          <div 
            className="bg-[#F9FAFB] w-[960px] h-full shadow-2xl flex flex-col transform transition-transform cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="h-[48px] bg-white border-b border-neutral-200 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-[3px] h-[14px] bg-[#15B8A6] rounded-[1px]"></span>
                <h3 className="text-[14px] font-semibold text-[#1F2937]">
                  各等级绩效组预计人数明细
                </h3>
                <span className="text-[11px] bg-neutral-100 text-[#6B7280] px-2 py-0.5 rounded-[4px] border border-neutral-200">
                  {rankScope === "dept" ? "按部门" : rankScope === "eval_group" ? "按考核组" : "自定义分组"}
                </span>
              </div>
              <button
                onClick={() => setShowBreakdownDrawer(false)}
                className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors cursor-pointer"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            {/* Subheader: Mode selections & Search */}
            <div className="bg-white p-4 border-b border-neutral-200 flex flex-col gap-3 shrink-0">
              {/* Perspective Switch */}
              {!(levelRuleType === "rank" && rankScope !== "all") && (
                <div className="flex bg-neutral-100 p-0.5 rounded-[6px] border border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setDrawerViewMode("level")}
                    className={`flex-1 py-1 text-[11px] font-medium rounded-[4px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      drawerViewMode === "level"
                        ? "bg-white text-[#15B8A6] shadow-sm font-semibold"
                        : "text-[#4B5563] hover:text-[#1F2937]"
                    }`}
                  >
                    <Layers size={12} />
                    等级人数明细
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrawerViewMode("group")}
                    className={`flex-1 py-1 text-[11px] font-medium rounded-[4px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      drawerViewMode === "group"
                        ? "bg-white text-[#15B8A6] shadow-sm font-semibold"
                        : "text-[#4B5563] hover:text-[#1F2937]"
                    }`}
                  >
                    <Users size={12} />
                    绩效组分布
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrawerViewMode("config")}
                    className={`flex-1 py-1 text-[11px] font-medium rounded-[4px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      drawerViewMode === "config"
                        ? "bg-white text-[#15B8A6] shadow-sm font-semibold"
                        : "text-[#4B5563] hover:text-[#1F2937]"
                    }`}
                  >
                    <SlidersHorizontal size={12} />
                    详细配置与比例
                  </button>
                </div>
              )}

              {/* Level Tab Switches (Only shown in Level View mode) */}
              {drawerViewMode === "level" && !(levelRuleType === "rank" && rankScope !== "all") && (
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#4B5563] font-medium">查看等级:</span>
                  <div className="flex bg-neutral-100 p-0.5 rounded-[6px] gap-0.5 border border-neutral-200">
                    <button
                      type="button"
                      onClick={() => setSelectedRatioName(null)}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-[4px] transition-all cursor-pointer ${
                        selectedRatioName === null
                          ? "bg-white text-[#15B8A6] shadow-sm font-semibold"
                          : "text-[#4B5563] hover:text-[#1F2937]"
                      }`}
                    >
                      全部等级
                    </button>
                    {rankRatios.map((ratio) => (
                      <button
                        key={ratio.name}
                        type="button"
                        onClick={() => setSelectedRatioName(ratio.name)}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-[4px] transition-all cursor-pointer ${
                          selectedRatioName === ratio.name
                            ? "bg-white text-[#15B8A6] shadow-sm font-semibold"
                            : "text-[#4B5563] hover:text-[#1F2937]"
                        }`}
                      >
                        {ratio.name}等 ({ratio.max - ratio.min}%)
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Group */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索部门 / 团队 / 绩效组名称..."
                  value={drawerSearchQuery}
                  onChange={(e) => setDrawerSearchQuery(e.target.value)}
                  className="w-full h-[32px] pl-[32px] pr-8 border border-neutral-200 rounded-[4px] text-[12px] bg-white focus:outline-none focus:border-[#15B8A6] placeholder-[#9CA3AF]"
                />
                <Search size={13} className="absolute left-2.5 top-[9.5px] text-[#9CA3AF]" />
                {drawerSearchQuery && (
                  <button
                    onClick={() => setDrawerSearchQuery("")}
                    className="absolute right-2.5 top-[8px] text-[#9CA3AF] hover:text-[#4B5563]"
                    type="button"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* List / Table Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {(() => {
                const groups = getActiveGroups().filter(g => 
                  g.name.toLowerCase().includes(drawerSearchQuery.toLowerCase())
                );

                if (levelRuleType === "rank" && rankScope !== "all") {
                  return (
                    <div className="flex flex-col gap-3 animate-fadeIn">
                      <div className="bg-white rounded-[8px] border border-neutral-200 overflow-hidden shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] p-4">
                        <div className="overflow-x-auto w-full">
                          <table className="w-full text-left border-collapse text-[12px] min-w-[850px]">
                            <thead>
                              <tr className="bg-[#F9FAFB] border-b border-neutral-200 font-semibold text-[#4B5563]">
                                <th className="py-2.5 px-3 sticky left-0 bg-[#F9FAFB] z-[3] shadow-[2px_0_5px_rgba(83,84,85,0.03)] min-w-[150px] border-r border-neutral-150">
                                  绩效组别 / 部门
                                </th>
                                {rankRatios.map((ratio) => (
                                  <th key={ratio.name} className="py-2.5 px-3 text-right w-[100px] text-[#15B8A6]">
                                    {ratio.name}等 ({ratio.max - ratio.min}%)
                                  </th>
                                ))}
                                <th className="py-2.5 px-3 text-center w-[90px] border-l border-neutral-100 bg-[#F9FAFB]">
                                  总人数
                                </th>
                                <th className="py-2.5 px-3 text-center w-[230px] text-[#4B5563]">
                                  操作
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {groups.map((g, idx) => {
                                const ratiosForGroup = groupRatiosOverride[g.name] || rankRatios;
                                const isOverridden = !!groupRatiosOverride[g.name];
                                const isDifferent = isOverridden && (
                                  groupRatiosOverride[g.name].length !== rankRatios.length ||
                                  groupRatiosOverride[g.name].some((ratio, j) => {
                                    const defaultRatio = rankRatios[j];
                                    return !defaultRatio || ratio.min !== defaultRatio.min || ratio.max !== defaultRatio.max || ratio.name !== defaultRatio.name;
                                  })
                                );

                                return (
                                  <tr key={idx} className="border-b border-neutral-100 last:border-b-0 text-[#1F2937] hover:bg-neutral-50/50">
                                    <td className="py-2.5 px-3 font-medium text-[#1F2937] sticky left-0 bg-white z-[2] shadow-[2px_0_5px_rgba(83,84,85,0.04)] border-r border-neutral-150">
                                      <div className="flex items-center gap-1.5 truncate max-w-[215px]">
                                        <span className="w-1 h-3 bg-[#15B8A6]/60 rounded-sm inline-block"></span>
                                        <span className="truncate" title={g.name}>{g.name}</span>
                                        {isDifferent && (
                                          <span className="text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.2 rounded border border-amber-250 font-bold select-none shrink-0 scale-90">
                                            专
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    {rankRatios.map((ratio) => {
                                      const matchRatio = ratiosForGroup.find(r => r.name === ratio.name) || ratio;
                                      const pct = Math.max(0, matchRatio.max - matchRatio.min);
                                      const expected = Math.round((pct * g.size) / 100);
                                      return (
                                        <td key={ratio.name} className="py-2.5 px-3 text-right font-semibold text-[#15B8A6]">
                                          <span>{expected}人</span>
                                          {isDifferent && (
                                            <span className="block text-[9px] font-normal text-amber-500 scale-90 text-right pr-0.5">
                                              ({pct}%)
                                            </span>
                                          )}
                                        </td>
                                      );
                                    })}
                                    <td className="py-2.5 px-3 text-center text-[#6B7280] font-medium border-l border-neutral-100">
                                      {g.size}人
                                    </td>
                                    <td className="py-2.5 px-3">
                                      <div className="flex flex-col gap-1 items-center justify-center">
                                        <div className="flex items-center gap-1.5 justify-center">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setEditingGroupRatios({ 
                                                groupName: g.name, 
                                                ratios: ratiosForGroup.map(r => ({ ...r })) 
                                              });
                                              setTempGroupSameScoreRule(groupSameScoreRule[g.name] || sameScoreRule);
                                              setTempGroupRemainderRule(groupRemainderRule[g.name] || remainderRule);
                                              setTempGroupRemainderSpecificLevel(groupRemainderSpecificLevel[g.name] || remainderSpecificLevel);
                                            }}
                                            className="text-[11px] text-[#15B8A6] hover:text-[#0f9688] font-semibold flex items-center gap-0.5 cursor-pointer bg-[#15B8A6]/5 hover:bg-[#15B8A6]/10 px-2 py-1 rounded transition-colors"
                                          >
                                            <SlidersHorizontal size={10} />
                                            调整比例
                                          </button>
                                          {isDifferent && (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const updated = { ...groupRatiosOverride };
                                                delete updated[g.name];
                                                setGroupRatiosOverride(updated);
                                              }}
                                              className="text-[11px] text-[#EF4444] hover:text-[#dc2626] font-semibold flex items-center cursor-pointer bg-red-50 hover:bg-red-100/50 px-2 py-1 rounded transition-colors"
                                            >
                                              恢复通用比例
                                            </button>
                                          )}
                                        </div>
                                        {isDifferent && (
                                          <div className="text-[10px] text-amber-600 font-medium bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100/70 select-none scale-95 origin-center text-center max-w-[210px] truncate" title={ratiosForGroup.map(r => `${r.name}:${r.max - r.min}%`).join('/')}>
                                            已设: {ratiosForGroup.map(r => `${r.name}:${r.max - r.min}%`).join(' / ')}
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Info / instructions panel */}
                      <div className="bg-teal-50/40 rounded-[8px] border border-[#15B8A6]/10 p-[16px] text-[11px] text-[#4B5563] flex flex-col gap-2 shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] bg-white">
                        <div className="font-semibold text-teal-850 flex items-center gap-1">
                          <Info size={13} className="text-[#15B8A6]" />
                          <span>关于多绩效考核组计算规则与比例个性化调整</span>
                        </div>
                        <p>
                          1. <strong>精准计算：</strong>各个独立绩效考核组都会分别采取分配比例。预计人数 = 各考核绩效组总人数 × 对应等级的排名比例百分比（计算结果经过四舍五入）。
                        </p>
                        <p>
                          2. <strong>个性化调整比例：</strong>点击列表行尾的「调整比例」按钮，可按部门/绩效组单独配置排名规则与级距比例。保存后，表格行数据与对应人数将实时重算回显。
                        </p>
                        <p>
                          3. <strong>跨组累计：</strong>本页面表格显示的预计总人数是各考核组计算舍入并生效个性化比例后结果的累加值。
                        </p>
                      </div>
                    </div>
                  );
                }

                // CASE 0: CONFIG VIEW PERSPECTIVE
                if (drawerViewMode === "config") {
                  return (
                    <div className="flex flex-col gap-4">
                      {/* Global Default Config Block */}
                      <div className="bg-white border border-neutral-200 rounded-[8px] p-[16px] shadow-[1px_1px_4px_rgba(0,0,0,0.015)] flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                          <span className="text-[13px] font-bold text-[#1F2937] flex items-center gap-1.5 font-sans">
                            <span className="w-1.5 h-3 bg-[#15B8A6] rounded-sm"></span>
                            全局默认等级比例
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setTempRankRatios([...rankRatios]);
                              setTempSameScoreRule(sameScoreRule);
                              setTempRemainderRule(remainderRule);
                              setTempRemainderSpecificLevel(remainderSpecificLevel);
                              setIsBatchEditingRatios(true);
                            }}
                            className="text-[12px] text-[#15B8A6] hover:opacity-85 font-semibold flex items-center gap-1 cursor-pointer font-sans"
                          >
                            <SlidersHorizontal size={12} />
                            批量调整全局规则
                          </button>
                        </div>

                        {/* Interactive layout of rankRatios */}
                        <div className="grid grid-cols-2 gap-2">
                          {rankRatios.map((ratio, rIdx) => {
                            const pct = Math.max(0, ratio.max - ratio.min);
                            return (
                              <div key={rIdx} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] p-2 flex items-center justify-between">
                                <span className="text-[12px] font-semibold text-[#374151]">{ratio.name}等</span>
                                <span className="text-[12px] font-bold text-[#15B8A6]">{ratio.min}% - {ratio.max}% ({pct}%)</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tie and remainder rules dashboard inside the drawer */}
                      <div className="bg-white border border-neutral-200 rounded-[8px] p-[16px] shadow-[1px_1px_4px_rgba(0,0,0,0.015)] flex flex-col gap-3">
                        <div className="border-b border-neutral-100 pb-2">
                          <span className="text-[13px] font-bold text-[#1F2937] flex items-center gap-1.5 font-sans">
                            <span className="w-1.5 h-3 bg-[#15B8A6] rounded-sm"></span>
                            舍入与同分规则配置
                          </span>
                        </div>

                        <div className="flex flex-col gap-3">
                          {/* sameScoreRule Selector */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] text-[#6B7280] font-medium font-sans">同分（超人数）处理规则 :</label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setSameScoreRule("allow_exceed")}
                                className={`h-[32px] rounded-[4px] text-[12px] border font-medium flex items-center justify-center transition-all cursor-pointer font-sans ${
                                  sameScoreRule === "allow_exceed"
                                    ? "bg-[#15B8A6]/5 border-[#15B8A6] text-[#15B8A6] font-bold"
                                    : "border-[#E5E7EB] text-[#4B5563] bg-white hover:bg-neutral-50"
                                }`}
                              >
                                占满当前等级 (不顺延)
                              </button>
                              <button
                                type="button"
                                onClick={() => setSameScoreRule("push_to_next")}
                                className={`h-[32px] rounded-[4px] text-[12px] border font-medium flex items-center justify-center transition-all cursor-pointer font-sans ${
                                  sameScoreRule === "push_to_next"
                                    ? "bg-[#15B8A6]/5 border-[#15B8A6] text-[#15B8A6] font-bold"
                                    : "border-[#E5E7EB] text-[#4B5563] bg-white hover:bg-neutral-50"
                                }`}
                              >
                                顺延至下一等级
                              </button>
                            </div>
                          </div>

                          {/* remainderRule Selector */}
                          <div className="flex flex-col gap-1.5 pt-1">
                            <label className="text-[11px] text-[#6B7280] font-medium font-sans">舍入余缺人数分配规则 :</label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setRemainderRule("next")}
                                className={`h-[32px] rounded-[4px] text-[12px] border font-medium flex items-center justify-center transition-all cursor-pointer font-sans ${
                                  remainderRule === "next"
                                    ? "bg-[#15B8A6]/5 border-[#15B8A6] text-[#15B8A6] font-bold"
                                    : "border-[#E5E7EB] text-[#4B5563] bg-white hover:bg-neutral-50"
                                }`}
                              >
                                顺序合并到下一等级
                              </button>
                              <button
                                type="button"
                                onClick={() => setRemainderRule("specific")}
                                className={`h-[32px] rounded-[4px] text-[12px] border font-medium flex items-center justify-center transition-all cursor-pointer font-sans relative ${
                                  remainderRule === "specific"
                                    ? "bg-[#15B8A6]/5 border-[#15B8A6] text-[#15B8A6] font-bold"
                                    : "border-[#E5E7EB] text-[#4B5563] bg-white hover:bg-neutral-50"
                                }`}
                              >
                                统一并入指定等级
                              </button>
                            </div>
                          </div>

                          {remainderRule === "specific" && (
                            <div className="mt-1 flex items-center gap-2 bg-[#F9FAFB] p-2 rounded border border-[#E5E7EB] animate-fadeIn">
                              <span className="text-[11px] text-[#6B7280] font-sans">合并到指定等级:</span>
                              <select
                                value={remainderSpecificLevel}
                                onChange={(e) => setRemainderSpecificLevel(e.target.value)}
                                className="h-[24px] px-2 text-[12px] border border-neutral-200 rounded text-[#1F2937] bg-white focus:outline-none focus:border-[#15B8A6] font-sans"
                              >
                                {rankRatios.map((r) => (
                                  <option key={r.name} value={r.name}>{r.name}等</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                // CASE 1: GROUP VIEW PERSPECTIVE
                if (drawerViewMode === "group") {
                  return (
                    <div className="flex flex-col gap-3 animate-fadeIn">
                      {/* Collapsible Global Configuration Block */}
                      {levelRuleType === "rank" && rankScope !== "all" && (
                        <div className="bg-white border border-neutral-200 rounded-[8px] p-3 shadow-[1px_1px_4px_rgba(0,0,0,0.015)] flex flex-col gap-2">
                          <div 
                            className="flex justify-between items-center cursor-pointer select-none" 
                            onClick={() => setShowGlobalPanel(!showGlobalPanel)}
                          >
                            <span className="text-[12px] font-bold text-[#1F2937] flex items-center gap-1.5 font-sans">
                              <SlidersHorizontal size={13} className="text-[#15B8A6]" />
                              全局统一默认规则与模型
                            </span>
                            <span className="text-[11.5px] text-[#15B8A6] flex items-center gap-0.5">
                              {showGlobalPanel ? "收起规则设置" : "展开规则设置"}
                              <ChevronDown size={13} className={`transform transition-transform ${showGlobalPanel ? "rotate-180" : ""}`} />
                            </span>
                          </div>
                          {showGlobalPanel && (
                            <div className="flex flex-col gap-3 pt-2.5 border-t border-neutral-100 animate-fadeIn">
                              {/* Global Default Ratios */}
                              <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] text-[#6B7280]">全局默认等级比例 (按此比例分配未设独立比例的考核组):</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTempRankRatios([...rankRatios]);
                                      setTempSameScoreRule(sameScoreRule);
                                      setTempRemainderRule(remainderRule);
                                      setTempRemainderSpecificLevel(remainderSpecificLevel);
                                      setIsBatchEditingRatios(true);
                                    }}
                                    className="text-[11px] text-[#15B8A6] hover:opacity-85 font-semibold cursor-pointer"
                                  >
                                    修改默认比例
                                  </button>
                                </div>
                                <div className="grid grid-cols-4 gap-1.5">
                                  {rankRatios.map((ratio, rIdx) => (
                                    <div key={rIdx} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[4px] py-1 px-1.5 text-center">
                                      <div className="text-[10px] text-[#4B5563] font-semibold">{ratio.name}等</div>
                                      <div className="text-[11px] text-[#15B8A6] font-bold">{ratio.max - ratio.min}%</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Same score rules and remainder rules directly inside! */}
                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[#6B7280] font-medium">同分（超人数）处理 :</span>
                                  <select
                                    value={sameScoreRule}
                                    onChange={(e) => setSameScoreRule(e.target.value)}
                                    className="h-[28px] px-1.5 border border-neutral-200 rounded text-[#1F2937] bg-white focus:outline-none focus:border-[#15B8A6] font-sans"
                                  >
                                    <option value="allow_exceed">占满当前等级 (不顺延)</option>
                                    <option value="push_to_next">顺延至下一等级</option>
                                  </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-[#6B7280] font-medium">舍入余缺分配 :</span>
                                  <select
                                    value={remainderRule}
                                    onChange={(e) => {
                                      setRemainderRule(e.target.value);
                                    }}
                                    className="h-[28px] px-1.5 border border-neutral-200 rounded text-[#1F2937] bg-white focus:outline-none focus:border-[#15B8A6] font-sans"
                                  >
                                    <option value="next">顺序合并到下一等级</option>
                                    <option value="specific">统一并入指定等级</option>
                                  </select>
                                </div>
                              </div>
                              {remainderRule === "specific" && (
                                <div className="flex items-center gap-2 bg-[#F9FAFB] p-1.5 rounded border border-[#E5E7EB] text-[11px]">
                                  <span className="text-[#6B7280]">合并到指定等级:</span>
                                  <select
                                    value={remainderSpecificLevel}
                                    onChange={(e) => setRemainderSpecificLevel(e.target.value)}
                                    className="h-[24px] px-2 border border-neutral-200 rounded text-[#1F2937] bg-white focus:outline-none focus:border-[#15B8A6] font-sans"
                                  >
                                    {rankRatios.map((r) => (
                                      <option key={r.name} value={r.name}>{r.name}等</option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="text-[11px] text-[#6B7280] font-medium px-3 flex justify-between items-center bg-white py-2 rounded-[8px] border border-neutral-200 shadow-sm">
                        <span>当前维度: <strong className="text-[#15B8A6]">各绩效组比例规则与计划人数分布</strong></span>
                        <span>共 {groups.length} 个绩效组/部门</span>
                      </div>
                      
                      {groups.map((g, idx) => {
                        const isCustom = !!groupRatiosOverride[g.name];
                        const currentRatios = groupRatiosOverride[g.name] || rankRatios;
                        const isEditing = inlineEditingGroup === g.name;

                        return (
                          <div 
                            key={idx} 
                            className={`bg-white border rounded-[8px] p-[16px] flex flex-col gap-3 transition-all shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] ${
                              isEditing ? "border-[#15B8A6] ring-1 ring-[#15B8A6]/20 bg-teal-50/5" : "border-neutral-200 hover:border-[#15B8A6]/40"
                            }`}
                          >
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                              <span className="text-[13px] font-semibold text-[#1F2937] flex items-center gap-1.5 min-w-0">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCustom ? "bg-amber-500 animate-pulse" : "bg-[#15B8A6]"}`}></span>
                                <span className="truncate">{g.name}</span>
                                {isCustom && (
                                  <span className="text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded border border-amber-200/50 font-semibold select-none shrink-0 scale-90">
                                    独立比例
                                  </span>
                                )}
                              </span>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[11px] bg-[#E6FFFA] text-[#15B8A6] font-semibold px-2 py-0.5 rounded border border-[#15B8A6]/10">
                                  组总人数: <strong className="text-[#15B8A6]">{g.size}人</strong>
                                </span>
                              </div>
                            </div>

                            {/* Beautiful visual segmented distribution bar on current active ratios */}
                            <div className="flex flex-col gap-1">
                              <div className="text-[10px] text-[#6B7280] font-medium flex items-center justify-between">
                                <span>比例带分布进度条:</span>
                                <span>{isCustom ? "已开启独立占比" : "共享全局统一"}</span>
                              </div>
                              <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden flex shadow-inner text-[0px]">
                                {(isEditing ? inlineGroupRatios : currentRatios).map((ratio, rIdx) => {
                                  const pct = Math.max(0, ratio.max - ratio.min);
                                  if (pct <= 0) return null;
                                  const colors = [
                                    "bg-[#15B8A6]", // S
                                    "bg-[#2DD4BF]", // A
                                    "bg-[#5EEAD4]", // B
                                    "bg-[#99F6E4]", // C
                                    "bg-[#CCFBF1]", // D
                                    "bg-[#E6FFFA]", // E
                                  ];
                                  const bgColor = colors[rIdx % colors.length];
                                  return (
                                    <div 
                                      key={rIdx} 
                                      style={{ width: `${pct}%` }} 
                                      className={`${bgColor} h-full flex items-center justify-center text-[9px] font-bold text-white relative transition-all duration-300`}
                                      title={`${ratio.name}等: ${pct}%`}
                                    >
                                      {pct >= 10 && <span className="drop-shadow-sm truncate px-0.5">{ratio.name}({pct}%)</span>}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {isEditing ? (
                              /* Interactive Ratio Editing Table */
                              <div className="mt-1 flex flex-col gap-3">
                                <div className="border border-[#E5E7EB] rounded-[6px] overflow-hidden">
                                  <table className="w-full text-left border-collapse text-[11px]">
                                    <thead>
                                      <tr className="bg-neutral-100 border-b border-neutral-200 text-[#4B5563] font-semibold">
                                        <th className="py-2 px-3">评估等级</th>
                                        <th className="py-2 px-3 w-[240px]">排名比例范围 (%)</th>
                                        <th className="py-1.5 px-3 text-right">占比 (预计人数)</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {inlineGroupRatios.map((ratio, rIdx) => {
                                        const pct = Math.max(0, ratio.max - ratio.min);
                                        const expectedValue = Math.round((pct * g.size) / 100);

                                        return (
                                          <tr key={rIdx} className="border-b border-neutral-200 last:border-b-0 bg-white">
                                            <td className="py-1.5 px-3 font-bold text-[#1F2937]">
                                              {ratio.name}等
                                            </td>
                                            <td className="py-1 px-3">
                                              <div className="flex items-center gap-1">
                                                <div className="relative w-[85px]">
                                                  <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={ratio.min}
                                                    onChange={(e) => {
                                                      const val = Math.min(100, Math.max(0, Number(e.target.value)));
                                                      const updated = inlineGroupRatios.map((r, i) =>
                                                        i === rIdx ? { ...r, min: val } : r
                                                      );
                                                      setInlineGroupRatios(updated);
                                                    }}
                                                    className="w-full h-[26px] pl-1.5 pr-4 border border-neutral-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#15B8A6]"
                                                  />
                                                  <span className="absolute right-1 text-[9px] text-[#9CA3AF] top-[5px]">%</span>
                                                </div>
                                                <span className="text-neutral-400 text-[10px]">-</span>
                                                <div className="relative w-[85px]">
                                                  <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={ratio.max}
                                                    onChange={(e) => {
                                                      const val = Math.min(100, Math.max(0, Number(e.target.value)));
                                                      const updated = inlineGroupRatios.map((r, i) =>
                                                        i === rIdx ? { ...r, max: val } : r
                                                      );
                                                      setInlineGroupRatios(updated);
                                                    }}
                                                    className="w-full h-[26px] pl-1.5 pr-4 border border-neutral-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#15B8A6]"
                                                  />
                                                  <span className="absolute right-1 text-[9px] text-[#9CA3AF] top-[5px]">%</span>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="py-1.5 px-3 text-right">
                                              <span className="font-semibold text-[#15B8A6]">{pct}%</span>
                                              <span className="text-[10px] text-[#4B5563] ml-1">({expectedValue}人)</span>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                                  {isCustom ? (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = { ...groupRatiosOverride };
                                        delete updated[g.name];
                                        setGroupRatiosOverride(updated);
                                        setInlineEditingGroup(null);
                                      }}
                                      className="text-[11px] text-[#EF4444] hover:text-red-650 font-semibold flex items-center gap-0.5 cursor-pointer bg-red-50 px-2 py-1 rounded border border-red-100 font-sans"
                                    >
                                      恢复全局比例
                                    </button>
                                  ) : (
                                    <span className="text-[11px] text-[#9CA3AF]">编辑完毕后点击保存生效</span>
                                  )}
                                  <div className="flex justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setInlineEditingGroup(null)}
                                      className="px-3 h-[28px] text-[11px] border border-[#E5E7EB] rounded-[4px] text-[#4B5563] hover:bg-neutral-50 transition-colors cursor-pointer"
                                    >
                                      取消
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        // Save custom overrides
                                        setGroupRatiosOverride(prev => ({
                                          ...prev,
                                          [g.name]: inlineGroupRatios
                                        }));
                                        setInlineEditingGroup(null);
                                      }}
                                      className="px-3 h-[28px] text-[11px] bg-[#15B8A6] hover:bg-[#12a191] rounded-[4px] text-white font-medium transition-colors cursor-pointer"
                                    >
                                      保存生效
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Standard Display detailed breakdown cards/grid */
                              <div className="flex flex-col gap-2.5">
                                <div className="grid grid-cols-3 gap-2 mt-1">
                                  {currentRatios.map((ratio, rIdx) => {
                                    const pct = Math.max(0, ratio.max - ratio.min);
                                    const expectedVal = Math.round((pct * g.size) / 100);
                                    return (
                                      <div key={rIdx} className="bg-[#F9FAFB] border border-neutral-100 rounded-[6px] p-2 flex flex-col gap-1 hover:bg-[#15B8A6]/5 transition-all">
                                        <div className="flex items-center justify-between border-b border-neutral-200/40 pb-1">
                                          <span className="text-[11px] font-bold text-[#374151]">
                                            {ratio.name} 等
                                          </span>
                                          <span className="text-[10.5px] text-[#15B8A6] font-semibold">{pct}%</span>
                                        </div>
                                        <div className="flex justify-between items-baseline mt-1 gap-1">
                                          <span className="text-[9px] text-[#9CA3AF] truncate max-w-[45px]">
                                            {g.size}×{pct}%
                                          </span>
                                          <span className="text-[12.5px] font-bold text-[#15B8A6]">
                                            {expectedVal}<span className="text-[9px] font-normal text-[#4B5563] ml-0.5">人</span>
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                                  <span className="text-[11px] text-[#6B7280]">
                                    规则状态: {isCustom ? (
                                      <span className="text-amber-600 font-semibold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                        独立排名比例
                                      </span>
                                    ) : (
                                      <span className="text-green-600 font-semibold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        共享全局比例
                                      </span>
                                    )}
                                  </span>

                                  <div className="flex gap-2">
                                    {isCustom && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = { ...groupRatiosOverride };
                                          delete updated[g.name];
                                          setGroupRatiosOverride(updated);
                                          if (inlineEditingGroup === g.name) {
                                            setInlineEditingGroup(null);
                                          }
                                        }}
                                        className="text-[11px] text-[#EF4444] hover:text-red-650 font-semibold flex items-center gap-0.5 cursor-pointer bg-red-50 px-2 py-1 rounded border border-red-100 font-sans"
                                      >
                                        恢复默认比例
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setInlineEditingGroup(g.name);
                                        setInlineGroupRatios(currentRatios.map(r => ({ ...r })));
                                      }}
                                      className="text-[11px] text-[#15B8A6] hover:text-[#0F9688] font-semibold flex items-center gap-1 cursor-pointer bg-[#15B8A6]/5 border border-[#15B8A6]/20 px-2.5 py-1 rounded transition-colors font-sans"
                                    >
                                      <SlidersHorizontal size={10} />
                                      设置独立比例
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <div className="bg-white rounded-[8px] border border-neutral-200 p-[16px] text-[11px] text-[#6B7280] flex flex-col gap-2 shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)]">
                        <div className="font-semibold text-[#1F2937] flex items-center gap-1.5">
                          <Info size={13} className="text-[#15B8A6]" />
                          <span>关于多绩效考核组计算规则</span>
                        </div>
                        <p>
                          系统支持对每一个考核对象或分组团队分别按「比例」自动得出预计分配人数。
                        </p>
                        <p>
                          当等级排名范围选择为分组时，每个部门、考核组或自定义团队对应算出的独立分布人数累加所得即为预计总人数上限。
                        </p>
                      </div>
                    </div>
                  );
                }

                // CASE 2: LEVEL PERSPECTIVE (SINGLE LEVEL TARGETED)
                if (selectedRatioName) {
                  const currentRatio = rankRatios.find(r => r.name === selectedRatioName);
                  const pct = currentRatio ? (currentRatio.max - currentRatio.min) : 0;
                  return (
                    <div className="flex flex-col gap-2">
                      <div className="text-[11px] text-[#6B7280] font-medium px-3 flex justify-between items-center bg-white py-2 rounded-[8px] border border-neutral-200 shadow-sm">
                        <span>当前筛选: <strong className="text-[#15B8A6]">{selectedRatioName}等级</strong> (全局默认比例: {pct}%)</span>
                        <span>共 {groups.length} 个分组</span>
                      </div>
                      
                      {groups.map((g, idx) => {
                        const ratiosForGroup = groupRatiosOverride[g.name] || rankRatios;
                        const matchRatio = ratiosForGroup.find(r => r.name === selectedRatioName);
                        const pctForGroup = matchRatio ? Math.max(0, matchRatio.max - matchRatio.min) : 0;
                        const expectedVal = Math.round((pctForGroup * g.size) / 100);
                        const isOverridden = !!groupRatiosOverride[g.name];

                        return (
                          <div 
                            key={idx} 
                            className="bg-white border border-neutral-200 rounded-[8px] p-[16px] flex items-center justify-between hover:border-[#15B8A6]/45 transition-all shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] group"
                          >
                            <div className="flex flex-col gap-1.5 max-w-[70%]">
                              <span className="text-[13px] font-semibold text-[#1F2937] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#15B8A6]"></span>
                                {g.name}
                                {isOverridden && (
                                  <span className="text-[9px] bg-amber-50 text-amber-600 px-1 py-0.2 rounded border border-amber-200/50 font-semibold select-none shrink-0 scale-90">
                                    独立比例: {pctForGroup}%
                                  </span>
                                )}
                              </span>
                              <div className="flex items-center gap-2 text-[11px] text-[#6B7280]">
                                <span className="bg-[#F9FAFB] px-1.5 py-0.5 rounded border border-neutral-200">总人数: {g.size}人</span>
                                <span className="text-[#9CA3AF]">算式: {g.size} × {pctForGroup}% = {((pctForGroup * g.size) / 100).toFixed(1)}人</span>
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                              <span className="text-[15px] font-bold text-[#15B8A6]">{expectedVal} <span className="text-[11px] font-normal text-[#4B5563]">人</span></span>
                              <span className="text-[10px] text-[#9CA3AF]">{isOverridden ? "独立舍入值" : "四舍五入值"}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                } else {
                  // CASE 3: LEVEL PERSPECTIVE (ALL LEVEL TABLE SUMMARY)
                  return (
                    <div className="flex flex-col gap-3">
                      <div className="bg-white rounded-[8px] border border-neutral-200 overflow-hidden shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] p-4">
                        <table className="w-full text-left border-collapse text-[12px]">
                          <thead>
                            <tr className="bg-[#F9FAFB] border-b border-neutral-200 font-semibold text-[#4B5563]">
                              <th className="py-2 px-3">绩效组别 / 部门</th>
                              <th className="py-2 px-3 text-center w-[80px]">总人数</th>
                              {rankRatios.map((ratio) => (
                                <th key={ratio.name} className="py-2 px-3 text-right w-[80px] text-[#15B8A6]">
                                  {ratio.name}等 ({ratio.max - ratio.min}%)
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {groups.map((g, idx) => (
                              <tr key={idx} className="border-b border-neutral-100 last:border-b-0 text-[#1F2937] hover:bg-neutral-50/50">
                                <td className="py-2.5 px-3 font-medium text-[#1F2937]">
                                  <div className="flex items-center justify-between max-w-[180px]">
                                    <div className="flex items-center gap-1.5 truncate">
                                      <span className="w-1 h-3 bg-[#15B8A6]/60 rounded-sm"></span>
                                      {g.name}
                                    </div>
                                    {groupRatiosOverride[g.name] && (
                                      <span className="text-[9px] bg-amber-50 text-amber-600 px-1 py-0.2 rounded border border-amber-200/50 font-bold select-none shrink-0 scale-90 font-sans">
                                        独立
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-2.5 px-3 text-center text-[#6B7280] font-medium">
                                  {g.size}人
                                </td>
                                {rankRatios.map((ratio) => {
                                  const ratiosForGroup = groupRatiosOverride[g.name] || rankRatios;
                                  const matchRatio = ratiosForGroup.find(r => r.name === ratio.name) || ratio;
                                  const pct = Math.max(0, matchRatio.max - matchRatio.min);
                                  const expected = Math.round((pct * g.size) / 100);
                                  return (
                                    <td key={ratio.name} className="py-2.5 px-3 text-right font-semibold text-[#15B8A6]">
                                      <span>{expected}人</span>
                                      {groupRatiosOverride[g.name] && (
                                        <span className="block text-[9px] font-normal text-amber-500 scale-90 text-right pr-0.5">
                                          ({pct}%)
                                        </span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-teal-50/40 rounded-[8px] border border-[#15B8A6]/10 p-[16px] text-[11px] text-[#4B5563] flex flex-col gap-2 shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] bg-white">
                        <div className="font-semibold text-teal-850 flex items-center gap-1">
                          <Info size={13} className="text-[#15B8A6]" />
                          <span>关于四舍五入尾数处理</span>
                        </div>
                        <p>
                          1. 精确计算：预计人数 = 各考核绩效组总人数 × 对应等级的排名比例百分比。
                        </p>
                        <p>
                          2. 整数舍入：计算得到的数值在保留逻辑中经过四舍五入。
                        </p>
                        <p>
                          3. 跨组计算：各个独立绩效考核组都会分别采取等级分配比，本页面表格显示的预计总人数是各考核组计算舍入后结果的累加值。
                        </p>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>

            {/* Drawer Footer */}
            <div className="h-[48px] bg-white border-t border-neutral-200 flex items-center justify-end px-4 gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowBreakdownDrawer(false)}
                className="px-4 h-[28px] border border-neutral-200 rounded-[4px] text-[12px] text-[#4B5563] hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateLevelRuleSimModal && (
        <QuickCreateLevelRuleModal
          onClose={() => setShowCreateLevelRuleSimModal(false)}
          onSave={(ruleName, levels) => {
            const nextVal = String(Date.now() + Math.random());
            const opt = {
              value: nextVal,
              label: ruleName,
            };
            setLevelRuleOptions([...levelRuleOptions, opt]);
            setLevelRulesMap({
              ...levelRulesMap,
              [nextVal]: levels.map((l: any) => ({
                name: l.name,
                min: Number(l.min),
                max: Number(l.max),
              })),
            });
            setSelectedLevelRule(nextVal);
            setShowCreateLevelRuleSimModal(false);
          }}
        />
      )}

      {showCreateForcedRuleSimModal && (
        <QuickCreateForcedRuleModal
          onClose={() => setShowCreateForcedRuleSimModal(false)}
          levelRules={levelRuleOptions.map((opt) => ({
            value: opt.value,
            label: opt.label,
            levels: levelRulesMap[opt.value]?.map((l) => l.name) || ["S", "A", "B", "C"],
          }))}
          onSave={(ruleName, levelRuleName, ratios) => {
            const newOptionVal = `rule_${Date.now()}`;
            const ratioStr = Object.entries(ratios)
              .map(([k, v]) => `${k}:${v}%`)
              .join("-");
            const newRuleObj = {
              value: newOptionVal,
              label: `${ruleName} (${ratioStr})`,
            };
            setSimForcedRules([...simForcedRules, newRuleObj]);
            setSelectedSimForcedRule(newOptionVal);
            setShowCreateForcedRuleSimModal(false);
          }}
        />
      )}
    </div>
  );
}

// --- 考核结果设置页 ---
function AssessmentResultSetting({
  selectedForcedRule,
  forcedRuleOptions,
  onBack,
  onSave,
  onCreateRule,
  readonly,
}: {
  selectedForcedRule?: string;
  forcedRuleOptions?: any[];
  onBack: () => void;
  onSave: (selectedRule: string) => void;
  onCreateRule: () => void;
  readonly?: boolean;
}) {
  const [localForcedRule, setLocalForcedRule] = useState(
    selectedForcedRule || "",
  );
  const [showCustomGroupModal, setShowCustomGroupModal] = useState(false);
  const [levelRuleType, setLevelRuleType] = useState("range");
  const [levelRule, setLevelRule] = useState("429");
  const [forcedDist, setForcedDist] = useState("all");
  const [groupRule, setGroupRule] = useState("dept");
  const [deptLevel, setDeptLevel] = useState("last");
  const [controlNodes, setControlNodes] = useState(["hr"]);
  const [controlMethod, setControlMethod] = useState("warn");
  const [controlRule, setControlRule] = useState("ratio");
  const [tieRule, setTieRule] = useState("keep");
  const [remainderRule, setRemainderRule] = useState("round");
  const [remainderSpecificLevel, setRemainderSpecificLevel] = useState("一类");
  const [activeGroup, setActiveGroup] = useState("Yara的测试公司");

  React.useEffect(() => {
    if (selectedForcedRule) {
      setLocalForcedRule(selectedForcedRule);
    }
  }, [selectedForcedRule]);

  const selectedRuleName =
    forcedRuleOptions?.find((r) => r.value === localForcedRule)?.label || "";

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col font-sans text-[#1F2937]">
      <div className="h-[48px] px-[16px] flex items-center justify-between border-b border-[#E5E7EB] shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center text-[#6B7280] hover:text-[#1F2937] text-[14px]"
          >
            <ChevronRight size={16} className="rotate-180 mr-1" />
            返回
          </button>
          <h1 className="text-[16px] font-medium text-[#1F2937]">
            考核结果设置
          </h1>
        </div>
        {!readonly && (
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-[16px] h-[32px] border border-[#E5E7EB] rounded-[4px] text-[14px] text-[#4B5563] hover:bg-[#F9FAFB]"
            >
              取消
            </button>
            <button
              onClick={() => onSave(localForcedRule)}
              className="px-[16px] h-[32px] bg-[#15B8A6] rounded-[4px] text-[14px] text-white hover:bg-[#0F9688]"
            >
              确定
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-[24px] bg-[#F9FAFB]">
        <div
          className={`bg-white rounded-[8px] p-[24px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] max-w-[1200px] mx-auto ${readonly ? "pointer-events-none" : ""}`}
        >
          {/* 等级生成设置 */}
          <div className="mb-[32px]">
            <div className="flex items-center gap-2 mb-[24px]">
              <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
              <h2 className="text-[16px] font-medium text-[#1F2937]">
                等级生成设置
              </h2>
            </div>

            <div className="flex flex-col gap-[20px] pl-[12px]">
              <FormRow label="绩效等级规则" required>
                <RadioGroup
                  name="resultLevelRuleType"
                  value={levelRuleType}
                  onChange={() => {}} // Disabled
                  options={[
                    { label: "不开启", value: "none" },
                    {
                      label: (
                        <span className="flex items-center gap-1">
                          按分数区间生成
                          <HelpCircle
                            size={14}
                            className="text-[#9CA3AF] cursor-help"
                          />
                        </span>
                      ),
                      value: "range",
                    },
                    {
                      label: (
                        <span className="flex items-center gap-1">
                          按分数排名生成
                          <HelpCircle
                            size={14}
                            className="text-[#9CA3AF] cursor-help"
                          />
                        </span>
                      ),
                      value: "rank",
                    },
                  ]}
                  disabled={true}
                />
              </FormRow>

              <FormRow label="等级规则" required>
                <div className="h-[32px] flex items-center px-[8px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-[4px] text-[14px] text-[#6B7280] cursor-not-allowed w-full max-w-[320px]">
                  429
                </div>
              </FormRow>

              <FormRow label="强制分布" required>
                <RadioGroup
                  name="resultForcedDist"
                  value={forcedDist}
                  onChange={setForcedDist}
                  options={[
                    { label: "不开启", value: "none", disabled: true },
                    { label: "全部参与人员", value: "all" },
                    { label: "绩效组", value: "group" },
                  ]}
                />
              </FormRow>

              {forcedDist === "group" && (
                <>
                  <FormRow label="分组规则" required>
                    <RadioGroup
                      name="resultGroupRule"
                      value={groupRule}
                      onChange={setGroupRule}
                      options={[
                        { label: "按部门", value: "dept" },
                        { label: "自定义分组", value: "custom" },
                      ]}
                    />
                  </FormRow>

                  {groupRule === "dept" && (
                    <FormRow label="强制分布的部门层级" required>
                      <div className="flex flex-col gap-1 w-[200px]">
                        <CustomSelect
                          options={[
                            { label: "最末级", value: "last" },
                            { label: "第一级", value: "1" },
                            { label: "第二级", value: "2" },
                            { label: "第三级", value: "3" },
                          ]}
                          value={deptLevel}
                          onChange={setDeptLevel}
                          placeholder="请选择部门层级"
                        />
                        <span className="text-[12px] text-[#9CA3AF]">
                          自下往上（员工所在部门设为第一级）
                        </span>
                      </div>
                    </FormRow>
                  )}
                  {groupRule === "custom" && (
                    <FormRow label="配置分组" required>
                      <span
                        className="text-[#15B8A6] text-[14px] cursor-pointer hover:opacity-80 pt-[6px]"
                        onClick={() => setShowCustomGroupModal(true)}
                      >
                        配置自定义分组
                      </span>
                    </FormRow>
                  )}
                </>
              )}

              <FormRow label="执行控制的节点" required>
                <div className="flex items-center gap-6 h-[32px]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={controlNodes.includes("hr")}
                      onChange={(e) => {
                        if (e.target.checked)
                          setControlNodes([...controlNodes, "hr"]);
                        else
                          setControlNodes(
                            controlNodes.filter((n) => n !== "hr"),
                          );
                      }}
                      className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] rounded focus:ring-[#15B8A6]"
                    />
                    <span className="text-[14px] text-[#4B5563]">HR调整</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={controlNodes.includes("audit")}
                      onChange={(e) => {
                        if (e.target.checked)
                          setControlNodes([...controlNodes, "audit"]);
                        else
                          setControlNodes(
                            controlNodes.filter((n) => n !== "audit"),
                          );
                      }}
                      className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] rounded focus:ring-[#15B8A6]"
                    />
                    <span className="text-[14px] text-[#4B5563]">
                      结果审核节点
                    </span>
                  </label>
                </div>
              </FormRow>

              <FormRow label="控制方式" required>
                <RadioGroup
                  name="resultControlMethod"
                  value={controlMethod}
                  onChange={setControlMethod}
                  options={[
                    { label: "仅提醒", value: "warn" },
                    { label: "阻止提交", value: "block" },
                  ]}
                />
              </FormRow>
            </div>
          </div>

          {/* 强制分布规则 */}
          <div>
            <div className="flex items-center gap-2 mb-[24px]">
              <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
              <h2 className="text-[16px] font-medium text-[#1F2937]">
                强制分布规则
              </h2>
            </div>

            <div className="flex flex-col gap-[20px] pl-[12px]">
              {forcedDist === "all" && (
                <>
                  <FormRow label="引用强制分布规则" required>
                    <div className="flex items-center flex-wrap gap-3 w-full">
                      <CustomSelect
                        options={forcedRuleOptions || []}
                        value={localForcedRule}
                        onChange={setLocalForcedRule}
                        placeholder="请选择"
                        onCreate={onCreateRule}
                        createLabel="+ 新建强制分布规则"
                      />
                      <p className="w-full text-[12px] text-[#9CA3AF] leading-relaxed mt-1">
                        仅可选取按分数区间生成与等级规则匹配的强制分布规则名称
                      </p>
                    </div>
                  </FormRow>

                  <FormRow label="启用人数" required>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={10}
                        disabled={true}
                        className="w-[120px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none disabled:bg-[#F3F4F6] disabled:text-[#6B7280] cursor-not-allowed"
                      />
                      <div className="relative group flex items-center">
                        <HelpCircle
                          size={14}
                          className="text-[#6B7280] cursor-help"
                        />
                        <div className="absolute left-[100%] ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-[#1F2937] text-white text-[12px] px-2 py-1 rounded w-max z-10 shadow-lg">
                          当待审核人员≥启用人数时，该强制分布规则生效；否则不生效
                          <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-[#1F2937]"></div>
                        </div>
                      </div>
                    </div>
                  </FormRow>
                </>
              )}

              {forcedDist === "all" && (
                <>
                  <FormRow label="控制规则" required>
                    <select
                      value={controlRule}
                      onChange={(e) => setControlRule(e.target.value)}
                      className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                    >
                      <option value="ratio">按等级分布比例</option>
                      <option value="number">按等级分布人数</option>
                    </select>
                  </FormRow>

                  {controlRule === "ratio" && (
                    <>
                      <FormRow label="余数处理" required>
                        <CustomSelect
                          options={[
                            { value: "next", label: "迁移到下一等级" },
                            { value: "specific", label: "迁移到指定等级" },
                          ]}
                          value={remainderRule}
                          onChange={setRemainderRule}
                          placeholder="请选择"
                        />
                      </FormRow>
                      {remainderRule === "specific" && (
                        <FormRow label="指定等级" required>
                          <select
                            value={remainderSpecificLevel}
                            onChange={(e) =>
                              setRemainderSpecificLevel(e.target.value)
                            }
                            className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                          >
                            {ALL_LEVELS.slice(0, 5).map((l) => (
                              <option key={l} value={l}>
                                {l}
                              </option>
                            ))}
                          </select>
                        </FormRow>
                      )}
                    </>
                  )}
                </>
              )}

              {forcedDist === "all" ? (
                <div className="mt-[16px]">
                  <DistributionTable
                    mode="edit"
                    ruleName={selectedRuleName}
                    levelRule={levelRuleType}
                    showExpectedNumber={true}
                    totalParticipants={17}
                  />
                </div>
              ) : (
                <div className="mt-[16px] flex border border-[#E5E7EB] h-[500px]">
                  <div className="w-[200px] border-r border-[#E5E7EB] bg-[#F9FAFB] flex flex-col">
                    <div className="h-[40px] px-4 flex items-center border-b border-[#E5E7EB] font-bold text-[14px]">
                      绩效组
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {["Yara的测试公司", "鸭鸭部", "鸭鸭分部"].map((group) => (
                        <div
                          key={group}
                          onClick={() => setActiveGroup(group)}
                          className={`h-[40px] px-4 flex items-center justify-between text-[14px] cursor-pointer ${activeGroup === group ? "bg-[#E6F7F5] text-[#15B8A6]" : "hover:bg-white"} border-b border-[#E5E7EB]`}
                        >
                          {group}
                          <span className="text-[#9CA3AF]">...</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 p-[24px] overflow-y-auto bg-white flex flex-col gap-[20px]">
                    <FormRow label="引用强制分布规则" required>
                      <div className="flex items-center flex-wrap gap-3 w-full">
                        <CustomSelect
                          options={forcedRuleOptions || []}
                          value={localForcedRule}
                          onChange={setLocalForcedRule}
                          placeholder="请选择"
                          onCreate={onCreateRule}
                          createLabel="+ 新建强制分布规则"
                        />
                        <p className="w-full text-[12px] text-[#9CA3AF] leading-relaxed mt-1">
                          仅可选取按分数区间生成与等级规则匹配的强制分布规则名称
                        </p>
                      </div>
                    </FormRow>

                    <FormRow label="启用人数" required>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={10}
                          disabled={true}
                          className="w-[120px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none disabled:bg-[#F3F4F6] disabled:text-[#6B7280] cursor-not-allowed"
                        />
                        <div className="relative group flex items-center">
                          <HelpCircle
                            size={14}
                            className="text-[#6B7280] cursor-help"
                          />
                          <div className="absolute left-[100%] ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-[#1F2937] text-white text-[12px] px-2 py-1 rounded w-max z-10 shadow-lg">
                            当待审核人员≥启用人数时，该强制分布规则生效；否则不生效
                            <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-[#1F2937]"></div>
                          </div>
                        </div>
                      </div>
                    </FormRow>

                    <FormRow label="控制规则" required>
                      <select
                        value={controlRule}
                        onChange={(e) => setControlRule(e.target.value)}
                        className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                      >
                        <option value="ratio">按等级分布比例</option>
                        <option value="number">按等级分布人数</option>
                      </select>
                    </FormRow>

                    {controlRule === "ratio" && (
                      <>
                        <FormRow label="余数处理" required>
                          <CustomSelect
                            options={[
                              { value: "next", label: "迁移到下一等级" },
                              { value: "specific", label: "迁移到指定等级" },
                            ]}
                            value={remainderRule}
                            onChange={setRemainderRule}
                            placeholder="请选择"
                          />
                        </FormRow>
                        {remainderRule === "specific" && (
                          <FormRow label="指定等级" required>
                            <select
                              value={remainderSpecificLevel}
                              onChange={(e) =>
                                setRemainderSpecificLevel(e.target.value)
                              }
                              className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                            >
                              {ALL_LEVELS.slice(0, 5).map((l) => (
                                <option key={l} value={l}>
                                  {l}
                                </option>
                              ))}
                            </select>
                          </FormRow>
                        )}
                      </>
                    )}

                    <div className="mt-4">
                      <DistributionTable
                        mode={readonly ? "view" : "edit"}
                        ruleName={selectedRuleName}
                        levelRule={levelRuleType}
                        showExpectedNumber={true}
                        totalParticipants={
                          activeGroup === "Yara的测试公司"
                            ? 10
                            : activeGroup === "鸭鸭部"
                              ? 4
                              : 3
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showCustomGroupModal && (
        <CustomGroupModal
          onClose={() => setShowCustomGroupModal(false)}
          onSave={() => {
            setShowCustomGroupModal(false);
          }}
        />
      )}
    </div>
  );
}

// --- 考核方案页 ---
function AssessmentScheme({
  setCurrentView,
  newlyCreatedRule,
  rulesList,
  setRulesList,
}: {
  setCurrentView: (view: string) => void;
  newlyCreatedRule?: string;
  rulesList: any[];
  setRulesList: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [levelRuleOptionsMain, setLevelRuleOptionsMain] = React.useState([
    { value: "1", label: "4个等级 (S,A,B,C)", levels: ["S", "A", "B", "C"] },
    { value: "2", label: "3个等级 (A,B,C)", levels: ["A", "B", "C"] },
  ]);
  const [showCreateLevelRuleMainModal, setShowCreateLevelRuleMainModal] = React.useState(false);
  const [showCreateForcedRuleMainModal, setShowCreateForcedRuleMainModal] = React.useState(false);

  const [currentStep, setCurrentStep] = React.useState(4); // 3: 考核流程确认, 4: 考核结果设置
  const [assessmentMethod, setAssessmentMethod] = React.useState("score"); // 'score' | 'rating'
  const [resultFormats, setResultFormats] = React.useState(["score"]); // ['score', 'level']
  const [isLevelRuleEnabled, setIsLevelRuleEnabled] = React.useState(false);
  const [isForcedDistEnabled, setIsForcedDistEnabled] = React.useState(false);
  const [scoreMatchMethod, setScoreMatchMethod] = React.useState("range");
  const [levelRankScope, setLevelRankScope] = React.useState("");
  const [showScopeModalForMain, setShowScopeModalForMain] =
    React.useState(false);
  const [showCustomGroupModalForMain, setShowCustomGroupModalForMain] =
    React.useState(false);
  const [controlMethod, setControlMethod] = React.useState("alert_only");
  const [forcedDistSettings, setForcedDistSettings] = React.useState([
    {
      id: "hr",
      name: "HR调整",
      enabled: false,
      controlMethod: "alert_only",
      scope: "all",
      deptLevel: "last",
      rule: "",
      isGroupConfig: false,
      groupRules: {},
    },
    {
      id: "dept_leader",
      name: "部门领导审核",
      enabled: false,
      controlMethod: "alert_only",
      scope: "all",
      deptLevel: "last",
      rule: "",
      isGroupConfig: false,
      groupRules: {},
    },
    {
      id: "big_leader",
      name: "大领导审核",
      enabled: false,
      controlMethod: "alert_only",
      scope: "all",
      deptLevel: "last",
      rule: "",
      isGroupConfig: false,
      groupRules: {},
    },
    {
      id: "exec_leader",
      name: "高管审核",
      enabled: false,
      controlMethod: "alert_only",
      scope: "all",
      deptLevel: "last",
      rule: "",
      isGroupConfig: false,
      groupRules: {},
    },
  ]);
  const [distMode, setDistMode] = React.useState("single");
  const [executeNodes, setExecuteNodes] = React.useState<string[]>([
    "dept_leader",
  ]);

  const updateForcedDistSetting = (id: string, field: string, value: any) => {
    setForcedDistSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };
  const [forcedDistScope, setForcedDistScope] = React.useState("all");
  const [deptLevel, setDeptLevel] = React.useState("last");
  const [electronicSign, setElectronicSign] = React.useState(false);
  const [archiveRule, setArchiveRule] = React.useState("default");
  const [selectedForcedRule, setSelectedForcedRule] = React.useState("");
  const [selectedLevelRule, setSelectedLevelRule] = React.useState("");
  const [activeGroupConfigNode, setActiveGroupConfigNode] = React.useState<
    string | null
  >(null);

  const filteredForcedRules = React.useMemo(() => {
    return rulesList
      .filter((r) => {
        if (!selectedLevelRule) return true;
        if (
          selectedLevelRule === "1" &&
          (r.levelRule.includes("4") || r.levelRule.includes("SABCD"))
        )
          return true;
        if (selectedLevelRule === "2" && r.levelRule.includes("3")) return true;
        return true; // default to show all if not strictly matched
      })
      .map((r) => ({ value: r.name, label: r.name }));
  }, [rulesList, selectedLevelRule]);
  const [calcRule, setCalcRule] = React.useState("project");
  const [precision, setPrecision] = React.useState("1");
  const [roundRule, setRoundRule] = React.useState("round");
  const [applyToTotal, setApplyToTotal] = React.useState(false);
  const [applyToProject, setApplyToProject] = React.useState(true);

  const [showResultSetting, setShowResultSetting] = React.useState(false);
  const [isConfigured, setIsConfigured] = React.useState(false);

  React.useEffect(() => {
    if (newlyCreatedRule) {
      setSelectedForcedRule(newlyCreatedRule);
    }
  }, [newlyCreatedRule]);

  const handleForcedRuleChange = (value: string) => {
    setSelectedForcedRule(value);
    setIsConfigured(false);
  };

  const forcedRuleOptions = rulesList
    .filter((r) => r.status === "enabled")
    .map((r) => ({ value: String(r.id), label: r.name }));

  if (
    newlyCreatedRule &&
    !forcedRuleOptions.find((o) => o.value === newlyCreatedRule)
  ) {
    const createdRule = rulesList.find(
      (r) => String(r.id) === newlyCreatedRule,
    );
    if (createdRule) {
      forcedRuleOptions.push({
        value: newlyCreatedRule,
        label: createdRule.name,
      });
    } else {
      forcedRuleOptions.push({
        value: newlyCreatedRule,
        label: "新建的强制分布规则",
      });
    }
  }

  return (
    <>
      {/* 面包屑 */}
      <div className="flex items-center text-[12px] text-[#6B7280] mb-[16px]">
        <span className="cursor-pointer hover:text-[#15B8A6]">智慧绩效</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="cursor-pointer hover:text-[#15B8A6]">考核管理</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="cursor-pointer hover:text-[#15B8A6]">员工考核</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="cursor-pointer hover:text-[#15B8A6]">考核方案</span>
        <ChevronRight size={14} className="mx-1" />
        <span className="text-[#1F2937]">编辑</span>
      </div>

      {/* 白色内容卡片 */}
      <div className="bg-[#FFFFFF] rounded-[8px] p-[16px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex-1 flex flex-col">
        {/* 标题区 */}
        <div className="mb-[24px]">
          <h1 className="text-[16px] font-medium text-[#1F2937]">方案设置</h1>
        </div>

        {/* 步骤条 */}
        <div className="flex items-center justify-between mb-[32px] px-[40px]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-[#15B8A6] text-[#15B8A6] flex items-center justify-center text-[12px]">
              ✓
            </div>
            <span className="text-[14px] text-[#1F2937]">基本信息</span>
          </div>
          <div className="flex-1 h-[1px] bg-[#15B8A6] mx-4"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-[#15B8A6] text-[#15B8A6] flex items-center justify-center text-[12px]">
              ✓
            </div>
            <span className="text-[14px] text-[#1F2937]">范围设置</span>
          </div>
          <div className="flex-1 h-[1px] bg-[#15B8A6] mx-4"></div>
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] ${currentStep === 3 ? "bg-[#15B8A6] text-white" : currentStep > 3 ? "border border-[#15B8A6] text-[#15B8A6]" : "bg-[#E5E7EB] text-[#6B7280]"}`}
            >
              {currentStep > 3 ? "✓" : "3"}
            </div>
            <span
              className={`text-[14px] ${currentStep >= 3 ? "text-[#1F2937] font-medium" : "text-[#6B7280]"}`}
            >
              考核流程确认
            </span>
          </div>
          <div
            className="flex-1 h-[1px] mx-4"
            style={{ backgroundColor: currentStep > 3 ? "#15B8A6" : "#E5E7EB" }}
          ></div>
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] ${currentStep === 4 ? "bg-[#15B8A6] text-white" : "bg-[#E5E7EB] text-[#6B7280]"}`}
            >
              4
            </div>
            <span
              className={`text-[14px] ${currentStep === 4 ? "text-[#1F2937] font-medium" : "text-[#6B7280]"}`}
            >
              考核结果设置
            </span>
          </div>
        </div>

        {/* 表单内容区 */}
        <div className="flex-1 overflow-y-auto pr-2">
          {currentStep === 3 && (
            <div className="mb-[32px]">
              <div className="flex items-center gap-2 mb-[16px]">
                <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
                <h2 className="text-[16px] font-medium text-[#1F2937]">
                  流程设置
                </h2>
              </div>
              <div className="flex flex-col gap-[24px] pl-[12px]">
                <div className="flex items-start">
                  <div className="w-[180px] pt-[2px] flex justify-end pr-[16px] shrink-0">
                    <span className="text-[14px] text-[#4B5563]">
                      审批节点操作人重复时 :
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="approvalRepeat"
                        defaultChecked
                        className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                      />
                      <span className="text-[14px] text-[#4B5563]">不跳过</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="approvalRepeat"
                        className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                      />
                      <span className="text-[14px] text-[#4B5563]">
                        第一个节点操作，其余节点跳过，同步操作结果
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-[180px] pt-[2px] flex justify-end pr-[16px] shrink-0">
                    <span className="text-[14px] text-[#4B5563]">
                      评估节点操作人重复时 :
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="evalRepeat"
                        defaultChecked
                        className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                      />
                      <span className="text-[14px] text-[#4B5563]">不跳过</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="evalRepeat"
                        className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                      />
                      <span className="text-[14px] text-[#4B5563]">
                        第一个节点操作，其余节点跳过，同步操作结果
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-[180px] pt-[2px] flex justify-end pr-[16px] shrink-0">
                    <span className="text-[14px] text-[#4B5563]">
                      结果审核节点操作人重复时 :
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="auditRepeat"
                        defaultChecked
                        className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                      />
                      <span className="text-[14px] text-[#4B5563]">不跳过</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="auditRepeat"
                        className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                      />
                      <span className="text-[14px] text-[#4B5563]">
                        第一个节点操作，其余节点跳过，同步操作结果
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <>
              {/* 考核结果设置 (New) */}
              <div className="mb-[32px] w-full">
                {/* 考核得分计算规则 */}
                <div className="mb-[32px]">
                  <div className="flex items-center gap-2 mb-[24px]">
                    <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
                    <h2 className="text-[16px] font-medium text-[#1F2937]">
                      考核得分计算规则
                    </h2>
                  </div>
                  <div className="flex flex-col gap-[20px] pl-[12px]">
                    <div className="flex items-center">
                      <div className="w-[160px] flex justify-end pr-[16px] shrink-0">
                        <span className="text-[#FF4D4F] mr-1">*</span>
                        <span className="text-[14px] text-[#4B5563]">
                          考核结果精确位数 :
                        </span>
                      </div>
                      <div className="w-[320px]">
                        <input
                          type="number"
                          value={precision}
                          onChange={(e) => setPrecision(e.target.value)}
                          className="w-full h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                        />
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-[160px] pt-[8px] flex justify-end pr-[16px] shrink-0">
                        <span className="text-[#FF4D4F] mr-1">*</span>
                        <span className="text-[14px] text-[#4B5563]">
                          进位规则 :
                        </span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <select
                          value={roundRule}
                          onChange={(e) => setRoundRule(e.target.value)}
                          className="w-[320px] h-[32px] px-[12px] border border-[#E5E7EB] bg-white rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                        >
                          <option value="round">四舍五入</option>
                          <option value="ceil">向上取整</option>
                          <option value="floor">向下取整</option>
                        </select>

                        <div className="flex items-center gap-4 text-[14px] text-[#6B7280]">
                          <span>进位规则应用于 :</span>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={applyToTotal}
                              onChange={(e) =>
                                setApplyToTotal(e.target.checked)
                              }
                              className="w-[14px] h-[14px] text-[#15B8A6] rounded border-[#E5E7EB] focus:ring-[#15B8A6]"
                            />
                            <span
                              className={
                                applyToTotal
                                  ? "text-[#15B8A6]"
                                  : "text-[#6B7280]"
                              }
                            >
                              考核总分
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={applyToProject}
                              onChange={(e) =>
                                setApplyToProject(e.target.checked)
                              }
                              className="w-[14px] h-[14px] text-[#15B8A6] rounded border-[#E5E7EB] focus:ring-[#15B8A6]"
                            />
                            <span
                              className={
                                applyToProject
                                  ? "text-[#15B8A6]"
                                  : "text-[#6B7280]"
                              }
                            >
                              项目得分
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 考核等级配置 */}
                <div className="mb-[32px]">
                  <div className="flex items-center gap-4 mb-[24px]">
                    <div className="flex items-center gap-2">
                      <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
                      <h2 className="text-[16px] font-medium text-[#1F2937]">
                        考核等级配置
                      </h2>
                    </div>
                    {/* Switch */}
                    <div className="flex items-center gap-2">
                      <button
                        className={`w-10 h-5 rounded-full relative transition-colors ${isLevelRuleEnabled ? "bg-[#15B8A6]" : "bg-[#E5E7EB]"}`}
                        onClick={() =>
                          setIsLevelRuleEnabled(!isLevelRuleEnabled)
                        }
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-transform ${isLevelRuleEnabled ? "translate-x-[22px]" : "translate-x-[2px]"}`}
                        ></div>
                      </button>
                      <span className="text-[14px] text-[#6B7280]">
                        开启后可配置考核得分自动换算等级
                      </span>
                    </div>
                  </div>

                  {isLevelRuleEnabled && (
                    <div className="flex flex-col gap-[20px] pl-[12px]">
                      <div className="flex items-center">
                        <div className="w-[160px] flex justify-end pr-[16px] shrink-0">
                          <span className="text-[14px] text-[#4B5563]">
                            等级生成规则 :
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              checked={scoreMatchMethod === "range"}
                              onChange={() => setScoreMatchMethod("range")}
                              className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                            />
                            <span className="text-[14px] text-[#1F2937]">
                              按分数范围
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              checked={scoreMatchMethod === "rank"}
                              onChange={() => setScoreMatchMethod("rank")}
                              className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                            />
                            <span className="text-[14px] text-[#1F2937]">
                              按分数排名
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="w-[160px] flex justify-end pr-[16px] shrink-0">
                          <span className="text-[#FF4D4F] mr-1">*</span>
                          <span className="text-[14px] text-[#4B5563]">
                            使用的等级规则 :
                          </span>
                        </div>
                        <div className="w-[320px]">
                          <CustomSelect
                            options={levelRuleOptionsMain}
                            value={selectedLevelRule}
                            onChange={setSelectedLevelRule}
                            placeholder="请选择等级规则"
                            onCreate={() => setShowCreateLevelRuleMainModal(true)}
                            createLabel="+ 快捷创建等级规则"
                          />
                        </div>
                      </div>

                      {scoreMatchMethod === "rank" && (
                        <div className="flex items-center mb-[24px]">
                          <div className="w-[160px] flex items-center justify-end pr-[16px] shrink-0 pt-[8px]">
                            <span className="text-red-500 mr-1">*</span>
                            <span className="text-[14px] text-[#4B5563]">
                              等级排名生成范围 :
                            </span>
                            <div className="group relative ml-1 flex items-center">
                              <Info
                                size={14}
                                className="text-[#15B8A6] cursor-help"
                              />
                              <RankScopeTooltip />
                            </div>
                          </div>
                          <div className="flex items-start gap-2 pt-[8px]">
                            <select
                              value={levelRankScope}
                              onChange={(e) =>
                                setLevelRankScope(e.target.value)
                              }
                              className="w-[160px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                            >
                              <option value="all">全员</option>
                              <option value="dept">部门</option>
                              <option value="eval_group">考核组</option>
                              <option value="custom">自定义分组</option>
                            </select>
                            {levelRankScope === "dept" && (
                              <div className="flex flex-col gap-1">
                                <select
                                  className="w-[160px] h-[32px] px-[12px] border border-[#E5E7EB] rounded-[4px] text-[14px] focus:outline-none focus:border-[#15B8A6]"
                                  defaultValue="default"
                                >
                                  <option
                                    value="default"
                                    disabled
                                    className="hidden"
                                  >
                                    请选择部门层级
                                  </option>
                                  <option value="1">第一级</option>
                                  <option value="2">第二级</option>
                                  <option value="3">第三级</option>
                                </select>
                                <span className="text-[12px] text-[#9CA3AF]">
                                  自下往上（员工所在部门设为第一级）
                                </span>
                              </div>
                            )}
                            {levelRankScope === "custom" && (
                              <span
                                className="text-[#15B8A6] text-[14px] cursor-pointer hover:opacity-80 pt-[6px]"
                                onClick={() =>
                                  setShowCustomGroupModalForMain(true)
                                }
                              >
                                配置自定义分组
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-start">
                        <div className="w-[160px] flex justify-end pr-[16px] shrink-0 pt-[2px]">
                          <span className="text-[14px] text-[#4B5563]">
                            强制分布 :
                          </span>
                        </div>
                        <div className="flex flex-col gap-4">
                          <button
                            className={`w-10 h-5 rounded-full relative transition-colors ${isForcedDistEnabled ? "bg-[#15B8A6]" : "bg-[#E5E7EB]"}`}
                            onClick={() =>
                              setIsForcedDistEnabled(!isForcedDistEnabled)
                            }
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-transform ${isForcedDistEnabled ? "translate-x-[22px]" : "translate-x-[2px]"}`}
                            ></div>
                          </button>

                          {isForcedDistEnabled && (
                            <div className="bg-[#white] border border-[#E5E7EB] rounded-[4px] w-full overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                                    <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                                      执行控制的节点
                                    </th>
                                    <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                                      是否执行强控
                                    </th>
                                    <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                                      控制方式
                                    </th>
                                    <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                                      控制范围
                                    </th>
                                    <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                                      强制分布规则
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {forcedDistSettings.map((setting, index) => {
                                    const isRealAuditNode = setting.id !== "hr";
                                    const hasPrecedingAll =
                                      isRealAuditNode &&
                                      forcedDistSettings
                                        .slice(0, index)
                                        .some(
                                          (s) =>
                                            s.id !== "hr" &&
                                            s.enabled &&
                                            s.scope === "all",
                                        );

                                    return (
                                      <tr
                                        key={setting.id}
                                        className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]/50 last:border-b-0"
                                      >
                                        <td className="py-[16px] px-[16px] text-[13px] text-[#1F2937]">
                                          {setting.name}
                                        </td>
                                        <td className="py-[16px] px-[16px]">
                                          <button
                                            className={`w-10 h-5 rounded-full relative transition-colors ${setting.enabled ? "bg-[#15B8A6]" : "bg-[#E5E7EB]"}`}
                                            onClick={() =>
                                              updateForcedDistSetting(
                                                setting.id,
                                                "enabled",
                                                !setting.enabled,
                                              )
                                            }
                                          >
                                            <div
                                              className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-transform ${setting.enabled ? "translate-x-[22px]" : "translate-x-[2px]"}`}
                                            ></div>
                                          </button>
                                        </td>
                                        <td className="py-[16px] px-[16px]">
                                          {setting.enabled && (
                                            <select
                                              className="h-[32px] px-2 border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#1F2937] focus:outline-none focus:border-[#15B8A6] bg-white w-full max-w-[120px]"
                                              value={setting.controlMethod}
                                              onChange={(e) =>
                                                updateForcedDistSetting(
                                                  setting.id,
                                                  "controlMethod",
                                                  e.target.value,
                                                )
                                              }
                                            >
                                              <option value="alert_only">
                                                仅提醒
                                              </option>
                                              <option value="block_submit">
                                                阻止提交
                                              </option>
                                            </select>
                                          )}
                                        </td>
                                        <td className="py-[16px] px-[16px]">
                                          {setting.enabled && (
                                            <div className="flex gap-2">
                                              <select
                                                className="h-[32px] px-2 border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#1F2937] focus:outline-none focus:border-[#15B8A6] bg-white w-full max-w-[120px]"
                                                value={setting.scope}
                                                onChange={(e) => {
                                                  const newValue =
                                                    e.target.value;
                                                  if (
                                                    newValue === "all" &&
                                                    isRealAuditNode
                                                  ) {
                                                    const newSettings = [
                                                      ...forcedDistSettings,
                                                    ];
                                                    newSettings[index] = {
                                                      ...newSettings[index],
                                                      scope: "all",
                                                    };
                                                    for (
                                                      let i = index + 1;
                                                      i < newSettings.length;
                                                      i++
                                                    ) {
                                                      if (
                                                        newSettings[i].id !==
                                                          "hr" &&
                                                        (newSettings[i]
                                                          .scope === "group" ||
                                                          newSettings[i]
                                                            .scope === "custom")
                                                      ) {
                                                        newSettings[i] = {
                                                          ...newSettings[i],
                                                          scope: "all",
                                                        };
                                                      }
                                                    }
                                                    setForcedDistSettings(
                                                      newSettings,
                                                    );
                                                  } else {
                                                    updateForcedDistSetting(
                                                      setting.id,
                                                      "scope",
                                                      newValue,
                                                    );
                                                  }
                                                }}
                                              >
                                                <option value="all">
                                                  全员
                                                </option>
                                                <option value="dept">
                                                  按部门
                                                </option>
                                                <option
                                                  value="group"
                                                  disabled={hasPrecedingAll}
                                                >
                                                  按考核组
                                                </option>
                                                <option
                                                  value="custom"
                                                  disabled={hasPrecedingAll}
                                                >
                                                  自定义分组
                                                </option>
                                              </select>
                                              {setting.scope === "dept" && (
                                                <div className="flex flex-col gap-1">
                                                  <select
                                                    className="h-[32px] px-2 border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#1F2937] focus:outline-none focus:border-[#15B8A6] bg-white w-[100px]"
                                                    value={setting.deptLevel}
                                                    onChange={(e) =>
                                                      updateForcedDistSetting(
                                                        setting.id,
                                                        "deptLevel",
                                                        e.target.value,
                                                      )
                                                    }
                                                  >
                                                    <option value="last">
                                                      末级部门
                                                    </option>
                                                    <option value="1">
                                                      第一级
                                                    </option>
                                                    <option value="2">
                                                      第二级
                                                    </option>
                                                    <option value="3">
                                                      第三级
                                                    </option>
                                                  </select>
                                                  <span className="text-[11px] text-[#9CA3AF] leading-tight whitespace-nowrap">
                                                    自下往上（员工所在部门设为第一级）
                                                  </span>
                                                </div>
                                              )}
                                              {setting.scope === "custom" && (
                                                <span
                                                  className="text-[#15B8A6] text-[13px] cursor-pointer hover:opacity-80 pt-[6px] whitespace-nowrap self-center ml-1"
                                                  onClick={() =>
                                                    setShowCustomGroupModalForMain(true)
                                                  }
                                                >
                                                  配置自定义分组
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </td>
                                        <td className="py-[16px] px-[16px]">
                                          {setting.enabled && (
                                            <div className="flex items-center gap-2 w-full">
                                              <CustomSelect
                                                options={filteredForcedRules}
                                                value={setting.rule}
                                                onChange={(val) => {
                                                  updateForcedDistSetting(
                                                    setting.id,
                                                    "rule",
                                                    val,
                                                  );
                                                  updateForcedDistSetting(
                                                    setting.id,
                                                    "hasModifiedGroups",
                                                    false,
                                                  );
                                                  updateForcedDistSetting(
                                                    setting.id,
                                                    "groupRules",
                                                    {},
                                                  );
                                                }}
                                                placeholder="请选择"
                                                className="flex-1 min-w-[120px]"
                                                onCreate={() => setShowCreateForcedRuleMainModal(true)}
                                                createLabel="+ 快捷创建强制分布规则"
                                              />
                                              {setting.scope !== "all" && (
                                                <div className="flex items-center gap-2">
                                                  {setting.hasModifiedGroups && (
                                                    <span className="text-[11px] text-[#FAAD14] bg-[#FFFBE6] border border-[#FFE58F] px-[4px] py-[2px] rounded whitespace-nowrap">
                                                      已修改
                                                    </span>
                                                  )}
                                                  <button
                                                    onClick={() =>
                                                      setActiveGroupConfigNode(
                                                        setting.id,
                                                      )
                                                    }
                                                    className="text-[#15B8A6] hover:text-[#0F9688] text-[13px] whitespace-nowrap shrink-0 flex items-center gap-1"
                                                  >
                                                    <Settings size={14} />{" "}
                                                    高级配置
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 电子签设置 */}
              <div className="mb-[32px]">
                <div className="flex items-center gap-2 mb-[16px]">
                  <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
                  <h2 className="text-[16px] font-medium text-[#1F2937]">
                    电子签设置
                  </h2>
                </div>
                <div className="flex flex-col gap-[20px] pl-[12px]">
                  <div className="flex items-center">
                    <div className="w-[180px] flex justify-end pr-[16px] shrink-0">
                      <span className="text-[14px] text-[#4B5563]">
                        考核结果电子确认 :
                      </span>
                    </div>
                    <div className="flex-1">
                      <div
                        className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${electronicSign ? "bg-[#15B8A6]" : "bg-[#E5E7EB]"}`}
                        onClick={() => setElectronicSign(!electronicSign)}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform ${electronicSign ? "left-[22px]" : "left-0.5"}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 归档设置 */}
              <div className="mb-[32px]">
                <div className="flex items-center gap-2 mb-[16px]">
                  <div className="w-[4px] h-[16px] bg-[#15B8A6] rounded-[2px]"></div>
                  <h2 className="text-[16px] font-medium text-[#1F2937]">
                    归档设置
                  </h2>
                </div>
                <div className="flex flex-col gap-[20px] pl-[12px]">
                  <div className="flex items-start">
                    <div className="w-[180px] pt-[2px] flex justify-end pr-[16px] shrink-0">
                      <span className="text-[14px] text-[#4B5563]">
                        结果查看设置 :
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={archiveRule === "default"}
                          onChange={() => setArchiveRule("default")}
                          className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                        />
                        <span className="text-[14px] text-[#4B5563]">
                          默认设置
                        </span>
                        <HelpCircle
                          size={14}
                          className="text-[#9CA3AF] cursor-help"
                        />
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={archiveRule === "archived"}
                          onChange={() => setArchiveRule("archived")}
                          className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6]"
                        />
                        <span className="text-[14px] text-[#4B5563]">
                          归档后可查看绩效结果
                        </span>
                        <HelpCircle
                          size={14}
                          className="text-[#9CA3AF] cursor-help"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 底部操作区 */}
        <div className="pt-[16px] border-t border-[#E5E7EB] flex justify-end gap-3 mt-auto">
          <button className="px-[16px] h-[32px] border border-[#E5E7EB] text-[#4B5563] rounded-[4px] text-[14px] hover:bg-[#F9FAFB] transition-colors">
            取消
          </button>

          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className="px-[16px] h-[32px] border border-[#15B8A6] text-[#15B8A6] rounded-[4px] text-[14px] hover:bg-[#F0FDF4] transition-colors"
          >
            上一步
          </button>

          {currentStep === 4 ? (
            <button
              onClick={() =>
                alert(
                  "保存成功！\n\n提示：对未开启的任务已生效配置，对已开启的任务需要手动去进行中的任务调整考核结果设置。",
                )
              }
              className="px-[16px] h-[32px] bg-[#15B8A6] text-white rounded-[4px] text-[14px] hover:bg-[#15B8A6]/90 transition-colors"
            >
              保存
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-[16px] h-[32px] bg-[#15B8A6] text-white rounded-[4px] text-[14px] hover:bg-[#15B8A6]/90 transition-colors"
            >
              下一步
            </button>
          )}
        </div>
      </div>

      {showResultSetting && (
        <AssessmentResultSetting
          selectedForcedRule={selectedForcedRule}
          forcedRuleOptions={forcedRuleOptions}
          onBack={() => setShowResultSetting(false)}
          onSave={(rule: string) => {
            setSelectedForcedRule(rule);
            setIsConfigured(true);
            setShowResultSetting(false);
          }}
          onCreateRule={() => setShowCreateForcedRuleMainModal(true)}
        />
      )}

      {activeGroupConfigNode && (
        <GroupConfigModal
          nodeName={
            forcedDistSettings.find((n) => n.id === activeGroupConfigNode)
              ?.name || ""
          }
          rulesList={filteredForcedRules}
          initialData={
            forcedDistSettings.find((n) => n.id === activeGroupConfigNode) ||
            ({} as any)
          }
          onClose={() => setActiveGroupConfigNode(null)}
          onCreateRule={() => setShowCreateForcedRuleMainModal(true)}
          onSave={(data) => {
            updateForcedDistSetting(
              activeGroupConfigNode,
              "hasModifiedGroups",
              data.hasModifiedGroups,
            );
            updateForcedDistSetting(
              activeGroupConfigNode,
              "groupRules",
              data.groupRules,
            );
            updateForcedDistSetting(activeGroupConfigNode, "rule", data.rule);
            setActiveGroupConfigNode(null);
          }}
        />
      )}

      {showScopeModalForMain && (
        <ScopeConfigModal
          onClose={() => setShowScopeModalForMain(false)}
          onSave={() => {
            setLevelRankScope("custom");
            setShowScopeModalForMain(false);
          }}
        />
      )}

      {showCustomGroupModalForMain && (
        <CustomGroupModal
          onClose={() => setShowCustomGroupModalForMain(false)}
          onSave={() => {
            setShowCustomGroupModalForMain(false);
          }}
        />
      )}

      {showCreateLevelRuleMainModal && (
        <QuickCreateLevelRuleModal
          onClose={() => setShowCreateLevelRuleMainModal(false)}
          onSave={(ruleName, levels) => {
            const nextVal = String(levelRuleOptionsMain.length + 1);
            const opt = {
              value: nextVal,
              label: `${levels.length}个等级 (${levels.map((l: any) => l.name).join(",")}) [${ruleName}]`,
              levels: levels.map((l: any) => l.name),
            };
            setLevelRuleOptionsMain([...levelRuleOptionsMain, opt]);
            setSelectedLevelRule(nextVal);
            setShowCreateLevelRuleMainModal(false);
          }}
        />
      )}

      {showCreateForcedRuleMainModal && (
        <QuickCreateForcedRuleModal
          onClose={() => setShowCreateForcedRuleMainModal(false)}
          levelRules={levelRuleOptionsMain}
          onSave={(ruleName, levelRuleName, ratios) => {
            const newOptionVal = `rule_${Date.now()}`;
            const ratioStr = Object.entries(ratios)
              .map(([k, v]) => `${k}:${v}%`)
              .join("-");
            const newRuleObj = {
              value: newOptionVal,
              label: `${ruleName} (${ratioStr})`,
              levelRule: levelRuleName,
            };
            setRulesList((prev: any[]) => [...prev, newRuleObj]);
            setSelectedForcedRule(newOptionVal);
            setShowCreateForcedRuleMainModal(false);
          }}
        />
      )}
    </>
  );
}

function GroupConfigModal({
  nodeName,
  onClose,
  onSave,
  rulesList,
  initialData,
  onCreateRule,
}: {
  nodeName: string;
  onClose: () => void;
  onSave: (data: {
    hasModifiedGroups: boolean;
    groupRules: Record<string, string>;
    rule: string;
  }) => void;
  rulesList: any[];
  initialData: {
    hasModifiedGroups?: boolean;
    groupRules: Record<string, string>;
    rule: string;
    scope?: string;
  };
  onCreateRule: () => void;
}) {
  const outerRule = initialData.rule || "";
  const scope = initialData.scope || "group";

  const [items, setItems] = React.useState<any[]>(() => {
    if (scope === "dept") {
      return [
        {
          id: "1",
          name: "研发部",
          count: 15,
          rule: initialData.groupRules?.["研发部"] || outerRule,
        },
        {
          id: "2",
          name: "产品部",
          count: 8,
          rule: initialData.groupRules?.["产品部"] || outerRule,
        },
        {
          id: "3",
          name: "设计部",
          count: 5,
          rule: initialData.groupRules?.["设计部"] || outerRule,
        },
      ];
    } else if (scope === "custom") {
      const existing = Object.keys(initialData.groupRules || {}).filter(
        (k) => k !== "产品业务组" && k !== "技术支撑组" && k !== "职能后端组",
      );
      if (existing.length > 0) {
        return existing.map((k, idx) => ({
          id: `custom_${Date.now()}_${idx}`,
          name: k,
          count: "已选 2 人",
          rule: initialData.groupRules[k],
        }));
      }
      return [
        {
          id: `custom_1`,
          name: "特别考核组",
          count: "已选 3 人",
          rule: outerRule,
        },
      ];
    } else {
      return [
        {
          id: "1",
          name: "产品业务组",
          count: 10,
          rule: initialData.groupRules?.["产品业务组"] || outerRule,
        },
        {
          id: "2",
          name: "技术支撑组",
          count: 12,
          rule: initialData.groupRules?.["技术支撑组"] || outerRule,
        },
        {
          id: "3",
          name: "职能后端组",
          count: 6,
          rule: initialData.groupRules?.["职能后端组"] || outerRule,
        },
      ];
    }
  });

  const getScopeName = () => {
    if (scope === "dept") return "按部门";
    if (scope === "custom") return "自定义分组";
    return "按考核组";
  };

  const getColName = () => {
    if (scope === "dept") return "部门";
    if (scope === "custom") return "自定义分组名称";
    return "考核组";
  };

  const addCustomGroup = () => {
    setItems([
      ...items,
      {
        id: `custom_${Date.now()}`,
        name: "新建自定义分组",
        count: "未选择",
        rule: outerRule,
      },
    ]);
  };

  const handleItemChange = (id: string, field: string, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSave = () => {
    const newGroupRules: Record<string, string> = {};
    let hasMod = false;
    items.forEach((item) => {
      if (item.name) {
        newGroupRules[item.name] = item.rule;
        if (item.rule !== outerRule) {
          hasMod = true;
        }
      }
    });
    onSave({
      hasModifiedGroups: hasMod,
      groupRules: newGroupRules,
      rule: outerRule,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] font-sans flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white w-full max-h-[85vh] shadow-2xl flex flex-col rounded-t-[16px] animate-slide-up">
        <div className="flex items-center justify-between p-[20px] border-b border-[#E5E7EB] shrink-0">
          <h3 className="text-[16px] font-medium text-[#1F2937]">
            高级配置 - {getScopeName()}
          </h3>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors"
          >
            <span className="text-[20px] leading-none">×</span>
          </button>
        </div>
        <div className="p-[24px] overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-[16px]">
            <div className="text-[13px] text-[#6B7280] leading-relaxed">
              支持针对单个节点单独设置该节点的强制分布规则（默认带入外面设置的统一规则）。
            </div>
            {scope === "custom" && (
              <button
                onClick={addCustomGroup}
                className="px-[16px] h-[32px] bg-white border border-[#15B8A6] text-[#15B8A6] rounded-[4px] text-[13px] hover:bg-[#F0FDF4] transition-colors"
              >
                添加自定义分组
              </button>
            )}
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[200px]">
                  {getColName()}
                </th>
                {scope === "custom" ? (
                  <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[150px]">
                    选择员工
                  </th>
                ) : (
                  <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[100px]">
                    人数
                  </th>
                )}
                <th className="py-[12px] px-[16px] text-[13px] font-medium text-[#4B5563]">
                  强制分布规则
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]/50 last:border-b-0"
                >
                  <td className="py-[16px] px-[16px]">
                    {scope === "custom" ? (
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(item.id, "name", e.target.value)
                        }
                        className="h-[32px] px-2 border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#1F2937] focus:outline-none focus:border-[#15B8A6] w-full"
                        placeholder="输入分组名称"
                      />
                    ) : (
                      <span className="text-[13px] text-[#1F2937]">
                        {item.name}
                      </span>
                    )}
                  </td>
                  <td className="py-[16px] px-[16px]">
                    {scope === "custom" ? (
                      <button className="text-[13px] text-[#15B8A6] hover:underline flex items-center gap-1">
                        <span>{item.count}</span>
                      </button>
                    ) : (
                      <span className="text-[13px] text-[#4B5563]">
                        {item.count}
                      </span>
                    )}
                  </td>
                  <td className="py-[16px] px-[16px]">
                    <CustomSelect
                      options={rulesList}
                      value={item.rule}
                      onChange={(val) =>
                        handleItemChange(item.id, "rule", val)
                      }
                      placeholder="请选择"
                      className="w-full max-w-[240px]"
                      onCreate={onCreateRule}
                      createLabel="+ 快捷创建强制分布规则"
                    />
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="py-[32px] text-center text-[#9CA3AF] text-[13px]"
                  >
                    暂无分组数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-[20px] border-t border-[#E5E7EB] flex items-center justify-end shrink-0 bg-[#F9FAFB] rounded-b-[16px]">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-[16px] h-[32px] bg-white border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#4B5563] hover:bg-[#F9FAFB] transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-[16px] h-[32px] bg-[#15B8A6] rounded-[4px] text-[13px] text-white hover:bg-[#15B8A6]/90 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
  disabled,
}: {
  name: string;
  options: any[];
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-6 h-[32px]">
      {options.map((opt, idx) => {
        const itemDisabled = disabled || opt.disabled;
        return (
          <label
            key={idx}
            className={`flex items-center gap-2 ${itemDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={
                value !== undefined ? value === opt.value : opt.defaultChecked
              }
              onChange={(e) =>
                onChange && !itemDisabled && onChange(e.target.value)
              }
              disabled={itemDisabled}
              className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] focus:ring-[#15B8A6] disabled:bg-gray-100"
            />
            <span className="text-[14px] text-[#4B5563] flex items-center">
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function DistributionTable({
  mode,
  controlRule = "ratio",
  ruleName,
  levelRule = "range",
  showExpectedNumber = false,
  totalParticipants = 17,
  hideScoreRules = false,
}: {
  mode?: "create" | "edit" | "view";
  controlRule?: string;
  ruleName?: string;
  levelRule?: string;
  showExpectedNumber?: boolean;
  totalParticipants?: number;
  hideScoreRules?: boolean;
}) {
  const isView = mode === "view";
  const isRatio = controlRule === "ratio";
  const isRank = levelRule === "rank";

  type DistributionRow = {
    level: string[];
    range: string;
    rule: string;
    ratio: number;
    number: number;
    precision: string;
    rankRatio: string;
    rankStart: string;
    rankEnd: string;
    rankStarts?: string[];
    rankEnds?: string[];
    rankRatios?: string[];
  };

  const [rows, setRows] = useState<DistributionRow[]>([
    {
      level: ["一类"],
      range: "80<=x<=100",
      rule: "小于",
      ratio: 20,
      number: 10,
      precision: "四舍五入",
      rankRatio: "20.00%",
      rankStart: "0",
      rankEnd: "20",
    },
    {
      level: ["二类"],
      range: "70<=x<80",
      rule: "等于",
      ratio: 70,
      number: 35,
      precision: "四舍五入",
      rankRatio: "70.00%",
      rankStart: "20",
      rankEnd: "90",
    },
    {
      level: ["三类"],
      range: "60<=x<70",
      rule: "小于",
      ratio: 10,
      number: 5,
      precision: "四舍五入",
      rankRatio: "10.00%",
      rankStart: "90",
      rankEnd: "100",
    },
  ]);

  const [openLevelDropdown, setOpenLevelDropdown] = useState<number | null>(
    null,
  );

  const [tieBreakerRule, setTieBreakerRule] = useState("keep_current");
  const [remainderRule, setRemainderRule] = useState("move_next");
  const [remainderSpecificLevel, setRemainderSpecificLevel] = useState("一类");

  useEffect(() => {
    if (ruleName === "271分布规则") {
      setRows([
        {
          level: ["优秀 (A)"],
          range: "80<=x<=100",
          rule: "等于",
          ratio: 20,
          number: 10,
          precision: "四舍五入",
          rankRatio: "20.00%",
          rankStart: "0",
          rankEnd: "20",
        },
        {
          level: ["良好 (B)"],
          range: "60<=x<80",
          rule: "等于",
          ratio: 70,
          number: 35,
          precision: "四舍五入",
          rankRatio: "70.00%",
          rankStart: "20",
          rankEnd: "90",
        },
        {
          level: ["待改进 (C)"],
          range: "x<60",
          rule: "等于",
          ratio: 10,
          number: 5,
          precision: "四舍五入",
          rankRatio: "10.00%",
          rankStart: "90",
          rankEnd: "100",
        },
      ]);
    } else if (ruleName === "361分布规则") {
      setRows([
        {
          level: ["优秀 (A)"],
          range: "80<=x<=100",
          rule: "等于",
          ratio: 30,
          number: 15,
          precision: "四舍五入",
          rankRatio: "30.00%",
          rankStart: "0",
          rankEnd: "30",
        },
        {
          level: ["良好 (B)"],
          range: "60<=x<80",
          rule: "等于",
          ratio: 60,
          number: 30,
          precision: "四舍五入",
          rankRatio: "60.00%",
          rankStart: "30",
          rankEnd: "90",
        },
        {
          level: ["待改进 (C)"],
          range: "x<60",
          rule: "等于",
          ratio: 10,
          number: 5,
          precision: "四舍五入",
          rankRatio: "10.00%",
          rankStart: "90",
          rankEnd: "100",
        },
      ]);
    }
  }, [ruleName]);

  const handleRatioChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].ratio = value as any;
    setRows(newRows);
  };

  const handleRankChange = (
    index: number,
    field: "rankStart" | "rankEnd",
    value: string,
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value;

    const start = parseFloat(newRows[index].rankStart) || 0;
    const end = parseFloat(newRows[index].rankEnd) || 0;
    const ratio = Math.max(0, end - start);
    newRows[index].rankRatio = `${ratio.toFixed(2)}%`;

    setRows(newRows);
  };

  const handleRankRatioChangeSingle = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].rankRatio = value.endsWith("%") ? value : `${value}%`;
    setRows(newRows);
  };

  const handleNumberChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].number = value as any;
    setRows(newRows);
  };

  const handleLevelSelect = (rowIndex: number, level: string) => {
    const newRows = [...rows];
    const currentLevels = Array.isArray(newRows[rowIndex].level)
      ? newRows[rowIndex].level
      : [newRows[rowIndex].level];

    let updated: string[];
    if (currentLevels.includes(level)) {
      updated = currentLevels.filter((l) => l !== level);
    } else {
      updated = [...currentLevels, level];
    }
    newRows[rowIndex].level = updated;

    if (!newRows[rowIndex].rankStarts) newRows[rowIndex].rankStarts = [];
    if (!newRows[rowIndex].rankEnds) newRows[rowIndex].rankEnds = [];
    if (!newRows[rowIndex].rankRatios) newRows[rowIndex].rankRatios = [];

    setRows(newRows);
  };

  const getSelectedLevels = () => {
    const selected = new Set<string>();
    rows.forEach((row) => {
      const levels = Array.isArray(row.level) ? row.level : [row.level];
      levels.forEach((l) => selected.add(l));
    });
    return selected;
  };

  const isRowReadOnly = (idx: number) => {
    if (isView) return true;
    if (!isRank) return false;

    const currentLevels = Array.isArray(rows[idx].level) ? rows[idx].level : [rows[idx].level ? [rows[idx].level] : []];
    const flatCurrent = currentLevels.filter((l): l is string => typeof l === 'string' && l !== "");
    if (flatCurrent.length === 0) return false;

    // Check if any level in flatCurrent has appeared in any row of index < idx
    for (let i = 0; i < idx; i++) {
      const prevLevels = Array.isArray(rows[i].level) ? rows[i].level : [rows[i].level ? [rows[i].level] : []];
      const flatPrev = prevLevels.filter((l): l is string => typeof l === 'string' && l !== "");
      for (const lvl of flatCurrent) {
        if (flatPrev.includes(lvl)) {
          return true; // Yes, at least one level in this row's levels was already defined in a previous row.
        }
      }
    }
    return false;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openLevelDropdown !== null) {
        const target = e.target as HTMLElement;
        if (!target.closest(".level-dropdown-container")) {
          setOpenLevelDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openLevelDropdown]);

  return (
    <div className="flex flex-col gap-2">
      {isRank && (
        <div className="flex items-center gap-6 mb-2 bg-[#F9FAFB] p-3 rounded-[4px] border border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#4B5563]">同分超人数规则:</span>
            <CustomSelect
              options={[
                { value: "keep_current", label: "均保持当前等级" },
                { value: "move_next", label: "均降到下一等级" },
              ]}
              value={tieBreakerRule}
              onChange={setTieBreakerRule}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#4B5563]">余数处理:</span>
            <CustomSelect
              options={[
                { value: "move_next", label: "迁移到下一等级" },
                { value: "move_specific", label: "迁移到指定等级" },
              ]}
              value={remainderRule}
              onChange={setRemainderRule}
            />
          </div>
          {remainderRule === "move_specific" && (
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-[#4B5563]">指定等级:</span>
              <CustomSelect
                options={ALL_LEVELS.slice(0, 5).map((l) => ({
                  value: l,
                  label: l,
                }))}
                value={remainderSpecificLevel}
                onChange={setRemainderSpecificLevel}
              />
            </div>
          )}
        </div>
      )}
      {showExpectedNumber && (
        <div className="flex justify-end">
          <span className="text-[14px] text-[#4B5563]">
            当前参与人数：{totalParticipants}
          </span>
        </div>
      )}
      <div className="border border-[#E5E7EB] rounded-[4px] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[15%]">
                等级名称
              </th>
              {!hideScoreRules && !isRank && (
                <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[20%]">
                  分值 (x) 范围
                </th>
              )}
              <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[15%]">
                强分规则
              </th>
              <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[15%]">
                {isRank ? "强分比例" : isRatio ? "强分比例" : "强分人数"}
              </th>
              {(isRatio || isRank) && (
                <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[15%]">
                  取值精度
                </th>
              )}
              {showExpectedNumber && (
                <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[15%]">
                  预计人数（按当前人数计算）
                </th>
              )}
              {!isView && (
                <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[10%]">
                  操作
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]/50 last:border-b-0"
              >
                <td className="py-[12px] px-[16px]">
                  {isView ? (
                    <span className="text-[13px] text-[#1F2937]">
                      {Array.isArray(row.level)
                        ? row.level.join(", ")
                        : row.level}
                    </span>
                  ) : (
                    <div className="relative level-dropdown-container">
                      <div
                        className="flex items-center justify-between border border-[#E5E7EB] rounded-[4px] px-[8px] min-h-[32px] bg-white cursor-pointer"
                        onClick={() =>
                          setOpenLevelDropdown(
                            openLevelDropdown === idx ? null : idx,
                          )
                        }
                      >
                        <div className="flex flex-wrap gap-1 py-1">
                          {(Array.isArray(row.level)
                            ? row.level
                            : row.level
                              ? [row.level]
                              : []
                          ).map((l) => (
                            <span
                              key={l}
                              className="bg-[#F3F4F6] text-[#4B5563] text-[12px] px-2 py-0.5 rounded-[2px]"
                            >
                              {l}
                            </span>
                          ))}
                          {(!row.level || row.level.length === 0) && (
                            <span className="text-[#9CA3AF] text-[13px]">
                              请选择
                            </span>
                          )}
                        </div>
                        <ChevronRight
                          size={14}
                          className={`text-[#6B7280] transition-transform ${openLevelDropdown === idx ? "-rotate-90" : "rotate-90"}`}
                        />
                      </div>
                      {openLevelDropdown === idx && (
                        <div className="absolute top-[100%] left-0 w-full mt-1 bg-white border border-[#E5E7EB] rounded-[4px] shadow-lg z-10 max-h-[200px] overflow-y-auto">
                          {ALL_LEVELS.map((level) => {
                            const isSelectedInCurrent = (
                              Array.isArray(row.level) ? row.level : [row.level]
                            ).includes(level);
                            const isSelectedInOther =
                              !isRank &&
                              !isSelectedInCurrent &&
                              getSelectedLevels().has(level);
                            return (
                              <div
                                key={level}
                                className={`px-3 py-2 text-[13px] flex items-center gap-2 ${isSelectedInOther ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[#F9FAFB]"}`}
                                onClick={() => {
                                  if (!isSelectedInOther) {
                                    handleLevelSelect(idx, level);
                                  }
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelectedInCurrent}
                                  disabled={isSelectedInOther}
                                  readOnly
                                  className="w-3.5 h-3.5 text-primary-500 rounded border-neutral-200 text-[#15B8A6] focus:ring-[#15B8A6]"
                                />
                                <span
                                  className={
                                    isSelectedInOther
                                      ? "text-[#9CA3AF]"
                                      : "text-[#4B5563]"
                                  }
                                >
                                  {level}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </td>
                {!hideScoreRules && !isRank && (
                  <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">
                    {row.range}
                  </td>
                )}
                <td className="py-[12px] px-[16px]">
                  {isView ? (
                    <span className="text-[13px] text-[#1F2937]">
                      {row.rule}
                    </span>
                  ) : (
                    <select
                      value={row.rule === "不限" ? "小于" : row.rule}
                      disabled={isRowReadOnly(idx)}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[idx].rule = e.target.value;
                        setRows(newRows);
                      }}
                      className={`w-full h-[32px] px-[8px] border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#1F2937] focus:outline-none focus:border-[#15B8A6] ${isRowReadOnly(idx) ? "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed border-[#E5E7EB]" : "bg-white"}`}
                    >
                      <option value="小于">小于</option>
                      <option value="等于">等于</option>
                      <option value="大于">大于</option>
                    </select>
                  )}
                </td>
                <td className="py-[12px] px-[16px]">
                  {isRank ? (
                    isRowReadOnly(idx) || isView ? (
                      <div className="flex items-center border border-[#E5E7EB] rounded-[4px] h-[32px] bg-[#F3F4F6] overflow-hidden w-[100px]">
                        <span className="w-full px-[8px] text-[13px] text-[#9CA3AF] select-none">
                          {row.rankRatio ? row.rankRatio.replace("%", "") : "0.00"}
                        </span>
                        <span className="px-[8px] text-[#9CA3AF] bg-[#E5E7EB] border-l border-[#E5E7EB] h-full flex items-center select-none">
                          %
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center border border-[#E5E7EB] rounded-[4px] h-[32px] bg-white overflow-hidden w-[100px]">
                        <input
                          type="text"
                          value={row.rankRatio ? row.rankRatio.replace("%", "") : ""}
                          onChange={(e) =>
                            handleRankRatioChangeSingle(idx, e.target.value)
                          }
                          className="w-full h-full px-[8px] text-[13px] focus:outline-none"
                        />
                        <span className="px-[8px] text-[#6B7280] bg-[#F9FAFB] border-l border-[#E5E7EB] h-full flex items-center">
                          %
                        </span>
                      </div>
                    )
                  ) : isView ? (
                    <span className="text-[13px] text-[#1F2937]">
                      {isRatio ? `${row.ratio}%` : `${row.number}人`}
                    </span>
                  ) : (
                    <div className="flex items-center border border-[#E5E7EB] rounded-[4px] h-[32px] bg-white overflow-hidden">
                      <input
                        type="text"
                        value={isRatio ? row.ratio : row.number}
                        onChange={(e) =>
                          isRatio
                            ? handleRatioChange(idx, e.target.value)
                            : handleNumberChange(idx, e.target.value)
                        }
                        className="w-full h-full px-[8px] text-[13px] focus:outline-none"
                      />
                      {isRatio && (
                        <span className="px-[8px] text-[#6B7280] bg-[#F9FAFB] border-l border-[#E5E7EB] h-full flex items-center">
                          %
                        </span>
                      )}
                    </div>
                  )}
                </td>
                {(isRatio || isRank) && (
                  <td className="py-[12px] px-[16px]">
                    {isView ? (
                      <span className="text-[13px] text-[#1F2937]">
                        {row.precision}
                      </span>
                    ) : (
                      <select
                        value={row.precision}
                        disabled={isRowReadOnly(idx)}
                        onChange={(e) => {
                          const newRows = [...rows];
                          newRows[idx].precision = e.target.value;
                          setRows(newRows);
                        }}
                        className={`w-full h-[32px] px-[8px] border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#1F2937] focus:outline-none focus:border-[#15B8A6] ${isRowReadOnly(idx) ? "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed border-[#E5E7EB]" : "bg-white"}`}
                      >
                        <option value="四舍五入">四舍五入</option>
                        <option value="向上取整">向上取整</option>
                        <option value="向下取整">向下取整</option>
                      </select>
                    )}
                  </td>
                )}
                {showExpectedNumber && (
                  <td className="py-[12px] px-[16px]">
                    {isRank ? (
                      <span className="text-[13px] text-[#1F2937]">
                        {(() => {
                          const getOperatorSymbol = (rule: string) => {
                            if (rule === "小于") return "< ";
                            if (rule === "等于") return "= ";
                            if (rule === "大于") return "> ";
                            return "";
                          };
                          const op = getOperatorSymbol(row.rule);
                          const parsedRatio = parseFloat(row.rankRatio) || 0;
                          const num = Math.round((totalParticipants * parsedRatio) / 100);
                          return `${op}${num}人`;
                        })()}
                      </span>
                    ) : (
                      <span className="text-[13px] text-[#1F2937]">
                        {(() => {
                          const getOperatorSymbol = (rule: string) => {
                            if (rule === "小于") return "< ";
                            if (rule === "等于") return "= ";
                            if (rule === "大于") return "> ";
                            if (rule === "小于等于") return "≤ ";
                            if (rule === "大于等于") return "≥ ";
                            return "";
                          };
                          const op = getOperatorSymbol(row.rule);
                          const num = isRatio
                            ? Math.round((totalParticipants * row.ratio) / 100)
                            : row.number;
                          return `${op}${num}`;
                        })()}
                      </span>
                    )}
                  </td>
                )}
                {!isView && (
                  <td className="py-[12px] px-[16px]">
                    <button
                      onClick={() => {
                        const newRows = [...rows];
                        newRows.splice(idx, 1);
                        setRows(newRows);
                      }}
                      className="text-[#15B8A6] text-[13px] hover:opacity-80"
                    >
                      删除
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {!isView && (
          <div className="bg-white px-[16px] py-[12px] border-t border-[#E5E7EB]">
            <button
              onClick={() =>
                setRows([
                  ...rows,
                  {
                    level: [],
                    range: "",
                    rule: "等于",
                    ratio: 0,
                    number: 0,
                    precision: "四舍五入",
                    rankRatio: "0.00%",
                    rankStart: "",
                    rankEnd: "",
                  },
                ])
              }
              className="text-[#15B8A6] text-[13px] hover:opacity-80 flex items-center gap-1"
            >
              <Plus size={14} /> 添加等级
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- 绩效等级引用情况弹窗 ---
function GradeUsageReferencesModal({
  ruleName,
  onClose,
}: {
  ruleName: string;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<"task" | "scheme" | "template" | "forced_distribution">("task");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showResultSetting, setShowResultSetting] = React.useState(false);
  const [activeTooltipId, setActiveTooltipId] = React.useState<number | null>(null);
  const pageSize = 10;

  // Tab 1: 考核任务 数据
  const mockTasks = [
    {
      id: 1,
      name: "员工端102310月",
      year: "2023",
      period: "10月",
      status: "进行中",
      operator: "系统",
      updateStatus: "去更新",
    },
    {
      id: 2,
      name: "结果审核11月",
      year: "2023",
      period: "11月",
      status: "进行中",
      operator: "系统",
      updateStatus: "去更新",
    },
    {
      id: 3,
      name: "双轨结果归档2月",
      year: "2024",
      period: "2月",
      status: "已归档",
      operator: "Yara",
      updateStatus: "去更新",
    },
  ];

  // Tab 2: 考核方案 数据
  const mockSchemes = [
    {
      id: 1,
      name: "研发通用考核方案",
      progress: "已完成",
      status: "进行中",
      method: "混合评定",
      forcedRules: "361分布规则; 5A分布定义",
      operator: "系统",
      updateStatus: "无需更新",
    },
    {
      id: 2,
      name: "销售提成考核方案",
      progress: "未完成",
      status: "未开启",
      method: "主管部门评定",
      forcedRules: "优秀率控制规则",
      operator: "Yara",
      updateStatus: "无需更新",
    },
  ];

  // Tab 3: 考核模板 数据
  const mockTemplates = [
    {
      id: 1,
      name: "2024年度绩效考核模板",
      status: "启用",
      operator: "系统",
      updateStatus: "无需更新",
    },
    {
      id: 2,
      name: "技术序列绩效模板",
      status: "启用",
      operator: "Yara",
      updateStatus: "无需更新",
    },
  ];

  // Tab 4: 强制分布规则 数据
  const mockForcedRules = [
    {
      id: 1,
      name: "361分布规则",
      controlRule: "按等级比例分布、按分布人数",
      status: "启用",
      operator: "Yara",
      updateStatus: "无需更新",
    },
    {
      id: 2,
      name: "优秀率控制规则",
      controlRule: "按等级比例分布",
      status: "禁用",
      operator: "系统",
      updateStatus: "无需更新",
    },
  ];

  const getActiveList = () => {
    switch (activeTab) {
      case "task":
        return mockTasks;
      case "scheme":
        return mockSchemes;
      case "template":
        return mockTemplates;
      case "forced_distribution":
        return mockForcedRules;
    }
  };

  const activeList = getActiveList();
  const totalCount = activeList.length;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[8px] w-[980px] max-h-[85vh] flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden font-sans">
        {/* Header */}
        <div className="px-[20px] py-[16px] border-b border-[#E5E7EB] flex items-center justify-between shrink-0">
          <h2 className="text-[16px] font-bold text-[#1F2937]">
            引用情况
          </h2>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#4B5563] cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Tab 切换栏 */}
        <div className="px-[20px] border-b border-[#E5E7EB] shrink-0">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("task")}
              className={`pb-3 pt-4 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${activeTab === "task" ? "border-[#15B8A6] text-[#15B8A6]" : "border-transparent text-[#4B5563] hover:text-[#1F2937]"}`}
            >
              考核任务
            </button>
            <button
              onClick={() => setActiveTab("scheme")}
              className={`pb-3 pt-4 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${activeTab === "scheme" ? "border-[#15B8A6] text-[#15B8A6]" : "border-transparent text-[#4B5563] hover:text-[#1F2937]"}`}
            >
              考核方案
            </button>
            <button
              onClick={() => setActiveTab("template")}
              className={`pb-3 pt-4 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${activeTab === "template" ? "border-[#15B8A6] text-[#15B8A6]" : "border-transparent text-[#4B5563] hover:text-[#1F2937]"}`}
            >
              考核模板
            </button>
            <button
              onClick={() => setActiveTab("forced_distribution")}
              className={`pb-3 pt-4 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${activeTab === "forced_distribution" ? "border-[#15B8A6] text-[#15B8A6]" : "border-transparent text-[#4B5563] hover:text-[#1F2937]"}`}
            >
              强制分布规则
            </button>
          </div>
        </div>

        {/* 主体部分 */}
        <div className="p-[20px] overflow-y-auto flex-1 flex flex-col min-h-0 bg-[#F9FAFB]/30">
          {/* 温馨提示 */}
          {activeTab === "task" && (
            <div className="mb-[12.5px] px-[12px] py-[8px] bg-amber-50 text-amber-700 rounded-[4px] text-[12.5px] flex items-center gap-1.5 border border-amber-200/50">
              <span className="font-semibold">注意：</span>
              <span>当考核任务已归档时无需更新</span>
            </div>
          )}
          {activeTab === "forced_distribution" && (
            <div className="mb-[12.5px] px-[12px] py-[8px] bg-amber-50 text-amber-700 rounded-[4px] text-[12.5px] flex items-center gap-1.5 border border-amber-200/50">
              <span className="font-semibold">注意：</span>
              <span>如果等级规则修改后与强制分布规则的等级不匹配，需要手动更新：等级数量有变动</span>
            </div>
          )}

          <div className="border border-[#E5E7EB] rounded-[4px] bg-white overflow-hidden flex-1 flex flex-col shadow-sm">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  {activeTab === "task" && (
                    <>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[35%]">任务名称</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[12%]">年度</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[12%]">周期</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[15%]">状态</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[13%]">操作人</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[13%]">更新状态</th>
                    </>
                  )}
                  {activeTab === "scheme" && (
                    <>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[22%]">方案名称</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[12%]">设置进度</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[10%]">状态</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[12%]">评定方式</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[22%]">引用强制分布</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[10%]">操作人</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[12%]">更新状态</th>
                    </>
                  )}
                  {activeTab === "template" && (
                    <>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[50%]">考核模板名称</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[15%]">状态</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[15%]">操作人</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[20%]">更新状态</th>
                    </>
                  )}
                  {activeTab === "forced_distribution" && (
                    <>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[30%]">强制分布规则名称</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[30%]">控制规则</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[13%]">状态</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[13%]">操作人</th>
                      <th className="py-[10px] px-[16px] text-[13px] font-semibold text-[#4B5563] w-[14%]">更新状态</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] bg-white">
                {activeList.map((item: any) => (
                  <tr key={item.id} className="hover:bg-[#F9FAFB]/50 transition-colors">
                    {/* Render Tab 1 */}
                    {activeTab === "task" && (
                      <>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563] truncate font-medium" title={item.name}>
                          {item.name}
                        </td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">{item.year}</td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">{item.period}</td>
                        <td className="py-[12px] px-[16px] text-[13px]">
                          <span className={`inline-flex items-center text-[12px] font-medium ${item.status === "进行中" ? "text-[#15B8A6]" : "text-gray-500"}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">{item.operator}</td>
                        <td className="py-[12px] px-[16px] text-[13px]">
                          {item.updateStatus === "去更新" ? (
                            <button
                              onClick={() => setShowResultSetting(true)}
                              className="text-[#15B8A6] hover:underline hover:text-[#0F9688] font-medium cursor-pointer text-[13.5px]"
                            >
                              去更新
                            </button>
                          ) : (
                            <span className="text-[#9CA3AF] text-[13.5px]">{item.updateStatus}</span>
                          )}
                        </td>
                      </>
                    )}

                    {/* Render Tab 2 */}
                    {activeTab === "scheme" && (
                      <>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563] truncate font-medium" title={item.name}>
                          {item.name}
                        </td>
                        <td className="py-[12px] px-[16px] text-[13px] text-gray-500">{item.progress}</td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#15B8A6] font-medium">{item.status}</td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">{item.method}</td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563] truncate font-normal" title={item.forcedRules}>
                          {item.forcedRules}
                        </td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">{item.operator}</td>
                        <td className="py-[12px] px-[16px] text-[13px]">
                          {item.updateStatus === "去更新" ? (
                            <button
                              onClick={() => setShowResultSetting(true)}
                              className="text-[#15B8A6] hover:underline hover:text-[#0F9688] font-medium cursor-pointer text-[13.5px]"
                            >
                              去更新
                            </button>
                          ) : item.updateStatus === "无法更新!" ? (
                            <span className="relative inline-flex items-center gap-1.5 font-sans">
                              <span className="text-red-500 font-semibold">{item.updateStatus}</span>
                              <span className="relative inline-block">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTooltipId(activeTooltipId === item.id ? null : item.id);
                                  }}
                                  onMouseEnter={() => setActiveTooltipId(item.id)}
                                  onMouseLeave={() => setActiveTooltipId(null)}
                                  className="w-[14px] h-[14px] inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 font-bold text-[10px] cursor-pointer hover:bg-red-200 transition-colors"
                                  title="点击/悬浮查看原因"
                                >
                                  !
                                </button>
                                {activeTooltipId === item.id && (
                                  <div className="absolute bottom-full right-0 mb-2 w-[280px] bg-gray-900 border border-gray-800 text-white rounded-[4px] p-[10px] shadow-lg z-50 text-[12.5px] leading-relaxed font-normal whitespace-normal select-text">
                                    <div className="relative">
                                      无法直接更新，请先修改强制分布规则引用的等级版本。
                                      {/* Arrow */}
                                      <div className="absolute top-full right-[4px] w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-gray-900 -mb-[15px]" />
                                    </div>
                                  </div>
                                )}
                              </span>
                            </span>
                          ) : (
                            <span className="text-[#9CA3AF] text-[13.5px]">{item.updateStatus}</span>
                          )}
                        </td>
                      </>
                    )}

                    {/* Render Tab 3 */}
                    {activeTab === "template" && (
                      <>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563] truncate font-medium" title={item.name}>
                          {item.name}
                        </td>
                        <td className="py-[12px] px-[16px] text-[13px]">
                          <span className="inline-flex items-center text-[12px] text-[#15B8A6] font-medium bg-teal-50 px-2 py-0.5 rounded">
                            {item.status}
                          </span>
                        </td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">{item.operator}</td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#9CA3AF] font-normal">{item.updateStatus}</td>
                      </>
                    )}

                    {/* Render Tab 4 */}
                    {activeTab === "forced_distribution" && (
                      <>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563] truncate font-medium" title={item.name}>
                          {item.name}
                        </td>
                        <td className="py-[12px] px-[16px] text-[13px] text-gray-500">{item.controlRule}</td>
                        <td className="py-[12px] px-[16px] text-[13px]">
                          <span className={`inline-flex items-center text-[12px] font-medium ${item.status === "启用" ? "text-[#15B8A6] bg-teal-50 px-2 py-0.5 rounded" : "text-gray-400"}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-[12px] px-[16px] text-[13px] text-[#4B5563]">{item.operator}</td>
                        <td className="py-[12px] px-[16px] text-[13px]">
                          {item.updateStatus === "去更新" ? (
                            <button
                              onClick={() => setShowResultSetting(true)}
                              className="text-[#15B8A6] hover:underline hover:text-[#0F9688] font-medium cursor-pointer text-[13.5px]"
                            >
                              去更新
                            </button>
                          ) : (
                            <span className="text-[#9CA3AF] text-[13.5px]">{item.updateStatus}</span>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页 & 关闭 底部工具栏 */}
          <div className="mt-[16px] flex items-center justify-between shrink-0">
            {/* 分页组件 */}
            <div className="flex items-center gap-[8px] text-[13px] text-[#4B5563]">
              <span>总共{totalCount}条</span>
              <div className="flex items-center border border-[#E5E7EB] rounded-[4px] bg-white overflow-hidden h-[28px] divide-x divide-[#E5E7EB]">
                <button className="px-2 hover:bg-gray-50 text-gray-400 cursor-not-allowed h-full flex items-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <div className="px-3 text-[#15B8A6] font-medium bg-teal-50/40 h-full flex items-center border-[#15B8A6] border">
                  1
                </div>
                <button className="px-2 hover:bg-gray-50 text-gray-400 cursor-not-allowed h-full flex items-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
              <div className="flex items-center gap-1 border border-[#E5E7EB] rounded-[4px] px-2 py-0.5 bg-white text-[13px] text-[#4B5563]">
                <span>10 条/页</span>
                <span className="text-gray-400 text-[10px]">▼</span>
              </div>
            </div>

            {/* 关闭按钮 */}
            <div>
              <button
                onClick={onClose}
                className="px-[20px] h-[32px] border border-[#15B8A6] text-[#15B8A6] bg-white hover:bg-teal-50/[0.1] rounded-[4px] text-[13px] transition-colors font-medium cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>

      {showResultSetting && (
        <div className="fixed inset-0 bg-[#F9FAFB] z-[65] flex flex-col">
          <AssessmentResultSettingSim onBack={() => setShowResultSetting(false)} />
        </div>
      )}
    </div>
  );
}

function UsageReferencesModal({
  ruleName,
  onClose,
}: {
  ruleName: string;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = React.useState<"task" | "scheme">("task");
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showResultSetting, setShowResultSetting] = React.useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = React.useState<{
    id: number | null;
    names: string;
  } | null>(null);

  const mockTasks = [
    {
      id: 1,
      taskName: "取引用该强制分布的考核方案名称",
      status: "进行中",
      operator: "张三",
      operateTime: "2024-05-10 10:00:00",
      configView: "查看快照",
      needUpdate: true,
      hasManualAdjustment: true,
      performanceGroup: "全员",
      executeNode: "部门领导审核",
    },
    {
      id: 2,
      taskName: "2024年Q2绩效考核",
      status: "进行中",
      operator: "李四",
      operateTime: "2024-05-09 15:30:00",
      configView: "查看快照",
      needUpdate: true,
      hasManualAdjustment: false,
      performanceGroup: "按部门-产品部1组",
      executeNode: "部门领导审核",
    },
    {
      id: 3,
      taskName: "年度高管述职",
      status: "进行中",
      operator: "王五",
      operateTime: "2024-05-08 14:20:00",
      configView: "查看快照",
      needUpdate: false,
      hasManualAdjustment: false,
      performanceGroup: "按考核组-高管考核组",
      executeNode: "高管审核",
    },
    {
      id: 4,
      taskName: "2023年终考核",
      status: "进行中",
      operator: "赵六",
      operateTime: "2024-05-07 11:10:00",
      configView: "查看快照",
      needUpdate: false,
      hasManualAdjustment: false,
      performanceGroup: "自定义分组-核心骨干组",
      executeNode: "部门领导审核",
    },
    {
      id: 5,
      taskName: "2022年终考核",
      status: "进行中",
      operator: "孙七",
      operateTime: "2024-05-06 09:45:00",
      configView: "查看快照",
      needUpdate: false,
      hasManualAdjustment: true,
      performanceGroup: "按部门-产品部2组",
      executeNode: "大领导审核",
    },
  ];

  const mockSchemes = [
    {
      id: 1,
      schemeName: "开发专用方案",
      progress: "已完成",
      status: "进行中",
      operator: "张三",
      operateTime: "2024-05-10 10:00:00",
      updateStatus: "使用最新版本",
    },
    {
      id: 2,
      schemeName: "通用销售方案",
      progress: "未完成",
      status: "未开启",
      operator: "李四",
      operateTime: "2024-05-09 15:30:00",
      updateStatus: "使用最新版本",
    },
    {
      id: 3,
      schemeName: "高管专项方案",
      progress: "已完成",
      status: "已结束",
      operator: "王五",
      operateTime: "2024-05-08 14:20:00",
      updateStatus: "使用最新版本",
    },
  ];

  const taskStatusOrder: Record<string, number> = {
    进行中: 0,
    未开启: 1,
    已结束: 2,
    已归档: 3,
  };
  const schemeStatusOrder: Record<string, number> = {
    进行中: 0,
    未开启: 1,
    已结束: 2,
  };
  const progressOrder: Record<string, number> = { 已完成: 0, 未完成: 1 };

  const filteredTasks = mockTasks.filter((t) =>
    t.taskName.includes(searchQuery),
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.needUpdate !== b.needUpdate) {
      return a.needUpdate ? -1 : 1;
    }
    return taskStatusOrder[a.status] - taskStatusOrder[b.status];
  });

  const sortedSchemes = [...mockSchemes].sort((a, b) => {
    if (schemeStatusOrder[a.status] !== schemeStatusOrder[b.status]) {
      return schemeStatusOrder[a.status] - schemeStatusOrder[b.status];
    }
    return progressOrder[a.progress] - progressOrder[b.progress];
  });

  const activeList = activeTab === "task" ? sortedTasks : sortedSchemes;

  const totalCount = activeList.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const currentItems = activeList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const toggleSelectAll = () => {
    if (activeTab !== "task") return;
    const updatableTasks = (currentItems as typeof mockTasks).filter(
      (t) => t.needUpdate,
    );
    if (
      selectedIds.length === updatableTasks.length &&
      selectedIds.length > 0
    ) {
      setSelectedIds([]);
    } else {
      setSelectedIds(updatableTasks.map((t) => t.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (activeTab !== "task") return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
    setSearchQuery("");
  }, [activeTab]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[8px] w-[1050px] max-h-[85vh] flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <div className="px-[20px] py-[16px] border-b border-[#E5E7EB] flex items-center justify-between shrink-0">
          <h2 className="text-[16px] font-medium text-[#1F2937]">
            引用情况 - {ruleName}
          </h2>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#4B5563]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="px-[20px] pt-[16px] border-b border-[#E5E7EB] shrink-0">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("task")}
              className={`pb-3 text-[14px] font-medium border-b-2 transition-colors ${activeTab === "task" ? "border-[#15B8A6] text-[#15B8A6]" : "border-transparent text-[#4B5563] hover:text-[#1F2937]"}`}
            >
              考核任务
            </button>
            <button
              onClick={() => setActiveTab("scheme")}
              className={`pb-3 text-[14px] font-medium border-b-2 transition-colors ${activeTab === "scheme" ? "border-[#15B8A6] text-[#15B8A6]" : "border-transparent text-[#4B5563] hover:text-[#1F2937]"}`}
            >
              考核方案
            </button>
          </div>
        </div>

        <div className="p-[20px] overflow-y-auto flex-1 flex flex-col">
          {activeTab === "task" ? (
            <div className="flex items-center justify-between mb-[16px]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    const tasksToUpdate = (
                      currentItems as typeof mockTasks
                    ).filter((t) => selectedIds.includes(t.id));
                    const manualTasks = tasksToUpdate.filter(
                      (t) => t.hasManualAdjustment,
                    );
                    if (manualTasks.length > 0) {
                      setShowUpdateConfirmModal({
                        id: null,
                        names: manualTasks.map((t) => t.taskName).join(", "),
                      });
                    }
                  }}
                  className="px-[16px] py-[6px] bg-white border border-[#E5E7EB] rounded-[4px] text-[13px] text-[#1F2937] hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={selectedIds.length === 0}
                >
                  更新
                </button>
              </div>
              <div className="relative w-[280px]">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                />
                <input
                  type="text"
                  placeholder="搜索考核任务名称"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-[36px] pr-3 py-1.5 border border-[#E5E7EB] rounded-[4px] text-[13px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6]"
                />
              </div>
            </div>
          ) : (
            <div className="mb-[16px] text-[13px] text-[#6B7280]">
              注：考核方案的更新为实时最新的，一旦保存强制分布规则，则引用该规则的考核方案直接更新到最新版本的配置。
            </div>
          )}

          <div className="border border-[#E5E7EB] rounded-[4px] overflow-hidden flex-1 flex flex-col">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  {activeTab === "task" ? (
                    <>
                      <th className="py-[10px] px-[16px] w-[40px]">
                        <input
                          type="checkbox"
                          className="rounded border-[#E5E7EB] text-[#15B8A6] focus:ring-[#15B8A6] cursor-pointer"
                          checked={
                            selectedIds.length > 0 &&
                            selectedIds.length ===
                              (currentItems as typeof mockTasks).filter(
                                (t) => t.needUpdate,
                              ).length
                          }
                          onChange={toggleSelectAll}
                          disabled={
                            (currentItems as typeof mockTasks).filter(
                              (t) => t.needUpdate,
                            ).length === 0
                          }
                        />
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[180px] whitespace-nowrap">
                        考核任务（进行中）
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[110px] whitespace-nowrap">
                        执行控制
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[150px] whitespace-nowrap">
                        绩效组
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[80px] whitespace-nowrap">
                        当前配置
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[100px] whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          规则配置
                          <HelpCircle
                            size={14}
                            className="text-[#9CA3AF] cursor-help outline-none"
                            title="任务中考核结果设置的强制分布规则与编辑后最新的强制分布规则是否一致。"
                          />
                        </div>
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[80px] whitespace-nowrap">
                        更新人
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[140px] whitespace-nowrap">
                        更新时间
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] whitespace-nowrap">
                        更新状态
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] whitespace-nowrap">
                        方案名称
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[100px] whitespace-nowrap">
                        设置进度
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[100px] whitespace-nowrap">
                        状态
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[100px] whitespace-nowrap">
                        操作人
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[160px] whitespace-nowrap">
                        操作时间
                      </th>
                      <th className="py-[10px] px-[16px] text-[13px] font-medium text-[#4B5563] w-[120px] whitespace-nowrap">
                        更新状态
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item: any, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]/50 last:border-b-0"
                    >
                      {activeTab === "task" ? (
                        <>
                          <td className="py-[10px] px-[16px]">
                            <input
                              type="checkbox"
                              className="rounded border-[#E5E7EB] text-[#15B8A6] focus:ring-[#15B8A6] disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer"
                              checked={selectedIds.includes(item.id)}
                              onChange={() => toggleSelect(item.id)}
                              disabled={!item.needUpdate}
                            />
                          </td>
                          <td
                            className="py-[10px] px-[16px] text-[13px] text-[#1F2937] truncate"
                            title={item.taskName}
                          >
                            {item.taskName}
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px] text-[#4B5563] truncate" title={item.executeNode}>
                            {item.executeNode}
                          </td>
                          <td
                            className="py-[10px] px-[16px] text-[13px] text-[#4B5563] truncate"
                            title={item.performanceGroup}
                          >
                            {item.performanceGroup}
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px]">
                            <button
                              onClick={() => setShowResultSetting(true)}
                              className="text-[#15B8A6] hover:opacity-80"
                            >
                              查看
                            </button>
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px]">
                            <span
                              className={
                                item.needUpdate
                                  ? "text-red-500"
                                  : "text-[#4B5563]"
                              }
                            >
                              {item.needUpdate ? "不一致" : "一致"}
                            </span>
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px] text-[#4B5563]">
                            {item.operator}
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px] text-[#9CA3AF]">
                            {item.operateTime}
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px] leading-relaxed">
                            {item.needUpdate ? (
                              <button
                                onClick={() => {
                                  if (item.hasManualAdjustment) {
                                    setShowUpdateConfirmModal({
                                      id: item.id,
                                      names: item.taskName,
                                    });
                                  }
                                }}
                                className="text-[#15B8A6] hover:opacity-80 font-medium"
                              >
                                更新
                              </button>
                            ) : (
                              <span className="text-[#9CA3AF]">无需更新</span>
                            )}
                          </td>
                        </>
                      ) : (
                        <>
                          <td
                            className="py-[10px] px-[16px] text-[13px] text-[#1F2937] truncate"
                            title={item.schemeName}
                          >
                            {item.schemeName}
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px] text-[#4B5563]">
                            {item.progress}
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px] text-[#4B5563]">
                            {item.status}
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px] text-[#4B5563]">
                            {item.operator}
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px] text-[#9CA3AF]">
                            {item.operateTime}
                          </td>
                          <td className="py-[10px] px-[16px] text-[13px] text-[#9CA3AF]">
                            {item.updateStatus}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={activeTab === "task" ? 9 : 6}
                      className="py-[32px] text-center text-[13px] text-[#9CA3AF]"
                    >
                      暂无数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-[16px] shrink-0">
            <span className="text-[13px] text-[#6B7280]">
              共 {totalCount} 条
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-[28px] h-[28px] flex items-center justify-center border border-[#E5E7EB] rounded-[4px] text-[#4B5563] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F9FAFB]"
              >
                <ChevronRight size={14} className="rotate-180" />
              </button>
              <span className="text-[13px] text-[#4B5563] px-2">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="w-[28px] h-[28px] flex items-center justify-center border border-[#E5E7EB] rounded-[4px] text-[#4B5563] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F9FAFB]"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showResultSetting && (
        <div className="fixed inset-0 bg-[#F9FAFB] z-[65] flex flex-col">
          <AssessmentResultSettingSim onBack={() => setShowResultSetting(false)} />
        </div>
      )}
      {showUpdateConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-[8px] w-[600px] shadow-lg flex flex-col p-6 animate-scale-in">
            <h2 className="text-[16px] font-medium text-[#1F2937] mb-4">
              更新确认
            </h2>
            <div className="text-[14px] text-[#4B5563] mb-6 leading-relaxed bg-[#F9FAFB] p-4 rounded-[4px] border border-[#E5E7EB]">
              [
              <span className="font-medium text-[#1F2937]">
                {showUpdateConfirmModal.names}
              </span>
              ] 已由管理员手动调整过局部规则，本次更新将
              <span className="font-medium text-[#FF4D4F]">覆盖</span>
              已手动修改的配置，请确认。
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowUpdateConfirmModal(null)}
                className="px-6 py-2 border border-[#E5E7EB] rounded-[4px] text-[14px] text-[#4B5563] hover:bg-[#F3F4F6]"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowUpdateConfirmModal(null);
                  if (showUpdateConfirmModal.id === null) {
                    // Update all
                  } else {
                    // Update single
                  }
                }}
                className="px-6 py-2 bg-[#15B8A6] hover:bg-[#0D9488] text-white rounded-[4px] text-[14px]"
              >
                确认更新
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 员工端：强制分布展示沉浸式页面 ---
function EmployeeDistributionImmersiveView({ onBack }: { onBack: () => void }) {
  const [currentTask, setCurrentTask] = useState("task1");
  const [viewType, setViewType] = useState("list");
  const [selectedEmp, setSelectedEmp] = useState<any>(null);
  const [showAbnormalOnly, setShowAbnormalOnly] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("summary");

  const [unreachedEmployees, setUnreachedEmployees] = useState([
    {
      id: "101",
      name: "Eve",
      dept: "鸭鸭分部",
      role: "BA",
      avatar: "https://i.pravatar.cc/150?u=101",
      stage: "自评阶段",
      operator: "Eve",
    },
    {
      id: "102",
      name: "Frank",
      dept: "鸭鸭部",
      role: "Dev",
      avatar: "https://i.pravatar.cc/150?u=102",
      stage: "部门负责人审核",
      operator: "Alice",
    },
  ]);
  const [showUnreachedModal, setShowUnreachedModal] = useState(false);
  const [unreachedContext, setUnreachedContext] = useState(""); // dept name or 'summary'
  const [selectedUnreachedIds, setSelectedUnreachedIds] = useState<string[]>(
    [],
  );
  const [showUrgeConfirm, setShowUrgeConfirm] = useState(false);
  const [isBatchEditing, setIsBatchEditing] = useState(false);
  const [batchEditData, setBatchEditData] = useState<
    Record<string, { score: string | number; level: string; reason: string }>
  >({});
  const [showHistoryModal, setShowHistoryModal] = useState<any>(null);

  const handleBatchEditClick = () => {
    if (isBatchEditing) {
      if (currentTask === "task1") {
        setEmployees1(
          employees1.map((emp) =>
            batchEditData[emp.id]
              ? {
                  ...emp,
                  score: batchEditData[emp.id].score,
                  level: batchEditData[emp.id].level,
                  reason: batchEditData[emp.id].reason,
                }
              : emp,
          ),
        );
      } else {
        setEmployees2(
          employees2.map((emp) =>
            batchEditData[emp.id]
              ? {
                  ...emp,
                  score: batchEditData[emp.id].score,
                  level: batchEditData[emp.id].level,
                  reason: batchEditData[emp.id].reason,
                }
              : emp,
          ),
        );
      }
      setIsBatchEditing(false);
      setBatchEditData({});
    } else {
      const initialData: Record<string, any> = {};
      (currentTask === "task1" ? employees1 : employees2).forEach((emp) => {
        initialData[emp.id] = {
          score: emp.score,
          level: emp.level,
          reason: emp.reason,
        };
      });
      setBatchEditData(initialData);
      setIsBatchEditing(true);
    }
  };

  const handleCancelBatchEdit = () => {
    setIsBatchEditing(false);
    setBatchEditData({});
  };

  const [employees1, setEmployees1] = useState([
    {
      id: "1",
      name: "Yara",
      dept: "Yara的测试公司",
      role: "HR",
      initialScore: 85,
      initialLevel: "A",
      score: 88,
      level: "S",
      reason: "-",
      details: "价值观：90",
      scoreChange: "up",
      levelChange: "up",
    },
    {
      id: "2",
      name: "Alice",
      dept: "鸭鸭部",
      role: "PM",
      initialScore: 90,
      initialLevel: "S",
      score: 85,
      level: "A",
      reason: "-",
      details: "价值观：88",
      scoreChange: "down",
      levelChange: "down",
    },
    {
      id: "3",
      name: "Bob",
      dept: "鸭鸭分部",
      role: "DEV",
      initialScore: 79,
      initialLevel: "C",
      score: 79,
      level: "C",
      reason: "-",
      details: "价值观：80",
      scoreChange: "same",
      levelChange: "same",
    },
    {
      id: "4",
      name: "Charlie",
      dept: "鸭鸭分部",
      role: "UI",
      initialScore: 82,
      initialLevel: "B",
      score: 82,
      level: "B",
      reason: "-",
      details: "价值观：85",
      scoreChange: "same",
      levelChange: "same",
    },
    {
      id: "5",
      name: "David",
      dept: "鸭鸭部",
      role: "QA",
      initialScore: 80,
      initialLevel: "B",
      score: 80,
      level: "B",
      reason: "-",
      details: "价值观：86",
      scoreChange: "same",
      levelChange: "same",
    },
  ]);

  const [employees2, setEmployees2] = useState([
    {
      id: "1",
      name: "Yara",
      dept: "Yara的测试公司",
      role: "HR",
      initialScore: 99,
      initialLevel: "优秀",
      score: 99,
      level: "优秀",
      reason: "-",
      details: "详情",
      scoreChange: null,
      levelChange: null,
    },
    {
      id: "2",
      name: "Charlie",
      dept: "鸭鸭分部",
      role: "UI",
      score: 82,
      level: "良好",
      reason: "",
      details: "详情",
      scoreChange: null,
      levelChange: null,
    },
    {
      id: "3",
      name: "David",
      dept: "鸭鸭部",
      role: "QA",
      score: 80,
      level: "一般",
      reason: "",
      details: "详情",
      scoreChange: null,
      levelChange: null,
    },
  ]);

  const [popoverState, setPopoverState] = useState<{
    emp: any;
    type: "score" | "level";
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setPopoverState(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleTagClick = (
    e: React.MouseEvent,
    emp: any,
    type: "score" | "level",
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    // simple heuristic to not go off-screen
    const left = Math.min(rect.left, window.innerWidth - 420);
    setPopoverState({
      emp,
      type,
      top: rect.bottom + 8,
      left,
    });
  };

  const [pendingDrop, setPendingDrop] = useState<{
    empId: string;
    targetLevel: string;
  } | null>(null);
  const [dropReason, setDropReason] = useState("");

  const employees = currentTask === "task1" ? employees1 : employees2;
  const isGrouped = currentTask === "task1";

  const departments = ["Yara的测试公司", "鸭鸭部", "鸭鸭分部"];
  const abnormalDepts = ["Yara的测试公司", "鸭鸭部", "鸭鸭分部"]; // Mocking all as abnormal for UI demonstration
  const displayDepartments = showAbnormalOnly ? abnormalDepts : departments;

  const filteredEmployees = isGrouped
    ? selectedGroup === "summary"
      ? employees
      : employees.filter((e) => e.dept === selectedGroup)
    : employees;

  const levels1 = [
    {
      name: "S",
      reqBase: "小于50%",
      reqCount:
        selectedGroup === "summary"
          ? 5
          : selectedGroup === "Yara的测试公司"
            ? 0
            : 2,
      actualCount: filteredEmployees.filter((e) => e.level === "S").length,
    },
    {
      name: "A",
      reqBase: "小于20%",
      reqCount: selectedGroup === "summary" ? 1 : 1,
      actualCount: filteredEmployees.filter((e) => e.level === "A").length,
    },
    {
      name: "B",
      reqBase: "小于10%",
      reqCount: selectedGroup === "summary" ? 0 : 0,
      actualCount: filteredEmployees.filter((e) => e.level === "B").length,
    },
    {
      name: "C",
      reqBase: "小于20%",
      reqCount: selectedGroup === "summary" ? 1 : 1,
      actualCount: filteredEmployees.filter((e) => e.level === "C").length,
    },
  ];

  const levels2 = [
    {
      name: "优秀",
      reqBase: "小于30%",
      reqCount: 1,
      actualCount: filteredEmployees.filter((e) => e.level === "优秀").length,
    },
    {
      name: "良好",
      reqBase: "等于40%",
      reqCount: 1,
      actualCount: filteredEmployees.filter((e) => e.level === "良好").length,
    },
    {
      name: "一般",
      reqBase: "不限",
      reqCount: 1,
      actualCount: filteredEmployees.filter((e) => e.level === "一般").length,
    },
    {
      name: "不合格",
      reqBase: "不限",
      reqCount: 0,
      actualCount: filteredEmployees.filter((e) => e.level === "不合格").length,
    },
  ];

  const levels = currentTask === "task1" ? levels1 : levels2;

  const onDrop = (e: React.DragEvent<HTMLDivElement>, targetLevel: string) => {
    e.preventDefault();
    const empId = e.dataTransfer.getData("empId");
    if (empId) {
      setPendingDrop({ empId, targetLevel });
      setDropReason("");
    }
  };

  const handleConfirmDrop = () => {
    if (pendingDrop) {
      const { empId, targetLevel } = pendingDrop;
      if (currentTask === "task1") {
        setEmployees1(
          employees1.map((emp) =>
            emp.id === empId
              ? { ...emp, level: targetLevel, reason: dropReason }
              : emp,
          ),
        );
      } else {
        setEmployees2(
          employees2.map((emp) =>
            emp.id === empId
              ? { ...emp, level: targetLevel, reason: dropReason }
              : emp,
          ),
        );
      }
      setPendingDrop(null);
    }
  };

  const handleCancelDrop = () => {
    setPendingDrop(null);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB] font-sans">
      {/* 沉浸式标题栏 */}
      <div className="h-[48px] bg-white border-b border-[#E5E7EB] flex items-center justify-between px-[16px] shrink-0 w-full hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-[16px]">
          <button
            onClick={onBack}
            className="text-[#535455] hover:text-[#1F2937] flex items-center text-[14px]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="hidden sm:inline">
              主页 / 智慧绩效 /{" "}
              <span className="text-[#15B8A6] ml-1">绩效待办</span>
            </span>
          </button>
        </div>
      </div>

      {/* 沉浸式内容区 - 左中右布局 */}
      <div className="flex-1 overflow-hidden w-full flex flex-col items-center p-[16px] gap-[16px]">
        {/* 顶部操作区 */}
        <div
          className="w-full bg-white rounded-[8px] p-[12px_16px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-[#E5E7EB] flex justify-between items-center shrink-0"
          style={{ maxWidth: "1580px" }}
        >
          <div className="flex items-center">
            <select
              value={currentTask}
              onChange={(e) => {
                setCurrentTask(e.target.value);
                setSelectedGroup("summary");
              }}
              className="text-[14px] text-[#1F2937] border border-[#E5E7EB] rounded-[4px] px-[12px] h-[34px] bg-white outline-none focus:border-[#15B8A6] cursor-pointer"
            >
              <option value="task1">双轨结果归档3月</option>
              <option value="task2">员工端102310月</option>
            </select>

            {unreachedEmployees.length > 0 && (
              <div className="text-[13px] text-[#4B5563] ml-4 bg-[#FEF2F2] border border-[#FECACA] h-[34px] px-[16px] rounded-[4px] flex items-center shadow-sm">
                还有
                <span
                  className="text-[#EF4444] font-medium mx-1 cursor-pointer hover:underline"
                  onClick={() => {
                    setUnreachedContext("summary");
                    setShowUnreachedModal(true);
                  }}
                >
                  {unreachedEmployees.length}人
                </span>
                未完成前序任务
              </div>
            )}
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="flex bg-[#F3F4F6] p-[2px] rounded-[4px] border border-[#E5E7EB]">
              <button
                onClick={() => setViewType("list")}
                className={`px-4 py-1 text-[13px] rounded-[4px] transition-colors font-medium border border-transparent ${viewType === "list" ? "bg-white shadow-sm text-[#15B8A6]" : "text-[#6B7280] hover:text-[#4B5563]"}`}
              >
                人员视图
              </button>
              <button
                onClick={() => setViewType("kanban")}
                className={`px-4 py-1 text-[13px] rounded-[4px] transition-colors font-medium border border-transparent ${viewType === "kanban" ? "bg-white shadow-sm text-[#15B8A6]" : "text-[#6B7280] hover:text-[#4B5563]"}`}
              >
                看板视图
              </button>
            </div>
            <button className="bg-[#15B8A6] hover:bg-[#0F9688] text-white px-[20px] h-[34px] rounded-[4px] text-[14px] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              全部提交
            </button>
          </div>
        </div>

        <div
          className="flex gap-[16px] w-full flex-1 overflow-hidden"
          style={{ maxWidth: "1580px" }}
        >
          {/* 左侧侧边栏导航 */}
          {isGrouped && (
            <div className="w-[200px] shrink-0 flex flex-col h-full bg-white rounded-[8px] p-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-3 px-1">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#15B8A6] border-[#E5E7EB] rounded focus:ring-[#15B8A6] cursor-pointer"
                  checked={showAbnormalOnly}
                  onChange={(e) => setShowAbnormalOnly(e.target.checked)}
                />
                <span
                  className="text-[13px] text-[#4B5563] cursor-pointer"
                  onClick={() => setShowAbnormalOnly(!showAbnormalOnly)}
                >
                  仅看分布异常
                </span>
              </div>
              <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                <div
                  onClick={() => setSelectedGroup("summary")}
                  className={`p-[12px] rounded-[6px] border cursor-pointer transition-all ${selectedGroup === "summary" ? "border-[#15B8A6] shadow-[0_0_0_1px_#15B8A6] bg-teal-50/10" : "border-[#E5E7EB] hover:bg-gray-50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-[#1F2937] text-[14px]">
                      汇总数据
                    </div>
                  </div>
                  <div className="text-[12px] text-[#9CA3AF] mt-2 flex justify-between">
                    <span className="text-[#1F2937] font-medium text-[16px]">
                      {employees.length}
                    </span>
                    {unreachedEmployees.length > 0 ? (
                      <span
                        className="text-[#EF4444] cursor-pointer hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUnreachedContext("summary");
                          setShowUnreachedModal(true);
                        }}
                      >
                        {unreachedEmployees.length}人 尚未抵达
                      </span>
                    ) : (
                      <span>全部到达</span>
                    )}
                  </div>
                </div>
                {displayDepartments.map((dept) => (
                  <div
                    key={dept}
                    onClick={() => setSelectedGroup(dept)}
                    className={`p-[12px] rounded-[6px] border cursor-pointer transition-all ${selectedGroup === dept ? "border-[#15B8A6] shadow-[0_0_0_1px_#15B8A6] bg-teal-50/10" : "border-[#E5E7EB] hover:bg-gray-50"}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div
                        className="font-medium text-[#1F2937] text-[14px] truncate"
                        title={dept}
                      >
                        {dept}
                      </div>
                      {abnormalDepts.includes(dept) && (
                        <span className="text-[#EF4444] text-[10px] px-1.5 py-0.5 border border-[#EF4444]/30 bg-[#FEF2F2] rounded whitespace-nowrap">
                          分布异常
                        </span>
                      )}
                    </div>
                    <div className="text-[12px] text-[#9CA3AF] flex justify-between items-end">
                      <span className="text-[#1F2937] font-medium text-[16px]">
                        {employees.filter((e) => e.dept === dept).length}
                      </span>
                      {unreachedEmployees.filter((e) => e.dept === dept)
                        .length > 0 ? (
                        <span
                          className="text-[#EF4444] cursor-pointer hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUnreachedContext(dept);
                            setShowUnreachedModal(true);
                          }}
                        >
                          {
                            unreachedEmployees.filter((e) => e.dept === dept)
                              .length
                          }
                          人 尚未抵达
                        </span>
                      ) : (
                        <span>全部到达</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 右侧主内容区 */}
          <div className="flex-1 flex flex-col gap-[16px] overflow-y-auto pr-2">
            {/* 异常提醒 */}
            {isGrouped &&
              selectedGroup !== "summary" &&
              abnormalDepts.includes(selectedGroup) && (
                <div className="bg-[#FFFBE6] border border-[#FFE58F] rounded-[8px] p-[16px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                  <div className="font-medium text-[#1F2937] text-[14px] mb-2 flex items-center gap-1">
                    校准提醒
                  </div>
                  <div className="text-[13px] text-[#4B5563] flex gap-2 items-start mt-2">
                    <span className="text-[#FAAD14] border border-[#FAAD14] bg-[#FFF1B8]/50 px-1 rounded-[2px] text-[12px] leading-relaxed shrink-0">
                      提醒
                    </span>
                    <span className="leading-relaxed">
                      当前{selectedGroup}中【S】当前共
                      {filteredEmployees.filter((e) => e.level === "S").length}
                      人（
                      <span className="text-[#EF4444]">
                        超出
                        {Math.max(
                          0,
                          filteredEmployees.filter((e) => e.level === "S")
                            .length -
                            (selectedGroup === "Yara的测试公司" ? 0 : 2),
                        )}
                        人
                      </span>
                      ），不符合强制分布要求，需要调整至 最多
                      {selectedGroup === "Yara的测试公司" ? 0 : 2}人。
                      不符合规则：等级【S】&lt;=50%。
                    </span>
                  </div>
                </div>
              )}
            {/* 概览卡片 */}
            {viewType === "list" && (
              <div className="bg-white rounded-[8px] p-[16px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)]">
                <div className="flex items-center justify-between mb-[16px]">
                  <h3 className="text-[16px] font-medium text-[#1F2937] flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-[#15B8A6]"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                    绩效等级分布概览
                  </h3>
                  {!isGrouped && (
                    <div className="text-[14px] text-[#4B5563]">
                      <span className="text-[#1F2937] mr-4">
                        总人数{" "}
                        <span className="font-medium">{employees.length}</span>
                      </span>
                      {unreachedEmployees.length > 0 ? (
                        <span
                          className="text-[#EF4444] cursor-pointer hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUnreachedContext("summary");
                            setShowUnreachedModal(true);
                          }}
                        >
                          {unreachedEmployees.length} 人尚未抵达
                        </span>
                      ) : (
                        <span>全部到达</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-[16px]">
                  <div className="flex-[2] border border-[#E5E7EB] p-4 relative bg-white rounded-[8px]">
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={levels}
                          margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                          barGap={8}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#E5E7EB"
                          />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#4B5563", fontSize: 12 }}
                            tickFormatter={(val) => `${val} (人数<6)`}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            dx={-10}
                            allowDecimals={false}
                          />
                          <Tooltip
                            cursor={{ fill: "#F9FAFB" }}
                            contentStyle={{
                              borderRadius: "4px",
                              border: "1px solid #E5E7EB",
                              boxShadow:
                                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                              fontSize: "12px",
                            }}
                          />
                          <Legend
                            iconType="rect"
                            iconSize={12}
                            verticalAlign="top"
                            align="center"
                            wrapperStyle={{
                              fontSize: "12px",
                              color: "#4B5563",
                              paddingBottom: "20px",
                            }}
                          />
                          {(!isGrouped || selectedGroup !== "summary") && (
                            <Bar
                              dataKey="reqCount"
                              name="要求人数"
                              fill="#93C5FD"
                              radius={[2, 2, 0, 0]}
                              maxBarSize={48}
                            >
                              <LabelList
                                dataKey="reqCount"
                                position="top"
                                fill="#3B82F6"
                                fontSize={12}
                                formatter={(val: any) =>
                                  Number(val) > 0 ? val : ""
                                }
                              />
                            </Bar>
                          )}
                          <Bar
                            dataKey="actualCount"
                            name="实际人数"
                            fill="#86EFAC"
                            radius={[2, 2, 0, 0]}
                            maxBarSize={48}
                          >
                            <LabelList
                              dataKey="actualCount"
                              position="top"
                              fill="#10B981"
                              fontSize={12}
                              formatter={(val: any) =>
                                Number(val) > 0 ? val : ""
                              }
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <button className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#4B5563] bg-white p-1 rounded transition-colors">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6"></path>
                        <path d="M9 21H3v-6"></path>
                        <path d="M21 3l-7 7"></path>
                        <path d="M3 21l7-7"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="w-[450px] shrink-0">
                    <table className="w-full text-left border-collapse border border-[#E5E7EB]">
                      <thead>
                        <tr>
                          <th className="py-[12px] px-[16px] bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] font-medium text-[#4B5563]">
                            等级
                          </th>
                          {(!isGrouped || selectedGroup !== "summary") && (
                            <th className="py-[12px] px-[16px] bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] font-medium text-[#4B5563]">
                              要求比例
                            </th>
                          )}
                          <th className="py-[12px] px-[16px] bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] font-medium text-[#4B5563]">
                            实际比例
                          </th>
                          <th className="py-[12px] px-[16px] bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] font-medium text-[#4B5563]">
                            {!isGrouped || selectedGroup !== "summary"
                              ? "实际 / 要求人数"
                              : "实际人数"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {levels.map((l, i) => {
                          let isInvalid = false;
                          if (l.reqBase.includes("小于")) {
                            isInvalid = l.actualCount > l.reqCount;
                          } else if (l.reqBase.includes("等于")) {
                            isInvalid = l.actualCount !== l.reqCount;
                          } else if (l.reqBase.includes("大于")) {
                            isInvalid = l.actualCount < l.reqCount;
                          }
                          const actualColor = isInvalid
                            ? "text-[#F97316]"
                            : "text-[#4B5563]";

                          return (
                            <tr key={i}>
                              <td className="py-[10px] px-[16px] border border-[#E5E7EB] text-[13px] text-[#1F2937]">
                                {l.name}
                              </td>
                              {(!isGrouped || selectedGroup !== "summary") && (
                                <td className="py-[10px] px-[16px] border border-[#E5E7EB] text-[13px] text-[#4B5563]">
                                  {l.reqBase}
                                </td>
                              )}
                              <td
                                className={`py-[10px] px-[16px] border border-[#E5E7EB] text-[13px] ${actualColor}`}
                              >
                                {l.actualCount > 0
                                  ? (
                                      (l.actualCount /
                                        filteredEmployees.length) *
                                      100
                                    ).toFixed(0) + "%"
                                  : "0%"}
                              </td>
                              <td className="py-[10px] px-[16px] border border-[#E5E7EB] text-[13px]">
                                {!isGrouped || selectedGroup !== "summary" ? (
                                  <>
                                    <span className={actualColor}>
                                      {l.actualCount}
                                    </span>
                                    <span className="text-[#D1D5DB] mx-1">
                                      /
                                    </span>
                                    <span className="text-[#9CA3AF] mr-1">
                                      {l.reqCount}
                                    </span>
                                  </>
                                ) : (
                                  <span className={actualColor}>
                                    {l.actualCount}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 明细卡片 */}
            <div className="bg-white rounded-[8px] p-[16px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex flex-col flex-1">
              <div className="flex justify-between items-center mb-[16px]">
                <h3 className="text-[16px] font-medium text-[#1F2937] flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-[#15B8A6]"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  审核明细数据
                </h3>
              </div>

              <div className="flex items-center justify-between mb-[16px] border-b border-[#15B8A6] pb-0">
                <div className="flex gap-[2px]">
                  <button className="px-[20px] py-[8px] text-white bg-[#15B8A6] rounded-t-[4px] text-[14px]">
                    待审核
                  </button>
                </div>
                <div className="flex gap-[8px] mb-[8px]">
                  <button className="px-[12px] h-[30px] bg-white border border-[#15B8A6] text-[#15B8A6] rounded-[4px] text-[13px] hover:bg-teal-50">
                    审核通过
                  </button>
                  <button className="px-[12px] h-[30px] bg-white border border-[#15B8A6] text-[#15B8A6] rounded-[4px] text-[13px] hover:bg-teal-50">
                    更新等级
                  </button>
                  <button className="px-[12px] h-[30px] bg-white border border-[#15B8A6] text-[#15B8A6] rounded-[4px] text-[13px] hover:bg-teal-50">
                    驳回
                  </button>
                  <button
                    onClick={handleBatchEditClick}
                    className="px-[12px] h-[30px] bg-white border border-[#15B8A6] text-[#15B8A6] rounded-[4px] text-[13px] hover:bg-teal-50"
                  >
                    {isBatchEditing ? "保存调整" : "批量调整"}
                  </button>
                  {isBatchEditing && (
                    <button
                      onClick={handleCancelBatchEdit}
                      className="px-[12px] h-[30px] bg-white border border-[#E5E7EB] text-[#4B5563] rounded-[4px] text-[13px] hover:bg-gray-50"
                    >
                      取消
                    </button>
                  )}
                  <button className="px-[12px] h-[30px] bg-white border border-[#15B8A6] text-[#15B8A6] rounded-[4px] text-[13px] hover:bg-teal-50">
                    导入
                  </button>
                  <button className="w-[30px] h-[30px] flex items-center justify-center bg-white border border-[#15B8A6] text-[#15B8A6] rounded-[4px] hover:bg-teal-50">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                  </button>
                </div>
              </div>

              {viewType === "list" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F9FAFB] border-t border-b border-[#E5E7EB]">
                      <th className="py-[12px] px-[16px] w-[50px] text-center border-x border-[#E5E7EB]">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#15B8A6] border-neutral-200 text-primary-500 focus:ring-primary-500 rounded"
                        />
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-medium text-[#1F2937]">
                        姓名
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-medium text-[#1F2937]">
                        部门
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-medium text-[#1F2937]">
                        职位
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-medium text-[#1F2937]">
                        强制分布规则
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-medium text-[#1F2937]">
                        原始得分
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-medium text-[#1F2937]">
                        原始等级
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-medium text-[#1F2937]">
                        审核得分
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-medium text-[#1F2937]">
                        审核等级
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-semibold text-[#15B8A6] text-center bg-[#15B8A6]/5">
                        审核得分等级
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-medium text-[#1F2937]">
                        调整原因
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] font-medium text-[#1F2937]">
                        其他维度结果
                      </th>
                      <th className="py-[12px] px-[16px] border-r border-[#E5E7EB] p-0 w-8 text-center text-[#9CA3AF]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((emp) => (
                      <tr
                        key={emp.id}
                        className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]/50"
                      >
                        <td className="py-[12px] px-[16px] text-center border-x border-[#E5E7EB]">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-[#15B8A6] border-neutral-200 text-primary-500 focus:ring-primary-500 rounded"
                          />
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-[#4B5563]">
                          {emp.name}
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-[#4B5563]">
                          {emp.dept}
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-[#4B5563]">
                          {emp.role}
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-[#4B5563]">
                          {currentTask === "task1" ? "361分布规则" : "5A优秀率规则"}
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-[#1F2937]">
                          <span className="font-medium text-[14px]">
                            {emp.initialScore || "-"}
                          </span>
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-[#1F2937]">
                          <span className="font-medium text-[14px]">
                            {emp.initialLevel || "-"}
                          </span>
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-[#4B5563]">
                          {isBatchEditing ? (
                            <input
                              type="number"
                              className="w-full border border-gray-300 rounded px-2 py-1 text-[13px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6]"
                              value={batchEditData[emp.id]?.score || ""}
                              onChange={(e) =>
                                setBatchEditData({
                                  ...batchEditData,
                                  [emp.id]: {
                                    ...batchEditData[emp.id],
                                    score: e.target.value,
                                  },
                                })
                              }
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[14px] text-[#1F2937]">
                                {emp.score}
                              </span>
                              {emp.scoreChange === "up" && (
                                <span
                                  className="cursor-pointer bg-[#ECFDF5] text-[#10B981] border border-[#D1FAE5] w-5 h-5 flex items-center justify-center rounded"
                                  onClick={(e) =>
                                    handleTagClick(e, emp, "score")
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="12" y1="19" x2="12" y2="5"></line>
                                    <polyline points="5 12 12 5 19 12"></polyline>
                                  </svg>
                                </span>
                              )}
                              {emp.scoreChange === "down" && (
                                <span
                                  className="cursor-pointer bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2] w-5 h-5 flex items-center justify-center rounded"
                                  onClick={(e) =>
                                    handleTagClick(e, emp, "score")
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <polyline points="19 12 12 19 5 12"></polyline>
                                  </svg>
                                </span>
                              )}
                              {emp.scoreChange === "same" && (
                                <span
                                  className="cursor-pointer bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB] w-5 h-5 flex items-center justify-center rounded"
                                  onClick={(e) =>
                                    handleTagClick(e, emp, "score")
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-[#1F2937]">
                          {isBatchEditing ? (
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded px-2 py-1 text-[13px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6]"
                              value={batchEditData[emp.id]?.level || ""}
                              onChange={(e) =>
                                setBatchEditData({
                                  ...batchEditData,
                                  [emp.id]: {
                                    ...batchEditData[emp.id],
                                    level: e.target.value,
                                  },
                                })
                              }
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[14px]">
                                {emp.level}
                              </span>
                              {emp.levelChange === "up" && (
                                <span
                                  className="cursor-pointer bg-[#ECFDF5] text-[#10B981] border border-[#D1FAE5] w-5 h-5 flex items-center justify-center rounded"
                                  onClick={(e) =>
                                    handleTagClick(e, emp, "level")
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="12" y1="19" x2="12" y2="5"></line>
                                    <polyline points="5 12 12 5 19 12"></polyline>
                                  </svg>
                                </span>
                              )}
                              {emp.levelChange === "down" && (
                                <span
                                  className="cursor-pointer bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2] w-5 h-5 flex items-center justify-center rounded"
                                  onClick={(e) =>
                                    handleTagClick(e, emp, "level")
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <polyline points="19 12 12 19 5 12"></polyline>
                                  </svg>
                                </span>
                              )}
                              {emp.levelChange === "same" && (
                                <span
                                  className="cursor-pointer bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB] w-5 h-5 flex items-center justify-center rounded"
                                  onClick={(e) =>
                                    handleTagClick(e, emp, "level")
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-center bg-[#15B8A6]/5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-xs font-semibold bg-[#15B8A6]/10 text-[#15B8A6]">
                            {(() => {
                              const currentScore = Number(isBatchEditing ? (batchEditData[emp.id]?.score || emp.score) : emp.score);
                              return `${getCalculatedLevel(currentScore, currentTask)}级`;
                            })()}
                          </span>
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-[#4B5563]">
                          {isBatchEditing ? (
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded px-2 py-1 text-[13px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6]"
                              value={batchEditData[emp.id]?.reason || ""}
                              onChange={(e) =>
                                setBatchEditData({
                                  ...batchEditData,
                                  [emp.id]: {
                                    ...batchEditData[emp.id],
                                    reason: e.target.value,
                                  },
                                })
                              }
                            />
                          ) : (
                            emp.reason
                          )}
                        </td>
                        <td className="py-[12px] px-[16px] border-r border-[#E5E7EB] text-[13px] text-[#4B5563] flex justify-between items-center group">
                          {emp.details}
                          <span
                            onClick={() => setSelectedEmp(emp)}
                            className="text-[#15B8A6] text-[12px] cursor-pointer hidden group-hover:inline"
                          >
                            详情
                          </span>
                        </td>
                        <td className="py-[12px] border-r border-[#E5E7EB] p-0 w-8"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {viewType === "kanban" && (
                <div className="flex gap-[16px] overflow-x-auto pb-4 h-[calc(100vh-280px)]">
                  {levels.map((l) => (
                    <div
                      key={l.name}
                      onDragOver={onDragOver}
                      onDrop={(e) => onDrop(e, l.name)}
                      className="w-[300px] shrink-0 flex flex-col"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-[4px] text-[12px] font-medium border ${
                              l.name === "S" || l.name === "优秀"
                                ? "bg-orange-50 text-orange-600 border-orange-200"
                                : l.name === "A" || l.name === "良好"
                                  ? "bg-blue-50 text-blue-600 border-blue-200"
                                  : l.name === "B" || l.name === "一般"
                                    ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                                    : "bg-gray-50 text-gray-600 border-gray-200"
                            }`}
                          >
                            {l.name}
                          </span>
                          <span className="text-[#6B7280] text-[14px] font-medium">
                            （
                            {
                              filteredEmployees.filter(
                                (e) => e.level === l.name,
                              ).length
                            }
                            人，
                            {filteredEmployees.length > 0
                              ? (
                                  (filteredEmployees.filter(
                                    (e) => e.level === l.name,
                                  ).length /
                                    filteredEmployees.length) *
                                  100
                                ).toFixed(0)
                              : 0}
                            %）
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[#9CA3AF]">
                          <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                          </button>
                          <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M15 3h6v6"></path>
                              <path d="M9 21H3v-6"></path>
                              <path d="M21 3l-7 7"></path>
                              <path d="M3 21l7-7"></path>
                            </svg>
                          </button>
                          <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[12px] overflow-y-auto flex-1 pb-4 pr-1">
                        {filteredEmployees
                          .filter((e) => e.level === l.name)
                          .map((emp) => (
                            <div
                              key={emp.id}
                              draggable
                              onDragStart={(e) =>
                                e.dataTransfer.setData("empId", emp.id)
                              }
                              onClick={() => setSelectedEmp(emp)}
                              className="bg-white p-[14px] rounded-[6px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04)] cursor-pointer hover:border-[#15B8A6] hover:shadow-[0_2px_8px_rgba(21,184,166,0.12)] transition-all group relative block"
                            >
                              <div className="flex items-start gap-2 mb-3">
                                <input
                                  type="checkbox"
                                  onClick={(e) => e.stopPropagation()}
                                  className="mt-1 w-3.5 h-3.5 text-[#15B8A6] border-gray-300 rounded cursor-pointer focus:ring-[#15B8A6]"
                                />
                                <div className="font-medium text-[#1F2937] text-[14px] leading-snug">
                                  {emp.name} - {emp.role}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <span
                                  className={`px-2 py-0.5 rounded-[4px] text-[12px] border ${
                                    l.name === "S" || l.name === "优秀"
                                      ? "bg-orange-50 text-orange-600 border-orange-100"
                                      : l.name === "A" || l.name === "良好"
                                        ? "bg-blue-50 text-blue-600 border-blue-100"
                                        : l.name === "B" || l.name === "一般"
                                          ? "bg-yellow-50 text-yellow-600 border-yellow-100"
                                          : "bg-gray-50 text-gray-600 border-gray-100"
                                  }`}
                                >
                                  {l.name}
                                </span>
                                <span className="bg-[#EBF5FF] text-[#1D4ED8] px-2 py-0.5 rounded-[4px] text-[12px] border border-[#BFDBFE]">
                                  {emp.dept}
                                </span>
                                <span className="bg-[#F0FDF4] text-[#15803D] px-2 py-0.5 rounded-[4px] text-[12px] border border-[#BBF7D0] flex items-center gap-1">
                                  {emp.score}分
                                  {emp.scoreChange === "up" && (
                                    <span
                                      className="cursor-pointer bg-[#ECFDF5] text-[#10B981] border border-[#D1FAE5] w-[14px] h-[14px] flex items-center justify-center rounded ml-1"
                                      onClick={(e) =>
                                        handleTagClick(e, emp, "score")
                                      }
                                    >
                                      <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <line
                                          x1="12"
                                          y1="19"
                                          x2="12"
                                          y2="5"
                                        ></line>
                                        <polyline points="5 12 12 5 19 12"></polyline>
                                      </svg>
                                    </span>
                                  )}
                                  {emp.scoreChange === "down" && (
                                    <span
                                      className="cursor-pointer bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2] w-[14px] h-[14px] flex items-center justify-center rounded ml-1"
                                      onClick={(e) =>
                                        handleTagClick(e, emp, "score")
                                      }
                                    >
                                      <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <line
                                          x1="12"
                                          y1="5"
                                          x2="12"
                                          y2="19"
                                        ></line>
                                        <polyline points="19 12 12 19 5 12"></polyline>
                                      </svg>
                                    </span>
                                  )}
                                  {emp.scoreChange === "same" && (
                                    <span
                                      className="cursor-pointer bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB] w-[14px] h-[14px] flex items-center justify-center rounded ml-1"
                                      onClick={(e) =>
                                        handleTagClick(e, emp, "score")
                                      }
                                    >
                                      <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <line
                                          x1="5"
                                          y1="12"
                                          x2="19"
                                          y2="12"
                                        ></line>
                                      </svg>
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                          ))}

                        <button className="flex items-center justify-center gap-1 w-full py-[10px] bg-white border border-[#E5E7EB] border-dashed rounded-[6px] text-[#6B7280] text-[13px] hover:text-[#15B8A6] hover:border-[#15B8A6] hover:bg-[#F0FDF4] transition-colors">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          新建记录
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="w-[300px] shrink-0 flex flex-col">
                    <div className="flex items-center gap-2 mb-3 h-[24px]">
                      <button className="text-[#6B7280] hover:text-[#1F2937] text-[14px] flex items-center gap-1 pl-2">
                        <Plus size={16} /> 新建分组
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 详情抽屉 */}
      {selectedEmp && (
        <div className="fixed inset-0 bg-black/30 z-[60] flex justify-end transition-opacity">
          <div className="bg-white w-[500px] h-full shadow-2xl flex flex-col transform transition-transform">
            <div className="h-[56px] border-b border-[#E5E7EB] flex items-center justify-between px-[20px] shrink-0">
              <h3 className="text-[16px] font-medium text-[#1F2937]">
                {selectedEmp.name} - 审核明细
              </h3>
              <button
                onClick={() => setSelectedEmp(null)}
                className="text-[#9CA3AF] hover:text-[#4B5563]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-[20px]">
              <div className="flex flex-col gap-[20px]">
                <div>
                  <div className="text-[13px] text-[#6B7280] mb-1">姓名</div>
                  <div className="text-[14px] text-[#1F2937]">
                    {selectedEmp.name}
                  </div>
                </div>
                <div>
                  <div className="text-[13px] text-[#6B7280] mb-1">部门</div>
                  <div className="text-[14px] text-[#1F2937]">
                    {selectedEmp.dept}
                  </div>
                </div>
                <div>
                  <div className="text-[13px] text-[#6B7280] mb-1">职位</div>
                  <div className="text-[14px] text-[#1F2937]">
                    {selectedEmp.role}
                  </div>
                </div>
                <div className="h-[1px] bg-[#E5E7EB] my-2"></div>
                <div>
                  <div className="text-[13px] text-[#6B7280] mb-1">
                    审核得分
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] font-medium text-[#15B8A6]">
                      {selectedEmp.score}{" "}
                      <span className="text-[12px] font-normal text-[#9CA3AF]">
                        分
                      </span>
                    </span>
                    {selectedEmp.scoreChange === "up" && (
                      <span
                        className="cursor-pointer bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] px-1 text-[10px] rounded"
                        onClick={(e) => handleTagClick(e, selectedEmp, "score")}
                      >
                        上升
                      </span>
                    )}
                    {selectedEmp.scoreChange === "down" && (
                      <span
                        className="cursor-pointer bg-[#FEF2F2] text-[#DC2626] border border-[#FEE2E2] px-1 text-[10px] rounded"
                        onClick={(e) => handleTagClick(e, selectedEmp, "score")}
                      >
                        下降
                      </span>
                    )}
                    {selectedEmp.scoreChange === "same" && (
                      <span
                        className="cursor-pointer bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB] px-1 text-[10px] rounded"
                        onClick={(e) => handleTagClick(e, selectedEmp, "score")}
                      >
                        -
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-[13px] text-[#6B7280] mb-1">
                    审核等级
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`inline-block px-3 py-1 rounded-[4px] text-[14px] font-medium border ${
                        selectedEmp.level === "S" ||
                        selectedEmp.level === "优秀"
                          ? "bg-orange-50 text-orange-600 border-orange-200"
                          : selectedEmp.level === "A" ||
                              selectedEmp.level === "良好"
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : selectedEmp.level === "B" ||
                                selectedEmp.level === "一般"
                              ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {selectedEmp.level}
                    </div>
                    {selectedEmp.levelChange === "up" && (
                      <span
                        className="cursor-pointer bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] px-1 text-[10px] rounded"
                        onClick={(e) => handleTagClick(e, selectedEmp, "level")}
                      >
                        上升
                      </span>
                    )}
                    {selectedEmp.levelChange === "down" && (
                      <span
                        className="cursor-pointer bg-[#FEF2F2] text-[#DC2626] border border-[#FEE2E2] px-1 text-[10px] rounded"
                        onClick={(e) => handleTagClick(e, selectedEmp, "level")}
                      >
                        下降
                      </span>
                    )}
                    {selectedEmp.levelChange === "same" && (
                      <span
                        className="cursor-pointer bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB] px-1 text-[10px] rounded"
                        onClick={(e) => handleTagClick(e, selectedEmp, "level")}
                      >
                        -
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-[13px] text-[#6B7280] mb-1">
                    调整原因
                  </div>
                  <div className="text-[14px] text-[#1F2937]">
                    {selectedEmp.reason || "--"}
                  </div>
                </div>
                <div>
                  <div className="text-[13px] text-[#6B7280] mb-1">
                    其他维度结果
                  </div>
                  <div className="text-[14px] text-[#1F2937]">
                    {selectedEmp.details}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-[16px] border-t border-[#E5E7EB] flex justify-end">
              <button
                onClick={() => setSelectedEmp(null)}
                className="px-[16px] h-[32px] border border-[#E5E7EB] bg-white text-[#4B5563] rounded-[4px] text-[14px] hover:bg-[#F9FAFB] transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 未按时到达人员弹窗 */}
      {showUnreachedModal && (
        <div
          className="fixed inset-0 bg-black/30 z-[60] flex justify-end transition-opacity"
          onClick={() => setShowUnreachedModal(false)}
        >
          <div
            className="bg-white w-[500px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-[56px] border-b border-[#E5E7EB] flex items-center justify-between px-[20px] shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowUnreachedModal(false)}
                  className="text-[#9CA3AF] hover:text-[#4B5563]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <h3 className="text-[16px] font-medium text-[#1F2937]">
                  前序未达到人员 (
                  {
                    (unreachedContext === "summary"
                      ? unreachedEmployees
                      : unreachedEmployees.filter(
                          (e) => e.dept === unreachedContext,
                        )
                    ).length
                  }
                  )
                </h3>
              </div>
            </div>

            <div className="px-[20px] py-[12px] flex justify-between items-center shrink-0">
              <span className="text-[13px] text-[#4B5563]">
                共{" "}
                <span className="text-[#EF4444] font-medium">
                  {
                    (unreachedContext === "summary"
                      ? unreachedEmployees
                      : unreachedEmployees.filter(
                          (e) => e.dept === unreachedContext,
                        )
                    ).length
                  }
                </span>{" "}
                人尚未抵达
              </span>
              <button
                onClick={() => setShowUrgeConfirm(true)}
                className="bg-[#15B8A6] text-white px-[16px] h-[32px] rounded-[4px] text-[13px] hover:bg-[#15B8A6]/90 transition-colors flex items-center gap-1 shadow-sm"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                一键催办
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-[20px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9FAFB] border-y border-[#E5E7EB]">
                    <th className="py-[10px] px-[12px] w-[40px]">
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 text-[#15B8A6] border-[#E5E7EB] rounded focus:ring-[#15B8A6] cursor-pointer"
                        checked={
                          (unreachedContext === "summary"
                            ? unreachedEmployees
                            : unreachedEmployees.filter(
                                (e) => e.dept === unreachedContext,
                              )
                          ).length > 0 &&
                          selectedUnreachedIds.length ===
                            (unreachedContext === "summary"
                              ? unreachedEmployees
                              : unreachedEmployees.filter(
                                  (e) => e.dept === unreachedContext,
                                )
                            ).length
                        }
                        onChange={(e) => {
                          const list =
                            unreachedContext === "summary"
                              ? unreachedEmployees
                              : unreachedEmployees.filter(
                                  (e) => e.dept === unreachedContext,
                                );
                          if (e.target.checked)
                            setSelectedUnreachedIds(list.map((e) => e.id));
                          else setSelectedUnreachedIds([]);
                        }}
                      />
                    </th>
                    <th className="py-[10px] px-[8px] text-[13px] font-medium text-[#4B5563]">
                      员工姓名
                    </th>
                    <th className="py-[10px] px-[8px] text-[13px] font-medium text-[#4B5563]">
                      所处阶段
                    </th>
                    <th className="py-[10px] px-[8px] text-[13px] font-medium text-[#4B5563]">
                      节点操作人
                    </th>
                    <th className="py-[10px] px-[8px] text-[13px] font-medium text-[#4B5563] w-[60px]">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(unreachedContext === "summary"
                    ? unreachedEmployees
                    : unreachedEmployees.filter(
                        (e) => e.dept === unreachedContext,
                      )
                  ).map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b border-[#E5E7EB] hover:bg-gray-50 last:border-0 transition-colors"
                    >
                      <td className="py-[12px] px-[12px] w-[40px] align-top relative">
                        <input
                          type="checkbox"
                          className="w-3.5 h-3.5 text-[#15B8A6] border-[#E5E7EB] rounded focus:ring-[#15B8A6] mt-2 cursor-pointer"
                          checked={selectedUnreachedIds.includes(emp.id)}
                          onChange={(e) => {
                            if (e.target.checked)
                              setSelectedUnreachedIds((prev) => [
                                ...prev,
                                emp.id,
                              ]);
                            else
                              setSelectedUnreachedIds((prev) =>
                                prev.filter((id) => id !== emp.id),
                              );
                          }}
                        />
                      </td>
                      <td className="py-[12px] px-[8px]">
                        <div className="flex items-center gap-3">
                          <img
                            src={emp.avatar}
                            alt="avatar"
                            className="w-[32px] h-[32px] rounded-full object-cover border border-[#E5E7EB] shrink-0"
                          />
                          <div>
                            <div className="font-medium text-[#1F2937] text-[13px]">
                              {emp.name}
                            </div>
                            <div className="text-[12px] text-[#9CA3AF] mt-0.5">
                              {emp.dept}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-[12px] px-[8px] align-middle">
                        <span className="text-[13px] text-[#4B5563] whitespace-nowrap">
                          {emp.stage}
                        </span>
                      </td>
                      <td className="py-[12px] px-[8px] align-middle">
                        <div className="flex items-center gap-2">
                          <div className="w-[20px] h-[20px] rounded-full bg-[#E5E7EB] text-[#4B5563] flex items-center justify-center text-[10px] shrink-0 font-medium">
                            {emp.operator?.charAt(0)}
                          </div>
                          <span className="text-[13px] text-[#4B5563] whitespace-nowrap">
                            {emp.operator}
                          </span>
                        </div>
                      </td>
                      <td className="py-[12px] px-[8px] align-middle">
                        <button
                          onClick={() => {
                            setSelectedUnreachedIds([emp.id]);
                            setShowUrgeConfirm(true);
                          }}
                          className="text-[#15B8A6] text-[13px] hover:text-[#0F9688] font-medium transition-colors whitespace-nowrap"
                        >
                          催办
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 底部 */}
            <div className="h-[56px] border-t border-[#E5E7EB] flex items-center justify-between px-[20px] shrink-0">
              <div className="text-[13px] text-[#4B5563]">
                共{" "}
                {
                  (unreachedContext === "summary"
                    ? unreachedEmployees
                    : unreachedEmployees.filter(
                        (e) => e.dept === unreachedContext,
                      )
                  ).length
                }{" "}
                条
              </div>
              <div className="flex items-center gap-4">
                <select className="border border-[#E5E7EB] rounded-[4px] px-2 py-1 text-[13px] outline-none text-[#4B5563] bg-white cursor-pointer hover:border-[#15B8A6] transition-colors focus:border-[#15B8A6]">
                  <option>20条/页</option>
                </select>
                <div className="flex gap-1">
                  <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#E5E7EB] rounded-[4px] bg-[#F9FAFB] text-[#9CA3AF] text-[12px] cursor-not-allowed">
                    &lt;
                  </button>
                  <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#15B8A6] rounded-[4px] bg-[#E6F7F6] text-[#15B8A6] font-medium text-[13px]">
                    1
                  </button>
                  <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#E5E7EB] rounded-[4px] bg-white text-[#4B5563] text-[13px] hover:text-[#15B8A6] transition-colors cursor-pointer">
                    2
                  </button>
                  <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#E5E7EB] rounded-[4px] bg-white text-[#4B5563] text-[13px] hover:text-[#15B8A6] transition-colors cursor-pointer">
                    3
                  </button>
                  <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#E5E7EB] rounded-[4px] bg-white text-[#4B5563] text-[12px] hover:text-[#15B8A6] transition-colors cursor-pointer">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 变更历史 Popover */}
      {popoverState && (
        <div
          className="fixed z-[100] bg-white rounded-[8px] w-[420px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#E5E7EB] flex flex-col"
          style={{
            top: popoverState.top,
            left: popoverState.left,
            maxHeight: `calc(100vh - ${popoverState.top}px - 20px)`,
          }}
          onClick={(e) => e.stopPropagation()} // prevent closing when interacting with popup itself
        >
          <div className="absolute top-[-6px] left-4 w-3 h-3 bg-white border-t border-l border-[#E5E7EB] rotate-45 z-0"></div>
          <div className="relative z-10 bg-white flex flex-col min-h-0 h-full rounded-[8px] overflow-hidden">
            <div className="h-[44px] border-b border-[#E5E7EB] flex items-center justify-between px-[20px] shrink-0 bg-white">
              <h2 className="text-[15px] font-medium text-[#1F2937]">
                历史变更记录
              </h2>
              <button
                onClick={() => setPopoverState(null)}
                className="text-[#9CA3AF] hover:text-[#4B5563]"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-[20px] overflow-y-auto flex-1 min-h-0">
              <div className="relative pl-[24px] flex flex-col gap-6">
                <div className="absolute top-2 bottom-6 left-[10px] w-[1px] bg-[#E5E7EB]"></div>

                {/* Item 1 */}
                <div className="relative">
                  <div className="absolute left-[-24px] top-0 w-[20px] h-[20px] flex items-start justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#15B8A6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="bg-white"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="flex justify-between items-center mb-2 pl-2">
                    <span className="text-[#6B7280] text-[13px]">
                      2023-04-10 14:30
                    </span>
                    <span className="bg-[#F3F4F6] text-[#4B5563] text-[12px] px-1.5 py-0.5 rounded-[4px]">
                      管理员A
                    </span>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-[8px] p-3 border border-[#F3F4F6] ml-2">
                    <div className="flex flex-col gap-2 mb-3">
                      <div className="flex items-center text-[13px]">
                        <span className="text-[#6B7280] whitespace-nowrap shrink-0">
                          分数变更：
                        </span>
                        <span className="text-[#9CA3AF] line-through">
                          {popoverState.emp.initialScore}
                        </span>
                        <span className="text-[#9CA3AF] mx-2">→</span>
                        <span className="text-[#10B981] font-medium">
                          {popoverState.emp.score}
                        </span>
                      </div>
                      <div className="flex items-center text-[13px]">
                        <span className="text-[#6B7280] whitespace-nowrap shrink-0">
                          等级变更：
                        </span>
                        <span className="text-[#9CA3AF] line-through">
                          {popoverState.emp.initialLevel}
                        </span>
                        <span className="text-[#9CA3AF] mx-2">→</span>
                        <span className="text-[#10B981] font-medium text-[14px]">
                          {popoverState.emp.level}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start text-[13px] pt-3 border-t border-[#E5E7EB]">
                      <span className="text-[#6B7280] shrink-0 whitespace-nowrap">
                        调整原因：
                      </span>
                      <span className="text-[#4B5563] leading-relaxed ml-1">
                        {popoverState.emp.reason &&
                        popoverState.emp.reason !== "-"
                          ? popoverState.emp.reason
                          : "表现优异，超额完成目标，特此提升等级。"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="relative">
                  <div className="absolute left-[-24px] top-0 w-[20px] h-[20px] flex items-start justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#15B8A6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="bg-white"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="flex justify-between items-center mb-2 pl-2">
                    <span className="text-[#6B7280] text-[13px]">
                      2023-03-25 09:15
                    </span>
                    <span className="bg-[#F3F4F6] text-[#4B5563] text-[12px] px-1.5 py-0.5 rounded-[4px]">
                      系统自动
                    </span>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-[8px] p-3 border border-[#F3F4F6] ml-2">
                    <div className="flex flex-col gap-2 mb-3">
                      <div className="flex items-center text-[13px]">
                        <span className="text-[#6B7280] whitespace-nowrap shrink-0">
                          分数变更：
                        </span>
                        <span className="text-[#9CA3AF] line-through">80</span>
                        <span className="text-[#9CA3AF] mx-2">→</span>
                        <span className="text-[#10B981] font-medium">
                          {popoverState.emp.initialScore}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start text-[13px] pt-3 border-t border-[#E5E7EB]">
                      <span className="text-[#6B7280] shrink-0 whitespace-nowrap">
                        调整原因：
                      </span>
                      <span className="text-[#4B5563] leading-relaxed ml-1">
                        日常绩效考核得分结算。
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 拖拽评级调整原因弹窗 */}
      {pendingDrop && (
        <div className="fixed inset-0 bg-black/40 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-[8px] w-[500px] shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-[20px] border-b border-[#E5E7EB]">
              <h3 className="text-[16px] font-medium text-[#1F2937]">
                填写调整原因
              </h3>
              <button
                onClick={handleCancelDrop}
                className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-[20px] pb-[10px]">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#4B5563]">
                  <span className="text-red-500 mr-1">*</span>调整原因
                </label>
                <textarea
                  value={dropReason}
                  onChange={(e) => setDropReason(e.target.value)}
                  className="w-full border border-[#E5E7EB] rounded-[4px] p-3 text-[14px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] min-h-[120px] resize-none"
                  placeholder="请填写调整评级的原因..."
                />
              </div>
            </div>
            <div className="p-[20px] flex justify-end gap-3 pt-4">
              <button
                onClick={handleCancelDrop}
                className="px-5 py-2 text-[#4B5563] hover:bg-gray-100 rounded-[4px] text-[14px] transition-colors font-medium"
              >
                取消
              </button>
              <button
                onClick={handleConfirmDrop}
                disabled={!dropReason.trim()}
                className="px-5 py-2 bg-[#15B8A6] text-white rounded-[4px] text-[14px] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 催办确认弹窗 */}
      {showUrgeConfirm && (
        <div className="fixed inset-0 bg-black/40 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-[8px] w-[400px] shadow-2xl p-[24px] flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-[#F59E0B]"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3 className="text-[18px] font-medium text-[#1F2937]">
                {selectedUnreachedIds.length > 0 ? "批量催办" : "全部催办"}
              </h3>
            </div>
            <p className="text-[14px] text-[#4B5563]">
              {selectedUnreachedIds.length > 0
                ? `请确认是否要对选中的 ${selectedUnreachedIds.length} 名员工进行催办。`
                : `请确认是否要对处于 [评估节点] 的 ${unreachedContext === "summary" ? unreachedEmployees.length : unreachedEmployees.filter((e) => e.dept === unreachedContext).length} 名员工全部进行催办。`}
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowUrgeConfirm(false)}
                className="px-[16px] h-[32px] text-[#4B5563] hover:bg-[#F3F4F6] rounded-[4px] text-[14px] transition-colors border border-[#E5E7EB]"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowUrgeConfirm(false);
                  setSelectedUnreachedIds([]);
                }}
                className="px-[16px] h-[32px] bg-[#15B8A6] text-white rounded-[4px] text-[14px] hover:bg-[#15B8A6]/90 transition-colors shadow-sm"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 快捷创建等级规则弹窗 (Modal)
// ==========================================
interface LevelDetail {
  id: string;
  name: string;
  min: number;
  max: number;
}

function QuickCreateLevelRuleModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (ruleName: string, levels: { name: string; min: number; max: number }[]) => void;
}) {
  const [ruleName, setRuleName] = useState("");
  const [levels, setLevels] = useState<LevelDetail[]>([
    { id: "1", name: "S", min: 0, max: 10 },
    { id: "2", name: "A", min: 10, max: 30 },
    { id: "3", name: "B", min: 30, max: 90 },
    { id: "4", name: "C", min: 90, max: 100 },
  ]);

  const addLevel = () => {
    const nextChar = String.fromCharCode(65 + levels.length); // A, B, C, D...
    const lastMax = levels.length > 0 ? levels[levels.length - 1].max : 0;
    const newMin = lastMax;
    const newMax = Math.min(100, lastMax + 10);
    setLevels([
      ...levels,
      {
        id: String(Date.now() + Math.random()),
        name: nextChar,
        min: newMin,
        max: newMax,
      },
    ]);
  };

  const removeLevel = (id: string) => {
    if (levels.length <= 2) return;
    const filtered = levels.filter((l) => l.id !== id);
    // Recalculate ranges sequentially to maintain continuity
    let current = 0;
    const recalculated = filtered.map((l) => {
      const diff = l.max - l.min;
      const min = current;
      const max = Math.min(100, current + (diff > 0 ? diff : 10));
      current = max;
      return { ...l, min, max };
    });
    setLevels(recalculated);
  };

  const handleLevelNameChange = (id: string, name: string) => {
    setLevels(levels.map((l) => (l.id === id ? { ...l, name } : l)));
  };

  const handleRangeChange = (id: string, field: "min" | "max", val: number) => {
    setLevels(
      levels.map((l) => (l.id === id ? { ...l, [field]: val } : l)),
    );
  };

  const autoEquallyDivide = () => {
    const count = levels.length;
    if (count === 0) return;
    const step = Math.floor(100 / count);
    let current = 0;
    const divided = levels.map((l, idx) => {
      const min = current;
      const max = idx === count - 1 ? 100 : current + step;
      current = max;
      return { ...l, min, max };
    });
    setLevels(divided);
  };

  const handleSave = () => {
    if (!ruleName.trim()) {
      alert("请输入等级规则名称");
      return;
    }
    onSave(ruleName, levels);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center font-sans bg-black/40">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-[500px] rounded-[8px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.1)] flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-[#F9FAFB]">
          <h3 className="text-[14px] font-semibold text-neutral-800">
            快捷创建选项 - 等级规则
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 font-bold transition-colors cursor-pointer text-[18px]"
          >
            ×
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-neutral-700">
              <span className="text-red-500 mr-1">*</span>等级规则名称 :
            </span>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="请输入名称，例：五等第比例规则"
              className="w-full h-8 px-3 border border-neutral-200 rounded-[4px] text-[13px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-neutral-700">
                等级分布明细配置 :
              </span>
              <button
                type="button"
                onClick={autoEquallyDivide}
                className="text-[11px] text-[#15B8A6] hover:underline font-semibold cursor-pointer"
              >
                自动等分比例
              </button>
            </div>

            <div className="border border-neutral-200 rounded-[8px] overflow-hidden">
              <table className="w-full text-[12px] text-left">
                <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200 font-medium">
                  <tr>
                    <th className="py-2 px-3 w-[70px]">等级</th>
                    <th className="py-2 px-3">预计占比范围 (%)</th>
                    <th className="py-2 px-3 w-[60px] text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono">
                  {levels.map((level) => (
                    <tr key={level.id} className="hover:bg-neutral-50/50">
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={level.name}
                          onChange={(e) => handleLevelNameChange(level.id, e.target.value)}
                          className="w-full h-7 px-2 border border-neutral-200 rounded-[4px] text-center text-[12px] focus:outline-none focus:border-[#15B8A6]"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-1.5 text-neutral-500">
                          <input
                            type="number"
                            value={level.min}
                            onChange={(e) => handleRangeChange(level.id, "min", Number(e.target.value))}
                            className="w-[60px] h-7 px-2 border border-neutral-200 rounded-[4px] text-center text-[12px] focus:outline-none focus:border-[#15B8A6] font-mono"
                          />
                          <span>到</span>
                          <input
                            type="number"
                            value={level.max}
                            onChange={(e) => handleRangeChange(level.id, "max", Number(e.target.value))}
                            className="w-[60px] h-7 px-2 border border-neutral-200 rounded-[4px] text-center text-[12px] focus:outline-none focus:border-[#15B8A6] font-mono"
                          />
                          <span>%</span>
                          <span className="text-[10px] text-neutral-400 font-mono ml-1 shrink-0">
                            (幅: {level.max - level.min}%)
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => removeLevel(level.id)}
                          disabled={levels.length <= 2}
                          className="text-red-500 hover:text-red-700 disabled:text-neutral-300 font-semibold cursor-pointer disabled:cursor-not-allowed"
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-2 bg-neutral-50/70 border-t border-neutral-200 flex justify-center">
                <button
                  type="button"
                  onClick={addLevel}
                  className="text-[11px] text-[#15B8A6] hover:text-[#0f9688] font-semibold flex items-center gap-0.5 cursor-pointer"
                >
                  + 添加一行等级
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end px-4 py-3 bg-[#F9FAFB] border-t border-neutral-200 gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-8 bg-white border border-neutral-200 text-neutral-600 rounded-[4px] text-[12px] hover:bg-neutral-50 hover:text-neutral-800 font-medium transition-colors cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 h-8 bg-[#15B8A6] text-white rounded-[4px] text-[12px] hover:bg-[#0f9688] font-semibold transition-colors cursor-pointer shadow-sm"
          >
            保存并应用选择
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 快捷创建强制分布规则弹窗 (Modal)
// ==========================================
function QuickCreateForcedRuleModal({
  onClose,
  onSave,
  levelRules,
}: {
  onClose: () => void;
  onSave: (ruleName: string, levelRuleName: string, ratios: Record<string, number>) => void;
  levelRules: { value: string; label: string; levels: string[] }[];
}) {
  const [ruleName, setRuleName] = useState("");
  const [selectedLevelId, setSelectedLevelId] = useState("");
  const [levelRatios, setLevelRatios] = useState<Record<string, number>>({});

  const currentLevels = levelRules.find((lr) => lr.value === selectedLevelId)?.levels || [];

  useEffect(() => {
    if (levelRules.length > 0 && !selectedLevelId) {
      setSelectedLevelId(levelRules[0].value);
    }
  }, [levelRules, selectedLevelId]);

  useEffect(() => {
    if (currentLevels.length > 0) {
      const initialRatios: Record<string, number> = {};
      const step = Math.floor(100 / currentLevels.length);
      currentLevels.forEach((level, idx) => {
        initialRatios[level] = idx === currentLevels.length - 1 ? 100 - step * idx : step;
      });
      setLevelRatios(initialRatios);
    }
  }, [selectedLevelId, currentLevels]);

  const handleRatioChange = (level: string, val: number) => {
    setLevelRatios({
      ...levelRatios,
      [level]: Math.max(0, Math.min(100, val)),
    });
  };

  const totalSum = (Object.values(levelRatios) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);

  const handleSave = () => {
    if (!ruleName.trim()) {
      alert("请输入强制分布规则名称");
      return;
    }
    const currentLevelRule = levelRules.find((lr) => lr.value === selectedLevelId);
    if (!currentLevelRule) {
      alert("请选择有效的对应等级规则");
      return;
    }
    if (totalSum !== 100) {
      alert(`当前总分配比例为 ${totalSum}%, 强制分布规则比例总和必须为 100%`);
      return;
    }
    onSave(ruleName, currentLevelRule.label, levelRatios);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center font-sans bg-black/40">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-[480px] rounded-[8px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.1)] flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-[#F9FAFB]">
          <h3 className="text-[14px] font-semibold text-neutral-800">
            快捷创建选项 - 强制分布规则
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 font-bold transition-colors cursor-pointer text-[18px]"
          >
            ×
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-neutral-700">
              <span className="text-red-500 mr-1">*</span>强制分布规则名称 :
            </span>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="请输入规则名称，例：核心骨干分布比例"
              className="w-full h-8 px-3 border border-neutral-200 rounded-[4px] text-[13px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-neutral-700">
              <span className="text-red-500 mr-1">*</span>关联对应等级规则 :
            </span>
            <select
              value={selectedLevelId}
              onChange={(e) => setSelectedLevelId(e.target.value)}
              className="w-full h-8 px-3 border border-neutral-200 rounded-[4px] text-[13px] focus:outline-none focus:border-[#15B8A6] focus:ring-1 focus:ring-[#15B8A6] bg-white text-[#1F2937]"
            >
              {levelRules.map((lr) => (
                <option key={lr.value} value={lr.value}>
                  {lr.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-neutral-700">
                各等级强制分布比例 (%) :
              </span>
              <span className={`text-[12px] font-semibold ${totalSum === 100 ? "text-emerald-600" : "text-amber-500"}`}>
                当前比例总和: {totalSum}% (必须100%)
              </span>
            </div>

            <div className="border border-neutral-200 rounded-[8px] overflow-hidden">
              <table className="w-full text-[12px] text-left">
                <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200 font-medium font-sans">
                  <tr>
                    <th className="py-2 px-4 w-[120px]">等级</th>
                    <th className="py-2 px-4">该等级限额分布比例 (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono">
                  {currentLevels.map((level) => (
                    <tr key={level} className="hover:bg-neutral-50/50">
                      <td className="py-2 px-4 font-semibold text-neutral-700">
                        {level}等
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex items-center gap-1.5 text-neutral-500">
                          <input
                            type="number"
                            value={levelRatios[level] || 0}
                            onChange={(e) => handleRatioChange(level, Number(e.target.value))}
                            className="w-[80px] h-7 px-2 border border-neutral-200 rounded-[4px] text-center text-[12px] focus:outline-none focus:border-[#15B8A6] font-mono"
                          />
                          <span>%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end px-4 py-3 bg-[#F9FAFB] border-t border-neutral-200 gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-8 bg-white border border-neutral-200 text-neutral-600 rounded-[4px] text-[12px] hover:bg-neutral-50 hover:text-neutral-800 font-medium transition-colors cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 h-8 bg-[#15B8A6] text-white rounded-[4px] text-[12px] hover:bg-[#0f9688] font-semibold transition-colors cursor-pointer shadow-sm"
          >
            保存并应用选择
          </button>
        </div>
      </div>
    </div>
  );
}
