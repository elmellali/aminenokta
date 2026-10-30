import React from 'react';
import { MapPin, Navigation, ArrowLeft, Clock, Calendar } from 'lucide-react';

export default function CommunesGrid({ communes = [], onSelectCommune }) {
  const communeDetails = [
    {
      id: 'mediouna',
      name: 'بلدية مديونة',
      badge: 'المركز الإداري والحضري',
      type: 'جماعة حضرية',
      description: 'حاضرة إقليم مديونة ومركز المؤسسات، مفتوحة أمام كافة ساكنة وتجزئات وأحياء مديونة المركز.',
      color: 'from-blue-700 to-sky-800'
    },
    {
      id: 'tit_mellil',
      name: 'باشوية تيط مليل',
      badge: 'القطب السكني والصناعي',
      type: 'جماعة حضرية',
      description: 'بوابة الإقليم الاستثمارية والصناعية، لاستقبال الساكنة والشباب وممثلي الهيئات والوداديات.',
      color: 'from-indigo-700 to-blue-800'
    },
    {
      id: 'lahraouyine',
      name: 'باشوية الهراويين',
      badge: 'جماعة حضرية صاعدة',
      type: 'جماعة حضرية',
      description: 'كثافة سكانية ونمو عمراني سريع، لاستقبال انشغالات ومطالب الساكنة في مختلف الأحياء والمشاريع.',
      color: 'from-sky-700 to-cyan-800'
    },
    {
      id: 'sidi_hajjaj',
      name: 'جماعة سيدي حجاج واد حصار',
      badge: 'توسع سكني وقروي',
      type: 'جماعة ترابية',
      description: 'أكبر جماعات الإقليم مساحة، مخصصة لاستقبال ساكنة المركز، التجزئات السكنية، ومختلف دواوير الجماعة.',
      color: 'from-teal-700 to-emerald-800'
    },
    {
      id: 'mejattia',
      name: 'جماعة المجاطية أولاد طالب',
      badge: 'حزام فلاحي وتنموي',
      type: 'جماعة ترابية',
      description: 'حاضنة التراث الفلاحي لمديونة، لاستقبال عموم الساكنة والفلاحين وحاملي المبادرات التنموية بمختلف الدواوير.',
      color: 'from-amber-700 to-yellow-800'
    }
  ];

  return (
    <section className="py-16 bg-slate-100/70 border-b border-slate-200" id="communes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-[#00274d] text-xs font-bold">
            <Navigation className="w-3.5 h-3.5 text-[#00274d]" />
            التمثيل البرلماني والعدالة المجالية
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            جماعات إقليم مديونة الـ 5
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            يستقبل النائب البرلماني <strong>الدكتور أمين نقطى</strong> ساكنة كافة جماعات ودواوير إقليم مديونة <strong>كل خميس على الساعة 5 زوالاً (17:00)</strong> بمقر الحزب بمديونة المركز.
          </p>
        </div>

        {/* 5 Communes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communeDetails.map((commune) => (
            <div
              key={commune.id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Header Strip */}
                <div className={`p-5 bg-gradient-to-r ${commune.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                      {commune.type}
                    </span>
                    <span className="text-xs font-medium text-sky-100 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      إقليم مديونة
                    </span>
                  </div>
                  <h3 className="text-xl font-black mt-2 text-white">
                    {commune.name}
                  </h3>
                  <p className="text-xs text-sky-100 font-medium mt-0.5">
                    {commune.badge}
                  </p>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {commune.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>الاستقبال: كل خميس على الساعة 17:00 بمقر الحزب بمديونة</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectCommune(commune.id)}
                  className="w-full py-3 px-4 text-xs font-bold text-[#00274d] bg-sky-50 hover:bg-[#faecc9] hover:text-[#00274d] border border-sky-200 hover:border-amber-300 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:bg-[#faecc9]"
                >
                  <span>حجز موعد لساكنة {commune.name}</span>
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </div>
          ))}

          {/* 6th Card: Thursday Flagship Session Highlight */}
          <div className="bg-gradient-to-br from-[#00274d] via-[#003865] to-[#01477d] rounded-3xl p-6 text-white flex flex-col justify-between border-2 border-amber-400/60 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="inline-block bg-amber-400/20 text-[#faecc9] text-[11px] font-bold px-3 py-1 rounded-full border border-amber-400/30">
                الموعد الأسبوعي القار ⭐
              </span>
              <h3 className="text-2xl font-black text-[#faecc9]">
                جلسة كل خميس (17:00)
              </h3>
              <p className="text-xs text-sky-100 leading-relaxed">
                «كيسمع لكم كل خميس على الساعة 5 زوالاً في مقر الحزب بمديونة». موعد أسبوعي للاستماع المباشر لكافة المواطنات والمواطنين من جميع جماعات الإقليم.
              </p>
              <div className="bg-[#001c38]/80 p-3.5 rounded-xl border border-sky-800 text-xs text-slate-200 space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>المقر: شارع الحسن الثاني (قرب بلدية مديونة المركز)</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>التوقيت: كل خميس ابتداءً من 17:00</span>
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <button
                onClick={() => onSelectCommune('mediouna')}
                className="w-full py-3.5 px-4 text-xs font-black text-[#00274d] bg-[#faecc9] hover:bg-[#fff2d1] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>حجز موعد لجلسة الخميس القادمة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
