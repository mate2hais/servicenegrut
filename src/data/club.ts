export const CLUB = {
  name: "Ascendo Club",
  tagline: "BJJ & MMA Academy",
  city: "Galați",
  address: "Str. Domnească 112, Galați",
  phone: "0740 221 118",
  email: "contact@ascendoclub.ro",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
} as const;

export const DAYS = [
  "Duminică",
  "Luni",
  "Marți",
  "Miercuri",
  "Joi",
  "Vineri",
  "Sâmbătă",
] as const;

export const DISCIPLINE_LABEL: Record<string, string> = {
  bjj: "Brazilian Jiu-Jitsu",
  mma: "MMA",
};

export const AGE_LABEL: Record<string, string> = {
  kids: "Copii",
  adults: "Adulți",
};

export const STATUS_LABEL: Record<string, string> = {
  active: "Activ",
  expired: "Expirat",
  cancelled: "Anulat",
};

export function hhmm(t: string) {
  return t.slice(0, 5);
}

export function daysLeft(endDate: string) {
  const end = new Date(endDate + "T23:59:59");
  return Math.ceil((end.getTime() - Date.now()) / 86400000);
}

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
