import type { Car } from "@/types/car";

export function normalizeCarData(car: any): Car {
  return {
    ...car,
    highlights: Array.isArray(car.highlights) ? car.highlights : (car.highlights || []),
    images: Array.isArray(car.images) ? car.images : (car.images || []),
  };
}

export function normalizeCarListData(cars: any[]): Car[] {
  return cars.map(normalizeCarData);
}
