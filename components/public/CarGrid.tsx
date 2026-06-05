import CarCard from "./CarCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Car } from "@/types/car";
import { Car as CarIcon } from "lucide-react";

interface CarGridProps {
  cars: Car[];
  loading?: boolean;
}

function CarSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function CarGrid({ cars, loading = false }: CarGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, i) => <CarSkeleton key={i} />)}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <CarIcon className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No cars found</h3>
        <p className="text-gray-400 text-sm">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
