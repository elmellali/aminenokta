import React, { useState, useEffect } from 'react';
import { Search, Clock, CheckCircle2, AlertCircle, MapPin, Calendar, User, Phone, FileText, ArrowLeft } from 'lucide-react';
import { trackAppointment } from '../api';

export default function TrackAppointment({ initialCode = '', onGoToBook }) {
  const [code, setCode] = useState(initialCode);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      handleSearch(initialCode);
    }
  }, [initialCode]);

  const handleSearch = async (searchCode = code) => {
    if (!searchCode || searchCode.trim().length < 3) {
      setErrorMsg('المرجو إدخال رمز تتبع الموعد (مثال: NOKTA-MDN-7412)');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setAppointment(null);

    try {
      const data = await trackAppointment(searchCode, query);
      setAppointment(data);
    } catch (err) {
      setErrorMsg(err.message || 'لم نتمكن من العثور على أي موعد بهذا الرمز. تحقق من الرمز المدخل.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStage = (status) => {
    switch (status) {
      case 'pending': return 1;
      case 'confirmed': return 2;
      case 'completed': return 3;
      case 'cancelled': return -1;
      default: return 1;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-fade-in" id="track-section">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-block px-3 py-1 bg-sky-100 text-[#00274d] rounded-full text-xs font-bold">
          بوابة الشفافية وتتبع الملفات
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          تتبع حالة موعدك لدى النائب د. أمين نقطى
        </h2>
        <p className="text-sm text-slate-600">
          أدخل رمز التتبع المسلم لك عند التسجيل لمتابعة قرار ديوان النائب وتوقيت الاستقبال.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-7 relative">
            <input
              type="text"
              placeholder="رمز التتبع (مثال: NOKTA-MDN-7412)"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full pr-10 pl-3 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono uppercase"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-3 top-3.5" />
          </div>

          <div className="sm:col-span-5 relative">
            <input
              type="text"
              placeholder="رقم الهاتف أو CIN (اختياري)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pr-3 pl-3 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-right"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-1">

          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="px-6 py-2.5 bg-[#00274d] hover:bg-[#003865] text-[#faecc9] rounded-xl text-xs font-black shadow-md transition-all cursor-pointer"
          >
            {loading ? 'جاري البحث...' : 'البحث عن الموعد'}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Appointment Result Details */}
      {appointment && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden space-y-6">
          
          {/* Header Status Bar */}
          <div className="bg-gradient-to-r from-[#00274d] to-[#01477d] p-6 text-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-sky-200 font-medium">الموعد المسجل</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#faecc9] font-mono">
                {appointment.trackingCode}
              </h3>
              <p className="text-xs text-sky-100 mt-0.5">
                المواطن: {appointment.fullName}{appointment.communeName ? ` • ${appointment.communeName}` : ''}
              </p>
            </div>

            <div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-black ${
                appointment.status === 'confirmed'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : appointment.status === 'completed'
                  ? 'bg-sky-400 text-[#00274d]'
                  : appointment.status === 'cancelled'
                  ? 'bg-red-500 text-white'
                  : 'bg-amber-400 text-amber-950'
              }`}>
                {appointment.status === 'confirmed'
                  ? '✓ موعد مؤكد ومبرمج'
                  : appointment.status === 'completed'
                  ? '★ تم اللقاء ومعالجة الملف'
                  : appointment.status === 'cancelled'
                  ? 'اعتذار / ملغى'
                  : '⏳ قيد المراجعة والدراسة'}
              </span>
            </div>
          </div>

          {/* Interactive Status Timeline */}
          <div className="px-6 py-4">
            <h4 className="text-xs font-bold text-slate-500 mb-4">مسار معالجة الطلب:</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Step 1: Submission */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                getStatusStage(appointment.status) >= 1
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold">1. تسجيل الطلب</h5>
                  <p className="text-[11px] text-slate-600 mt-0.5">تم استلام المعطيات بالمنصة</p>
                </div>
              </div>

              {/* Step 2: Confirmation */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                getStatusStage(appointment.status) >= 2
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  getStatusStage(appointment.status) >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                }`}>
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold">2. تأكيد وبرمجة اللقاء</h5>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {appointment.status === 'confirmed'
                      ? 'تم تحديد التوقيت والقاعة'
                      : 'قيد المصادقة من الديوان'}
                  </p>
                </div>
              </div>

              {/* Step 3: Meeting Completed */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                getStatusStage(appointment.status) >= 3
                  ? 'bg-sky-50 border-sky-200 text-sky-950'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  getStatusStage(appointment.status) >= 3 ? 'bg-sky-700 text-white' : 'bg-slate-300 text-slate-600'
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold">3. انعقاد اللقاء والترافع</h5>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {appointment.status === 'completed'
                      ? 'تم الاستماع وإحالة الملف'
                      : 'المرحلة التالية'}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Appointment Core Info */}
          <div className="px-6 pb-6 space-y-4">
            
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-[11px] text-slate-500 font-bold block mb-1">تاريخ المقابلة</span>
                <p className="text-base font-black text-[#00274d]">{appointment.preferredDate}</p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-bold block mb-1">الساعة المحددة</span>
                <p className="text-base font-black text-[#00274d]">{appointment.timeSlot}</p>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-bold block mb-1">صيغة المقابلة</span>
                <p className="text-xs font-black text-slate-800">
                  {appointment.appointmentType === 'in_person'
                    ? 'حضوري بمقر الحزب'
                    : appointment.appointmentType === 'phone_call'
                    ? 'اتصال هاتفي مباشر'
                    : 'عن بعد'}
                </p>
              </div>
            </div>

            {/* Room / Location info */}
            {appointment.assignedRoom && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-700 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-amber-950 block">القاعة أو الرابط المخصص:</span>
                  <span className="text-amber-900">{appointment.assignedRoom}</span>
                </div>
              </div>
            )}

            {/* Office Directions */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-900 block">العنوان والمقر:</span>
                <p className="text-slate-600">
                  مقر حزب التجمع الوطني للأحرار، شارع الحسن الثاني (قرب بلدية مديونة المركز)، إقليم مديونة.
                </p>
                <p className="text-[11px] text-slate-500">
                  جلسات الاستماع المباشرة للنائب د. أمين نقطى: كل خميس على الساعة 5 زوالاً.
                </p>
              </div>
            </div>

            {/* Official Notes from office if any */}
            {appointment.adminNotes && (
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-emerald-900 block">
                  ملاحظات وتوجيهات ديوان النائب البرلماني:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {appointment.adminNotes}
                </p>
              </div>
            )}

            {/* Subject summary */}
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-700 block mb-0.5">موضوع الملف:</span>
              <p>{appointment.subject}</p>
            </div>

          </div>

        </div>
      )}

      {/* Helper Footer */}
      <div className="text-center pt-4">
        <p className="text-xs text-slate-500 mb-2">
          هل تود حجز موعد جديد أو تقديم طلب آخر؟
        </p>
        <button
          onClick={onGoToBook}
          className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          الانتقال لبوابة حجز المواعيد
        </button>
      </div>

    </div>
  );
}

