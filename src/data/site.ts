export const SITE = {
  name: "AutoNeg",
  tagline: "Stație ITP autorizată RAR",
  phone: "0740 123 456",
  email: "contact@autoneg.ro",
  address: "Str. Traian nr. 128, Galați",
  schedule: [
    { day: "Luni – Vineri", hours: "08:00 – 18:00" },
    { day: "Sâmbătă", hours: "09:00 – 14:00" },
    { day: "Duminică", hours: "Închis" },
  ],
  authNumber: "GL-0142",
};

export type PriceItem = {
  category: string;
  detail: string;
  price: number;
  validity: string;
};

export const PRICES: PriceItem[] = [
  { category: "Autoturisme (M1)", detail: "până la 3.5 t, benzină", price: 160, validity: "2 ani / 1 an" },
  { category: "Autoturisme (M1)", detail: "până la 3.5 t, diesel", price: 175, validity: "2 ani / 1 an" },
  { category: "Autoturisme GPL / hibrid", detail: "instalație omologată", price: 195, validity: "2 ani / 1 an" },
  { category: "Autoutilitare (N1)", detail: "până la 3.5 t", price: 210, validity: "1 an" },
  { category: "Remorci (O1, O2)", detail: "până la 3.5 t", price: 110, validity: "1 an / 2 ani" },
  { category: "Motociclete (L3e)", detail: "peste 125 cmc", price: 90, validity: "2 ani" },
  { category: "Mopede (L1e)", detail: "până la 50 cmc", price: 75, validity: "2 ani" },
  { category: "Taxi / Școală de șoferi", detail: "regim special", price: 230, validity: "6 luni" },
  { category: "Reverificare", detail: "în termen de 30 de zile", price: 60, validity: "—" },
];

export const EXTRA_SERVICES = [
  { name: "Verificare pre-ITP (checklist complet)", price: 50 },
  { name: "Reglaj faruri", price: 40 },
  { name: "Test frâne pe standul cu role", price: 45 },
  { name: "Măsurare noxe / opacitate fum", price: 45 },
  { name: "Diagnoză computerizată OBD", price: 70 },
  { name: "Verificare geometrie direcție", price: 80 },
];

export type Engineer = {
  name: string;
  role: string;
  experience: string;
  specialties: string[];
  certifications: string[];
  initials: string;
};

export const ENGINEERS: Engineer[] = [
  {
    name: "Negruț Cosmin",
    role: "Inginer auto principal · Coordonator stație ITP",
    experience: "14 ani experiență",
    specialties: ["Inspecții M1 / N1", "Sisteme de frânare", "Diagnoză electronică"],
    certifications: ["Atestat RAR inspector tehnic", "Certificat ISO 9001 auditor intern"],
    initials: "NC",
  },
  {
    name: "Andrei Pavel",
    role: "Inginer autovehicule · Inspector tehnic",
    experience: "9 ani experiență",
    specialties: ["Motoare diesel", "Emisii poluante", "Sisteme de evacuare"],
    certifications: ["Atestat RAR inspector tehnic", "Certificare analizoare noxe"],
    initials: "AP",
  },
  {
    name: "Ioana Mureșan",
    role: "Inginer mecanic · Inspector tehnic",
    experience: "7 ani experiență",
    specialties: ["Suspensii și direcție", "Caroserie și șasiu", "Remorci"],
    certifications: ["Atestat RAR inspector tehnic", "Curs metrologie echipamente"],
    initials: "IM",
  },
  {
    name: "Vlad Ionescu",
    role: "Tehnician instalații GPL · Inspector tehnic",
    experience: "11 ani experiență",
    specialties: ["Instalații GPL/CNG", "Motociclete", "Iluminat și semnalizare"],
    certifications: ["Atestat RAR inspector tehnic", "Autorizație ISCIR instalații GPL"],
    initials: "VI",
  },
];

export const ACCREDITATIONS = [
  {
    title: "Autorizație RAR nr. GL-0142",
    description:
      "Stație de inspecție tehnică periodică autorizată de Registrul Auto Român pentru categoriile M1, N1, O1, O2, L1e–L5e.",
  },
  {
    title: "ISO 9001:2015",
    description: "Sistem de management al calității certificat pentru servicii de inspecție tehnică auto.",
  },
  {
    title: "Metrologie legală",
    description:
      "Toate echipamentele (stand frâne, analizor noxe, opacimetru, reglofar) sunt verificate metrologic anual de BRML.",
  },
  {
    title: "Inspectori atestați",
    description: "Toți inspectorii dețin atestat RAR valabil, reînnoit periodic prin cursuri de perfecționare.",
  },
];

export const VEHICLE_CATEGORIES = [
  "Autoturism (M1)",
  "Autoutilitară (N1)",
  "Remorcă (O1/O2)",
  "Motocicletă / Moped",
  "Taxi / Școală de șoferi",
  "Reverificare",
];

export const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];
