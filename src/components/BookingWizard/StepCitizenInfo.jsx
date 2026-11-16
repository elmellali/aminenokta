import React, { useState } from 'react';
import { User, Phone, CreditCard, Mail, FileText, Upload, ArrowLeft, ArrowRight, ShieldCheck, AlertCircle, MapPin } from 'lucide-react';
import { DEFAULT_COMMUNES, DEFAULT_PURPOSES } from '../../defaultData';

export default function StepCitizenInfo({
  purposes = [],
  communes = [],
  selectedPurpose,
  onSelectPurpose,
  selectedCommune,
  onSelectCommune,
  selectedNeighborhood,
  onSelectNeighborhood,
  citizenData,
  setCitizenData,
  onSubmit,
  onBack,
  isSubmitting,
  submitError = ''
}) {
  const [errors, setErrors] = useState({});
  const purposeList = purposes.length > 0 ? purposes : DEFAULT_PURPOSES;
  const communeList = communes.length > 0 ? communes : DEFAULT_COMMUNES;

  const validate = () => {
    const errs = {};
    if (!citizenData.fullName || citizenData.fullName.trim().length < 3) {
      errs.fullName = 'المرجو إدخال الاسم الكامل بشكل صحيح';
    }
    
    // Moroccan phone format check: 10 digits starting with 06 or 07
    const cleanPhone = (citizenData.phone || '').replace(/\s+/g, '');
    if (!cleanPhone || !/^(06|07|05)\d{8}$/.test(cleanPhone)) {
      errs.phone = 'المرجو إدخال رقم هاتف مغربي صحيح (يبدأ بـ 06 أو 07 أو 05 ويتكون من 10 أرقام)';
    }

    if (!citizenData.cin || citizenData.cin.trim().length < 4) {
      errs.cin = 'المرجو إدخال رقم البطاقة الوطنية للتعريف (CIN)';
    }

    if (!citizenData.subject || citizenData.subject.trim().length < 5) {
      errs.subject = 'المرجو تحديد موضوع الموعد أو الشكاية باختصار';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-black text-slate-900">
          الخطوة 2: معلوماتكم
        </h3>
        <p className="text-sm text-slate-600">
          معلوماتكم الشخصية محفوظة بسرية تامة وتُستخدم حصرياً للتواصل الرسمي من طرف ديوان النائب د. أمين نقطى.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">

        {/* Purpose */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            نوع الموعد (اختياري)
          </label>
          <div className="flex flex-wrap gap-2">
            {purposeList.map((p) => (
              <button
                type="button"
                key={p.id}
                onClick={() => onSelectPurpose(selectedPurpose?.id === p.id ? null : p)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                  selectedPurpose?.id === p.id ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-400/30' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'
                }`}
              >
                {(p.subTitle || p.title || '').trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Commune & Neighborhood */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              الجماعة (اختياري)
            </label>
            <select
              value={selectedCommune?.id || ''}
              onChange={(e) => onSelectCommune(communeList.find(c => c.id === e.target.value) || null)}
              className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">اختر الجماعة...</option>
              {communeList.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              الحي أو الدوار (اختياري)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="اسم الحي أو الدوار..."
                value={selectedNeighborhood || ''}
                onChange={(e) => onSelectNeighborhood(e.target.value)}
                className="w-full pr-10 pl-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>
        </div>

        {/* Full Name & CIN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              الاسم الكامل (المواطن أو رئيس الهيئة) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="مثال: محمد الإدريسي"
                value={citizenData.fullName || ''}
                onChange={(e) => setCitizenData({ ...citizenData, fullName: e.target.value })}
                className={`w-full pr-10 pl-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
            {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              رقم البطاقة الوطنية للتعريف (CIN) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="مثال: BK123456"
                value={citizenData.cin || ''}
                onChange={(e) => setCitizenData({ ...citizenData, cin: e.target.value.toUpperCase() })}
                className={`w-full pr-10 pl-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 uppercase ${
                  errors.cin ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
            {errors.cin && <p className="text-[11px] text-red-600 mt-1">{errors.cin}</p>}
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              رقم الهاتف (الواتساب ضروري لتأكيد الموعد) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="06XXXXXXXX أو 07XXXXXXXX"
                dir="ltr"
                value={citizenData.phone || ''}
                onChange={(e) => setCitizenData({ ...citizenData, phone: e.target.value })}
                className={`w-full pr-10 pl-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-right ${
                  errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
            {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              البريد الإلكتروني (اختياري)
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="nom@exemple.ma"
                dir="ltr"
                value={citizenData.email || ''}
                onChange={(e) => setCitizenData({ ...citizenData, email: e.target.value })}
                className="w-full pr-10 pl-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-right"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            موضوع الطلب / الشكاية باختصار <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="مثال: شكاية بخصوص النقل المدرسي بدوار أولاد حادة / طلب دعم مركز صحي..."
              value={citizenData.subject || ''}
              onChange={(e) => setCitizenData({ ...citizenData, subject: e.target.value })}
              className={`w-full pr-10 pl-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                errors.subject ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
              }`}
            />
            <FileText className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          </div>
          {errors.subject && <p className="text-[11px] text-red-600 mt-1">{errors.subject}</p>}
        </div>

        {/* Details textarea */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            تفاصيل الملف والمعطيات الداعمة (اختياري):
          </label>
          <textarea
            rows="3"
            placeholder="اشرح المشكل، أو المقترح، أو الجهات التي تمت مراسلتها سابقاً لمساعدة ديوان النائب في التحضير للقاء..."
            value={citizenData.details || ''}
            onChange={(e) => setCitizenData({ ...citizenData, details: e.target.value })}
            className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          ></textarea>
        </div>

        {/* Document Upload note */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-dashed border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Upload className="w-5 h-5 text-slate-500" />
            <div>
              <span className="text-xs font-bold text-slate-700 block">
                هل تتوفر على وثيقة أو عريضة داعمة؟
              </span>
              <span className="text-[11px] text-slate-500">
                يمكنك إحضارها مباشرة يوم اللقاء أو تسليمها لديوان النائب.
              </span>
            </div>
          </div>
          <span className="text-[11px] text-sky-700 bg-sky-100 font-bold px-2.5 py-1 rounded-md">
            الحضور بالملف الورقي
          </span>
        </div>

        {/* Assurance badge */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>
            التزام سياسي وأخلاقي: معالجة كافة طلبات المواطنين بشفافية وعدالة تامة في إطار خدمة الصالح العام لإقليم مديونة.
          </span>
        </div>

      </div>

      {submitError && (
        <div role="alert" className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Nav Buttons */}
      <div className="flex justify-between items-center pt-2 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3.5 rounded-xl text-sm font-black bg-gradient-to-r from-[#00274d] to-[#01477d] text-[#faecc9] hover:from-[#003366] hover:to-[#015a9e] shadow-xl hover:shadow-sky-950/30 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {isSubmitting ? (
            <span>جاري تسجيل طلب الموعد...</span>
          ) : (
            <>
              <span>تأكيد الموعد واستخراج البطاقة الرسمية</span>
              <ArrowLeft className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

