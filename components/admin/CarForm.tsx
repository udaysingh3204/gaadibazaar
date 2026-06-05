"use client";

import { useState, KeyboardEvent } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { X, Upload, Plus } from "lucide-react";
import Image from "next/image";
import { carSchema, type CarFormValues } from "@/lib/validations/car.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { INDIAN_BRANDS, INDIAN_CITIES } from "@/lib/utils";
import type { Car } from "@/types/car";

interface CarFormProps {
  car?: Car;
}

const SECTION = "bg-white rounded-2xl border border-gray-100 p-6 shadow-sm";
const FIELD = "space-y-1.5";
const ERROR = "text-xs text-red-500 mt-1";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className={ERROR}>{message}</p>;
}

export default function CarForm({ car }: CarFormProps) {
  const router = useRouter();
  const isEdit = !!car;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CarFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(carSchema) as any,
    defaultValues: car
      ? {
          brand: car.brand,
          model: car.model,
          variant: car.variant ?? undefined,
          yearOfManufacture: car.yearOfManufacture,
          registrationYear: car.registrationYear,
          fuelType: car.fuelType,
          transmission: car.transmission,
          engineCC: car.engineCC,
          mileageKmpl: car.mileageKmpl ?? undefined,
          kmDriven: car.kmDriven,
          numberOfOwners: car.numberOfOwners,
          bodyType: car.bodyType,
          color: car.color,
          insuranceValid: car.insuranceValid
            ? new Date(car.insuranceValid).toISOString().split("T")[0]
            : undefined,
          city: car.city,
          askingPrice: car.askingPrice,
          sellerName: car.sellerName,
          sellerPhone: car.sellerPhone,
          highlights: car.highlights,
          images: car.images,
          isVerified: car.isVerified,
          isFeatured: car.isFeatured,
          status: car.status,
        }
      : {
          status: "ACTIVE",
          isVerified: false,
          isFeatured: false,
          highlights: [],
          images: [],
          fuelType: "PETROL",
          transmission: "MANUAL",
          numberOfOwners: "FIRST",
          bodyType: "HATCHBACK",
          yearOfManufacture: 2022,
          registrationYear: 2022,
        },
  });

  const highlights = watch("highlights") ?? [];
  const images = watch("images") ?? [];
  const [highlightInput, setHighlightInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");

  const addHighlight = () => {
    const v = highlightInput.trim();
    if (v && !highlights.includes(v)) {
      setValue("highlights", [...highlights, v]);
    }
    setHighlightInput("");
  };

  const removeHighlight = (h: string) =>
    setValue("highlights", highlights.filter((x) => x !== h));

  const addImage = () => {
    const v = imageUrlInput.trim();
    if (v && !images.includes(v)) {
      setValue("images", [...images, v]);
    }
    setImageUrlInput("");
  };

  const removeImage = (url: string) =>
    setValue("images", images.filter((x) => x !== url));

  const onSubmit = async (data: CarFormValues) => {
    const url = isEdit ? `/api/cars/${car!.id}` : "/api/cars";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          mileageKmpl: data.mileageKmpl ?? null,
          insuranceValid: data.insuranceValid ? new Date(data.insuranceValid).toISOString() : null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to save");
      }

      toast.success(isEdit ? "Listing updated!" : "Listing created!");
      router.push("/admin/listings");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addHighlight();
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6 max-w-3xl">
      {/* 1. Basic Information */}
      <div className={SECTION}>
        <h2 className="font-bold text-[#0A1628] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
          1. Basic Information
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className={FIELD}>
            <Label>Brand *</Label>
            <select {...register("brand")} className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]">
              <option value="">Select brand</option>
              {INDIAN_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <FieldError message={errors.brand?.message} />
          </div>

          <div className={FIELD}>
            <Label>Model *</Label>
            <Input {...register("model")} placeholder="e.g. Swift, Creta" />
            <FieldError message={errors.model?.message} />
          </div>

          <div className={FIELD}>
            <Label>Variant</Label>
            <Input {...register("variant")} placeholder="e.g. VXI, SX (optional)" />
          </div>

          <div className={FIELD}>
            <Label>Body Type *</Label>
            <select {...register("bodyType")} className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]">
              {["HATCHBACK","SEDAN","SUV","MUV","COUPE","CONVERTIBLE","PICKUP","VAN"].map((bt) => (
                <option key={bt} value={bt}>{bt.charAt(0) + bt.slice(1).toLowerCase()}</option>
              ))}
            </select>
            <FieldError message={errors.bodyType?.message} />
          </div>

          <div className={FIELD}>
            <Label>Color *</Label>
            <Input {...register("color")} placeholder="e.g. Polar White" />
            <FieldError message={errors.color?.message} />
          </div>
        </div>
      </div>

      {/* 2. Year & Registration */}
      <div className={SECTION}>
        <h2 className="font-bold text-[#0A1628] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
          2. Year &amp; Registration
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className={FIELD}>
            <Label>Year of Manufacture *</Label>
            <Input
              type="number"
              min={2000}
              max={2025}
              {...register("yearOfManufacture", { valueAsNumber: true })}
            />
            <FieldError message={errors.yearOfManufacture?.message} />
          </div>

          <div className={FIELD}>
            <Label>Registration Year *</Label>
            <Input
              type="number"
              min={2000}
              max={2025}
              {...register("registrationYear", { valueAsNumber: true })}
            />
            <FieldError message={errors.registrationYear?.message} />
          </div>

          <div className={FIELD}>
            <Label>Number of Owners *</Label>
            <select {...register("numberOfOwners")} className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]">
              <option value="FIRST">1st Owner</option>
              <option value="SECOND">2nd Owner</option>
              <option value="THIRD">3rd Owner</option>
              <option value="FOURTH_PLUS">4th+ Owner</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Engine & Performance */}
      <div className={SECTION}>
        <h2 className="font-bold text-[#0A1628] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
          3. Engine &amp; Performance
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={FIELD}>
            <Label>Fuel Type *</Label>
            <select {...register("fuelType")} className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]">
              <option value="PETROL">Petrol</option>
              <option value="DIESEL">Diesel</option>
              <option value="CNG">CNG</option>
              <option value="ELECTRIC">Electric</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </div>

          <div className={FIELD}>
            <Label>Transmission *</Label>
            <select {...register("transmission")} className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]">
              <option value="MANUAL">Manual</option>
              <option value="AUTOMATIC">Automatic</option>
              <option value="AMT">AMT</option>
              <option value="CVT">CVT</option>
              <option value="DCT">DCT</option>
            </select>
          </div>

          <div className={FIELD}>
            <Label>Engine (CC) *</Label>
            <Input
              type="number"
              min={100}
              {...register("engineCC", { valueAsNumber: true })}
              placeholder="e.g. 1197"
            />
            <FieldError message={errors.engineCC?.message} />
          </div>

          <div className={FIELD}>
            <Label>Mileage (kmpl)</Label>
            <Input
              type="number"
              step="0.1"
              {...register("mileageKmpl", { valueAsNumber: true })}
              placeholder="e.g. 23.2"
            />
          </div>
        </div>
      </div>

      {/* 4. Usage & Condition */}
      <div className={SECTION}>
        <h2 className="font-bold text-[#0A1628] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
          4. Usage &amp; Condition
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className={FIELD}>
            <Label>KM Driven *</Label>
            <Input
              type="number"
              min={0}
              {...register("kmDriven", { valueAsNumber: true })}
              placeholder="e.g. 45000"
            />
            <FieldError message={errors.kmDriven?.message} />
          </div>

          <div className={FIELD}>
            <Label>Insurance Valid Until</Label>
            <Input type="date" {...register("insuranceValid")} />
          </div>

          <div className={FIELD + " sm:col-span-2"}>
            <Label>Key Highlights</Label>
            <div className="flex gap-2">
              <Input
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a highlight and press Enter"
              />
              <Button type="button" variant="outline" size="icon" onClick={addHighlight}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {highlights.map((h) => (
                  <span key={h} className="flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 text-xs px-2.5 py-1 rounded-full">
                    {h}
                    <button type="button" onClick={() => removeHighlight(h)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Location & Seller */}
      <div className={SECTION}>
        <h2 className="font-bold text-[#0A1628] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
          5. Location &amp; Seller
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className={FIELD}>
            <Label>City *</Label>
            <select {...register("city")} className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]">
              <option value="">Select city</option>
              {INDIAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <FieldError message={errors.city?.message} />
          </div>

          <div className={FIELD}>
            <Label>Seller Name *</Label>
            <Input {...register("sellerName")} placeholder="Full name" />
            <FieldError message={errors.sellerName?.message} />
          </div>

          <div className={FIELD}>
            <Label>Seller Phone *</Label>
            <Input {...register("sellerPhone")} placeholder="10-digit mobile" maxLength={10} />
            <FieldError message={errors.sellerPhone?.message} />
          </div>
        </div>
      </div>

      {/* 6. Pricing */}
      <div className={SECTION}>
        <h2 className="font-bold text-[#0A1628] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
          6. Pricing
        </h2>
        <div className="max-w-xs">
          <div className={FIELD}>
            <Label>Asking Price (₹) *</Label>
            <Input
              type="number"
              min={10000}
              {...register("askingPrice", { valueAsNumber: true })}
              placeholder="e.g. 650000"
            />
            <FieldError message={errors.askingPrice?.message} />
          </div>
        </div>
      </div>

      {/* 7. Media */}
      <div className={SECTION}>
        <h2 className="font-bold text-[#0A1628] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
          7. Images
        </h2>
        <div className={FIELD}>
          <Label>Add Image URL</Label>
          <div className="flex gap-2">
            <Input
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="https://..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addImage();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={addImage}>
              <Upload className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </div>

        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {images.map((url) => (
              <div key={url} className="relative w-28 h-20 rounded-xl overflow-hidden border border-gray-200 group">
                <Image src={url} alt="Car" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full items-center justify-center hidden group-hover:flex"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 8. Listing Settings */}
      <div className={SECTION}>
        <h2 className="font-bold text-[#0A1628] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
          8. Listing Settings
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className={FIELD}>
            <Label>Status</Label>
            <select {...register("status")} className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]">
              <option value="ACTIVE">Active</option>
              <option value="SOLD">Sold</option>
              <option value="ON_HOLD">On Hold</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Mark as Verified</Label>
              <Switch
                checked={watch("isVerified")}
                onCheckedChange={(v) => setValue("isVerified", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Mark as Featured</Label>
              <Switch
                checked={watch("isFeatured")}
                onCheckedChange={(v) => setValue("isFeatured", v)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => {
            setValue("status", "ON_HOLD");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handleSubmit(onSubmit as any)();
          }}
        >
          Save as Draft
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : isEdit ? "Update Listing" : "Save & Publish"}
        </Button>
      </div>
    </form>
  );
}
