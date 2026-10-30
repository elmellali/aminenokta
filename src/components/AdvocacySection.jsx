import React from 'react';
import { Award, FileText, CheckCircle2, Building2, Users, ShieldCheck, HeartHandshake, ArrowLeft } from 'lucide-react';

export default function AdvocacySection({ onBookWithTopic }) {
  const pillars = [
    {
      title: 'الاستماع المباشر والتوثيق الرسمي',
      desc: 'استقبال المواطنين كل خميس على الساعة 5 زوالاً بمقر الحزب بمديونة، وتوثيق كافة الشكايات والملفات ضمن محاضر رسمية.',
      icon: <Users className="w-6 h-6 text-sky-600" />
    },
    {
      title: 'الترافع المؤسساتي والبرلماني',
      desc: 'إحالة القضايا والملفات ذات الأولوية إلى المصالح الإقليمية بعمالة مديونة والوزارات الوصية عبر آليات الترافع والأسئلة البرلمانية بمجلس النواب.',
      icon: <FileText className="w-6 h-6 text-amber-600" />
    },
    {
      title: 'تحقيق العدالة المجالية بإقليم مديونة',
      desc: 'التركيز على فك العزلة، تأهيل المسالك، تعميم الماء الشروب والكهرباء، دعم النقل المدرسي بالعالم القروي، وتوفير فرص الشغل للشباب.',
      icon: <Building2 className="w-6 h-6 text-emerald-600" />
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in" id="advocacy-section">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-amber-700" />
          المهام التمثيلية والترافع البرلماني
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          صوت ساكنة إقليم مديونة بمجلس النواب
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          تُعد جلسات الاستماع الأسبوعية المباشرة التي يعقدها الدكتور أمين نقطى آلية تشاركية لنقل انشغالات الساكنة والترافع عنها لدى السلطات والمؤسسات المعنية.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              {pillar.icon}
            </div>
            <h4 className="text-base font-black text-slate-900">
              {pillar.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Citizen Collaboration Banner */}
      <div className="bg-[#00274d] text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-sky-800">
        <div className="space-y-2 text-center sm:text-right">
          <span className="text-[11px] font-bold text-[#faecc9] bg-white/10 px-3 py-1 rounded-full">
            الموعد الأسبوعي القار
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#faecc9]">
            «كيسمع لكم كل خميس على الساعة 5 زوالاً بمقر الحزب بمديونة»
          </h3>
          <p className="text-xs sm:text-sm text-sky-100">
            احجز موعدك مسبقاً لعرض ملفك أو مقترحك مباشرة على الدكتور أمين نقطى.
          </p>
        </div>

        <button
          onClick={onBookWithTopic}
          className="px-6 py-3.5 bg-[#faecc9] hover:bg-[#fff2d4] text-[#00274d] font-black rounded-xl text-xs sm:text-sm shadow-lg transition-all shrink-0 cursor-pointer flex items-center gap-2"
        >
          <span>حجز موعد لجلسة الخميس القادمة</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
}
