import React from 'react';
import { MapPin, ArrowLeft, ArrowRight, Building, Check } from 'lucide-react';
import { DEFAULT_COMMUNES } from '../../defaultData';

export default function StepCommune({
  communes = [],
  selectedCommune,
  selectedNeighborhood,
  onSelectCommune,
  onSelectNeighborhood,
  onNext,
  onBack
}) {
  const communeList = communes && communes.length > 0 ? communes : DEFAULT_COMMUNES;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-black text-slate-900">
          الخطوة 2: الانتماء الترابي والجماعة بإقليم مديونة
        </h3>
        <p className="text-sm text-slate-600">
          اختر الجماعة الترابية التي تنتمي إليها بإقليم مديونة.
        </p>
      </div>

      {/* 5 Communes Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          1. اختر الجماعة الترابية بإقليم مديونة: <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {communeList.map((c) => {
            const isSelected = selectedCommune?.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => onSelectCommune(c)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                  isSelected
                    ? 'border-sky-600 bg-sky-50 shadow-md ring-2 ring-sky-500/20'
                    : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {c.type}
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-1">
                    {c.name}
                  </h4>
                  {c.badge && (
                    <p className="text-[11px] text-sky-700 font-medium mt-0.5">
                      {c.badge}
                    </p>
                  )}
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Optional Neighborhood / Douar Input Field (non obligatoire) */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-900">
            2. الحي أو الدوار أو العنوان السكني:
          </label>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-md">
            اختياري (غير إلزامي)
          </span>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="اكتب اسم حيك، دوارك، إقامتك، أو عنوانك السكني (اختياري)..."
            value={selectedNeighborhood || ''}
            onChange={(e) => onSelectNeighborhood(e.target.value)}
            className="w-full pr-10 pl-4 py-3 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
          />
          <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
        </div>
        <p className="text-[11px] text-slate-500">
          {selectedCommune
            ? `تابع لـ ${selectedCommune.name} (إقليم مديونة)`
            : 'اختر جماعتك أعلاه للمتابعة.'}
        </p>
      </div>

      {/* Nav Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        <button
          disabled={!selectedCommune}
          onClick={onNext}
          className={`px-8 py-3 rounded-xl text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
            selectedCommune
              ? 'bg-[#00274d] text-[#faecc9] hover:bg-[#003865] shadow-lg shadow-sky-950/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>المتابعة لاختيار موعد الخميس (17:00)</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
