import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, ChevronLeft, ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero({ onStartBooking, onTrackBooking, stats }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#001933] via-[#00325c] to-[#01477d] text-white pt-8 pb-16 lg:py-20 border-b border-sky-800/50 shadow-2xl">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Right Column (RTL Primary): Text & Slogan & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-sky-100 shadow-sm mx-auto lg:mx-0">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold text-[#faecc9]">بوابة خدمة المواطنات والمواطنين</span>
              <span className="text-sky-300">•</span>
              <span className="text-white font-medium">الدائرة التشريعية لإقليم مديونة</span>
            </div>

            {/* Main Title & Catchphrase */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#faecc9] tracking-tight leading-none drop-shadow-md">
                د. أمين نقطى
              </h1>
              
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
                كيسمع لكم كل خميس على الساعة{' '}
                <span className="text-[#faecc9] underline decoration-amber-400/60 decoration-wavy underline-offset-8">
                  5 زوالاً
                </span>
                <br />
                في مقر الحزب بمديونة.
              </p>
            </div>

            {/* Civic Commitment Subtitle */}
            <p className="text-base sm:text-lg text-sky-100/90 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              المنصة الرسمية المباشرة لساكنة جماعات إقليم مديونة الـ 5 (
              <strong className="text-[#faecc9] font-bold">بلدية مديونة، باشوية تيط مليل، باشوية الهراويين، جماعة سيدي حجاج واد حصار، وجماعة المجاطية أولاد طالب</strong>
              ) لحجز مواعيد الاستقبال، طرح الشكايات والمقترحات التنموية، والترافع الفعال لصالح الإقليم.
            </p>

            {/* Factual Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-sky-200">
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-sky-950/50 p-2.5 rounded-lg border border-sky-800/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>استماع مباشر وتوثيق رسمي</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-sky-950/50 p-2.5 rounded-lg border border-sky-800/40">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ترافع برلماني ومتابعة دقيقة</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-sky-950/50 p-2.5 rounded-lg border border-sky-800/40">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>تأكيد فوري عبر الواتساب</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <button
                onClick={onStartBooking}
                className="w-full sm:w-auto px-8 py-4 text-base font-black text-[#00274d] bg-gradient-to-r from-[#faecc9] via-[#f7e4b5] to-[#ebd498] hover:from-[#fff2d4] hover:to-[#faecc9] rounded-xl shadow-xl hover:shadow-amber-400/25 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-[#00274d]" />
                <span>احجز موعد الخميس (17:00)</span>
                <ChevronLeft className="w-4 h-4 text-[#00274d]" />
              </button>

              <button
                onClick={onTrackBooking}
                className="w-full sm:w-auto px-6 py-4 text-sm font-bold text-sky-100 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <span>تتبع حالة موعد سابق</span>
              </button>
            </div>

            {/* Fast Reception Announcement Alert */}
            <div className="bg-[#002042]/90 border border-amber-400/40 p-4 rounded-xl flex items-center gap-3.5 shadow-lg text-right">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#faecc9] font-bold">
                  الموعد الأسبوعي القار: كل خميس على الساعة 17:00 (5 زوالاً)
                </p>
                <p className="text-[12px] text-slate-300">
                  المقر: مقر الحزب بمديونة المركز (شارع الحسن الثاني قرب بلدية مديونة) • الاستقبال متاح لكافة الساكنة بعد التسجيل
                </p>
              </div>
            </div>
          </div>

          {/* Left Column: Official Photo with High-Definition Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm sm:max-w-md w-full">
              
              {/* Glow backdrop behind photo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400/40 via-sky-400/40 to-sky-600/40 rounded-3xl blur-xl opacity-75 animate-pulse"></div>

              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#003865] to-[#001c38] border-2 border-[#faecc9]/50 shadow-2xl">
                
                {/* Official Photo */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0c1626]">
                  <img
                    src="/images/dr_amine_nokta.jpg"
                    alt="الدكتور أمين نقطى - النائب البرلماني عن إقليم مديونة"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a36] via-transparent to-transparent"></div>

                  {/* Top corner emblem */}
                  <div className="absolute top-3 right-3 bg-[#001f3f]/85 backdrop-blur-md px-3 py-1 rounded-full border border-sky-400/40 text-[11px] font-bold text-[#faecc9]">
                    عضو مجلس النواب المغربي
                  </div>

                  {/* Bottom Location Badge */}
                  <div className="absolute bottom-4 right-4">
                    <span className="inline-flex items-center gap-1.5 bg-[#faecc9] text-[#00274d] text-xs font-black px-3 py-1.5 rounded-md shadow-lg border border-amber-300">
                      <span>مديونة</span>
                      <MapPin className="w-3.5 h-3.5 text-[#00274d]" />
                    </span>
                  </div>

                  {/* Bottom Left: RNI Dove logo */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#00274d]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span className="text-[11px] font-bold text-white tracking-wider">
                      RNI | التجمع الوطني للأحرار
                    </span>
                  </div>
                </div>

                {/* Bottom info banner on card */}
                <div className="p-4 bg-[#001c38] border-t border-sky-900/60 text-center">
                  <p className="text-sm font-extrabold text-[#faecc9]">
                    د. أمين نقطى
                  </p>
                  <p className="text-xs text-sky-200 mt-0.5">
                    دكتوراه في العلوم السياسية • خبير اقتصادي
                  </p>
                  <p className="text-[11px] text-slate-300 mt-1 italic">
                    «كيسمع لكم كل خميس على الساعة 5 زوالاً بمقر الحزب بمديونة»
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Factual Bar */}
        <div className="mt-14 pt-8 border-t border-sky-800/40 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="bg-sky-950/40 p-4 rounded-xl border border-sky-800/30">
            <div className="text-2xl sm:text-3xl font-black text-[#faecc9]">5 جماعات</div>
            <div className="text-xs text-sky-200 font-medium mt-1">تغطية لكافة تراب إقليم مديونة</div>
          </div>
          <div className="bg-sky-950/40 p-4 rounded-xl border border-sky-800/30">
            <div className="text-2xl sm:text-3xl font-black text-white">كل خميس</div>
            <div className="text-xs text-sky-200 font-medium mt-1">استقبال مباشر على الساعة 17:00 (5 زوالاً)</div>
          </div>
          <div className="bg-sky-950/40 p-4 rounded-xl border border-sky-800/30">
            <div className="text-2xl sm:text-3xl font-black text-[#faecc9]">مقر الحزب بمديونة</div>
            <div className="text-xs text-sky-200 font-medium mt-1">شارع الحسن الثاني قرب البلدية</div>
          </div>
          <div className="bg-sky-950/40 p-4 rounded-xl border border-sky-800/30">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">تأكيد رسمي</div>
            <div className="text-xs text-sky-200 font-medium mt-1">إشعار بالواتساب وبطاقة موعد رقمية</div>
          </div>
        </div>

      </div>
    </section>
  );
}
