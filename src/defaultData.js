// Default Fallback Data to guarantee instant zero-delay rendering

export const DEFAULT_PURPOSES = [
  {
    id: 'civil_society',
    category: 'المجتمع المدني',
    title: '  لقاء هيئات المجتمع المدني والجمعيات والوداديات',
    subTitle: 'لقاء هيئات المجتمع المدني والجمعيات والوداديات',
    desc: 'ممثلو الجمعيات المحلية، وداديات الأحياء، الهيئات المهنية والرياضية والثقافية',
    icon: 'Users'
  },
  {
    id: 'youth_employment',
    category: 'الشباب',
    title: ' تشغيل الشباب وتوجيه مهني واستثماري',
    subTitle: 'تشغيل الشباب وتوجيه مهني واستثماري',
    desc: 'فرص الشغل بالإقليم، التكوين المهني، دعم المبادرات المقاولاتية والتعاونيات المحلية',
    icon: 'Briefcase'
  },
  {
    id: 'citizen_direct',
    category: 'المواطنين',
    title: ' طلب لقاء مباشر واستشارة مواطنة خاصة',
    subTitle: 'طلب لقاء مباشر واستشارة مواطنة خاصة',
    desc: 'جلسة استماع مباشرة مع النائب البرلماني د. أمين نقطى لطرح انشغال أو ملف خاص',
    icon: 'MessageSquare'
  }
];

export const DEFAULT_COMMUNES = [
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
];

export const DEFAULT_CONFIG = {
  politician: {
    name: 'د. أمين نقطى',
    title: 'نائب برلماني ومنسق إقليمي عن دائرة إقليم مديونة',
    degree: 'دكتوراه في العلوم السياسية وخبير اقتصادي',
    motto: 'كيسمع لكم كل خميس على الساعة 5 زوالا في مقر الحزب بمديونة',
    party: 'التجمع الوطني للأحرار (RNI)',
    mainReceptionDay: 'كل خميس على الساعة 17:00 (5 زوالاً)',
    officeAddress: 'مقر حزب التجمع الوطني للأحرار، مديونة المركز (شارع الحسن الثاني، قرب بلدية مديونة)، إقليم مديونة',
    phone: '+212 5 22 51 04 20',
    whatsapp: '+212 6 61 98 42 10',
    email: 'contact@aminenokta.ma',
    photoUrl: '/images/dr_amine_nokta.jpg'
  },
  communes: DEFAULT_COMMUNES,
  purposes: DEFAULT_PURPOSES,
  schedule: {
    activeDays: [4],
    slotDurationMinutes: 20,
    startTime: '17:00',
    endTime: '20:00',
    dayLabel: 'كل خميس على الساعة 5 زوالاً (17:00)',
    location: 'مقر الحزب بمديونة المركز (شارع الحسن الثاني قرب بلدية مديونة)'
  }
};

