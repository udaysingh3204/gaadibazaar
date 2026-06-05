import PageShell from "@/components/public/PageShell";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Blog" };

const posts = [
  {
    slug: "buying-a-used-suv-in-india-2026",
    title: "The 2026 Buyer's Guide to Used SUVs in India",
    excerpt: "Hyundai Creta vs Kia Seltos vs Tata Harrier — which 3-year-old SUV holds value best in 2026?",
    category: "Buying Guide",
    readMin: 7,
    date: "20 May 2026",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600",
  },
  {
    slug: "rc-transfer-checklist",
    title: "RC Transfer in 7 Days: A Step-by-Step Checklist",
    excerpt: "Form 29, Form 30, NOC, insurance transfer — exactly what paperwork you need (and where to file each).",
    category: "Legal",
    readMin: 5,
    date: "12 May 2026",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600",
  },
  {
    slug: "electric-vs-petrol-tco",
    title: "Electric or Petrol? Real 5-Year Cost of Ownership in India",
    excerpt: "We crunched the numbers across 8 metros. Here&apos;s when an EV beats a Swift on total cost.",
    category: "Analysis",
    readMin: 9,
    date: "03 May 2026",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600",
  },
  {
    slug: "dealer-saas-india-2026",
    title: "How Indian Car Dealers Are Going Digital in 2026",
    excerpt: "Inside the SaaS revolution transforming the ₹4 lakh crore used-car industry.",
    category: "Industry",
    readMin: 6,
    date: "28 Apr 2026",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600",
  },
];

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="GaadiBazaar Blog"
      title="Stories, guides &amp; market intel"
      subtitle="Practical knowledge for buyers and growth playbooks for dealers."
    >
      <div className="grid sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
            <Link href="#" className="block">
              <div
                className="aspect-[16/9] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="bg-orange-50 text-[#FF6B2B] font-semibold px-2.5 py-0.5 rounded-full">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readMin} min</span>
                </div>
                <h3 className="font-bold text-[#0A1628] mb-2 leading-tight group-hover:text-[#FF6B2B] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
