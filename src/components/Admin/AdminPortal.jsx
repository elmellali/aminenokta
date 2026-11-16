import React, { useState, useEffect } from 'react';
import { 
  Shield, Lock, Users, Calendar, Clock, MapPin, CheckCircle2, 
  XCircle, AlertCircle, Phone, Search, Filter, MessageSquare, 
  Printer, Share2, Sparkles, Sliders, ChevronDown, RefreshCw, 
  FileText, ExternalLink, ArrowRight, UserCheck
} from 'lucide-react';
import { 
  adminLogin, fetchAppointments, updateAppointment, 
  deleteAppointment, generateWhatsAppLink, fetchStats 
} from '../../api';

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Dashboard Data
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [communeFilter, setCommuneFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Appointment Modal / Drawer
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [internalNote, setInternalNote] = useState('');
  const [assignedRoom, setAssignedRoom] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  // Auto-login from localStorage if token exists
  useEffect(() => {
    const savedToken = localStorage.getItem('nokta_admin_token');
    if (savedToken) {
      setIsAuthenticated(true);
      setCurrentUser({ name: 'د. أمين نقطى', role: 'النائب البرلماني ومسؤول الديوان' });
      loadDashboardData();
    }
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoginError('');
    setLoadingLogin(true);

    try {
      const user = await adminLogin(password);
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('nokta_admin_token', user.token);
      loadDashboardData();
    } catch (err) {
      setLoginError(err.message || 'كلمة المرور غير صحيحة');
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nokta_admin_token');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setPassword('');
  };

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      const [apts, st] = await Promise.all([
        fetchAppointments(),
        fetchStats()
      ]);
      setAppointments(apts);
      setStats(st);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      if (err.status === 401) handleLogout();
    } finally {
      setLoadingData(false);
    }
  };

  // Status updates
  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await updateAppointment(id, { status: newStatus });
      setAppointments(appointments.map(a => a.id === id ? updated : a));
      if (activeAppointment?.id === id) setActiveAppointment(updated);
      setUpdateSuccess('تم تحديث حالة الموعد بنجاح');
      setTimeout(() => setUpdateSuccess(''), 3000);
      loadDashboardData();
    } catch (err) {
      if (err.status === 401) return handleLogout();
      alert(err.message);
    }
  };

  // Save notes & room
  const handleSaveNotes = async () => {
    if (!activeAppointment) return;
    try {
      const updated = await updateAppointment(activeAppointment.id, {
        adminNotes: internalNote,
        assignedRoom: assignedRoom || 'قاعة الاستقبالات الرئيسية - المكتب البرلماني'
      });
      setAppointments(appointments.map(a => a.id === activeAppointment.id ? updated : a));
      setActiveAppointment(updated);
      setUpdateSuccess('تم حفظ محضر الملاحظات والقاعة بنجاح');
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch (err) {
      if (err.status === 401) return handleLogout();
      alert(err.message);
    }
  };

  // Send WhatsApp directly to citizen
  const handleSendWhatsApp = async (aptId) => {
    try {
      const { url } = await generateWhatsAppLink(aptId);
      window.open(url, '_blank');
    } catch (err) {
      if (err.status === 401) return handleLogout();
      alert(err.message);
    }
  };

  // Filtered Appointments List
  const filteredAppointments = appointments.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (communeFilter !== 'all' && a.communeId !== communeFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = a.fullName && a.fullName.toLowerCase().includes(q);
      const matchCin = a.cin && a.cin.toLowerCase().includes(q);
      const matchCode = a.trackingCode && a.trackingCode.toLowerCase().includes(q);
      const matchSubject = a.subject && a.subject.toLowerCase().includes(q);
      const matchPhone = a.phone && a.phone.includes(q);
      if (!matchName && !matchCin && !matchCode && !matchSubject && !matchPhone) return false;
    }
    return true;
  });

  // Print Day's Roster
  const handlePrintDailyRoster = () => {
    window.print();
  };

  // If not authenticated, show Login Card
  if (!isAuthenticated) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto animate-fade-in">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 space-y-6 text-center">
          <div className="w-16 h-16 bg-[#00274d] text-[#faecc9] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Shield className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900">
              فضاء ديوان النائب البرلماني
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              الدكتور أمين نقطى • دائرة إقليم مديونة
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                الرمز السري لديوان النائب:
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="أدخل الرمز السري..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg text-center">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loadingLogin}
              className="w-full py-3 bg-[#00274d] hover:bg-[#003865] text-[#faecc9] font-black rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              {loadingLogin ? 'جاري التحقق...' : 'تسجيل الدخول للوحة التحكم'}
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in" id="admin-dashboard">
      
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-[#001c38] via-[#002e54] to-[#01477d] text-white p-6 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-[#faecc9] border border-amber-400/40 flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#faecc9]">
                لوحة تحكم المكتب البرلماني • د. أمين نقطى
              </h2>
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                متصل الآن
              </span>
            </div>
            <p className="text-xs text-sky-200 mt-0.5">
              إدارة مواعيد واستقبالات ساكنة إقليم مديونة • الترافع ومتابعة الشكايات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadDashboardData}
            className="p-2.5 bg-white/10 hover:bg-white/15 text-sky-100 rounded-xl transition-all cursor-pointer"
            title="تحديث البيانات"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handlePrintDailyRoster}
            className="px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-100 border border-sky-400/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة لائحة الاستقبال</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 no-print">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 block">إجمالي المواعيد المسجلة</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{stats.total}</div>
            <span className="text-[10px] text-slate-400">كافة جماعات مديونة</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm bg-amber-50/30">
            <span className="text-[11px] font-bold text-amber-800 block">طلبات جديدة قيد المراجعة</span>
            <div className="text-2xl font-black text-amber-600 mt-1">{stats.pending}</div>
            <span className="text-[10px] text-amber-700">تحتاج للمراجعة والتأكيد</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm bg-emerald-50/30">
            <span className="text-[11px] font-bold text-emerald-800 block">مواعيد مؤكدة لجلسة الخميس</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{stats.confirmed}</div>
            <span className="text-[10px] text-emerald-700">مبرمجة للاستقبال 17:00</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-sm bg-sky-50/30">
            <span className="text-[11px] font-bold text-sky-800 block">لقاءات منجزة</span>
            <div className="text-2xl font-black text-sky-700 mt-1">{stats.completed}</div>
            <span className="text-[10px] text-sky-700">تم الاستماع وإحالة الملف</span>
          </div>
        </div>
      )}

      {/* Distribution by Commune (Geographic Heatmap) */}
      {stats && stats.communeStats && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 no-print">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-600" />
              توزيع طلبات المواطنين جغرافياً على جماعات إقليم مديونة الـ 5:
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              لرصد بؤر الشكايات والمناطق الأكثر حاجة للترافع
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {stats.communeStats.map((c) => (
              <div key={c.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{c.name}</span>
                  <span className="text-sky-700 font-mono">{c.count} موعد</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00274d] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${c.percentage}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-500 text-left font-mono">
                  {c.percentage}% من إجمالي الطلبات
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex-1 min-w-[260px] relative">
          <input
            type="text"
            placeholder="بحث بالاسم، الهاتف، CIN، أو رمز التتبع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-700 focus:outline-none font-bold cursor-pointer"
          >
            <option value="all">كافة الحالات</option>
            <option value="pending">قيد الدراسة (جديد)</option>
            <option value="confirmed">مؤكد ومبرمج</option>
            <option value="completed">منجز ومكتمل</option>
            <option value="cancelled">ملغى / اعتذار</option>
          </select>

          {/* Commune Filter */}
          <select
            value={communeFilter}
            onChange={(e) => setCommuneFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-700 focus:outline-none font-bold cursor-pointer"
          >
            <option value="all">كافة الجماعات</option>
            <option value="mediouna">بلدية مديونة</option>
            <option value="tit_mellil">باشوية تيط مليل</option>
            <option value="lahraouyine">باشوية الهراويين</option>
            <option value="sidi_hajjaj">جماعة سيدي حجاج</option>
            <option value="mejattia">جماعة المجاطية</option>
          </select>
        </div>
      </div>

      {updateSuccess && (
        <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl text-center no-print animate-fade-in">
          {updateSuccess}
        </div>
      )}

      {/* Appointments Master Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        
        {/* Table Title */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900">
              جدول مواعيد واستقبالات المواطنين ({filteredAppointments.length})
            </h3>
            <p className="text-xs text-slate-500">
              جلسات الاستماع المباشرة للنائب د. أمين نقطى بمقر الحزب بمديونة
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            تحديث تلقائي
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
              <tr>
                <th className="p-3.5">الرمز</th>
                <th className="p-3.5">المواطن (CIN / الهاتف)</th>
                <th className="p-3.5">الجماعة والحي</th>
                <th className="p-3.5">الموضوع والغرض</th>
                <th className="p-3.5">التاريخ والساعة</th>
                <th className="p-3.5">الحالة</th>
                <th className="p-3.5 text-center no-print">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    لا توجد أي مواعيد تطابق شروط البحث الحالية.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-sky-900">
                      {apt.trackingCode}
                    </td>

                    <td className="p-3.5">
                      <div className="font-black text-slate-900">{apt.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {apt.cin} • {apt.phone}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-slate-800">{apt.communeName || 'غير محدد'}</div>
                      <div className="text-[11px] text-slate-500">{apt.neighborhood}</div>
                    </td>

                    <td className="p-3.5 max-w-xs">
                      <div className="font-semibold text-slate-900 truncate" title={apt.subject}>
                        {apt.subject}
                      </div>
                      <div className="text-[10px] text-sky-700">{apt.purposeTitle}</div>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-bold text-[#00274d]">{apt.preferredDate}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {apt.timeSlot}
                      </div>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : apt.status === 'completed'
                          ? 'bg-sky-100 text-sky-800'
                          : apt.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {apt.status === 'confirmed'
                          ? 'مؤكد'
                          : apt.status === 'completed'
                          ? 'مكتمل'
                          : apt.status === 'cancelled'
                          ? 'ملغى'
                          : 'قيد الدراسة'}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap text-center no-print">
                      <div className="flex items-center justify-center gap-1.5">
                        
                        {/* Quick Accept Button */}
                        {apt.status !== 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(apt.id, 'confirmed')}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 transition-colors"
                            title="تأكيد الموعد"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* WhatsApp Direct Send */}
                        <button
                          onClick={() => handleSendWhatsApp(apt.id)}
                          className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm"
                          title="إرسال إشعار تأكيد بالواتساب للمواطن"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        {/* Inspect / Notes Button */}
                        <button
                          onClick={() => {
                            setActiveAppointment(apt);
                            setInternalNote(apt.adminNotes || '');
                            setAssignedRoom(apt.assignedRoom || 'قاعة الاستقبالات الرئيسية - المكتب البرلماني');
                          }}
                          className="px-2.5 py-1 bg-[#00274d] hover:bg-[#003865] text-[#faecc9] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          إدارة الملف
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Appointment Detail & Actions Modal */}
      {activeAppointment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in no-print">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#00274d] to-[#01477d] p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] text-sky-200">ملف الموعد</span>
                <h4 className="text-xl font-black text-[#faecc9] font-mono">
                  {activeAppointment.trackingCode}
                </h4>
              </div>
              <button
                onClick={() => setActiveAppointment(null)}
                className="text-sky-200 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto text-xs text-slate-800">
              
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">المواطن:</span>
                  <p className="font-black text-slate-900 text-sm">{activeAppointment.fullName}</p>
                  <p className="text-slate-600">CIN: {activeAppointment.cin}</p>
                  <p className="text-slate-600">الهاتف: {activeAppointment.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">الانتماء:</span>
                  <p className="font-black text-[#00274d]">{activeAppointment.communeName || 'غير محدد'}</p>
                  <p className="text-slate-600">الحي: {activeAppointment.neighborhood}</p>
                  <p className="text-slate-600">الموعد: {activeAppointment.preferredDate} ({activeAppointment.timeSlot})</p>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">موضوع المطلب والشكاية:</span>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium leading-relaxed">
                  {activeAppointment.subject}
                </p>
              </div>

              {activeAppointment.details && (
                <div>
                  <span className="font-bold text-slate-700 block mb-1">الشرح والتفاصيل الإضافية:</span>
                  <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600 leading-relaxed">
                    {activeAppointment.details}
                  </p>
                </div>
              )}

              {/* Status Action Buttons */}
              <div>
                <span className="font-bold text-slate-700 block mb-1.5">تغيير حالة الموعد:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange(activeAppointment.id, 'confirmed')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeAppointment.status === 'confirmed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    ✓ تأكيد الموعد
                  </button>

                  <button
                    onClick={() => handleStatusChange(activeAppointment.id, 'completed')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeAppointment.status === 'completed'
                        ? 'bg-sky-600 text-white'
                        : 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
                    }`}
                  >
                    ★ تم الاستماع وإحالة الملف
                  </button>

                  <button
                    onClick={() => handleStatusChange(activeAppointment.id, 'pending')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeAppointment.status === 'pending'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    ⏳ قيد الدراسة
                  </button>

                  <button
                    onClick={() => handleStatusChange(activeAppointment.id, 'cancelled')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeAppointment.status === 'cancelled'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100'
                    }`}
                  >
                    ✕ اعتذار / ملغى
                  </button>
                </div>
              </div>

              {/* Assigned Hall / Room */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  القاعة أو مقر اللقاء المخصص:
                </label>
                <input
                  type="text"
                  placeholder="مثال: قاعة الاستقبالات الرئيسية - المكتب البرلماني بمديونة"
                  value={assignedRoom}
                  onChange={(e) => setAssignedRoom(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Internal Notes / Parliamentary Follow-up */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  محضر الاستقبال والتوجيهات البرلمانية (سري وخاص بديوان النائب):
                </label>
                <textarea
                  rows="3"
                  placeholder="سجل خلاصة اللقاء مع المواطن، أو رقم المراسلة الموجهة لعامل الإقليم أو الوزير المعني..."
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                ></textarea>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => handleSendWhatsApp(activeAppointment.id)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
              >
                <Share2 className="w-4 h-4" />
                <span>إرسال إشعار للمواطن بالواتساب</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveAppointment(null)}
                  className="px-4 py-2 bg-white hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  إغلاق
                </button>

                <button
                  onClick={handleSaveNotes}
                  className="px-5 py-2 bg-[#00274d] hover:bg-[#003865] text-[#faecc9] font-black rounded-xl text-xs shadow"
                >
                  حفظ التعديلات
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

