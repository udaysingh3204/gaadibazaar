import PageShell from "@/components/public/PageShell";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="GaadiBazaar Blog"
      title="Stories, guides &amp; market intel"
      subtitle="Practical knowledge for buyers and growth playbooks for dealers."
    >
      <div className="grid sm:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <article key={post.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
            <Link href={`/blog/${post.slug}`} className="block">
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
