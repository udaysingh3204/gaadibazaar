import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { hash } from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.car.deleteMany();
  await prisma.dealerUser.deleteMany();
  await prisma.dealer.deleteMany();
  await prisma.adminUser.deleteMany();

  // Seed admin user
  const hashedPassword = await hash("Admin@123", 12);
  await prisma.adminUser.create({
    data: {
      email: "admin@gaadibazaar.in",
      password: hashedPassword,
      name: "Site Admin",
    },
  });

  // Seed sample dealers
  const dealers = await Promise.all([
    prisma.dealer.create({
      data: {
        name: "Raj Motors Delhi",
        email: "raj@rajmotors.in",
        phone: "9876543210",
        city: "Delhi",
        state: "Delhi",
        address: "Mall Road, Delhi",
        gstNumber: "07AABCT1234H1Z2",
        plan: "PROFESSIONAL",
        isActive: true,
      },
    }),
    prisma.dealer.create({
      data: {
        name: "Mumbai Motors Co.",
        email: "contact@mumbaimotors.in",
        phone: "9876543211",
        city: "Mumbai",
        state: "Maharashtra",
        address: "Bandra, Mumbai",
        gstNumber: "27AABCT5678H1Z0",
        plan: "PROFESSIONAL",
        isActive: true,
      },
    }),
    prisma.dealer.create({
      data: {
        name: "Bangalore Car World",
        email: "sales@bangalorecarworld.in",
        phone: "9876543212",
        city: "Bangalore",
        state: "Karnataka",
        address: "Koramangala, Bangalore",
        gstNumber: "29AABCT9101H1Z3",
        plan: "ELITE",
        isActive: true,
      },
    }),
  ]);

  // Seed car listings
  const cars = [
    {
      brand: "Maruti Suzuki",
      model: "Swift",
      variant: "VXI",
      yearOfManufacture: 2021,
      registrationYear: 2021,
      fuelType: "PETROL" as const,
      transmission: "MANUAL" as const,
      engineCC: 1197,
      mileageKmpl: 23.2,
      kmDriven: 32000,
      numberOfOwners: "FIRST" as const,
      bodyType: "HATCHBACK" as const,
      color: "Pearl Metallic White",
      city: "Delhi",
      askingPrice: 650000,
      sellerName: "Rajesh Kumar",
      sellerPhone: "9876543210",
      highlights: ["Single owner", "Full service history", "Accident free", "Original paint"],
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop",
      ],
      isVerified: true,
      isFeatured: false,
      status: "ACTIVE" as const,
    },
    {
      brand: "Hyundai",
      model: "Creta",
      variant: "SX",
      yearOfManufacture: 2020,
      registrationYear: 2020,
      fuelType: "DIESEL" as const,
      transmission: "MANUAL" as const,
      engineCC: 1493,
      mileageKmpl: 21.4,
      kmDriven: 48000,
      numberOfOwners: "FIRST" as const,
      bodyType: "SUV" as const,
      color: "Phantom Black",
      city: "Mumbai",
      askingPrice: 1350000,
      sellerName: "Priya Sharma",
      sellerPhone: "9823456789",
      highlights: ["Sunroof", "Leather seats", "Touchscreen infotainment", "All service records"],
      images: [
        "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop",
      ],
      isVerified: false,
      isFeatured: false,
      status: "ACTIVE" as const,
    },
    {
      brand: "Tata",
      model: "Nexon",
      variant: "XZ+",
      yearOfManufacture: 2022,
      registrationYear: 2022,
      fuelType: "PETROL" as const,
      transmission: "AMT" as const,
      engineCC: 1199,
      mileageKmpl: 17.0,
      kmDriven: 18000,
      numberOfOwners: "FIRST" as const,
      bodyType: "SUV" as const,
      color: "Calypso Red",
      city: "Bangalore",
      askingPrice: 1520000,
      sellerName: "Arun Patel",
      sellerPhone: "9765432109",
      highlights: ["5-star safety rating", "TPMS", "JBL sound system", "EV ready platform"],
      images: [
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
      ],
      isVerified: true,
      isFeatured: true,
      status: "ACTIVE" as const,
    },
    {
      brand: "Honda",
      model: "City",
      variant: "VX",
      yearOfManufacture: 2019,
      registrationYear: 2019,
      fuelType: "PETROL" as const,
      transmission: "CVT" as const,
      engineCC: 1498,
      mileageKmpl: 18.4,
      kmDriven: 61000,
      numberOfOwners: "FIRST" as const,
      bodyType: "SEDAN" as const,
      color: "Lunar Silver Metallic",
      city: "Pune",
      askingPrice: 1040000,
      sellerName: "Meera Iyer",
      sellerPhone: "9654321098",
      highlights: ["Lane assist", "Honda sensing", "Sunroof", "CarPlay/Android Auto"],
      images: [
        "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop",
      ],
      isVerified: false,
      isFeatured: false,
      status: "ACTIVE" as const,
    },
    {
      brand: "Kia",
      model: "Seltos",
      variant: "HTX",
      yearOfManufacture: 2021,
      registrationYear: 2021,
      fuelType: "DIESEL" as const,
      transmission: "MANUAL" as const,
      engineCC: 1493,
      mileageKmpl: 18.3,
      kmDriven: 27000,
      numberOfOwners: "FIRST" as const,
      bodyType: "SUV" as const,
      color: "Glacier White Pearl",
      city: "Hyderabad",
      askingPrice: 1675000,
      sellerName: "Suresh Reddy",
      sellerPhone: "9543210987",
      highlights: ["Bose sound system", "Ventilated seats", "10.25\" display", "Wireless charging"],
      images: [
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
      ],
      isVerified: true,
      isFeatured: false,
      status: "ACTIVE" as const,
    },
    {
      brand: "Mahindra",
      model: "XUV300",
      variant: "W8",
      yearOfManufacture: 2018,
      registrationYear: 2018,
      fuelType: "DIESEL" as const,
      transmission: "MANUAL" as const,
      engineCC: 1497,
      mileageKmpl: 20.0,
      kmDriven: 74000,
      numberOfOwners: "SECOND" as const,
      bodyType: "SUV" as const,
      color: "Aquamarine",
      city: "Chennai",
      askingPrice: 980000,
      sellerName: "Krishnamurthy V",
      sellerPhone: "9432109876",
      highlights: ["7 airbags", "Sunroof", "Heated ORVMs", "Electronic stability program"],
      images: [
        "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop",
      ],
      isVerified: false,
      isFeatured: false,
      status: "ACTIVE" as const,
    },
    {
      brand: "MG",
      model: "Hector",
      variant: "Sharp",
      yearOfManufacture: 2023,
      registrationYear: 2023,
      fuelType: "PETROL" as const,
      transmission: "DCT" as const,
      engineCC: 1451,
      mileageKmpl: 13.96,
      kmDriven: 9000,
      numberOfOwners: "FIRST" as const,
      bodyType: "SUV" as const,
      color: "Starry Black",
      city: "Gurgaon",
      askingPrice: 1950000,
      sellerName: "Vikram Singh",
      sellerPhone: "9321098765",
      highlights: ["14\" HD screen", "iSMART connected features", "ADAS suite", "Panoramic sunroof"],
      images: [
        "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop",
      ],
      isVerified: true,
      isFeatured: true,
      status: "ACTIVE" as const,
    },
    {
      brand: "Toyota",
      model: "Innova Crysta",
      variant: "2.4 G",
      yearOfManufacture: 2020,
      registrationYear: 2020,
      fuelType: "DIESEL" as const,
      transmission: "MANUAL" as const,
      engineCC: 2393,
      mileageKmpl: 14.29,
      kmDriven: 53000,
      numberOfOwners: "SECOND" as const,
      bodyType: "MUV" as const,
      color: "Silver Metallic",
      city: "Jaipur",
      askingPrice: 1890000,
      sellerName: "Rajendra Gupta",
      sellerPhone: "9210987654",
      highlights: ["7-seater", "Captain seats", "Rear AC", "Well maintained"],
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&auto=format&fit=crop",
      ],
      isVerified: false,
      isFeatured: false,
      status: "ACTIVE" as const,
    },
  ];

  // Seed cars with dealer relationships
  const carData = cars.map((car, idx) => ({
    ...car,
    dealerId: dealers[idx % dealers.length].id,
  }));

  for (const car of carData) {
    await prisma.car.create({ data: car });
  }

  // Seed dealer users (team members)
  await prisma.dealerUser.create({
    data: {
      email: "manager@rajmotors.in",
      name: "Rajesh Kumar",
      role: "manager",
      dealerId: dealers[0].id,
    },
  });

  await prisma.dealerUser.create({
    data: {
      email: "sales@mumbaimotors.in",
      name: "Priya Sharma",
      role: "sales",
      dealerId: dealers[1].id,
    },
  });

  console.log("✅ Seeded 8 cars, 3 dealers, and 1 admin user successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
