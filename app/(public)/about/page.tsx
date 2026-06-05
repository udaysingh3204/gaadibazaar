import PageShell from "@/components/public/PageShell";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Our Story"
      title="Built for India's next-gen car commerce"
      subtitle="We power the digital storefront for thousands of car dealers — from neighborhood used-car shops to multi-brand chains."
    >
      <div className="prose max-w-none">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-5">
          <p className="text-gray-700 leading-relaxed">
            <strong>GaadiBazaar</strong> is a B2B SaaS platform that gives independent and chain car dealers a turnkey, beautifully designed online marketplace — inventory, leads, payments, and customer engagement, all in one place.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We&apos;re different from horizontal classifieds like Cars24 and Spinny because we don&apos;t take possession of inventory. Instead, we equip the <em>dealer</em> — your local trusted seller — with the same technology stack the unicorns use.
          </p>
          <h3 className="text-xl font-bold text-[#0A1628] pt-4" style={{ fontFamily: "var(--font-syne)" }}>What we believe</h3>
          <ul className="space-y-2 text-gray-700">
            <li>📍 <strong>Hyperlocal beats hyperscale.</strong> Buyers prefer dealers in their city — not consolidated warehouses.</li>
            <li>🤝 <strong>Trust is earned face-to-face.</strong> We help dealers earn it online before the buyer walks in.</li>
            <li>⚡ <strong>Software should be invisible.</strong> Dealers focus on cars; we handle the tech.</li>
          </ul>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {[
            { num: "1,200+", label: "Dealers onboarded" },
            { num: "32", label: "Cities live" },
            { num: "₹140Cr+", label: "GMV processed" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
              <p className="text-3xl font-extrabold text-[#FF6B2B]" style={{ fontFamily: "var(--font-syne)" }}>{s.num}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
