import React, { useEffect } from 'react';
import { CheckCircle2, Calendar, Clock, MapPin, Printer, Share2, Search, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StepConfirmation({ appointment, onReset, onGoToTrack }) {
  useEffect(() => {
    // Trigger confetti celebration on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00274d', '#faecc9', '#0284c7', '#10b981']
      });
    } catch (e) {
      console.log('Confetti error:', e);
    }
  }, []);

  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `السلام عليكم، لقد قمت بحجز موعد مع النائب البرلماني الدكتور أمين نقطى (إقليم مديونة).\n\n📌 رمز الموعد: ${appointment.trackingCode}\n🗓️ التاريخ: ${appointment.preferredDate}\n⏰ الساعة: ${appointment.timeSlot}\n📍 المقر: مقر الحزب بمديونة المركز.\nالاسم: ${appointment.fullName}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      
      {/* Success Alert Header */}
      <div className="text-center space-y-2 no-print">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          تم تسجيل موعدكم بنجاح!
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          يسر ديوان النائب البرلماني الدكتور أمين نقطى استقبالكم. احتفظ برمز التتبع أو بطاقة الموعد للاستظهار بها عند الحضور.
        </p>
      </div>

      {/* Official Digital Appointment Pass (Printable Card) */}
      <div className="bg-white rounded-3xl border-2 border-[#00274d] shadow-2xl overflow-hidden relative print:border-black print:shadow-none">
        
        {/* Pass Header */}
        <div className="bg-gradient-to-r from-[#001c38] via-[#003865] to-[#01477d] p-6 text-white text-center border-b-2 border-amber-400/60 print:bg-slate-900">
          <div className="flex items-center justify-between mb-3 text-xs text-sky-200">
            <span>المملكة المغربية • مجلس النواب</span>
            <span className="bg-[#faecc9] text-[#00274d] font-black px-2.5 py-0.5 rounded text-[11px]">
              بطاقة موعد رسمي 📍
            </span>
            <span>دائرة إقليم مديونة</span>
          </div>

          <h4 className="text-2xl font-black text-[#faecc9] tracking-tight">
            المكتب البرلماني للتواصل | د. أمين نقطى
          </h4>
          <p className="text-xs text-sky-100 mt-1 font-medium">
            "كيسمع لكم كل خميس على الساعة 5 زوالاً بمقر الحزب بمديونة"
          </p>
        </div>

        {/* Tracking Code Highlight Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-amber-800 font-bold block">
              رمز تتبع الموعد (Référence de Rendez-vous):
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#00274d] tracking-wider font-mono">
              {appointment.trackingCode}
            </span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
            الحالة: قيد التأكيد والبرمجة ✓
          </span>
        </div>

        {/* Pass Body Content */}
        <div className="p-6 space-y-5 text-slate-800 text-xs">
          
          {/* 4 Details Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block mb-0.5">
                بيانات المواطن:
              </span>
              <p className="text-sm font-black text-slate-900">{appointment.fullName}</p>
              <p className="text-slate-600 font-medium">رقم البطاقة الوطنية (CIN): {appointment.cin}</p>
              <p className="text-slate-600 font-medium">الهاتف: {appointment.phone}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block mb-0.5">
                الانتماء الترابي بإقليم مديونة:
              </span>
              <p className="text-sm font-black text-[#00274d]">{appointment.communeName || 'غير محدد'}</p>
              <p className="text-slate-600 font-medium">الحي / الدوار: {appointment.neighborhood || 'غير محدد'}</p>
              <p className="text-slate-500 text-[11px]">المجال: {appointment.purposeTitle || 'غير محدد'}</p>
            </div>
          </div>

          {/* Date, Time & Mode */}
          <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div>
              <div className="flex items-center justify-center gap-1.5 text-sky-800 font-bold text-[11px] mb-1">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                تاريخ اللقاء
              </div>
              <p className="text-base font-black text-[#00274d]">{appointment.preferredDate}</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5 text-sky-800 font-bold text-[11px] mb-1">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                التوقيت المحدد
              </div>
              <p className="text-base font-black text-[#00274d]">{appointment.timeSlot}</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5 text-sky-800 font-bold text-[11px] mb-1">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                صيغة اللقاء
              </div>
              <p className="text-xs font-black text-slate-800">
                {appointment.appointmentType === 'in_person'
                  ? 'حضوري بالمقر'
                  : appointment.appointmentType === 'phone_call'
                  ? 'اتصال هاتفي'
                  : 'عن بعد (فيديو)'}
              </p>
            </div>
          </div>

          {/* Location instructions */}
          <div className="border border-slate-200 p-3.5 rounded-xl flex items-start gap-3 bg-white">
            <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">
                مقر الاستقبال الرسمي:
              </span>
              <p className="text-slate-600">
                مقر حزب التجمع الوطني للأحرار، مديونة المركز (شارع الحسن الثاني، قرب بلدية مديونة)، إقليم مديونة.
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                * يُرجى الحضور قبل الموعد بـ 10 دقائق مصحوبين ببطاقة التعريف الوطنية والملف الداعم إن وجد.
              </p>
            </div>
          </div>

          {/* Subject note */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 block mb-0.5">
              موضوع المطلب المسجل:
            </span>
            <p className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              {appointment.subject}
            </p>
          </div>

        </div>

        {/* Pass Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>صادرة عن المنصة الرسمية لديوان النائب البرلماني د. أمين نقطى</span>
          <span className="font-mono">{new Date().toLocaleDateString('ar-MA')}</span>
        </div>
      </div>

      {/* Action Buttons (Hidden when printing) */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 no-print">
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Printer className="w-4 h-4 text-slate-600" />
          <span>طباعة بطاقة الموعد</span>
        </button>

        <button
          onClick={handleWhatsAppShare}
          className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>مشاركة بالواتساب</span>
        </button>

        <button
          onClick={() => onGoToTrack(appointment.trackingCode)}
          className="px-5 py-2.5 text-xs font-bold text-sky-900 bg-sky-100 hover:bg-sky-200 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>تتبع حالة هذا الموعد</span>
        </button>

        <button
          onClick={onReset}
          className="px-5 py-2.5 text-xs font-bold text-[#faecc9] bg-[#00274d] hover:bg-[#003865] rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
        >
          <span>حجز موعد لمواطن آخر</span>
        </button>
      </div>

    </div>
  );
}

