import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CommunesGrid from './components/CommunesGrid';
import BookingWizard from './components/BookingWizard/BookingWizard';
import TrackAppointment from './components/TrackAppointment';
import AdvocacySection from './components/AdvocacySection';
import AboutSection from './components/AboutSection';
import AdminPortal from './components/Admin/AdminPortal';
import Footer from './components/Footer';
import { fetchConfig, fetchStats } from './api';
import { DEFAULT_CONFIG } from './defaultData';
import { Sparkles, MapPin, Calendar, Clock, ChevronLeft } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCommuneId, setSelectedCommuneId] = useState(null);
  const [trackingCode, setTrackingCode] = useState('');

  useEffect(() => {
    Promise.all([fetchConfig(), fetchStats()])
      .then(([cfg, st]) => {
        setConfig(cfg);
        setStats(st);
      })
      .catch((err) => {
        console.error('Error loading initial data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleStartBooking = (communeId = null) => {
    if (communeId) setSelectedCommuneId(communeId);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToTrack = (code = '') => {
    if (code) setTrackingCode(code);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-amber-400 selection:text-[#00274d]">
      
      {/* Top Reception Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white py-2 px-4 text-xs font-bold text-center border-b border-amber-400 flex items-center justify-center gap-2 shadow-sm no-print">
        <Sparkles className="w-4 h-4 text-[#faecc9] animate-spin" />
        <span>
          جلسات الاستماع الأسبوعية المباشرة: <strong>كل خميس على الساعة 5 زوالاً</strong> بمقر الحزب بمديونة المركز (شارع الحسن الثاني)
        </span>
        <button
          onClick={() => handleStartBooking()}
          className="mr-2 underline decoration-white/70 hover:text-[#00274d] cursor-pointer text-[11px] font-black"
        >
          احجز مكانك الآن ←
        </button>
      </div>

      {/* Main Official Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBookModal={() => handleStartBooking()}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero
              onStartBooking={() => handleStartBooking()}
              onTrackBooking={() => handleGoToTrack()}
              stats={stats}
            />

            {/* Quick Fast-Action Ribbon */}
            <div className="bg-[#faecc9] text-[#00274d] py-4 px-4 sm:px-8 border-y border-amber-300 shadow-inner">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#00274d] text-[#faecc9] flex items-center justify-center font-bold text-xs shrink-0">
                    5
                  </div>
                  <p className="text-xs sm:text-sm font-extrabold">
                    تغطية متكاملة لجميع جماعات إقليم مديونة: مديونة، تيط مليل، الهراويين، سيدي حجاج، والمجاطية.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('communes')}
                    className="px-4 py-1.5 text-xs font-bold bg-white text-[#00274d] hover:bg-slate-50 border border-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    عرض خارطة الجماعات
                  </button>

                  <button
                    onClick={() => handleStartBooking()}
                    className="px-4 py-1.5 text-xs font-extrabold bg-[#00274d] text-[#faecc9] hover:bg-[#003865] rounded-lg shadow transition-colors cursor-pointer"
                  >
                    حجز موعد فوري
                  </button>
                </div>
              </div>
            </div>

            <CommunesGrid
              communes={config?.communes || []}
              onSelectCommune={(cId) => handleStartBooking(cId)}
            />

            <AdvocacySection
              onBookWithTopic={() => handleStartBooking()}
            />

            <AboutSection
              onBookClick={() => handleStartBooking()}
            />
          </>
        )}

        {activeTab === 'book' && (
          <div className="animate-fade-in">
            <div className="bg-[#00274d] text-white py-8 px-4 text-center border-b border-sky-800">
              <h2 className="text-3xl font-black text-[#faecc9]">
                حجز موعد رسمي مع الدكتور أمين نقطى
              </h2>
              <p className="text-xs text-sky-200 mt-1 max-w-xl mx-auto">
                النائب البرلماني عن إقليم مديونة • اختر الجماعة، الموضوع، والتوقيت المناسب لكم
              </p>
            </div>

            <BookingWizard
              config={config}
              initialCommuneId={selectedCommuneId}
              onGoToTrack={(code) => handleGoToTrack(code)}
            />
          </div>
        )}

        {activeTab === 'track' && (
          <div className="animate-fade-in">
            <TrackAppointment
              initialCode={trackingCode}
              onGoToBook={() => handleStartBooking()}
            />
          </div>
        )}

        {activeTab === 'communes' && (
          <div className="animate-fade-in">
            <CommunesGrid
              communes={config?.communes || []}
              onSelectCommune={(cId) => handleStartBooking(cId)}
            />
          </div>
        )}

        {activeTab === 'advocacy' && (
          <div className="animate-fade-in">
            <AdvocacySection
              onBookWithTopic={() => handleStartBooking()}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="animate-fade-in">
            <AboutSection
              onBookClick={() => handleStartBooking()}
            />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="animate-fade-in">
            <AdminPortal />
          </div>
        )}
      </main>

      {/* Official Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}

