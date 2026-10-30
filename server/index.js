const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const os = require('os');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static files (for production build if served from express)
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Dr. Amine Nokta Appointment System', timestamp: new Date().toISOString() });
});

// Get office configuration & politician data
app.get('/api/config', (req, res) => {
  try {
    const config = db.getConfig();
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update configuration (schedule, office info)
app.put('/api/config', (req, res) => {
  try {
    const updated = db.updateConfig(req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate Time Slots for a given date (ONLY Thursdays starting at 17:00)
app.get('/api/slots', (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, error: 'تاريخ اليوم مطلوب' });
    }

    const config = db.getConfig();
    const appointments = db.getAppointments();

    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay(); // 4 = Thursday

    // Reception is strictly on Thursdays (day 4)
    const isWorkingDay = dayOfWeek === 4;

    function generateSlotList(startStr, endStr, stepMin) {
      const [sh, sm] = startStr.split(':').map(Number);
      const [eh, em] = endStr.split(':').map(Number);
      let currentMin = sh * 60 + sm;
      const endMin = eh * 60 + em;
      const slots = [];
      while (currentMin < endMin) {
        const h = Math.floor(currentMin / 60).toString().padStart(2, '0');
        const m = (currentMin % 60).toString().padStart(2, '0');
        slots.push(`${h}:${m}`);
        currentMin += stepMin;
      }
      return slots;
    }

    const step = config.schedule?.slotDurationMinutes || 20;
    const startTime = config.schedule?.startTime || '17:00';
    const endTime = config.schedule?.endTime || '20:00';
    
    const allSlots = isWorkingDay ? generateSlotList(startTime, endTime, step) : [];

    // Find booked appointments for this date
    const bookedOnDate = appointments.filter(a => a.preferredDate === date && a.status !== 'cancelled');

    const slotsWithAvailability = allSlots.map(time => {
      const matches = bookedOnDate.filter(a => a.timeSlot === time);
      const isBooked = matches.length >= 1;
      return {
        time,
        period: 'مساءً',
        available: isWorkingDay && !isBooked,
        bookedCount: matches.length
      };
    });

    res.json({
      success: true,
      date,
      dayOfWeek,
      isWorkingDay,
      dayNote: isWorkingDay ? 'جلسة الاستماع المباشرة: كل خميس على الساعة 5 زوالاً' : 'الاستقبال مخصص حصرياً كل يوم خميس ابتداءً من الساعة 17:00 بمقر الحزب بمديونة',
      totalSlots: slotsWithAvailability.length,
      availableSlotsCount: slotsWithAvailability.filter(s => s.available).length,
      slots: slotsWithAvailability
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all appointments (Admin & filtering)
app.get('/api/appointments', (req, res) => {
  try {
    const { status, commune, date, search } = req.query;
    let list = db.getAppointments();

    if (status && status !== 'all') {
      list = list.filter(a => a.status === status);
    }
    if (commune && commune !== 'all') {
      list = list.filter(a => a.communeId === commune);
    }
    if (date) {
      list = list.filter(a => a.preferredDate === date);
    }
    if (search) {
      const q = search.trim().toLowerCase();
      list = list.filter(a => 
        (a.fullName && a.fullName.toLowerCase().includes(q)) ||
        (a.cin && a.cin.toLowerCase().includes(q)) ||
        (a.phone && a.phone.includes(q)) ||
        (a.trackingCode && a.trackingCode.toLowerCase().includes(q)) ||
        (a.subject && a.subject.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Track an appointment for citizen by trackingCode + optional phone/cin
app.get('/api/appointments/track/:code', (req, res) => {
  try {
    const { code } = req.params;
    const { query } = req.query; // phone or cin
    const apt = db.getAppointmentByTrackingCode(code, query || '');

    if (!apt) {
      return res.status(404).json({
        success: false,
        error: 'لم يتم العثور على أي موعد بهذا الرمز، يُرجى التأكد من الرمز المدخل ورقم الهاتف'
      });
    }

    res.json({ success: true, data: apt });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new appointment (Citizen booking)
app.post('/api/appointments', (req, res) => {
  try {
    const { fullName, phone, communeId, purposeId, preferredDate, timeSlot, subject } = req.body;

    if (!fullName || !phone || !communeId || !preferredDate || !timeSlot) {
      return res.status(400).json({
        success: false,
        error: 'المرجو ملء جميع الحقول الإلزامية (الاسم، الهاتف، الجماعة، التاريخ، والوقت)'
      });
    }

    const config = db.getConfig();
    const communeObj = config.communes.find(c => c.id === communeId);
    const purposeObj = config.purposes.find(p => p.id === purposeId);

    const newAppointment = db.createAppointment({
      ...req.body,
      communeName: communeObj ? communeObj.name : communeId,
      purposeTitle: purposeObj ? purposeObj.title : purposeId
    });

    res.status(201).json({
      success: true,
      message: 'تم تسجيل طلب الموعد بنجاح',
      data: newAppointment
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update an appointment (Admin accept, reschedule, complete, cancel, add room/notes)
app.patch('/api/appointments/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.updateAppointment(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'الموعد غير موجود' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete an appointment
app.delete('/api/appointments/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteAppointment(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'الموعد غير موجود' });
    }
    res.json({ success: true, message: 'تم حذف الموعد' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate WhatsApp notification link
app.post('/api/appointments/:id/whatsapp', (req, res) => {
  try {
    const { id } = req.params;
    const apt = db.getAppointmentById(id);
    if (!apt) {
      return res.status(404).json({ success: false, error: 'الموعد غير موجود' });
    }

    const config = db.getConfig();
    // Format Moroccan phone number to international format: 06... -> 2126...
    let cleanPhone = apt.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '212' + cleanPhone.substring(1);
    }

    let messageText = '';
    if (apt.status === 'confirmed') {
      messageText = `السلام عليكم ورحمة الله،\n\nالسيد(ة) المحترم(ة): ${apt.fullName}،\n\nيُشرف المكتب البرلماني للنائب الدكتور أمين نقطى (دائرة إقليم مديونة) إشعاركم بأنه قد تمت الموافقة على طلب موعدكم.\n\n📌 رقم الموعد: ${apt.trackingCode}\n🗓️ التاريخ: ${apt.preferredDate}\n⏰ التوقيت: ${apt.timeSlot}\n📍 المقر: ${apt.assignedRoom || config.politician.officeAddress}\n\nنرجو منكم الحضور قبل الموعد بـ 10 دقائق مصحوبين ببطاقة التعريف الوطنية والملف الداعم.\nمع خالص التقدير،\nديوان الدكتور أمين نقطى`;
    } else {
      messageText = `السلام عليكم ورحمة الله،\n\nالسيد(ة) المحترم(ة): ${apt.fullName}،\n\nبخصوص طلب موعدكم برقم ${apt.trackingCode} لدى النائب البرلماني الدكتور أمين نقطى، نود إحاطتكم علماً بأن طلبكم هو حالياً: ${apt.status === 'pending' ? 'قيد الدراسة والمراجعة' : apt.status === 'completed' ? 'تمت معالجته بنجاح' : 'تحديث جديد'}.\n\nشكراً لتواصلكم مع ديوان النائب د. أمين نقطى.`;
    }

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
    res.json({ success: true, url: whatsappUrl, messageText, phone: cleanPhone });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Comprehensive Stats for Dr. Amine Nokta
app.get('/api/stats', (req, res) => {
  try {
    const appointments = db.getAppointments();
    const config = db.getConfig();

    const total = appointments.length;
    const pending = appointments.filter(a => a.status === 'pending').length;
    const confirmed = appointments.filter(a => a.status === 'confirmed').length;
    const completed = appointments.filter(a => a.status === 'completed').length;
    const cancelled = appointments.filter(a => a.status === 'cancelled').length;

    // Breakdown by commune
    const communeStats = (config.communes || []).map(c => {
      const count = appointments.filter(a => a.communeId === c.id).length;
      return {
        id: c.id,
        name: c.name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      };
    });

    // Breakdown by purpose
    const purposeStats = (config.purposes || []).map(p => {
      const count = appointments.filter(a => a.purposeId === p.id).length;
      return {
        id: p.id,
        title: p.title,
        count
      };
    });

    // Upcoming count
    const today = new Date().toISOString().split('T')[0];
    const upcoming = appointments.filter(a => a.preferredDate >= today && a.status === 'confirmed').length;

    res.json({
      success: true,
      stats: {
        total,
        pending,
        confirmed,
        completed,
        cancelled,
        upcoming,
        communeStats,
        purposeStats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Parliamentary Advocacy Dossiers (سجل الترافع البرلماني)
app.get('/api/advocacy', (req, res) => {
  res.json({ success: true, data: [] });
});

// Admin authentication endpoint
app.post('/api/admin/login', (req, res) => {
  try {
    const { password } = req.body;
    // Default master PIN / password for Dr. Amine Nokta's parliamentary office
    if (password === 'nokta2026' || password === 'mediouna2026' || password === 'admin') {
      res.json({
        success: true,
        user: {
          name: 'د. أمين نقطى',
          role: 'النائب البرلماني ومسؤول الديوان',
          accessLevel: 'parliamentary_admin',
          token: 'token-nokta-mdn-' + Date.now()
        }
      });
    } else {
      res.status(401).json({ success: false, error: 'كلمة المرور غير صحيحة' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Catch-all route to serve the SPA in production
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      // In dev mode when dist is not built yet, return simple message
      res.status(200).send('API Server is running on port ' + PORT + '. Please access the frontend via Vite dev server or build the frontend.');
    }
  });
});

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIp();
  console.log(`[Parliamentary Appointment System] Server running on:`);
  console.log(`  - Local:   http://localhost:${PORT}`);
  console.log(`  - Network: http://${ip}:${PORT}`);
});
