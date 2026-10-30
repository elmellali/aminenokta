import React, { useState, useEffect } from 'react';
import { Check, Calendar, ArrowRight, Shield } from 'lucide-react';
import StepPurpose from './StepPurpose';
import StepCommune from './StepCommune';
import StepDateTime from './StepDateTime';
import StepCitizenInfo from './StepCitizenInfo';
import StepConfirmation from './StepConfirmation';
import { createAppointment } from '../../api';

export default function BookingWizard({
  config,
  initialCommuneId = null,
  onGoToTrack
}) {
  const [step, setStep] = useState(1);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [meetingType, setMeetingType] = useState('in_person');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [citizenData, setCitizenData] = useState({
    fullName: '',
    cin: '',
    phone: '',
    email: '',
    subject: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [submitError, setSubmitError] = useState('');

  // Handle initial commune if passed from communes grid
  useEffect(() => {
    if (initialCommuneId && config?.communes) {
      const found = config.communes.find(c => c.id === initialCommuneId);
      if (found) {
        setSelectedCommune(found);
      }
    }
  }, [initialCommuneId, config]);

  const stepsList = [
    { number: 1, label: 'نوع الموعد' },
    { number: 2, label: 'الجماعة والحي' },
    { number: 3, label: 'التاريخ والتوقيت' },
    { number: 4, label: 'بيانات المواطن' },
    { number: 5, label: 'تأكيد الموعد' },
  ];

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        fullName: citizenData.fullName,
        cin: citizenData.cin,
        phone: citizenData.phone,
        email: citizenData.email,
        communeId: selectedCommune.id,
        communeName: selectedCommune.name,
        neighborhood: selectedNeighborhood,
        purposeId: selectedPurpose.id,
        purposeTitle: selectedPurpose.title,
        subject: citizenData.subject,
        details: citizenData.details,
        appointmentType: meetingType,
        preferredDate: selectedDate,
        timeSlot: selectedSlot
      };

      const result = await createAppointment(payload);
      setConfirmedAppointment(result);
      setStep(5);
    } catch (err) {
      setSubmitError(err.message || 'حدث خطأ أثناء حفظ الموعد. المرجو المحاولة مجدداً.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedPurpose(null);
    setSelectedCommune(null);
    setSelectedNeighborhood('');
    setSelectedDate('');
    setSelectedSlot('');
    setCitizenData({ fullName: '', cin: '', phone: '', email: '', subject: '', details: '' });
    setConfirmedAppointment(null);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto" id="book-section">
      
      {/* Stepper Navigation Indicator */}
      <div className="mb-10 no-print">
        <div className="flex items-center justify-between relative max-w-3xl mx-auto">
          {/* Connector Line */}
          <div className="absolute top-1/2 right-4 left-4 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
          <div
            className="absolute top-1/2 right-4 h-1 bg-[#00274d] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
          ></div>

          {stepsList.map((s) => {
            const isCompleted = step > s.number;
            const isCurrent = step === s.number;

            return (
              <div key={s.number} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-extrabold text-xs transition-all shadow-md ${
                    isCompleted
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : isCurrent
                      ? 'bg-[#00274d] text-[#faecc9] ring-4 ring-amber-200'
                      : 'bg-white text-slate-400 border-2 border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : s.number}
                </div>
                <span
                  className={`text-[11px] font-bold mt-2 hidden sm:block ${
                    isCurrent ? 'text-[#00274d]' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-bold text-center">
          {submitError}
        </div>
      )}

      {/* Step Components */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
        {step === 1 && (
          <StepPurpose
            purposes={config?.purposes || []}
            selectedPurpose={selectedPurpose}
            onSelectPurpose={(p) => setSelectedPurpose(p)}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <StepCommune
            communes={config?.communes || []}
            selectedCommune={selectedCommune}
            selectedNeighborhood={selectedNeighborhood}
            onSelectCommune={(c) => setSelectedCommune(c)}
            onSelectNeighborhood={(n) => setSelectedNeighborhood(n)}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <StepDateTime
            meetingType={meetingType}
            setMeetingType={setMeetingType}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <StepCitizenInfo
            citizenData={citizenData}
            setCitizenData={setCitizenData}
            onSubmit={handleFinalSubmit}
            onBack={() => setStep(3)}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 5 && confirmedAppointment && (
          <StepConfirmation
            appointment={confirmedAppointment}
            onReset={handleReset}
            onGoToTrack={onGoToTrack}
          />
        )}
      </div>

    </section>
  );
}

