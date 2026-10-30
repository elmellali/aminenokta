import React from 'react';
import { Building2, HeartHandshake, Briefcase, Lightbulb, Users, MessageSquare, ArrowLeft } from 'lucide-react';
import { DEFAULT_PURPOSES } from '../../defaultData';

export default function StepPurpose({ purposes = [], selectedPurpose, onSelectPurpose, onNext }) {
  // Use fallback if purposes is empty or still loading
  const purposeList = purposes && purposes.length > 0 ? purposes : DEFAULT_PURPOSES;

  // Map icon names to Lucide icons
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      default: return <MessageSquare className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-black text-slate-900">
          الخطوة 1: ما هو موضوع أو غرض الموعد؟
        </h3>
        <p className="text-sm text-slate-600">
          اختر نوع الملف أو المطلب لتوجيهه بشكل دقيق إلى المصالح والقطاعات البرلمانية المختصة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {purposeList.map((p) => {
          const isSelected = selectedPurpose?.id === p.id;
          return (
            <div
              key={p.id}
              onClick={() => onSelectPurpose(p)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between gap-4 select-none ${
                isSelected
                  ? 'border-sky-600 bg-sky-50 shadow-md ring-2 ring-sky-400/30'
                  : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${
                      isSelected ? 'bg-sky-600 text-white shadow-md' : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {getIcon(p.icon)}
                  </div>
                  {p.category && (
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                      isSelected ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}>
                      {p.category}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="pt-2 border-t border-sky-200 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    تم الاختيار ✓
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <button
          disabled={!selectedPurpose}
          onClick={onNext}
          className={`px-8 py-3 rounded-xl text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
            selectedPurpose
              ? 'bg-[#00274d] text-[#faecc9] hover:bg-[#003865] shadow-lg shadow-sky-950/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>المتابعة لاختيار الجماعة</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
