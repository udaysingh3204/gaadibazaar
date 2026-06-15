"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, User, MapPin, Car, Image as ImageIcon, CheckCircle2, ChevronLeft, ChevronRight, Loader2, Shield, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { INDIAN_BRANDS, INDIAN_CITIES, cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SellerInfo {
  name: string;
  phone: string;
  email: string;
  city: string;
}

interface CarDetails {
  brand: string;
  model: string;
  variant: string;
  yearOfManufacture: number;
  registrationYear: number;
  fuelType: string;
  transmission: string;
  engineCC: number;
  mileageKmpl: number | null;
  kmDriven: number;
  numberOfOwners: string;
  bodyType: string;
  color: string;
  askingPrice: number;
  highlights: string[];
}

interface PhotoData {
  images: string[];
}

const STEPS = [
  { id: 1, title: "Verify Phone", icon: Phone },
  { id: 2, title: "Car Details", icon: Car },
  { id: 3, title: "Add Photos", icon: ImageIcon },
  { id: 4, title: "Review & Submit", icon: CheckCircle2 },
];

const FUEL_TYPES = ["PETROL", "DIESEL", "CNG", "ELECTRIC", "HYBRID"];
const TRANSMISSIONS = ["MANUAL", "AUTOMATIC", "AMT", "CVT", "DCT"];
const BODY_TYPES = ["HATCHBACK", "SEDAN", "SUV", "MUV", "COUPE", "CONVERTIBLE", "PICKUP", "VAN"];
const OWNER_OPTIONS = [
  { value: "FIRST", label: "1st Owner" },
  { value: "SECOND", label: "2nd Owner" },
  { value: "THIRD", label: "3rd Owner" },
  { value: "FOURTH_PLUS", label: "4th+ Owner" },
];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1999 }, (_, i) => CURRENT_YEAR - i);

const HIGHLIGHT_OPTIONS = [
  "Single Owner", "Full Service History", "No Accidents", "Company Maintained",
  "New Tyres", "New Battery", "Sunroof", "Alloy Wheels", "Reverse Camera",
  "Android Auto", "CarPlay", "ABS", "Airbags", "Cruise Control",
];

// ─── Step 1: Phone OTP ─────────────────────────────────────────────────────────

function StepPhone({
  onVerified,
}: {
  onVerified: (info: SellerInfo, token: string) => void;
}) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setCountdown(60);
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(t); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    if (!phone.match(/^[6-9]\d{9}$/)) { toast.error("Enter a valid 10-digit Indian mobile number"); return; }
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (!city) { toast.error("Please select your city"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/seller/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email: email || undefined }),
      });
      const data = await res.json();
      if (!data.success) { toast.error(data.error); return; }
      setOtpSent(true);
      startCountdown();
      toast.success("OTP sent! Check console in dev mode.");
    } catch {
      toast.error("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) { toast.error("Enter the 6-digit OTP"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/seller/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp, name, email: email || undefined, city }),
      });
      const data = await res.json();
      if (!data.success) { toast.error(data.error); return; }
      toast.success("Phone verified! Let's list your car.");
      onVerified({ name, phone, email, city }, data.token);
    } catch {
      toast.error("Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-[#0A1628] mb-1" style={{ fontFamily: "var(--font-syne)" }}>
          Verify Your Phone
        </h2>
        <p className="text-gray-500 text-sm">We verify every seller to keep GaadiBazaar safe for buyers.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" placeholder="Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} disabled={otpSent} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={otpSent} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Mobile Number *</Label>
          <div className="flex gap-2">
            <span className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 shrink-0">+91</span>
            <Input id="phone" placeholder="9876543210" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} disabled={otpSent} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="city">Your City *</Label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={otpSent}
            className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white disabled:opacity-60"
          >
            <option value="">Select city</option>
            <optgroup label="Popular — Delhi NCR">
              {["Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad", "Greater Noida"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </optgroup>
            <optgroup label="Agra Cluster">
              {["Agra", "Mathura"].map((c) => <option key={c} value={c}>{c}</option>)}
            </optgroup>
            <optgroup label="Other Cities">
              {INDIAN_CITIES.filter((c) => !["Delhi","Gurgaon","Noida","Faridabad","Ghaziabad","Greater Noida","Agra","Mathura"].includes(c)).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {!otpSent ? (
        <Button onClick={sendOtp} disabled={loading} className="w-full h-12 rounded-xl">
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Shield className="w-4 h-4 mr-2" />}
          Send OTP to +91 {phone || "XXXXXXXXXX"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-700">
            OTP sent to +91 {phone}. Check email if provided, otherwise check server logs (dev mode).
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="otp">Enter 6-Digit OTP</Label>
            <Input
              id="otp"
              placeholder="• • • • • •"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="text-center text-2xl font-bold tracking-[0.5em] h-14"
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={verifyOtp} disabled={loading || otp.length < 6} className="flex-1 h-12 rounded-xl">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Verify OTP
            </Button>
            <Button
              variant="outline"
              onClick={() => { setOtpSent(false); setOtp(""); }}
              disabled={loading || countdown > 0}
              className="h-12 rounded-xl"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Shield className="w-3.5 h-3.5 text-[#FF6B2B]" />
        Your number is never shared publicly. Buyers see only a masked version.
      </div>
    </div>
  );
}

// ─── Step 2: Car Details ──────────────────────────────────────────────────────

function StepCarDetails({
  initial,
  onNext,
  onBack,
}: {
  initial: Partial<CarDetails>;
  onNext: (data: CarDetails) => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState<CarDetails>({
    brand: initial.brand || "",
    model: initial.model || "",
    variant: initial.variant || "",
    yearOfManufacture: initial.yearOfManufacture || CURRENT_YEAR - 2,
    registrationYear: initial.registrationYear || CURRENT_YEAR - 2,
    fuelType: initial.fuelType || "PETROL",
    transmission: initial.transmission || "MANUAL",
    engineCC: initial.engineCC || 1200,
    mileageKmpl: initial.mileageKmpl ?? null,
    kmDriven: initial.kmDriven || 0,
    numberOfOwners: initial.numberOfOwners || "FIRST",
    bodyType: initial.bodyType || "HATCHBACK",
    color: initial.color || "",
    askingPrice: initial.askingPrice || 0,
    highlights: initial.highlights || [],
  });

  const set = (k: keyof CarDetails, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const toggleHighlight = (h: string) => {
    set("highlights", form.highlights.includes(h)
      ? form.highlights.filter((x) => x !== h)
      : [...form.highlights, h]
    );
  };

  const validate = () => {
    if (!form.brand) return "Select a brand";
    if (!form.model.trim()) return "Enter model name";
    if (!form.color.trim()) return "Enter car color";
    if (form.askingPrice < 10000) return "Asking price must be at least ₹10,000";
    if (form.kmDriven < 0) return "KM driven cannot be negative";
    return null;
  };

  const handleNext = () => {
    const err = validate();
    if (err) { toast.error(err); return; }
    onNext(form);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-[#0A1628] mb-1" style={{ fontFamily: "var(--font-syne)" }}>Car Details</h2>
        <p className="text-gray-500 text-sm">Fill in accurate details — buyers trust listings with complete information.</p>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Basic Information</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label>Brand *</Label>
            <select value={form.brand} onChange={(e) => set("brand", e.target.value)}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white">
              <option value="">Select brand</option>
              {INDIAN_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Model *</Label>
            <Input placeholder="e.g. Swift Dzire" value={form.model} onChange={(e) => set("model", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Variant</Label>
            <Input placeholder="e.g. VXI, ZXI+" value={form.variant} onChange={(e) => set("variant", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Year & Body */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Year & Body Type</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label>Year of Manufacture *</Label>
            <select value={form.yearOfManufacture} onChange={(e) => set("yearOfManufacture", Number(e.target.value))}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white">
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Registration Year *</Label>
            <select value={form.registrationYear} onChange={(e) => set("registrationYear", Number(e.target.value))}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white">
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Body Type *</Label>
            <select value={form.bodyType} onChange={(e) => set("bodyType", e.target.value)}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white">
              {BODY_TYPES.map((b) => <option key={b} value={b}>{b.charAt(0) + b.slice(1).toLowerCase()}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Powertrain */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Powertrain</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <Label>Fuel Type *</Label>
            <select value={form.fuelType} onChange={(e) => set("fuelType", e.target.value)}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white">
              {FUEL_TYPES.map((f) => <option key={f} value={f}>{f.charAt(0) + f.slice(1).toLowerCase()}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Transmission *</Label>
            <select value={form.transmission} onChange={(e) => set("transmission", e.target.value)}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white">
              {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Engine CC *</Label>
            <Input type="number" placeholder="1197" value={form.engineCC || ""} onChange={(e) => set("engineCC", Number(e.target.value))} min={100} max={10000} />
          </div>
          <div className="space-y-1.5">
            <Label>Mileage (kmpl)</Label>
            <Input type="number" placeholder="22.5" value={form.mileageKmpl ?? ""} onChange={(e) => set("mileageKmpl", e.target.value ? Number(e.target.value) : null)} min={0} max={100} />
          </div>
        </div>
      </div>

      {/* Condition */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Condition</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <Label>KM Driven *</Label>
            <Input type="number" placeholder="45000" value={form.kmDriven || ""} onChange={(e) => set("kmDriven", Number(e.target.value))} min={0} />
          </div>
          <div className="space-y-1.5">
            <Label>Owners *</Label>
            <select value={form.numberOfOwners} onChange={(e) => set("numberOfOwners", e.target.value)}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white">
              {OWNER_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Color *</Label>
            <Input placeholder="e.g. Pearl White" value={form.color} onChange={(e) => set("color", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Asking Price (₹) *</Label>
            <Input type="number" placeholder="450000" value={form.askingPrice || ""} onChange={(e) => set("askingPrice", Number(e.target.value))} min={10000} />
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Key Highlights (optional)</p>
        <div className="flex flex-wrap gap-2">
          {HIGHLIGHT_OPTIONS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => toggleHighlight(h)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm border transition-all",
                form.highlights.includes(h)
                  ? "bg-[#FF6B2B] text-white border-[#FF6B2B]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#FF6B2B] hover:text-[#FF6B2B]"
              )}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="h-12 px-6 rounded-xl">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button onClick={handleNext} className="flex-1 h-12 rounded-xl">
          Continue to Photos <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 3: Photos ────────────────────────────────────────────────────────────

function StepPhotos({
  initial,
  onNext,
  onBack,
}: {
  initial: PhotoData;
  onNext: (data: PhotoData) => void;
  onBack: () => void;
}) {
  const [images, setImages] = useState<string[]>(initial.images || []);
  const [urlInput, setUrlInput] = useState("");

  const addUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    if (images.includes(url)) { toast.error("Image already added"); return; }
    if (images.length >= 10) { toast.error("Maximum 10 images allowed"); return; }
    setImages([...images, url]);
    setUrlInput("");
  };

  const removeImage = (i: number) => setImages(images.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-[#0A1628] mb-1" style={{ fontFamily: "var(--font-syne)" }}>Add Photos</h2>
        <p className="text-gray-500 text-sm">Listings with 8+ photos get 3× more inquiries. Add your best shots.</p>
      </div>

      {/* Tips */}
      <div className="bg-[#F8F7F4] rounded-xl p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Photo Tips</p>
        <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
          {["Front view", "Rear view", "Left side", "Right side", "Dashboard", "Seats", "Odometer", "Engine bay"].map((t) => (
            <span key={t} className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#FF6B2B]" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* URL input */}
      <div>
        <Label className="mb-2 block">Add Image URL</Label>
        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/car-photo.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addUrl()}
            className="flex-1"
          />
          <Button onClick={addUrl} variant="outline" className="shrink-0 px-4">
            <Upload className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">
          Upload to Google Drive / Dropbox / Photos app and paste the public link here. Up to 10 images.
        </p>
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{images.length}/10 Images Added</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((url, i) => (
              <div key={i} className="relative group aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Car photo ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => removeImage(i)}
                    className="bg-white/90 text-red-600 rounded-full p-1.5 hover:bg-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {i === 0 && (
                  <span className="absolute top-2 left-2 bg-[#FF6B2B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Cover
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center">
          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No photos added yet</p>
          <p className="text-gray-300 text-xs mt-1">Add image URLs above to preview them here</p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="h-12 px-6 rounded-xl">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button onClick={() => onNext({ images })} className="flex-1 h-12 rounded-xl">
          Review Listing <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 4: Review & Submit ───────────────────────────────────────────────────

function StepReview({
  seller,
  car,
  photos,
  sellerToken,
  onBack,
}: {
  seller: SellerInfo;
  car: CarDetails;
  photos: PhotoData;
  sellerToken: string;
  onBack: () => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/seller/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...car,
          images: photos.images,
          sellerToken,
        }),
      });
      const data = await res.json();
      if (!data.success) { toast.error(data.error); return; }
      router.push(`/sell/success?id=${data.carId}`);
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-[#0A1628] mb-1" style={{ fontFamily: "var(--font-syne)" }}>Review Your Listing</h2>
        <p className="text-gray-500 text-sm">Check everything before submitting. Our team will review and go live in &lt;2 hours.</p>
      </div>

      {/* Cover photo */}
      {photos.images[0] && (
        <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos.images[0]} alt="Cover" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Summary cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-[#F8F7F4] rounded-xl p-5 space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Seller Info</p>
          <div className="space-y-1.5 text-sm">
            <Row label="Name" value={seller.name} />
            <Row label="Phone" value={`+91 ${seller.phone}`} />
            <Row label="City" value={seller.city} />
            {seller.email && <Row label="Email" value={seller.email} />}
          </div>
        </div>
        <div className="bg-[#F8F7F4] rounded-xl p-5 space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Car Info</p>
          <div className="space-y-1.5 text-sm">
            <Row label="Car" value={`${car.yearOfManufacture} ${car.brand} ${car.model}${car.variant ? " " + car.variant : ""}`} />
            <Row label="Fuel" value={car.fuelType} />
            <Row label="KM Driven" value={`${car.kmDriven.toLocaleString("en-IN")} km`} />
            <Row label="Owners" value={car.numberOfOwners.replace("_PLUS", "+").replace("FOURTH", "4th")} />
            <Row label="Price" value={`₹${car.askingPrice.toLocaleString("en-IN")}`} />
          </div>
        </div>
      </div>

      {car.highlights.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Highlights</p>
          <div className="flex flex-wrap gap-2">
            {car.highlights.map((h) => (
              <span key={h} className="px-3 py-1 bg-[#FF6B2B]/10 text-[#FF6B2B] text-xs rounded-full font-medium">{h}</span>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400">
        {photos.images.length} photo{photos.images.length !== 1 ? "s" : ""} added.
        {photos.images.length < 3 && " Adding more photos significantly improves response rate."}
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
        By submitting, you agree that all information is accurate. Your listing will be reviewed by our team and go live within 2 hours.
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="h-12 px-6 rounded-xl">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button onClick={handleSubmit} disabled={submitting} className="flex-1 h-12 rounded-xl">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
          Submit Listing
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-400 shrink-0">{label}</span>
      <span className="font-medium text-[#0A1628] text-right">{value}</span>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SellListPage() {
  const [step, setStep] = useState(1);
  const [seller, setSeller] = useState<SellerInfo | null>(null);
  const [sellerToken, setSellerToken] = useState("");
  const [carDetails, setCarDetails] = useState<Partial<CarDetails>>({});
  const [photoData, setPhotoData] = useState<PhotoData>({ images: [] });

  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200 -z-0" />
            {STEPS.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2 relative z-10">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                  step > s.id
                    ? "bg-[#FF6B2B] border-[#FF6B2B] text-white"
                    : step === s.id
                    ? "bg-white border-[#FF6B2B] text-[#FF6B2B] shadow-lg shadow-[#FF6B2B]/20"
                    : "bg-white border-gray-200 text-gray-300"
                )}>
                  <s.icon className="w-4 h-4" />
                </div>
                <span className={cn(
                  "text-xs font-semibold hidden sm:block",
                  step >= s.id ? "text-[#0A1628]" : "text-gray-400"
                )}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10">
          {step === 1 && (
            <StepPhone
              onVerified={(info, token) => {
                setSeller(info);
                setSellerToken(token);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <StepCarDetails
              initial={carDetails}
              onNext={(data) => {
                setCarDetails(data);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepPhotos
              initial={photoData}
              onNext={(data) => {
                setPhotoData(data);
                setStep(4);
              }}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && seller && (
            <StepReview
              seller={seller}
              car={carDetails as CarDetails}
              photos={photoData}
              sellerToken={sellerToken}
              onBack={() => setStep(3)}
            />
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Need help?{" "}
          <a
            href="https://wa.me/919999999999?text=Hi, I need help listing my car on GaadiBazaar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF6B2B] underline underline-offset-2"
          >
            WhatsApp us
          </a>
        </p>
      </div>
    </div>
  );
}
