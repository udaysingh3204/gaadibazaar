import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ChevronLeft, ArrowRight } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { BlogContent } from "@/components/public/BlogContent";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — GaadiBazaar Blog`,
    description: post.excerpt,
    openGraph: { images: [post.image] },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const others = related.length < 2 ? blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2 - related.length) : [];
  const relatedPosts = [...related, ...others];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-white pt-16">
        {/* Hero image */}
        <div
          className="h-64 sm:h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${post.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full pb-8">
              <span className="inline-block bg-[#FF6B2B] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {post.category}
              </span>
              <h1
                className="text-2xl sm:text-4xl font-extrabold text-white leading-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 text-sm mb-2">
            <Link href="/blog" className="flex items-center gap-1 text-gray-400 hover:text-[#FF6B2B] transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-8 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readMin} min read</span>
          </div>

          <BlogContent content={post.content} />

          {/* CTA */}
          <div className="mt-10 bg-[#0A1628] rounded-2xl p-8 text-center">
            <h3 className="text-xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
              Ready to find your next car?
            </h3>
            <p className="text-gray-400 text-sm mb-5">Browse verified listings in Delhi NCR &amp; Agra.</p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/cars">
                Browse Cars <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-bold text-[#0A1628] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                More from the Blog
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group bg-[#F8F7F4] rounded-xl overflow-hidden border border-gray-100 hover:border-[#FF6B2B]/30 transition-colors"
                  >
                    <div className="aspect-[16/9] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${p.image})` }} />
                    <div className="p-4">
                      <span className="text-[10px] font-semibold text-[#FF6B2B] uppercase tracking-wide">{p.category}</span>
                      <h4 className="font-bold text-[#0A1628] text-sm mt-1 leading-snug group-hover:text-[#FF6B2B] transition-colors line-clamp-2">
                        {p.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
