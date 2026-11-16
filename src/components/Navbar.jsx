import React, { useState } from 'react';
import { Calendar, Search, Shield, Menu, X, Phone, MapPin, User, ChevronLeft } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenBookModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'book', label: 'حجز موعد' },
    { id: 'track', label: 'تتبع طلبي' },
    { id: 'communes', label: 'جماعات مديونة' },
    { id: 'advocacy', label: 'سجل الترافع' },
    { id: 'about', label: 'عن النائب' },
    { id: 'admin', label: 'ديوان النائب', isSecret: true },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#00274d]/95 backdrop-blur-md border-b border-sky-800/60 shadow-xl transition-all">
      {/* Top micro bar: Official Kingdom & Constituency info */}
      <div className="bg-[#001c38] text-sky-200 text-xs py-1.5 px-4 sm:px-8 border-b border-sky-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-[#faecc9] border border-amber-400/30 px-2.5 py-0.5 rounded-full font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              المملكة المغربية | مجلس النواب
            </span>
            <span className="hidden sm:inline text-slate-300">
              الدائرة التشريعية لإقليم مديونة (تيط مليل • مديونة • الهراويين • سيدي حجاج • المجاطية)
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <span className="flex items-center gap-1 text-[#faecc9] font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              مقر الحزب بمديونة المركز
            </span>
            <a
              href="tel:+212612266418"
              className="hidden md:flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span dir="ltr">06 12 26 64 18</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity branding */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            {/* Dove Icon & Emblem */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#005a9c] to-[#003865] p-2 flex items-center justify-center border border-sky-400/30 shadow-lg group-hover:scale-105 transition-transform">
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#faecc9] tracking-wide font-sans">
                  د. أمين نقطى
                </h1>
                <span className="bg-[#faecc9] text-[#00274d] text-[11px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                  مديونة 📍
                </span>
              </div>
              <p className="text-xs text-sky-200/90 font-medium leading-tight">
                النائب البرلماني والمنسق الإقليمي • دائرة إقليم مديونة
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-sky-500/20 text-[#faecc9] border border-sky-400/40 shadow-sm font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                } ${item.isSecret ? 'text-slate-400 text-xs border border-dashed border-slate-600/60' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('track')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-sky-200 bg-sky-950/70 hover:bg-sky-900 border border-sky-700/60 rounded-lg transition-all hover:text-white"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              تتبع موعدي
            </button>

            <button
              onClick={() => handleNavClick('book')}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-black text-[#00274d] bg-gradient-to-r from-[#faecc9] via-[#f7e4b5] to-[#e8d196] hover:from-[#fff1cf] hover:to-[#faecc9] rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4 text-[#00274d]" />
              حجز موعد جديد
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('book')}
              className="px-3 py-1.5 text-xs font-bold text-[#00274d] bg-[#faecc9] rounded-md"
            >
              حجز موعد
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="قائمة التصفح"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#001f3f] border-b border-sky-900 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          <div className="p-3 bg-sky-900/40 rounded-lg mb-3 border border-sky-800/60">
            <p className="text-xs text-[#faecc9] font-bold">
              مكتب التواصل مع المواطنين • إقليم مديونة
            </p>
            <p className="text-[11px] text-slate-300">
              جلسات الاستماع المباشرة: كل خميس على الساعة 5 زوالاً بمقر الحزب بمديونة
            </p>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === item.id
                  ? 'bg-sky-600/30 text-[#faecc9] border border-sky-400/40'
                  : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
              <ChevronLeft className="w-4 h-4 text-sky-400" />
            </button>
          ))}

          <div className="pt-2 border-t border-sky-800/80 flex flex-col gap-2">
            <a
              href="https://wa.me/212612266418"
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow"
            >
              تواصل عبر الواتساب مع ديوان النائب
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

