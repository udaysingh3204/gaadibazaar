import PageShell from "@/components/public/PageShell";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      subtitle="Last updated: 22 May 2026"
    >
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-5 text-gray-700 leading-relaxed">
        <p>By using GaadiBazaar you agree to these Terms. Please read them carefully — together with our Privacy Policy and Dealer Agreement, they govern every interaction on this platform.</p>

        <h2 className="text-xl font-bold text-[#0A1628] pt-3" style={{ fontFamily: "var(--font-syne)" }}>1. The Marketplace</h2>
        <p>GaadiBazaar is a marketplace platform. We connect buyers with independent car dealers but do not own, possess, sell or warrant the vehicles listed. Each transaction is between you and the dealer.</p>

        <h2 className="text-xl font-bold text-[#0A1628] pt-3" style={{ fontFamily: "var(--font-syne)" }}>2. Verified Listings</h2>
        <p>The &ldquo;Verified&rdquo; badge means the dealer has completed our KYC + inspection protocol. It is not a warranty. Always test-drive and inspect a vehicle in person before purchase.</p>

        <h2 className="text-xl font-bold text-[#0A1628] pt-3" style={{ fontFamily: "var(--font-syne)" }}>3. Dealer Subscription</h2>
        <p>Dealers using GaadiBazaar SaaS agree to our subscription pricing (see <a className="text-[#FF6B2B] underline" href="/pricing">/pricing</a>), uptime SLAs (99.9%) and the Acceptable Use Policy. Subscriptions renew monthly unless cancelled 7 days before billing date.</p>

        <h2 className="text-xl font-bold text-[#0A1628] pt-3" style={{ fontFamily: "var(--font-syne)" }}>4. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, GaadiBazaar&apos;s liability is limited to the fees paid by you in the 12 months preceding the claim.</p>

        <h2 className="text-xl font-bold text-[#0A1628] pt-3" style={{ fontFamily: "var(--font-syne)" }}>5. Jurisdiction</h2>
        <p>These Terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Gurgaon, Haryana.</p>
      </div>
    </PageShell>
  );
}
