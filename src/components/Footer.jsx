import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onNavClick }) {
  return (
    <footer className="bg-[#00172e] text-white border-t border-sky-900/60 no-print">
      
      {/* Top Banner with Slogan */}
      <div className="bg-[#001224] py-8 px-4 border-b border-sky-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          <div className="space-y-1">
            <span className="text-xs font-black text-[#faecc9] bg-white/10 px-3 py-1 rounded-full border border-white/10">
              الدائرة التشريعية لإقليم مديونة
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#faecc9] mt-2">
              د. أمين نقطى كيسمع لكم كل خميس على الساعة 5 زوالاً
            </h3>
            <p className="text-xs text-sky-200">
              في مقر الحزب بمديونة المركز • في خدمة الصالح العام لساكنة الإقليم
            </p>
          </div>

          <button
            onClick={() => onNavClick('book')}
            className="px-6 py-3 bg-[#faecc9] hover:bg-white text-[#00274d] font-black rounded-xl text-xs sm:text-sm shadow-xl transition-all cursor-pointer"
          >
            احجز موعدك للمقابلة الآن
          </button>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#003865] p-2 flex items-center justify-center border border-sky-400/30">
                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-black text-[#faecc9]">د. أمين نقطى</h4>
                <p className="text-[11px] text-sky-300">النائب البرلماني عن إقليم مديونة</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              منصة رقمية مواطنة مخصصة لاستقبال طلبات ومواعيد ساكنة إقليم مديونة والترافع عن قضايا التنمية والعدالة المجالية.
            </p>

            <div className="pt-2">
              <span className="text-[10px] bg-sky-950 px-2.5 py-1 rounded text-sky-300 border border-sky-800">
                RNI | التجمع الوطني للأحرار
              </span>
            </div>
          </div>

          {/* Col 2: Communes */}
          <div className="space-y-3">
            <h5 className="text-xs font-black text-[#faecc9] tracking-wider uppercase">
              جماعات إقليم مديونة الـ 5
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• بلدية مديونة (Médiouna)</li>
              <li>• باشوية تيط مليل (Tit Mellil)</li>
              <li>• باشوية الهراويين (Lahraouyine)</li>
              <li>• جماعة سيدي حجاج واد حصار (Sidi Hajjaj)</li>
              <li>• جماعة المجاطية أولاد طالب (Mejattia)</li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h5 className="text-xs font-black text-[#faecc9] tracking-wider uppercase">
              روابط المنصة
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  الرئيسية والاستقبال
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('book')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  حجز موعد جديد
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('track')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  تتبع حالة موعد سابق
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('advocacy')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  سجل الترافع البرلماني
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  السيرة الذاتية للدكتور أمين نقطى
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('admin')} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer text-[11px]">
                  🔒 فضاء ديوان النائب (إدارة)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3 text-xs text-slate-300">
            <h5 className="text-xs font-black text-[#faecc9] tracking-wider uppercase">
              المكتب البرلماني للتواصل
            </h5>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>مقر حزب التجمع الوطني للأحرار، شارع الحسن الثاني (قرب بلدية مديونة المركز)، إقليم مديونة</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <span>كل خميس على الساعة 5 زوالاً (17:00)</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span dir="ltr">+212 5 22 51 04 20</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>contact@aminenokta.ma</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-6 border-t border-sky-950 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} • المنصة الرسمية لديوان النائب البرلماني الدكتور أمين نقطى - دائرة إقليم مديونة.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>مديونة إلى الأمام 🇲🇦</span>
            <span>•</span>
            <span>المملكة المغربية</span>
          </div>
        </div>

      </div>

    </footer>
  );
}

