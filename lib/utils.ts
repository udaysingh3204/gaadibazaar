import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIndianPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat("en-IN").format(km)} km`;
}

export function calculateEMI(
  price: number,
  downPaymentRatio = 0.2,
  ratePerYear = 0.12,
  tenureMonths = 60
): number {
  const principal = price * (1 - downPaymentRatio);
  const monthlyRate = ratePerYear / 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

export function maskPhone(phone: string): string {
  if (phone.length < 6) return phone;
  return phone.slice(0, 6) + "XXXX";
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  return "Just now";
}

export const INDIAN_BRANDS = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Honda",
  "Toyota",
  "Kia",
  "MG",
  "Mahindra",
  "Skoda",
  "Volkswagen",
  "Ford",
  "Renault",
  "Nissan",
  "Jeep",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volvo",
  "Land Rover",
];

export const NCR_CITIES = ["Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad", "Greater Noida"];
export const AGRA_CLUSTER = ["Agra", "Mathura"];
export const LAUNCH_CITIES = [...NCR_CITIES, ...AGRA_CLUSTER];

export const INDIAN_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Surat",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Gurgaon",
  "Noida",
  "Faridabad",
  "Ghaziabad",
  "Greater Noida",
  "Agra",
  "Mathura",
  "Indore",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
];
