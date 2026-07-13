// src/lib/carModels.ts

export type BodyType = 'Hatchback' | 'Sedan' | 'Compact SUV' | 'Midsize SUV' | 'MPV' | 'Off-Roader SUV';

export interface CarModel {
  name: string;
  slug: string;
  brand: string;
  bodyType: BodyType;
  fuelTypes: string[];
  exShowroomMin: number; // ₹, lakh converted to absolute rupees
  exShowroomMax: number;
  onRoadPopularVariant: number; // ₹, approx on-road price of popular mid variant in a metro city
  priceSourceNote: string;
}

// Prices researched and checked — July 2026, Delhi metro. On-road prices are approximate
// for a mid variant and vary by city, exact variant, fuel choice, and dealer offers.
export const CAR_PRICE_LAST_VERIFIED = 'July 2026';

export const CAR_PRICE_DISCLAIMER =
  'On-road prices vary by city, variant, fuel type, and ongoing offers, and shift with every model-year update. Figures here are approximate for a Delhi metro mid variant, last checked in July 2026 — always confirm the current on-road price from the dealer or brand website before applying for a loan.';

// Typical car loan parameters used to pre-fill the EMI calculator on every page.
// Down payment: most banks require 10-15% minimum; 20% is a common financial-planning benchmark.
// Tenure: average observed tenure is ~58 months; 5 years is the common sweet spot.
// Rate: new-car rates from SBI/HDFC/ICICI cluster around 8.75%-9.75% for a good credit profile (July 2026).
export const TYPICAL_DOWN_PAYMENT_PERCENT = 20;
export const TYPICAL_TENURE_YEARS = 5;
export const TYPICAL_INTEREST_RATE = 9.0;

export const carModels: CarModel[] = [
  {
    name: 'Maruti Suzuki Swift',
    slug: 'maruti-swift',
    brand: 'Maruti Suzuki',
    bodyType: 'Hatchback',
    fuelTypes: ['Petrol', 'CNG'],
    exShowroomMin: 579000,
    exShowroomMax: 933000,
    onRoadPopularVariant: 775000,
    priceSourceNote: 'Delhi metro, mid variant — CarDekho, Zigwheels',
  },
  {
    name: 'Maruti Suzuki Baleno',
    slug: 'maruti-baleno',
    brand: 'Maruti Suzuki',
    bodyType: 'Hatchback',
    fuelTypes: ['Petrol', 'CNG'],
    exShowroomMin: 599000,
    exShowroomMax: 930000,
    onRoadPopularVariant: 800000,
    priceSourceNote: 'Delhi metro, mid variant — Zigwheels',
  },
  {
    name: 'Maruti Suzuki Dzire',
    slug: 'maruti-dzire',
    brand: 'Maruti Suzuki',
    bodyType: 'Sedan',
    fuelTypes: ['Petrol', 'CNG'],
    exShowroomMin: 626000,
    exShowroomMax: 931000,
    onRoadPopularVariant: 850000,
    priceSourceNote: 'Delhi metro, mid variant — CarDekho',
  },
  {
    name: 'Maruti Suzuki Grand Vitara',
    slug: 'maruti-grand-vitara',
    brand: 'Maruti Suzuki',
    bodyType: 'Midsize SUV',
    fuelTypes: ['Petrol', 'Strong Hybrid', 'CNG'],
    exShowroomMin: 1077000,
    exShowroomMax: 1966000,
    onRoadPopularVariant: 1550000,
    priceSourceNote: 'Delhi metro, mid variant — CarDekho, ParkPlus',
  },
  {
    name: 'Hyundai Creta',
    slug: 'hyundai-creta',
    brand: 'Hyundai',
    bodyType: 'Midsize SUV',
    fuelTypes: ['Petrol', 'Turbo-Petrol', 'Diesel'],
    exShowroomMin: 1091000,
    exShowroomMax: 2020000,
    onRoadPopularVariant: 1550000,
    priceSourceNote: 'Delhi metro, mid variant — Hyundai official, Autocar India',
  },
  {
    name: 'Hyundai i20',
    slug: 'hyundai-i20',
    brand: 'Hyundai',
    bodyType: 'Hatchback',
    fuelTypes: ['Petrol'],
    exShowroomMin: 687000,
    exShowroomMax: 1052000,
    onRoadPopularVariant: 925000,
    priceSourceNote: 'Delhi metro, mid variant — Hyundai official, CarDekho (source figures varied slightly, mid estimate used)',
  },
  {
    name: 'Hyundai Venue',
    slug: 'hyundai-venue',
    brand: 'Hyundai',
    bodyType: 'Compact SUV',
    fuelTypes: ['Petrol', 'Turbo-Petrol', 'Diesel'],
    exShowroomMin: 799000,
    exShowroomMax: 1600000,
    onRoadPopularVariant: 1150000,
    priceSourceNote: 'Delhi metro, mid variant — Hyundai official, Autocar India',
  },
  {
    name: 'Tata Nexon',
    slug: 'tata-nexon',
    brand: 'Tata Motors',
    bodyType: 'Compact SUV',
    fuelTypes: ['Petrol', 'Diesel', 'CNG'],
    exShowroomMin: 732000,
    exShowroomMax: 1432000,
    onRoadPopularVariant: 1075000,
    priceSourceNote: 'Delhi metro, mid variant, ICE range — Tata Motors official, Autocar India',
  },
  {
    name: 'Tata Punch',
    slug: 'tata-punch',
    brand: 'Tata Motors',
    bodyType: 'Compact SUV',
    fuelTypes: ['Petrol', 'CNG'],
    exShowroomMin: 559000,
    exShowroomMax: 1100000,
    onRoadPopularVariant: 825000,
    priceSourceNote: 'Delhi metro, mid variant, ICE range — Autocar India, CarDekho',
  },
  {
    name: 'Tata Harrier',
    slug: 'tata-harrier',
    brand: 'Tata Motors',
    bodyType: 'Midsize SUV',
    fuelTypes: ['Petrol', 'Diesel'],
    exShowroomMin: 1289000,
    exShowroomMax: 2585000,
    onRoadPopularVariant: 1850000,
    priceSourceNote: 'Delhi metro, mid variant, ICE range — CarDekho, CarWale',
  },
  {
    name: 'Mahindra Thar',
    slug: 'mahindra-thar',
    brand: 'Mahindra',
    bodyType: 'Off-Roader SUV',
    fuelTypes: ['Petrol', 'Diesel'],
    exShowroomMin: 999000,
    exShowroomMax: 1699000,
    onRoadPopularVariant: 1450000,
    priceSourceNote: 'Delhi metro, mid variant, 3-door Thar (Thar Roxx 5-door is priced separately) — Zigwheels, CarDekho',
  },
  {
    name: 'Mahindra XUV700',
    slug: 'mahindra-xuv700',
    brand: 'Mahindra',
    bodyType: 'Midsize SUV',
    fuelTypes: ['Petrol', 'Diesel'],
    exShowroomMin: 1449000,
    exShowroomMax: 2514000,
    onRoadPopularVariant: 1950000,
    priceSourceNote: 'Delhi metro, mid variant, post GST-linked price revision — Ackodrive, CarDekho',
  },
  {
    name: 'Toyota Innova Hycross',
    slug: 'toyota-innova-hycross',
    brand: 'Toyota',
    bodyType: 'MPV',
    fuelTypes: ['Petrol', 'Strong Hybrid'],
    exShowroomMin: 1870000,
    exShowroomMax: 3068000,
    onRoadPopularVariant: 2650000,
    priceSourceNote: 'Delhi metro, mid variant — current mainstream Innova, replacing the diesel Crysta (Crysta continues in fleet/diesel form) — CarDekho, Zigwheels',
  },
  {
    name: 'Honda City',
    slug: 'honda-city',
    brand: 'Honda',
    bodyType: 'Sedan',
    fuelTypes: ['Petrol', 'Hybrid'],
    exShowroomMin: 1199000,
    exShowroomMax: 2100000,
    onRoadPopularVariant: 1650000,
    priceSourceNote: 'Delhi metro, mid variant, 2026 facelift generation — CarDekho, Zigwheels',
  },
  {
    name: 'Kia Seltos',
    slug: 'kia-seltos',
    brand: 'Kia',
    bodyType: 'Midsize SUV',
    fuelTypes: ['Petrol', 'Turbo-Petrol', 'Diesel'],
    exShowroomMin: 1099000,
    exShowroomMax: 1999000,
    onRoadPopularVariant: 1650000,
    priceSourceNote: 'Delhi metro, mid variant — Autocar India, CarDekho',
  },
];

export function getCarBySlug(slug: string): CarModel | undefined {
  return carModels.find((c) => c.slug === slug);
}

export function getCarsByBodyType(bodyType: BodyType): CarModel[] {
  return carModels.filter((c) => c.bodyType === bodyType);
}
