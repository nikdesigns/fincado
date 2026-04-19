// src/lib/localData.ts
// Single source of truth for all city data

export interface CityData {
  name: string;
  slug: string;
  pincodeStart: string;
  areas: string[];
  description: string;
  authority: string;
  avgPropertyRate: string;
}

export interface StateDocs {
  state: string;
  regulator: string;
  documents: string[];
}

// Helper: Parse rate string like "₹18,000 - ₹45,000"
export function parsePropertyRate(rateStr: string) {
  try {
    const cleanStr = rateStr.replace(/[₹]/g, '');
    const parts = cleanStr.split('-').map((s) => parseInt(s.trim()));
    if (parts.length < 2 || isNaN(parts[0])) {
      return { min: 3000, max: 5000, avg: 4000 };
    }
    const min = parts[0];
    const max = parts[1] || min;
    return { min, max, avg: Math.round((min + max) / 2) };
  } catch {
    return { min: 3000, max: 6000, avg: 4500 };
  }
}

// Helper: Get State & Regulator Info
export function getStateInfo(citySlug: string): StateDocs {
  const s = citySlug.toLowerCase();

  if (
    [
      'mumbai',
      'pune',
      'nagpur',
      'thane',
      'navi-mumbai',
      'nashik',
      'aurangabad'
    ].includes(s)
  ) {
    return {
      state: 'Maharashtra',
      regulator: 'MahaRERA',
      documents: ['7/12 Extract', 'Index II', 'Occupancy Certificate'],
    };
  }
  if (
    ['bangalore', 'mysore', 'mangalore', 'hubli-dharwad', 'belgaum'].includes(s)
  ) {
    return {
      state: 'Karnataka',
      regulator: 'RERA Karnataka',
      documents: ['A-Khata / B-Khata', 'Encumbrance Certificate'],
    };
  }
  if (
    [
      'delhi',
      'noida',
      'gurgaon',
      'ghaziabad',
      'faridabad',
      'meerut',
      'lucknow',
      'kanpur',
      'agra',
      'allahabad',
      'varanasi'
    ].includes(s)
  ) {
    return {
      state: 'Delhi NCR / UP',
      regulator: 'UP RERA / DDA',
      documents: ['Allotment Letter', 'Possession Certificate'],
    };
  }
  if (['chennai', 'coimbatore', 'madurai', 'tirupati'].includes(s)) {
    return {
      state: 'Tamil Nadu',
      regulator: 'TNRERA',
      documents: ['Patta Chitta', 'Encumbrance Certificate'],
    };
  }
  if (['ahmedabad', 'surat', 'vadodara', 'rajkot'].includes(s)) {
    return {
      state: 'Gujarat',
      regulator: 'GUJRERA',
      documents: ['7/12 Extract', 'Property Card'],
    };
  }
  if (['hyderabad', 'visakhapatnam', 'vijayawada', 'tirupati'].includes(s)) {
    return {
      state: 'Telangana / Andhra',
      regulator: 'RERA',
      documents: ['Link Documents', 'LRS Approval'],
    };
  }
  if (['kochi', 'thiruvananthapuram'].includes(s)) {
    return {
      state: 'Kerala',
      regulator: 'K-RERA',
      documents: ['Possession Certificate', 'Title Deed'],
    };
  }
  if (['kolkata'].includes(s)) {
    return {
      state: 'West Bengal',
      regulator: 'WBHIRA',
      documents: ['Mutation Certificate', 'Porcha'],
    };
  }

  return {
    state: 'India',
    regulator: 'RERA',
    documents: ['Sale Deed', 'Possession Certificate', 'NOC from Builder'],
  };
}

// Full cityDetails with all 57 cities from your cities.json
export const cityDetails: Record<string, CityData> = {
  mumbai: {
    name: 'Mumbai',
    slug: 'mumbai',
    pincodeStart: '400',
    areas: ['Andheri', 'Bandra', 'Powai', 'Worli'],
    description: 'financial capital of India',
    authority: 'MMRDA & BMC',
    avgPropertyRate: '₹18,000 - ₹45,000',
  },
  delhi: {
    name: 'Delhi',
    slug: 'delhi',
    pincodeStart: '110',
    areas: ['Dwarka', 'Rohini', 'Saket'],
    description: 'national capital with diverse housing options',
    authority: 'DDA',
    avgPropertyRate: '₹8,000 - ₹22,000',
  },
  bangalore: {
    name: 'Bangalore',
    slug: 'bangalore',
    pincodeStart: '560',
    areas: ['Whitefield', 'Koramangala', 'Indiranagar'],
    description: 'Silicon Valley of India',
    authority: 'BDA',
    avgPropertyRate: '₹6,500 - ₹14,000',
  },
  chennai: {
    name: 'Chennai',
    slug: 'chennai',
    pincodeStart: '600',
    areas: ['Anna Nagar', 'OMR', 'Guindy'],
    description: 'Detroit of Asia',
    authority: 'CMDA',
    avgPropertyRate: '₹5,500 - ₹13,000',
  },
  pune: {
    name: 'Pune',
    slug: 'pune',
    pincodeStart: '411',
    areas: ['Kothrud', 'Hinjewadi', 'Kharadi'],
    description: 'education and auto hub',
    authority: 'PMRDA',
    avgPropertyRate: '₹5,500 - ₹11,000',
  },
  hyderabad: {
    name: 'Hyderabad',
    slug: 'hyderabad',
    pincodeStart: '500',
    areas: ['Gachibowli', 'Banjara Hills'],
    description: 'IT & pharma hub',
    authority: 'HMDA',
    avgPropertyRate: '₹5,000 - ₹10,000',
  },
  kolkata: {
    name: 'Kolkata',
    slug: 'kolkata',
    pincodeStart: '700',
    areas: ['Salt Lake', 'New Town'],
    description: 'cultural capital of India',
    authority: 'KMDA',
    avgPropertyRate: '₹4,000 - ₹9,000',
  },
  ahmedabad: {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    pincodeStart: '380',
    areas: ['SG Highway', 'Vastrapur'],
    description: 'rapidly growing industrial city',
    authority: 'AUDA',
    avgPropertyRate: '₹3,500 - ₹7,500',
  },
  gurgaon: {
    name: 'Gurgaon',
    slug: 'gurgaon',
    pincodeStart: '122',
    areas: ['DLF Cyber City', 'Golf Course Road'],
    description: 'financial & industrial hub',
    authority: 'HSVP',
    avgPropertyRate: '₹9,000 - ₹18,000',
  },
  noida: {
    name: 'Noida',
    slug: 'noida',
    pincodeStart: '201',
    areas: ['Sector 62', 'Sector 150'],
    description: 'planned city in NCR',
    authority: 'Noida Authority',
    avgPropertyRate: '₹4,500 - ₹9,000',
  },
  thane: {
    name: 'Thane',
    slug: 'thane',
    pincodeStart: '400',
    areas: ['Ghodbunder Road', 'Majiwada'],
    description: 'City of Lakes near Mumbai',
    authority: 'TMC',
    avgPropertyRate: '₹10,000 - ₹18,000',
  },
  'navi-mumbai': {
    name: 'Navi Mumbai',
    slug: 'navi-mumbai',
    pincodeStart: '410',
    areas: ['Vashi', 'Kharghar'],
    description: 'largest planned city in the world',
    authority: 'CIDCO',
    avgPropertyRate: '₹8,000 - ₹16,000',
  },
  jaipur: {
    name: 'Jaipur',
    slug: 'jaipur',
    pincodeStart: '302',
    areas: ['Vaishali Nagar', 'C-Scheme'],
    description: 'Pink City',
    authority: 'JDA',
    avgPropertyRate: '₹3,500 - ₹7,000',
  },
  lucknow: {
    name: 'Lucknow',
    slug: 'lucknow',
    pincodeStart: '226',
    areas: ['Gomti Nagar', 'Hazratganj'],
    description: 'capital of UP',
    authority: 'LDA',
    avgPropertyRate: '₹3,000 - ₹6,500',
  },
  kanpur: {
    name: 'Kanpur',
    slug: 'kanpur',
    pincodeStart: '208',
    areas: ['Swaroop Nagar', 'Civil Lines'],
    description: 'major industrial center',
    authority: 'KDA',
    avgPropertyRate: '₹3,200 - ₹6,000',
  },
  nagpur: {
    name: 'Nagpur',
    slug: 'nagpur',
    pincodeStart: '440',
    areas: ['Dharampeth', 'Sitabuldi'],
    description: 'winter capital of Maharashtra',
    authority: 'NIT',
    avgPropertyRate: '₹3,500 - ₹6,500',
  },
  indore: {
    name: 'Indore',
    slug: 'indore',
    pincodeStart: '452',
    areas: ['Vijay Nagar', 'Palasia'],
    description: 'cleanest city in India',
    authority: 'IDA',
    avgPropertyRate: '₹3,000 - ₹6,500',
  },
  bhopal: {
    name: 'Bhopal',
    slug: 'bhopal',
    pincodeStart: '462',
    areas: ['Arera Colony', 'MP Nagar'],
    description: 'City of Lakes',
    authority: 'BDA',
    avgPropertyRate: '₹2,500 - ₹5,000',
  },
  surat: {
    name: 'Surat',
    slug: 'surat',
    pincodeStart: '395',
    areas: ['Vesu', 'Adajan'],
    description: 'Diamond City',
    authority: 'SUDA',
    avgPropertyRate: '₹3,500 - ₹7,000',
  },
  vadodara: {
    name: 'Vadodara',
    slug: 'vadodara',
    pincodeStart: '390',
    areas: ['Alkapuri', 'Gotri'],
    description: 'cultural capital of Gujarat',
    authority: 'VUDA',
    avgPropertyRate: '₹2,800 - ₹5,500',
  },
  rajkot: {
    name: 'Rajkot',
    slug: 'rajkot',
    pincodeStart: '360',
    areas: ['Kalavad Road', '150 Feet Ring Road'],
    description: 'industrial city in Saurashtra',
    authority: 'RUDA',
    avgPropertyRate: '₹3,000 - ₹5,500',
  },
  patna: {
    name: 'Patna',
    slug: 'patna',
    pincodeStart: '800',
    areas: ['Boring Road', 'Kankarbagh'],
    description: 'ancient historic city',
    authority: 'PRDA',
    avgPropertyRate: '₹4,000 - ₹8,000',
  },
  ludhiana: {
    name: 'Ludhiana',
    slug: 'ludhiana',
    pincodeStart: '141',
    areas: ['Sarabha Nagar', 'Model Town'],
    description: 'Manchester of India',
    authority: 'GLADA',
    avgPropertyRate: '₹3,000 - ₹6,000',
  },
  agra: {
    name: 'Agra',
    slug: 'agra',
    pincodeStart: '282',
    areas: ['Taj Ganj', 'Dayal Bagh'],
    description: 'historic tourist city',
    authority: 'ADA',
    avgPropertyRate: '₹3,000 - ₹6,000',
  },
  nashik: {
    name: 'Nashik',
    slug: 'nashik',
    pincodeStart: '422',
    areas: ['Gangapur Road', 'College Road'],
    description: 'Wine Capital of India',
    authority: 'NMC',
    avgPropertyRate: '₹3,200 - ₹7,000',
  },
  faridabad: {
    name: 'Faridabad',
    slug: 'faridabad',
    pincodeStart: '121',
    areas: ['Sector 15', 'Neharpar'],
    description: 'industrial hub in NCR',
    authority: 'HSVP',
    avgPropertyRate: '₹3,500 - ₹7,500',
  },
  ghaziabad: {
    name: 'Ghaziabad',
    slug: 'ghaziabad',
    pincodeStart: '201',
    areas: ['Indirapuram', 'Vaishali'],
    description: 'Gateway of UP',
    authority: 'GDA',
    avgPropertyRate: '₹4,000 - ₹9,500',
  },
  meerut: {
    name: 'Meerut',
    slug: 'meerut',
    pincodeStart: '250',
    areas: ['Modipuram', 'Shastri Nagar'],
    description: 'ancient city in NCR',
    authority: 'MDA',
    avgPropertyRate: '₹2,800 - ₹5,500',
  },
  varanasi: {
    name: 'Varanasi',
    slug: 'varanasi',
    pincodeStart: '221',
    areas: ['Sigra', 'Lanka'],
    description: 'spiritual heart of India',
    authority: 'VDA',
    avgPropertyRate: '₹3,500 - ₹8,000',
  },
  visakhapatnam: {
    name: 'Visakhapatnam',
    slug: 'visakhapatnam',
    pincodeStart: '530',
    areas: ['MVP Colony', 'Beach Road'],
    description: 'Jewel of the East Coast',
    authority: 'VMRDA',
    avgPropertyRate: '₹3,500 - ₹7,000',
  },
  coimbatore: {
    name: 'Coimbatore',
    slug: 'coimbatore',
    pincodeStart: '641',
    areas: ['RS Puram', 'Peelamedu'],
    description: 'Manchester of South India',
    authority: 'DTCP',
    avgPropertyRate: '₹4,000 - ₹7,500',
  },
  kochi: {
    name: 'Kochi',
    slug: 'kochi',
    pincodeStart: '682',
    areas: ['Edappally', 'Kakkanad'],
    description: 'commercial hub of Kerala',
    authority: 'GCDA',
    avgPropertyRate: '₹4,500 - ₹8,500',
  },
  mysore: {
    name: 'Mysore',
    slug: 'mysore',
    pincodeStart: '570',
    areas: ['Vijayanagar', 'Gokulam'],
    description: 'heritage city',
    authority: 'MUDA',
    avgPropertyRate: '₹3,000 - ₹6,000',
  },
  mangalore: {
    name: 'Mangalore',
    slug: 'mangalore',
    pincodeStart: '575',
    areas: ['Bejai', 'Kadri'],
    description: 'major port and education hub',
    authority: 'MUDA',
    avgPropertyRate: '₹3,800 - ₹7,000',
  },
  madurai: {
    name: 'Madurai',
    slug: 'madurai',
    pincodeStart: '625',
    areas: ['Anna Nagar', 'KK Nagar'],
    description: 'cultural capital of Tamil Nadu',
    authority: 'DTCP',
    avgPropertyRate: '₹3,000 - ₹5,500',
  },
  chandigarh: {
    name: 'Chandigarh',
    slug: 'chandigarh',
    pincodeStart: '160',
    areas: ['Sector 17', 'Mohali'],
    description: 'India’s first planned city',
    authority: 'Chandigarh Administration',
    avgPropertyRate: '₹6,000 - ₹12,000',
  },
  dehradun: {
    name: 'Dehradun',
    slug: 'dehradun',
    pincodeStart: '248',
    areas: ['Rajpur Road', 'Sahastradhara'],
    description: 'foothills of the Himalayas',
    authority: 'MDDA',
    avgPropertyRate: '₹3,500 - ₹7,500',
  },
  guwahati: {
    name: 'Guwahati',
    slug: 'guwahati',
    pincodeStart: '781',
    areas: ['GS Road', 'Dispur'],
    description: 'gateway to North East India',
    authority: 'GMDA',
    avgPropertyRate: '₹3,500 - ₹6,000',
  },
  bhubaneswar: {
    name: 'Bhubaneswar',
    slug: 'bhubaneswar',
    pincodeStart: '751',
    areas: ['Patia', 'Khandagiri'],
    description: 'Temple City of India',
    authority: 'BDA',
    avgPropertyRate: '₹3,500 - ₹6,500',
  },
  ranchi: {
    name: 'Ranchi',
    slug: 'ranchi',
    pincodeStart: '834',
    areas: ['Lalpur', 'Doranda'],
    description: 'capital of Jharkhand',
    authority: 'Ranchi Municipal Corporation',
    avgPropertyRate: '₹3,000 - ₹5,500',
  },
  jamshedpur: {
    name: 'Jamshedpur',
    slug: 'jamshedpur',
    pincodeStart: '831',
    areas: ['Sakchi', 'Bistupur'],
    description: 'Steel City',
    authority: 'JNAC',
    avgPropertyRate: '₹2,800 - ₹5,500',
  },
  raipur: {
    name: 'Raipur',
    slug: 'raipur',
    pincodeStart: '492',
    areas: ['Naya Raipur', 'Shankar Nagar'],
    description: 'capital of Chhattisgarh',
    authority: 'NRDA',
    avgPropertyRate: '₹2,500 - ₹5,000',
  },
  aurangabad: {
    name: 'Aurangabad',
    slug: 'aurangabad',
    pincodeStart: '431',
    areas: ['Cidco', 'Garkheda'],
    description: 'tourism and industrial hub',
    authority: 'CIDCO Aurangabad',
    avgPropertyRate: '₹3,000 - ₹5,500',
  },
  jodhpur: {
    name: 'Jodhpur',
    slug: 'jodhpur',
    pincodeStart: '342',
    areas: ['Shastri Nagar', 'Paota'],
    description: 'Sun City of Rajasthan',
    authority: 'JDA Jodhpur',
    avgPropertyRate: '₹2,800 - ₹6,000',
  },
  udaipur: {
    name: 'Udaipur',
    slug: 'udaipur',
    pincodeStart: '313',
    areas: ['Hiran Magri', 'Fatehpura'],
    description: 'City of Lakes',
    authority: 'UIT Udaipur',
    avgPropertyRate: '₹3,000 - ₹6,500',
  },
  kota: {
    name: 'Kota',
    slug: 'kota',
    pincodeStart: '324',
    areas: ['Vigyan Nagar', 'Talwandi'],
    description: 'coaching hub of India',
    authority: 'UIT Kota',
    avgPropertyRate: '₹2,500 - ₹5,500',
  },
  amritsar: {
    name: 'Amritsar',
    slug: 'amritsar',
    pincodeStart: '143',
    areas: ['Ranjit Avenue', 'Mall Road'],
    description: 'holy city with thriving commerce',
    authority: 'ADA',
    avgPropertyRate: '₹2,800 - ₹5,500',
  },
  jalandhar: {
    name: 'Jalandhar',
    slug: 'jalandhar',
    pincodeStart: '144',
    areas: ['Model Town', 'Rama Mandi'],
    description: 'commercial center of Punjab',
    authority: 'JDA',
    avgPropertyRate: '₹2,500 - ₹5,000',
  },
  allahabad: {
    name: 'Prayagraj (Allahabad)',
    slug: 'allahabad',
    pincodeStart: '211',
    areas: ['Civil Lines', 'Naini'],
    description: 'major educational and judicial hub',
    authority: 'PDA',
    avgPropertyRate: '₹3,100 - ₹8,700',
  },
  jabalpur: {
    name: 'Jabalpur',
    slug: 'jabalpur',
    pincodeStart: '482',
    areas: ['Vijay Nagar', 'Civil Lines'],
    description: 'important industrial city',
    authority: 'JDA',
    avgPropertyRate: '₹2,200 - ₹4,500',
  },
  tirupati: {
    name: 'Tirupati',
    slug: 'tirupati',
    pincodeStart: '517',
    areas: ['Renigunta', 'Alipiri'],
    description: 'major spiritual destination',
    authority: 'TUDA',
    avgPropertyRate: '₹3,500 - ₹6,000',
  },
  'hubli-dharwad': {
    name: 'Hubli-Dharwad',
    slug: 'hubli-dharwad',
    pincodeStart: '580',
    areas: ['Vidya Nagar', 'Gokul Road'],
    description: 'second largest urban agglomeration in Karnataka',
    authority: 'HDUDA',
    avgPropertyRate: '₹2,500 - ₹4,500',
  },
  belgaum: {
    name: 'Belgaum',
    slug: 'belgaum',
    pincodeStart: '590',
    areas: ['Tilakwadi', 'Camp'],
    description: 'smart city on Karnataka-Maharashtra border',
    authority: 'BUDA',
    avgPropertyRate: '₹2,800 - ₹5,000',
  },

  default: {
    name: 'City',
    slug: 'default',
    pincodeStart: 'XX',
    areas: ['City Center', 'Civil Lines'],
    description: 'a growing urban center in India',
    authority: 'Local Municipal Corporation',
    avgPropertyRate: '₹3,000 - ₹8,000',
  },
};

// Helper: Get City Data
export function getCityData(slug: string): CityData {
  const normalized = slug.toLowerCase();
  return (
    cityDetails[normalized] || {
      ...cityDetails.default,
      name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
      slug: normalized,
    }
  );
}

// Helper: Get Competitors
export const bankCompetitors: Record<string, string[]> = {
  sbi: ['hdfc', 'icici', 'pnb', 'bob'],
  hdfc: ['sbi', 'icici', 'axis', 'kotak'],
  icici: ['hdfc', 'sbi', 'axis', 'bajaj'],
  axis: ['icici', 'hdfc', 'sbi', 'kotak'],
  kotak: ['hdfc', 'icici', 'axis', 'idfc-first'],
  pnb: ['sbi', 'bob', 'canara', 'union'],
  bob: ['sbi', 'pnb', 'boi', 'canara'],
  canara: ['union', 'pnb', 'bob', 'indian'],
  bajaj: ['tata', 'hdfc', 'icici', 'abc'],
  tata: ['bajaj', 'hdfc', 'icici', 'axis'],
  'idfc-first': ['hdfc', 'icici', 'axis', 'kotak'],
  default: ['sbi', 'hdfc', 'icici', 'bajaj'],
};

export function getCompetitors(bankSlug: string): string[] {
  return bankCompetitors[bankSlug] || bankCompetitors.default;
}
