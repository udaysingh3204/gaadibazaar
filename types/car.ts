export type FuelType = "PETROL" | "DIESEL" | "CNG" | "ELECTRIC" | "HYBRID";
export type Transmission = "MANUAL" | "AUTOMATIC" | "AMT" | "CVT" | "DCT";
export type OwnerCount = "FIRST" | "SECOND" | "THIRD" | "FOURTH_PLUS";
export type BodyType = "HATCHBACK" | "SEDAN" | "SUV" | "MUV" | "COUPE" | "CONVERTIBLE" | "PICKUP" | "VAN";
export type ListingStatus = "ACTIVE" | "SOLD" | "ON_HOLD" | "REMOVED";

export interface Car {
  id: string;
  brand: string;
  model: string;
  variant: string | null;
  yearOfManufacture: number;
  registrationYear: number;
  fuelType: FuelType;
  transmission: Transmission;
  engineCC: number;
  mileageKmpl: number | null;
  kmDriven: number;
  numberOfOwners: OwnerCount;
  bodyType: BodyType;
  color: string;
  insuranceValid: Date | string | null;
  city: string;
  askingPrice: number;
  sellerName: string;
  sellerPhone: string;
  highlights: string[] | any;
  images: string[] | any;
  isVerified: boolean;
  isFeatured: boolean;
  status: ListingStatus;
  viewCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  dealerId?: string | null;
}

export interface CarListResponse {
  data: Car[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CarFilters {
  brand?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: FuelType[];
  transmission?: Transmission[];
  bodyType?: BodyType[];
  minYear?: number;
  maxYear?: number;
  maxKm?: string;
  status?: ListingStatus;
  featured?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
}
