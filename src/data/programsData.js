import { placeholders } from './placeholders';

export const programsOverview = [
  {
    id: 'livelihoods',
    title: 'Livelihood & Enterprise',
    icon: 'Sprout',
    brief: 'Empowering rural entrepreneurs through training, credit linkages, and market access in agriculture, livestock, and MSMEs.',
    slug: 'livelihoods'
  },
  {
    id: 'fpo',
    title: 'Farmer Collectives',
    icon: 'Users',
    brief: 'Building Farmer Producer Organizations that give smallholders collective bargaining power and better market prices.',
    slug: 'farmer-collectives'
  },
  {
    id: 'women',
    title: "Women's Empowerment",
    icon: 'Heart',
    brief: '14,375 Self-Help Groups transforming women into community leaders and entrepreneurs.',
    slug: 'women-empowerment'
  },
  {
    id: 'artisan',
    title: 'Artisan Revival',
    icon: 'Palette',
    brief: 'Preserving traditional crafts while connecting artisans to modern markets through PM Vishwakarma and KVIC programs.',
    slug: 'artisan-revival'
  },
  {
    id: 'skill',
    title: 'Skill Development',
    icon: 'GraduationCap',
    brief: 'Equipping rural youth and women with market-relevant skills for employment and entrepreneurship.',
    slug: 'skill-development'
  },
  {
    id: 'health',
    title: 'Health & Nutrition',
    icon: 'HeartPulse',
    brief: 'Improving healthcare access and nutrition awareness in underserved areas.',
    slug: 'health-nutrition'
  },
];

export const programsDetailed = {
  livelihoods: {
    title: 'Building Sustainable Livelihoods',
    tagline: 'Empowering rural communities through agriculture, livestock, and micro-enterprise development',
    image: placeholders.farming,
    challenge: "Rural families in Odisha often depend on single, vulnerable income sources. Limited access to training, credit, and markets keeps them trapped in subsistence economies.",
    approach: "We provide end-to-end support: from skill training and business planning to credit linkages and market access. Our interventions span agriculture, livestock (backyard poultry, goatery, fishery), and micro-enterprises.",
    programs: [
      {
        name: 'LEDP (Livelihood Enterprise Development Program)',
        description: '270 SHG members trained in tailoring, bamboo articles, goat rearing. Toolkits and startup grants provided. Market access through fairs, melas, digital platforms.',
        image: placeholders.training,
      },
      {
        name: 'EDP (Entrepreneurship Development Program)',
        description: '360 rural entrepreneurs trained (manufacturing, service sector, food processing). 115 customized business development plans created. 360 EIN registrations, 120 UDYAM registrations facilitated. Credit linkages with financial institutions.',
        image: placeholders.market,
      },
      {
        name: 'Micro-Enterprise Support',
        description: 'Backyard poultry, goatery, fishery, mushroom farming, beekeeping, tailoring, bamboo craft, mop making.',
        image: placeholders.artisan,
      },
    ],
    impact: [
      { value: 930, label: 'Individuals assisted in income-generating activities' },
      { value: 360, label: 'Entrepreneurs trained in FY 2024-25' },
      { value: 79, suffix: '%', label: 'Post-training self-employment rate (LEDP)' },
      { value: 52, suffix: '%', label: 'Business setup rate (EDP)' },
    ],
  },

  'farmer-collectives': {
    title: 'Strength in Numbers',
    tagline: 'Organizing smallholder farmers into collectives for better bargaining power and market access',
    image: placeholders.farming,
    challenge: "Small and marginal farmers face exploitation by middlemen, lack access to quality inputs, and have no collective voice in markets.",
    approach: "We promote and strengthen Farmer Producer Organizations (FPOs) that aggregate farmers for collective input procurement, technical services, processing, and marketing.",
    programs: [
      {
        name: 'FPO-CSS (Central Sector Scheme)',
        description: '2 FPOs formed and strengthened with 1,800 farmer members. 30+ Board of Directors and CEOs trained. Exposure visits to leading agri-value chain institutions.',
        image: placeholders.farming,
      },
      {
        name: 'OFPO Bamboo Cluster',
        description: '1 Bamboo-based OFPO initiated under NABARD with 318 members. Capacity building and product profiling. 100% target achievement.',
        image: placeholders.craftwork,
      },
      {
        name: 'Odra Desh Marketing Company',
        description: 'Joint venture co-owned by 2 registered FPOs. Equity-based participation. Unified branding and packaging. E-commerce and institutional buyer linkages. 2,500+ farmers reached with better prices.',
        image: placeholders.market,
      },
    ],
    impact: [
      { value: 1800, suffix: '+', label: 'Farmers in FPO network' },
      { value: '₹80 Lakhs', label: 'Turnover achieved within 2 years' },
      { value: 1000, suffix: '+', label: 'Farmers with collective input procurement' },
      { value: 100, suffix: '%', label: 'FPO target achievement in FY 2024-25' },
    ],
  },

  'women-empowerment': {
    title: 'Women as Agents of Change',
    tagline: 'Building a network of empowered women driving community transformation',
    image: placeholders.women,
    challenge: "Women in rural Odisha often lack financial independence, access to credit, and platforms for collective action.",
    approach: "We form, strengthen, and federate Women Self-Help Groups (WSHGs), providing them with financial literacy, credit linkages, enterprise training, and leadership development.",
    programs: [
      {
        name: 'SHG Formation & Strengthening',
        description: '14,375 Women SHGs promoted with 147,000 women members. 82 SHG federations covering 1,000+ SHGs.',
        image: placeholders.women,
      },
      {
        name: 'E-Shakti (NABARD Digital Initiative)',
        description: '13,000+ SHGs digitized. Paperless credit linkage system. ₹82 Crore credit facilitated within 3 years.',
        image: placeholders.training,
      },
      {
        name: 'SHG Federation Training',
        description: 'Leadership building programs. Livelihood micro-projects. Financial management training.',
        image: placeholders.community,
      },
    ],
    impact: [
      { value: 14375, label: 'Women SHGs' },
      { value: 147000, label: 'Women empowered' },
      { value: 13000, suffix: '+', label: 'SHGs digitized' },
      { value: '₹82 Crore', label: 'Credit linkage facilitated' },
      { value: 82, label: 'Federations formed' },
    ],
  },

  'artisan-revival': {
    title: 'Preserving Heritage, Creating Futures',
    tagline: 'Reviving traditional crafts while connecting artisans to modern markets',
    image: placeholders.artisan,
    challenge: "Traditional artisans—potters, weavers, blacksmiths, carpenters—face declining demand, lack of recognition, and no access to formal support systems.",
    approach: "We work with government schemes like PM Vishwakarma and KVIC's Gramodyog Vikas Yojana to provide artisans with recognition, skill upgradation, toolkits, credit, and market linkages.",
    programs: [
      {
        name: 'PM Vishwakarma Yojana',
        description: '130 traditional artisans registered (carpenters, potters, basket makers, masons). Orientation and skill upgradation training. Recognition certificates, loans, and toolkits facilitated. 100% ID issuance achieved.',
        image: placeholders.artisan,
      },
      {
        name: 'Gramodyog Vikas Yojana (KVIC)',
        description: 'Partnership with Khadi and Village Industries Commission. Training in village oil industry, paper plate making, tamarind processing, pottery. Marketing support via exhibitions and buyer-seller meets. 70 SHG members trained.',
        image: placeholders.craftwork,
      },
      {
        name: 'Cluster Development',
        description: 'Mushroom and watermelon clusters (agriculture). Bamboo crafts, bell metal, Dokhra crafts, paddy straw crafts (handicrafts). Product profiling and quality standardization.',
        image: placeholders.market,
      },
    ],
    impact: [
      { value: 130, label: 'Artisans under PM Vishwakarma' },
      { value: 100, suffix: '%', label: 'Recognition certificates issued' },
      { value: 70, label: 'SHG members in Gramodyog program' },
      { value: 5, label: 'Skill camps conducted' },
    ],
  },

  'skill-development': {
    title: 'Skills for Self-Reliance',
    tagline: 'Equipping rural youth and women with market-relevant skills for employment and entrepreneurship',
    image: placeholders.training,
    challenge: "Rural youth lack access to quality vocational training aligned with market demands, leading to unemployment and migration.",
    approach: "We provide short-term vocational courses, entrepreneurship training, and placement support, with special focus on women and SC/ST communities.",
    programs: [
      {
        name: 'Entrepreneurship Promotion through Skill Development',
        description: '50+ women trained in food processing and cosmetology. MSME and cooperative linkages for self-employment. 4 Entrepreneurship Awareness campaigns in Dhenkanal and Angul.',
        image: placeholders.women,
      },
      {
        name: 'Vocational Training',
        description: 'Tailoring, bamboo articles, construction work, food processing units, digital literacy programs.',
        image: placeholders.training,
      },
      {
        name: 'Placement Support',
        description: "Linkages with companies: Domino's, Colour Plus, Raymond, TVS Motors, Sri Laxmi Textiles.",
        image: placeholders.training,
      },
    ],
    impact: [
      { value: 4800, label: 'Youths received entrepreneurship training' },
      { value: 3600, label: 'Established their own businesses' },
      { value: 16700, label: 'Jobs created' },
      { value: 500, suffix: '+', label: 'Rural youths placed in companies' },
    ],
  },

  'health-nutrition': {
    title: 'Healthy Communities, Strong Futures',
    tagline: 'Improving healthcare access and nutrition awareness in underserved areas',
    image: placeholders.community,
    challenge: "Rural communities face limited access to healthcare services and nutrition awareness.",
    approach: "We conduct awareness campaigns, health camps, and nutrition education programs in partnership with government health missions.",
    programs: [
      {
        name: 'Mass Drug Administration (MDA) Awareness',
        description: '12,000 community members reached. 560 awareness drives in 1 block. 100% target achievement.',
        image: placeholders.village,
      },
      {
        name: 'Health Camps & Awareness',
        description: 'Maternal and child health interventions. Sanitation drives. Nutrition education campaigns.',
        image: placeholders.community,
      },
    ],
    impact: [
      { value: 12000, label: 'Community members reached' },
      { value: 560, label: 'Awareness drives conducted' },
      { value: 100, suffix: '%', label: 'Program target achieved' },
    ],
  },
};

export const featuredInitiatives = [
  {
    id: 1,
    titleKey: 'initiatives.shopOnWheel.title',
    tag: 'Market Access Innovation',
    descriptionKey: 'initiatives.shopOnWheel.description',
    image: placeholders.market,
  },
  {
    id: 2,
    titleKey: 'initiatives.janjati.title',
    tag: 'Tribal Empowerment',
    descriptionKey: 'initiatives.janjati.description',
    image: placeholders.village,
  },
  {
    id: 3,
    titleKey: 'initiatives.odra.title',
    tag: 'Collective Enterprise',
    descriptionKey: 'initiatives.odra.description',
    image: placeholders.farming,
  },
];
