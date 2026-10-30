import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ArrowLeft, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { fetchSlots } from '../../api';

export default function StepDateTime({
  meetingType,
  setMeetingType,
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  onNext,
  onBack
}) {
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsData, setSlotsData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate upcoming Thursdays only (Day of reception: every Thursday at 17:00)
  const getUpcomingThursdays = () => {
    const dates = [];
    const today = new Date();
    
    // Check next 60 days to find Thursdays
    for (let i = 1; i <= 60; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      
      if (d.getDay() === 4) { // 4 = Thursday
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;

        dates.push({
          dateStr,
          dayName: 'الخميس',
          formatted: `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`,
          tag: 'جلسة الاستماع (17:00)'
        });
      }
    }
    return dates.slice(0, 6);
  };

  const upcomingThursdays = getUpcomingThursdays();

  // Pre-select first upcoming Thursday
  useEffect(() => {
    if (!selectedDate && upcomingThursdays.length > 0) {
      setSelectedDate(upcomingThursdays[0].dateStr);
    }
  }, []);

  // Fetch slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;

    let isMounted = true;
    setLoadingSlots(true);
    setErrorMsg('');

    fetchSlots(selectedDate)
      .then((data) => {
        if (!isMounted) return;
        setSlotsData(data);
        if (data.slots && data.slots.length > 0) {
          const avail = data.slots.find(s => s.available);
          if (avail && (!selectedSlot || !data.slots.some(s => s.time === selectedSlot && s.available))) {
            setSelectedSlot(avail.time);
          }
        }
      })
      .catch((err) => {
        if (isMounted) setErrorMsg('تعذر تحميل أوقات الاستقبال لهذا اليوم، يرجى اختيار تاريخ آخر.');
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => { isMounted = false; };
  }, [selectedDate]);

  const meetingTypes = [
    {
      id: 'in_person',
      title: 'حضوري بمقر الحزب بمديونة',
      subtitle: 'شارع الحسن الثاني (قرب بلدية مديونة المركز)',
      icon: <MapPin className="w-5 h-5 text-sky-600" />
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-black text-slate-900">
          الخطوة 3: تحديد توقيت الاستقبال (كل خميس على 17:00)
        </h3>
        <p className="text-sm text-slate-600">
          المواعيد مخصصة حصرياً <strong>كل يوم خميس ابتداءً من الساعة 5 زوالاً (17:00)</strong> بمقر الحزب بمديونة المركز.
        </p>
      </div>

      {/* Thursday Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 to-sky-500/10 border-2 border-amber-400/80 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#00274d] flex items-center justify-center font-bold shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <span className="font-extrabold text-amber-950 text-sm block">
            جلسات الاستماع الأسبوعية المباشرة للدكتور أمين نقطى
          </span>
          <span className="text-slate-700">
            «كيسمع لكم كل خميس على الساعة 5 زوالاً في مقر الحزب بمديونة المركز». الاستقبال يتم بحسب أولوية الحجز والتسجيل.
          </span>
        </div>
      </div>

      {/* 1. Meeting Type Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          1. صيغة اللقاء:
        </label>
        <div className="max-w-md">
          <div
            className="p-3.5 rounded-xl border-2 border-sky-600 bg-sky-50 shadow-sm flex items-center justify-between gap-3 select-none"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-600 text-white shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-black text-slate-900">
                  حضوري بمقر الحزب بمديونة
                </h5>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  شارع الحسن الثاني (قرب بلدية مديونة المركز)
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200">
              معتمد حصرياً ✓
            </span>
          </div>
        </div>
      </div>

      {/* 2. Choose Thursday Date */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700">
            2. اختر يوم الخميس المناسب لكم:
          </label>
          <span className="text-[11px] text-amber-900 font-bold bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
            أيام الخميس المتاحة 🗓️
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {upcomingThursdays.map((item) => {
            const isSelected = selectedDate === item.dateStr;
            return (
              <button
                type="button"
                key={item.dateStr}
                onClick={() => {
                  setSelectedDate(item.dateStr);
                  setSelectedSlot('');
                }}
                className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#00274d] bg-[#00274d] text-white shadow-lg ring-2 ring-amber-400/50'
                    : 'border-slate-200 bg-white hover:border-sky-400 text-slate-800 shadow-sm hover:shadow-md'
                }`}
              >
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-amber-400/20 text-[#faecc9]' : 'bg-amber-100 text-amber-900'
                }`}>
                  {item.tag}
                </span>

                <div className="my-2">
                  <div className="text-base font-black">الخميس</div>
                  <div className={`text-xs font-mono font-bold mt-0.5 ${isSelected ? 'text-sky-200' : 'text-slate-600'}`}>
                    {item.formatted}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Choose Time Slot (Starting at 17:00) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700">
            3. اختر التوقيت (ابتداءً من 17:00):
          </label>
          <span className="text-[11px] text-slate-500 font-medium">
            مدة كل مقابلة: 20 دقيقة
          </span>
        </div>

        {loadingSlots ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
            جاري فحص المواعيد المتاحة ليوم الخميس {selectedDate}...
          </div>
        ) : errorMsg ? (
          <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        ) : slotsData && slotsData.slots && slotsData.slots.length > 0 ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {slotsData.slots.map((slot) => {
                const isSelected = selectedSlot === slot.time;
                return (
                  <button
                    type="button"
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-[#00274d] text-[#faecc9] border-[#00274d] shadow-md ring-2 ring-amber-400/50'
                        : slot.available
                        ? 'bg-white hover:bg-sky-50 text-slate-800 border-slate-200 hover:border-sky-400 shadow-sm'
                        : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed line-through'
                    }`}
                  >
                    <div className="text-sm font-mono font-black">{slot.time}</div>
                    <div className="text-[10px] font-normal opacity-75 mt-0.5">
                      {slot.available ? 'متاح للحجز' : 'محجوز'}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white border border-slate-300"></span>
                متاح للحجز
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#00274d]"></span>
                المحدد
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-200"></span>
                محجوز
              </span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500">الرجاء اختيار يوم الخميس أعلاه لعرض الساعات المتاحة.</p>
        )}
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
          disabled={!selectedDate || !selectedSlot}
          onClick={onNext}
          className={`px-8 py-3 rounded-xl text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
            selectedDate && selectedSlot
              ? 'bg-[#00274d] text-[#faecc9] hover:bg-[#003865] shadow-lg shadow-sky-950/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>المتابعة لبيانات المواطن</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
