export interface CityData {
  name: string;
  slug: string;
  pincodeStart: string; // Used for "Branches near Pincode 400xxx"
  areas: string[]; // Used for "Properties in Andheri, Bandra..."
  description: string; // Unique sentence structure per city
  authority: string; // Local Development Authority (High Trust Signal)
  avgPropertyRate: string; // Adds value for EMI Calculator
}

export const cityDetails: Record<string, CityData> = {
  // --- TIER 1 METROS ---
  mumbai: {
    name: 'Mumbai',
    slug: 'mumbai',
    pincodeStart: '400',
    areas: [
      'Andheri',
      'Bandra',
      'Borivali',
      'Dadar',
      'Colaba',
      'Juhu',
      'Powai',
    ],
    description:
      'the financial capital of India, characterized by high-value property markets and a fast-paced lifestyle',
    authority: 'MMRDA and BMC',
    avgPropertyRate: '₹18,000 - ₹45,000',
  },
  delhi: {
    name: 'Delhi',
    slug: 'delhi',
    pincodeStart: '110',
    areas: [
      'Connaught Place',
      'Dwarka',
      'Rohini',
      'Saket',
      'Lajpat Nagar',
      'Vasant Kunj',
    ],
    description:
      'the national capital, offering a diverse mix of DDA flats, luxury independent floors, and government housing',
    authority: 'DDA (Delhi Development Authority)',
    avgPropertyRate: '₹8,000 - ₹22,000',
  },
  bangalore: {
    name: 'Bangalore',
    slug: 'bangalore',
    pincodeStart: '560',
    areas: [
      'Indiranagar',
      'Whitefield',
      'Koramangala',
      'HSR Layout',
      'Jayanagar',
      'Electronic City',
    ],
    description:
      'the Silicon Valley of India, with a booming real estate market driven by the IT and startup sector',
    authority: 'BDA (Bangalore Development Authority)',
    avgPropertyRate: '₹6,500 - ₹14,000',
  },
  chennai: {
    name: 'Chennai',
    slug: 'chennai',
    pincodeStart: '600',
    areas: ['T. Nagar', 'Adyar', 'Velachery', 'Anna Nagar', 'OMR', 'Guindy'],
    description:
      'a major manufacturing and automobile hub (Detroit of Asia) with a stable and end-user driven property market',
    authority: 'CMDA (Chennai Metropolitan Development Authority)',
    avgPropertyRate: '₹5,500 - ₹13,000',
  },
  hyderabad: {
    name: 'Hyderabad',
    slug: 'hyderabad',
    pincodeStart: '500',
    areas: [
      'Gachibowli',
      'Banjara Hills',
      'Jubilee Hills',
      'Kukatpally',
      'Hitech City',
    ],
    description:
      'a rapidly growing IT and pharma hub known for its excellent infrastructure and affordable premium housing',
    authority: 'HMDA (Hyderabad Metropolitan Development Authority)',
    avgPropertyRate: '₹5,000 - ₹10,000',
  },
  kolkata: {
    name: 'Kolkata',
    slug: 'kolkata',
    pincodeStart: '700',
    areas: ['Salt Lake', 'New Town', 'Ballygunge', 'Park Street', 'Dum Dum'],
    description:
      'the cultural capital of India, offering some of the most affordable real estate options among metros',
    authority: 'KMDA (Kolkata Metropolitan Development Authority)',
    avgPropertyRate: '₹4,000 - ₹9,000',
  },
  pune: {
    name: 'Pune',
    slug: 'pune',
    pincodeStart: '411',
    areas: [
      'Viman Nagar',
      'Kothrud',
      'Wakad',
      'Baner',
      'Hadapsar',
      'Hinjewadi',
    ],
    description:
      'a major education and auto hub, known for its pleasant weather and high demand for rental yield properties',
    authority: 'PMRDA (Pune Metropolitan Region Development Authority)',
    avgPropertyRate: '₹5,500 - ₹11,000',
  },
  ahmedabad: {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    pincodeStart: '380',
    areas: ['Satellite', 'Vastrapur', 'Bopal', 'Maninagar', 'SG Highway'],
    description:
      'a rapidly developing industrial city with excellent connectivity and a thriving mercantile community',
    authority: 'AUDA (Ahmedabad Urban Development Authority)',
    avgPropertyRate: '₹3,500 - ₹7,500',
  },

  // --- TIER 2 / SATELLITE CITIES ---
  gurgaon: {
    name: 'Gurgaon',
    slug: 'gurgaon',
    pincodeStart: '122',
    areas: [
      'DLF Cyber City',
      'Golf Course Road',
      'Sohna Road',
      'Sector 56',
      'Udyog Vihar',
    ],
    description:
      'a leading financial and industrial hub with one of the highest per capita incomes in India',
    authority: 'HSVP (Haryana Shahari Vikas Pradhikaran)',
    avgPropertyRate: '₹9,000 - ₹18,000',
  },
  noida: {
    name: 'Noida',
    slug: 'noida',
    pincodeStart: '201',
    areas: [
      'Sector 18',
      'Sector 62',
      'Sector 150',
      'Greater Noida West',
      'Botanical Garden',
    ],
    description:
      'a systematically planned city offering wide roads, green cover, and affordable high-rise apartments',
    authority: 'Noida Authority',
    avgPropertyRate: '₹4,500 - ₹9,000',
  },
  thane: {
    name: 'Thane',
    slug: 'thane',
    pincodeStart: '400',
    areas: [
      'Ghodbunder Road',
      'Majiwada',
      'Vartak Nagar',
      'Hiranandani Estate',
      'Teen Hath Naka',
    ],
    description:
      'the City of Lakes, which has evolved from an industrial town to a premium residential destination',
    authority: 'TMC (Thane Municipal Corporation)',
    avgPropertyRate: '₹10,000 - ₹18,000',
  },
  'navi-mumbai': {
    name: 'Navi Mumbai',
    slug: 'navi-mumbai',
    pincodeStart: '410',
    areas: ['Vashi', 'Nerul', 'Belapur', 'Kharghar', 'Panvel'],
    description:
      'one of the largest planned cities in the world, offering cleaner air and organized infrastructure near Mumbai',
    authority: 'CIDCO',
    avgPropertyRate: '₹8,000 - ₹16,000',
  },

  // --- NORTH INDIA ---
  jaipur: {
    name: 'Jaipur',
    slug: 'jaipur',
    pincodeStart: '302',
    areas: [
      'Vaishali Nagar',
      'Malviya Nagar',
      'Jagatpura',
      'Mansarovar',
      'C-Scheme',
    ],
    description:
      'the Pink City, blending heritage tourism with a fast-growing IT and modern housing sector',
    authority: 'JDA (Jaipur Development Authority)',
    avgPropertyRate: '₹3,500 - ₹7,000',
  },
  lucknow: {
    name: 'Lucknow',
    slug: 'lucknow',
    pincodeStart: '226',
    areas: [
      'Gomti Nagar',
      'Hazratganj',
      'Aliganj',
      'Indira Nagar',
      'Amar Shaheed Path',
    ],
    description:
      'the capital of UP, seeing rapid infrastructural growth with the expansion of Metro and Expressways',
    authority: 'LDA (Lucknow Development Authority)',
    avgPropertyRate: '₹3,000 - ₹6,500',
  },
  kanpur: {
    name: 'Kanpur',
    slug: 'kanpur',
    pincodeStart: '208',
    areas: [
      'Swaroop Nagar',
      'Civil Lines',
      'Kakadeo',
      'Kidwai Nagar',
      'Kalyanpur',
    ],
    description:
      'a major industrial center of North India, known for its leather industry and educational institutes',
    authority: 'KDA (Kanpur Development Authority)',
    avgPropertyRate: '₹3,200 - ₹6,000',
  },
  chandigarh: {
    name: 'Chandigarh',
    slug: 'chandigarh',
    pincodeStart: '160',
    areas: ['Sector 17', 'Mohali', 'Zirakpur', 'Panchkula', 'Manimajra'],
    description:
      'India’s first planned city, known for its architecture, urban design, and high quality of life',
    authority: 'Chandigarh Administration',
    avgPropertyRate: '₹6,000 - ₹12,000',
  },
  dehradun: {
    name: 'Dehradun',
    slug: 'dehradun',
    pincodeStart: '248',
    areas: [
      'Rajpur Road',
      'Clement Town',
      'Dalanwala',
      'Vasant Vihar',
      'Sahastradhara',
    ],
    description:
      'a scenic educational hub in the foothills of the Himalayas, popular for retirement and second homes',
    authority: 'MDDA (Mussoorie Dehradun Development Authority)',
    avgPropertyRate: '₹3,500 - ₹7,500',
  },
  ludhiana: {
    name: 'Ludhiana',
    slug: 'ludhiana',
    pincodeStart: '141',
    areas: [
      'Sarabha Nagar',
      'Civil Lines',
      'Model Town',
      'Ferozepur Road',
      'Pakhowal Road',
    ],
    description:
      'the industrial hub of Punjab, often called the Manchester of India',
    authority: 'GLADA (Greater Ludhiana Area Development Authority)',
    avgPropertyRate: '₹3,000 - ₹6,000',
  },
  amritsar: {
    name: 'Amritsar',
    slug: 'amritsar',
    pincodeStart: '143',
    areas: [
      'Ranjit Avenue',
      'Green Avenue',
      'Mall Road',
      'Lawrence Road',
      'Basant Avenue',
    ],
    description:
      'a holy city with a thriving commercial market driven by tourism and trade',
    authority: 'ADA (Amritsar Development Authority)',
    avgPropertyRate: '₹2,800 - ₹5,500',
  },

  // --- CENTRAL & WEST INDIA ---
  indore: {
    name: 'Indore',
    slug: 'indore',
    pincodeStart: '452',
    areas: [
      'Vijay Nagar',
      'Saket Nagar',
      'Palasia',
      'Bhawarkua',
      'Super Corridor',
    ],
    description:
      'the cleanest city in India, serving as the commercial capital of Madhya Pradesh',
    authority: 'IDA (Indore Development Authority)',
    avgPropertyRate: '₹3,000 - ₹6,500',
  },
  bhopal: {
    name: 'Bhopal',
    slug: 'bhopal',
    pincodeStart: '462',
    areas: [
      'Arera Colony',
      'Kolar Road',
      'Hoshangabad Road',
      'MP Nagar',
      'Saket Nagar',
    ],
    description:
      'known as the City of Lakes, offering a green and peaceful environment for government employees',
    authority: 'BDA (Bhopal Development Authority)',
    avgPropertyRate: '₹2,500 - ₹5,000',
  },
  nagpur: {
    name: 'Nagpur',
    slug: 'nagpur',
    pincodeStart: '440',
    areas: [
      'Dharampeth',
      'Manish Nagar',
      'Wardha Road',
      'Civil Lines',
      'Sadar',
    ],
    description:
      'the winter capital of Maharashtra and a key logistics hub in the center of India',
    authority: 'NIT (Nagpur Improvement Trust)',
    avgPropertyRate: '₹3,500 - ₹6,500',
  },
  surat: {
    name: 'Surat',
    slug: 'surat',
    pincodeStart: '395',
    areas: ['Vesu', 'Adajan', 'Piplod', 'Varachha', 'New City Light'],
    description:
      'the Diamond City, known for its high-speed growth and thriving textile industry',
    authority: 'SUDA (Surat Urban Development Authority)',
    avgPropertyRate: '₹3,500 - ₹7,000',
  },
  vadodara: {
    name: 'Vadodara',
    slug: 'vadodara',
    pincodeStart: '390',
    areas: ['Alkapuri', 'Vasna Road', 'Manjalpur', 'Karelibaug', 'Gotri'],
    description:
      'the cultural capital of Gujarat, housing major petrochemical and engineering industries',
    authority: 'VUDA (Vadodara Urban Development Authority)',
    avgPropertyRate: '₹2,800 - ₹5,500',
  },
  rajkot: {
    name: 'Rajkot',
    slug: 'rajkot',
    pincodeStart: '360',
    areas: [
      'Kalavad Road',
      'Amin Marg',
      'University Road',
      '150 Feet Ring Road',
      'Nana Mava',
    ],
    description:
      'a key industrial city in the Saurashtra region, known for its engineering and auto parts units',
    authority: 'RUDA',
    avgPropertyRate: '₹3,000 - ₹5,500',
  },

  // --- SOUTH INDIA ---
  visakhapatnam: {
    name: 'Visakhapatnam',
    slug: 'visakhapatnam',
    pincodeStart: '530',
    areas: [
      'MVP Colony',
      'Seethammadhara',
      'Madhurawada',
      'Gajuwaka',
      'Beach Road',
    ],
    description:
      'a port city and industrial center, also known as the Jewel of the East Coast',
    authority: 'VMRDA',
    avgPropertyRate: '₹3,500 - ₹7,000',
  },
  coimbatore: {
    name: 'Coimbatore',
    slug: 'coimbatore',
    pincodeStart: '641',
    areas: [
      'RS Puram',
      'Gandhipuram',
      'Peelamedu',
      'Saravanampatti',
      'Avinashi Road',
    ],
    description:
      'the Manchester of South India, known for its textile, engineering, and educational institutions',
    authority: 'DTCP Tamil Nadu',
    avgPropertyRate: '₹4,000 - ₹7,500',
  },
  kochi: {
    name: 'Kochi',
    slug: 'kochi',
    pincodeStart: '682',
    areas: ['Edappally', 'Kaloor', 'Kakkanad', 'Marine Drive', 'Vyttila'],
    description:
      'the commercial hub of Kerala, featuring a mix of tourism, shipping, and IT industries',
    authority: 'GCDA (Greater Cochin Development Authority)',
    avgPropertyRate: '₹4,500 - ₹8,500',
  },
  mysore: {
    name: 'Mysore',
    slug: 'mysore',
    pincodeStart: '570',
    areas: [
      'Vijayanagar',
      'Gokulam',
      'Jayalakshmipuram',
      'Hebbal',
      'Saraswathipuram',
    ],
    description:
      'a heritage city known for its palaces, clean environment, and growing IT presence',
    authority: 'MUDA (Mysore Urban Development Authority)',
    avgPropertyRate: '₹3,000 - ₹6,000',
  },

  // --- EAST INDIA ---
  patna: {
    name: 'Patna',
    slug: 'patna',
    pincodeStart: '800',
    areas: [
      'Boring Road',
      'Kankarbagh',
      'Rajendra Nagar',
      'Bailey Road',
      'Patliputra Colony',
    ],
    description:
      'an ancient historic city and the capital of Bihar, now seeing modern infrastructural redevelopment',
    authority: 'PRDA',
    avgPropertyRate: '₹4,000 - ₹8,000',
  },
  bhubaneswar: {
    name: 'Bhubaneswar',
    slug: 'bhubaneswar',
    pincodeStart: '751',
    areas: [
      'Patia',
      'Saheed Nagar',
      'Khandagiri',
      'Jayadev Vihar',
      'Chandrasekharpur',
    ],
    description:
      'the Temple City of India, emerging as an education and IT hub in the east',
    authority: 'BDA (Bhubaneswar Development Authority)',
    avgPropertyRate: '₹3,500 - ₹6,500',
  },
  ranchi: {
    name: 'Ranchi',
    slug: 'ranchi',
    pincodeStart: '834',
    areas: ['Lalpur', 'Doranda', 'Kanke Road', 'Harmu', 'Morabadi'],
    description:
      'the capital of Jharkhand, known for its waterfalls and pleasant climate',
    authority: 'Ranchi Municipal Corporation',
    avgPropertyRate: '₹3,000 - ₹5,500',
  },
  guwahati: {
    name: 'Guwahati',
    slug: 'guwahati',
    pincodeStart: '781',
    areas: ['GS Road', 'Dispur', 'Zoo Road', 'Paltan Bazar', 'Beltola'],
    description:
      'the gateway to North East India and a major riverine port city',
    authority: 'GMDA',
    avgPropertyRate: '₹3,500 - ₹6,500',
  },
  /* --- MISSING CITIES FIX (Newly Added for 404 Resolution) --- */
  thiruvananthapuram: {
    name: 'Thiruvananthapuram',
    slug: 'thiruvananthapuram',
    pincodeStart: '695',
    areas: [
      'Kazhakkoottam',
      'Vattiyoorkavu',
      'Vizhinjam',
      'Pattom',
      'Vellayambalam',
    ],
    description:
      'the capital city of Kerala, known for its IT hubs and historic landmarks',
    authority: 'TRIDA (Trivandrum Development Authority)',
    avgPropertyRate: '₹4,000 - ₹8,500',
  },
  allahabad: {
    name: 'Allahabad',
    slug: 'allahabad',
    pincodeStart: '211',
    areas: ['Civil Lines', 'Naini', 'Dhoomanganj', 'Jhunsi', 'Tagore Town'],
    description:
      'officially Prayagraj, a major educational and judicial hub in UP with a growing residential market',
    authority: 'PDA (Prayagraj Development Authority)',
    avgPropertyRate: '₹3,100 - ₹8,700',
  },
  raipur: {
    name: 'Raipur',
    slug: 'raipur',
    pincodeStart: '492',
    areas: ['Naya Raipur', 'Shankar Nagar', 'Tatibandh', 'VIP Road', 'Amapara'],
    description:
      'the capital of Chhattisgarh and a major industrial and trading hub',
    authority: 'NRDA (Naya Raipur Development Authority)',
    avgPropertyRate: '₹2,500 - ₹5,000',
  },
  udaipur: {
    name: 'Udaipur',
    slug: 'udaipur',
    pincodeStart: '313',
    areas: ['Hiran Magri', 'Fatehpura', 'Shobhagpura', 'Panchwati', 'Bhuwana'],
    description:
      'the City of Lakes in Rajasthan, a world-renowned tourism and heritage destination',
    authority: 'UIT Udaipur (Urban Improvement Trust)',
    avgPropertyRate: '₹3,000 - ₹6,500',
  },
  meerut: {
    name: 'Meerut',
    slug: 'meerut',
    pincodeStart: '250',
    areas: [
      'Modipuram',
      'Shastri Nagar',
      'Pallavpuram',
      'Ganga Nagar',
      'Partapur',
    ],
    description:
      'an ancient city in UP undergoing rapid growth as part of the National Capital Region (NCR)',
    authority: 'MDA (Meerut Development Authority)',
    avgPropertyRate: '₹2,800 - ₹5,500',
  },
  jalandhar: {
    name: 'Jalandhar',
    slug: 'jalandhar',
    pincodeStart: '144',
    areas: [
      'Model Town',
      'Rama Mandi',
      'Adarsh Nagar',
      'GT Road',
      'Jalandhar Cantt',
    ],
    description:
      'a major commercial and industrial center in Punjab, famous for sports goods manufacturing',
    authority: 'JDA (Jalandhar Development Authority)',
    avgPropertyRate: '₹2,500 - ₹5,000',
  },
  jabalpur: {
    name: 'Jabalpur',
    slug: 'jabalpur',
    pincodeStart: '482',
    areas: ['Vijay Nagar', 'Civil Lines', 'Wright Town', 'Adhartal', 'Ranjhi'],
    description:
      'an important administrative and industrial city in Madhya Pradesh near the Narmada river',
    authority: 'JDA (Jabalpur Development Authority)',
    avgPropertyRate: '₹2,200 - ₹4,500',
  },
  tirupati: {
    name: 'Tirupati',
    slug: 'tirupati',
    pincodeStart: '517',
    areas: ['Renigunta', 'Tiruchanur', 'Alipiri', 'MR Palli', 'Bairagipatteda'],
    description:
      'a major spiritual destination in Andhra Pradesh with a fast-growing education and tourism sector',
    authority: 'TUDA (Tirupati Urban Development Authority)',
    avgPropertyRate: '₹3,500 - ₹6,000',
  },
  nashik: {
    name: 'Nashik',
    slug: 'nashik',
    pincodeStart: '422',
    areas: [
      'Indira Nagar',
      'Panchavati',
      'Gangapur Road',
      'Pathardi Phata',
      'Cidco',
    ],
    description:
      'the Wine Capital of India and a key industrial hub in Maharashtra',
    authority: 'NMC (Nashik Municipal Corporation)',
    avgPropertyRate: '₹3,200 - ₹7,000',
  },
  jodhpur: {
    name: 'Jodhpur',
    slug: 'jodhpur',
    pincodeStart: '342',
    areas: [
      'Shastri Nagar',
      'Choupasni Housing Board',
      'Paota',
      'Ratanada',
      'Sardarpura',
    ],
    description:
      'the Sun City of Rajasthan, known for its rich culture and growing handicraft industry',
    authority: 'JDA Jodhpur',
    avgPropertyRate: '₹2,800 - ₹6,000',
  },
  kota: {
    name: 'Kota',
    slug: 'kota',
    pincodeStart: '324',
    areas: ['Vigyan Nagar', 'Talwandi', 'RK Puram', 'Kunadi', 'Mahaveer Nagar'],
    description:
      'the coaching hub of India, characterized by a high demand for student and residential housing',
    authority: 'UIT Kota',
    avgPropertyRate: '₹2,500 - ₹5,500',
  },
  varanasi: {
    name: 'Varanasi',
    slug: 'varanasi',
    pincodeStart: '221',
    areas: ['Sigra', 'Lanka', 'Sarnath', 'Shivpur', 'Cantonment'],
    description:
      'the spiritual heart of India, seeing significant infrastructure upgrades and tourism growth',
    authority: 'VDA (Varanasi Development Authority)',
    avgPropertyRate: '₹3,500 - ₹8,000',
  },
  ghaziabad: {
    name: 'Ghaziabad',
    slug: 'ghaziabad',
    pincodeStart: '201',
    areas: [
      'Indirapuram',
      'Vaishali',
      'Raj Nagar Extension',
      'Vasundhara',
      'Crossings Republik',
    ],
    description:
      'the Gateway of UP, a major residential and industrial hub within the NCR',
    authority: 'GDA (Ghaziabad Development Authority)',
    avgPropertyRate: '₹4,000 - ₹9,500',
  },

  // --- OTHERS & FALLBACK ---
  default: {
    name: 'City',
    slug: 'default',
    pincodeStart: 'XX',
    areas: [
      'City Center',
      'Civil Lines',
      'Market Area',
      'Railway Station Area',
      'Industrial Area',
    ],
    description:
      'a growing urban center with rising demand for housing and personal finance solutions',
    authority: 'Local Municipal Corporation',
    avgPropertyRate: '₹3,000 - ₹8,000',
  },
};

/**
 * BANK COMPETITOR LOGIC
 * Helps generate unique "Compare X vs Y" tables per page
 */
export const bankCompetitors: Record<string, string[]> = {
  sbi: ['hdfc', 'icici', 'pnb', 'bob'],
  hdfc: ['sbi', 'icici', 'axis', 'kotak'],
  icici: ['hdfc', 'sbi', 'axis', 'bajaj'],
  axis: ['icici', 'hdfc', 'sbi', 'kotak'],
  kotak: ['hdfc', 'icici', 'axis', 'indusind'],
  pnb: ['sbi', 'bob', 'canara', 'union'],
  bob: ['sbi', 'pnb', 'boi', 'canara'],
  canara: ['union', 'pnb', 'bob', 'indian'],
  bajaj: ['tata', 'hdfc', 'icici', 'aditya-birla'],
  tata: ['bajaj', 'hdfc', 'icici', 'axis'],
  default: ['sbi', 'hdfc', 'icici', 'bajaj'],
};

// Helper: Get City Data with Fallback
export function getCityData(slug: string): CityData {
  const normalizedSlug = slug.toLowerCase();

  // If exact match exists
  if (cityDetails[normalizedSlug]) {
    return cityDetails[normalizedSlug];
  }

  // Fallback for cities not fully mapped but in the list
  return {
    ...cityDetails.default,
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
    slug: normalizedSlug,
  };
}

// Helper: Get Competitors
export function getCompetitors(bankSlug: string): string[] {
  return bankCompetitors[bankSlug] || bankCompetitors.default;
}
