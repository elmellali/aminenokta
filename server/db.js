const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// Factual Parliamentary & Office Configuration
const DEFAULT_CONFIG = {
  politician: {
    name: 'د. أمين نقطى',
    title: 'نائب برلماني ومنسق إقليمي عن دائرة إقليم مديونة',
    degree: 'دكتوراه في العلوم السياسية وخبير اقتصادي',
    motto: 'كيسمع لكم كل خميس على الساعة 5 زوالا في مقر الحزب بمديونة',
    party: 'التجمع الوطني للأحرار (RNI)',
    mainReceptionDay: 'كل خميس على الساعة 17:00 (5 زوالاً)',
    officeAddress: 'مقر حزب التجمع الوطني للأحرار، مديونة المركز (شارع الحسن الثاني، قرب بلدية مديونة)، إقليم مديونة',
    googleMapsUrl: 'https://maps.google.com/?q=Mediouna+Morocco',
    phone: '+212 5 22 51 04 20',
    whatsapp: '+212 6 61 98 42 10',
    email: 'contact@aminenokta.ma',
    photoUrl: '/images/dr_amine_nokta.jpg'
  },
  communes: [
    {
      id: 'mediouna',
      name: 'بلدية مديونة',
      type: 'حضرية',
      badge: 'المركز الإداري للإقليم'
    },
    {
      id: 'tit_mellil',
      name: 'باشوية تيط مليل',
      type: 'حضرية',
      badge: 'قطب سكني وصناعي'
    },
    {
      id: 'lahraouyine',
      name: 'باشوية الهراويين',
      type: 'حضرية',
      badge: 'جماعة حضرية صاعدة'
    },
    {
      id: 'sidi_hajjaj',
      name: 'جماعة سيدي حجاج واد حصار',
      type: 'جماعة ترابية',
      badge: 'توسع سكني وقروي'
    },
    {
      id: 'mejattia',
      name: 'جماعة المجاطية أولاد طالب',
      type: 'جماعة ترابية',
      badge: 'حزام فلاحي وتنموي'
    }
  ],
  purposes: [
    {
      "id": "civil_society",
      "category": "المجتمع المدني",
      "title": "   لقاء هيئات المجتمع المدني والجمعيات والوداديات",
      "subTitle": "لقاء هيئات المجتمع المدني والجمعيات والوداديات",
      "desc": "ممثلو الجمعيات المحلية، وداديات الأحياء، الهيئات المهنية والرياضية والثقافية",
      "icon": "Users"
    },
    {
      "id": "youth_employment",
      "category": "الشباب",
      "title": " تشغيل الشباب وتوجيه مهني واستثماري",
      "subTitle": "تشغيل الشباب وتوجيه مهني واستثماري",
      "desc": "فرص الشغل بالإقليم، التكوين المهني، دعم المبادرات المقاولاتية والتعاونيات المحلية",
      "icon": "Briefcase"
    },
    {
      "id": "citizen_direct",
      "category": "المواطنين",
      "title": " طلب لقاء مباشر واستشارة مواطنة خاصة",
      "subTitle": "طلب لقاء مباشر واستشارة مواطنة خاصة",
      "desc": "جلسة استماع مباشرة مع النائب البرلماني د. أمين نقطى لطرح انشغال أو ملف خاص",
      "icon": "MessageSquare"
    }
  ],
  schedule: {
    // Reception ONLY on Thursdays (day 4) starting at 17:00 (5:00 PM)
    activeDays: [4],
    slotDurationMinutes: 20,
    startTime: '17:00',
    endTime: '20:00',
    dayLabel: 'كل خميس على الساعة 5 زوالاً (17:00)',
    location: 'مقر الحزب بمديونة المركز (شارع الحسن الثاني قرب بلدية مديونة)'
  }
};

// Seed initial realistic appointments for Thursday 17h
const SEED_APPOINTMENTS = [
  {
    id: 'apt-001',
    trackingCode: 'NOKTA-MDN-7412',
    fullName: 'عبد الرحيم البوهالي',
    cin: 'BK394821',
    phone: '0661234567',
    email: 'a.bouhali@gmail.com',
    communeId: 'sidi_hajjaj',
    communeName: 'جماعة سيدي حجاج واد حصار',
    neighborhood: 'أولاد حادة',
    purposeId: 'advocacy_social',
    purposeTitle: 'ملف اجتماعي / صحة / تعليم ونقل مدرسي',
    subject: 'طلب الترافع لتوفير حافلات إضافية للنقل المدرسي لتلاميذ أولاد حادة',
    details: 'صعوبة تنقل التلاميذ اليومي من الدواوير إلى الإعدادية ونلتمس الترافع لدى المصالح الإقليمية.',
    appointmentType: 'in_person',
    preferredDate: '2026-11-05',
    timeSlot: '17:00',
    status: 'confirmed',
    adminNotes: 'موعد مؤكد لجلسة الخميس بمقر الحزب.',
    assignedRoom: 'قاعة الاستقبالات - مقر الحزب بمديونة',
    createdAt: '2026-10-24T10:15:00Z',
    updatedAt: '2026-10-25T14:20:00Z'
  },
  {
    id: 'apt-002',
    trackingCode: 'NOKTA-MDN-8394',
    fullName: 'فاطمة الزهراء المرابط',
    cin: 'BK450123',
    phone: '0672889911',
    email: 'fz.morabit@yahoo.fr',
    communeId: 'tit_mellil',
    communeName: 'باشوية تيط مليل',
    neighborhood: 'حي الوفاء',
    purposeId: 'youth_employment',
    purposeTitle: 'تشغيل الشباب وتوجيه مهني واستثماري',
    subject: 'تنسيق مع الفاعلين الاقتصاديين لإدماج خريجي التكوين المهني بتيط مليل',
    details: 'ملف خريجي التكوين المهني لربطهم بفرص الشغل المتاحة بالوحدات الصناعية لتيط مليل.',
    appointmentType: 'in_person',
    preferredDate: '2026-11-05',
    timeSlot: '17:20',
    status: 'confirmed',
    adminNotes: 'موعد مؤكد.',
    assignedRoom: 'مقر الحزب بمديونة',
    createdAt: '2026-10-25T09:30:00Z',
    updatedAt: '2026-10-26T11:00:00Z'
  },
  {
    id: 'apt-003',
    trackingCode: 'NOKTA-MDN-5128',
    fullName: 'المختار بن الشريف',
    cin: 'BK209483',
    phone: '0663456789',
    email: '',
    communeId: 'lahraouyine',
    communeName: 'باشوية الهراويين',
    neighborhood: 'مشروع البركة',
    purposeId: 'complaint_infra',
    purposeTitle: 'شكاية / تظلم بنية تحتية وخدمات عمومية',
    subject: 'ملف الإنارة العمومية وتعبيد المقطع الطرقي المؤدي للمدرسة',
    details: 'طلب تدخل لإصلاح مصابيح الإنارة العمومية وإعادة تهيئة الطريق.',
    appointmentType: 'in_person',
    preferredDate: '2026-11-12',
    timeSlot: '17:40',
    status: 'pending',
    adminNotes: 'قيد مراجعة ديوان النائب.',
    assignedRoom: null,
    createdAt: '2026-10-27T16:40:00Z',
    updatedAt: '2026-10-27T16:40:00Z'
  }
];

// Helper Functions
function readJson(file, defaultValue) {
  try {
    if (!fs.existsSync(file)) {
      writeJson(file, defaultValue);
      return defaultValue;
    }
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return defaultValue;
  }
}

function writeJson(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
  }
}

// Database Interface
const db = {
  getConfig: () => readJson(CONFIG_FILE, DEFAULT_CONFIG),
  updateConfig: (newConfig) => {
    writeJson(CONFIG_FILE, newConfig);
    return newConfig;
  },

  getAppointments: () => readJson(APPOINTMENTS_FILE, SEED_APPOINTMENTS),

  getAppointmentById: (id) => {
    const appointments = db.getAppointments();
    return appointments.find(a => a.id === id);
  },

  getAppointmentByTrackingCode: (code, phoneOrCin = '') => {
    const appointments = db.getAppointments();
    const cleanCode = code ? code.trim().toUpperCase() : '';
    const cleanSearch = phoneOrCin ? phoneOrCin.trim().toLowerCase() : '';

    return appointments.find(a => {
      const matchCode = a.trackingCode.toUpperCase() === cleanCode;
      if (!matchCode) return false;
      if (!cleanSearch) return true;
      const matchPhone = a.phone && a.phone.replace(/\s+/g, '').includes(cleanSearch.replace(/\s+/g, ''));
      const matchCin = a.cin && a.cin.toLowerCase() === cleanSearch;
      return matchPhone || matchCin;
    });
  },

  createAppointment: (appointmentData) => {
    const appointments = db.getAppointments();

    // Generate tracking code: NOKTA-MDN-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `NOKTA-MDN-${randomSuffix}`;
    const newId = `apt-${Date.now()}`;

    const newAppointment = {
      id: newId,
      trackingCode,
      fullName: appointmentData.fullName || '',
      cin: appointmentData.cin ? appointmentData.cin.toUpperCase() : '',
      phone: appointmentData.phone || '',
      email: appointmentData.email || '',
      communeId: appointmentData.communeId || '',
      communeName: appointmentData.communeName || '',
      neighborhood: appointmentData.neighborhood || '',
      purposeId: appointmentData.purposeId || '',
      purposeTitle: appointmentData.purposeTitle || '',
      subject: appointmentData.subject || '',
      details: appointmentData.details || '',
      appointmentType: appointmentData.appointmentType || 'in_person',
      preferredDate: appointmentData.preferredDate || '',
      timeSlot: appointmentData.timeSlot || '17:00',
      status: 'pending',
      adminNotes: '',
      assignedRoom: 'مقر الحزب بمديونة المركز',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    appointments.unshift(newAppointment);
    writeJson(APPOINTMENTS_FILE, appointments);
    return newAppointment;
  },

  updateAppointment: (id, updates) => {
    const appointments = db.getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    if (index === -1) return null;

    appointments[index] = {
      ...appointments[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    writeJson(APPOINTMENTS_FILE, appointments);
    return appointments[index];
  },

  deleteAppointment: (id) => {
    const appointments = db.getAppointments();
    const filtered = appointments.filter(a => a.id !== id);
    if (filtered.length === appointments.length) return false;
    writeJson(APPOINTMENTS_FILE, filtered);
    return true;
  },

  getAdvocacyDossiers: () => []
};

// Force update config file to match factual configuration
writeJson(CONFIG_FILE, DEFAULT_CONFIG);

module.exports = db;
