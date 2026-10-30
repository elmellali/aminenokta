import React from 'react';
import { Award, GraduationCap, MapPin, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AboutSection({ onBookClick }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in" id="about-section">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
          نبذة تعريفية
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          الدكتور أمين نقطى
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          النائب البرلماني عن دائرة إقليم مديونة • المنسق الإقليمي لحزب التجمع الوطني للأحرار
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Photo Box */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative max-w-md w-full">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-sky-600 rounded-3xl blur-lg opacity-30"></div>
            
            <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-[#001c38]">
              <img
                src="/images/dr_amine_nokta.jpg"
                alt="الدكتور أمين نقطى - النائب البرلماني عن إقليم مديونة"
                className="w-full aspect-[3/4] object-cover object-top"
              />
              
              <div className="p-5 bg-gradient-to-t from-[#001c38] via-[#00274d] to-transparent text-white text-center">
                <span className="inline-block bg-[#faecc9] text-[#00274d] font-black text-xs px-3 py-1 rounded shadow">
                  مديونة 📍
                </span>
                <h3 className="text-xl font-black text-[#faecc9] mt-2">
                  د. أمين نقطى
                </h3>
                <p className="text-xs text-sky-200">
                  «كيسمع لكم كل خميس على الساعة 5 زوالاً في مقر الحزب بمديونة»
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Academic Credentials */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-[#00274d]">
              المسار الأكاديمي والتمثيل البرلماني
            </h3>
            
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>الدكتور أمين نقطى</strong> حاصل على <strong>شهادة الدكتوراه في العلوم السياسية</strong>، ويشتغل في المجال الاقتصادي.
            </p>
            
            <p className="text-sm text-slate-600 leading-relaxed">
              يشغل مهام <strong>المنسق الإقليمي لحزب التجمع الوطني للأحرار</strong> بإقليم مديونة، وانتُخب نائباً برلمانياً بمجلس النواب عن دائرة إقليم مديونة برسم الانتخابات التشريعية لشهر شتنبر 2026.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              يواصل عمله الميداني وتواصله المباشر مع ساكنة كافة جماعات الإقليم (مديونة، تيط مليل، الهراويين، سيدي حجاج واد حصار، والمجاطية أولاد طالب)، مكرساً مبدأ الاستماع والقرب الدائم.
            </p>
          </div>

          {/* 2 Academic & Political Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-slate-900">
                التكوين العلمي
              </h4>
              <p className="text-xs text-slate-600">
                دكتوراه في العلوم السياسية، واشتغال في المجال الاقتصادي.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-slate-900">
                التمثيل والمسؤولية
              </h4>
              <p className="text-xs text-slate-600">
                نائب برلماني عن دائرة إقليم مديونة ومنسق إقليمي لحزب التجمع الوطني للأحرار.
              </p>
            </div>

          </div>

          {/* Regular Reception Notice */}
          <div className="p-5 bg-gradient-to-r from-sky-50 to-amber-50 rounded-2xl border border-amber-200 space-y-1.5">
            <span className="text-[11px] font-black text-amber-900 block flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-700" />
              الموعد الأسبوعي القار للاستقبال:
            </span>
            <p className="text-xs text-slate-800 leading-relaxed font-bold">
              «كيسمع لكم كل خميس على الساعة 5 زوالاً (17:00) في مقر الحزب بمديونة المركز»
            </p>
            <p className="text-[11px] text-slate-500">
              شارع الحسن الثاني (قرب بلدية مديونة المركز)، إقليم مديونة.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <button
              onClick={onBookClick}
              className="px-6 py-3 bg-[#00274d] hover:bg-[#003865] text-[#faecc9] font-black rounded-xl text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
            >
              حجز موعد لمقابلة الدكتور أمين نقطى (كل خميس 17:00)
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
