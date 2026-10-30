// API Client for Dr. Amine Nokta Parliamentary Appointment System

const API_BASE = '/api';

async function safeFetchJson(url, options = {}) {
  let res;
  try {
    res = await fetch(url, options);
  } catch (err) {
    throw new Error('تعذر الاتصال بالخادم. يرجى التحقق من اتصال الشبكة.');
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    if (!res.ok) {
      throw new Error(`تعذر الاتصال بالخادم (${res.status}): يرجى التأكد من تشغيل الخادم`);
    }
    throw new Error('استجابة الخادم غير صالحة');
  }

  return await res.json();
}

export async function fetchConfig() {
  const data = await safeFetchJson(`${API_BASE}/config`);
  if (!data.success) throw new Error(data.error || 'فشل تحميل الإعدادات');
  return data.data;
}

export async function fetchSlots(date) {
  const data = await safeFetchJson(`${API_BASE}/slots?date=${date}`);
  if (!data.success) throw new Error(data.error || 'فشل تحميل الأوقات المتاحة');
  return data;
}

export async function createAppointment(appointmentData) {
  const data = await safeFetchJson(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointmentData),
  });
  if (!data.success) throw new Error(data.error || 'فشل تسجيل الموعد');
  return data.data;
}

export async function trackAppointment(code, query = '') {
  const data = await safeFetchJson(`${API_BASE}/appointments/track/${encodeURIComponent(code)}?query=${encodeURIComponent(query)}`);
  if (!data.success) throw new Error(data.error || 'لم يتم العثور على الموعد');
  return data.data;
}

export async function fetchAppointments(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.commune) params.append('commune', filters.commune);
  if (filters.date) params.append('date', filters.date);
  if (filters.search) params.append('search', filters.search);

  const data = await safeFetchJson(`${API_BASE}/appointments?${params.toString()}`);
  if (!data.success) throw new Error(data.error || 'فشل تحميل المواعيد');
  return data.data;
}

export async function updateAppointment(id, updates) {
  const data = await safeFetchJson(`${API_BASE}/appointments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!data.success) throw new Error(data.error || 'فشل تحديث الموعد');
  return data.data;
}

export async function deleteAppointment(id) {
  const data = await safeFetchJson(`${API_BASE}/appointments/${id}`, {
    method: 'DELETE',
  });
  if (!data.success) throw new Error(data.error || 'فشل حذف الموعد');
  return data;
}

export async function generateWhatsAppLink(id) {
  const data = await safeFetchJson(`${API_BASE}/appointments/${id}/whatsapp`, {
    method: 'POST',
  });
  if (!data.success) throw new Error(data.error || 'فشل إنشاء رابط الواتساب');
  return data;
}

export async function fetchStats() {
  const data = await safeFetchJson(`${API_BASE}/stats`);
  if (!data.success) throw new Error(data.error || 'فشل تحميل الإحصائيات');
  return data.stats;
}

export async function fetchAdvocacyDossiers() {
  const data = await safeFetchJson(`${API_BASE}/advocacy`);
  if (!data.success) throw new Error(data.error || 'فشل تحميل ملفات الترافع');
  return data.data;
}

export async function adminLogin(password) {
  const data = await safeFetchJson(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!data.success) throw new Error(data.error || 'كلمة المرور غير صحيحة');
  return data.user;
}

