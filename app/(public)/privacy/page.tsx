import PageShell from "@/components/public/PageShell";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="Last updated: 22 May 2026"
    >
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-5 text-gray-700 leading-relaxed">
        <p>GaadiBazaar Technologies Pvt. Ltd. (&ldquo;GaadiBazaar&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website and the dealer-facing software platform. This Privacy Policy describes how we collect, use and share your information.</p>

        <h2 className="text-xl font-bold text-[#0A1628] pt-3" style={{ fontFamily: "var(--font-syne)" }}>1. Information We Collect</h2>
        <p>We collect information you provide directly (name, phone, email, city), information automatically collected as you browse (IP, device, cookies), and information from our dealer partners about the listings you enquire about.</p>

        <h2 className="text-xl font-bold text-[#0A1628] pt-3" style={{ fontFamily: "var(--font-syne)" }}>2. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To connect you with dealers for cars you&apos;re interested in</li>
          <li>To verify identity for transactions over ₹50,000</li>
          <li>To send price-drop and inventory alerts you&apos;ve subscribed to</li>
          <li>To improve our search, ranking and inspection processes</li>
        </ul>

        <h2 className="text-xl font-bold text-[#0A1628] pt-3" style={{ fontFamily: "var(--font-syne)" }}>3. Data Sharing</h2>
        <p>We share buyer contact details with the specific dealer whose listing you enquire about. We never sell your data to advertisers. For RC, challan and insurance verification we partner with VAHAN, mParivahan and IRDAI-authorised gateways.</p>

        <h2 className="text-xl font-bold text-[#0A1628] pt-3" style={{ fontFamily: "var(--font-syne)" }}>4. Your Rights</h2>
        <p>Under the Digital Personal Data Protection Act 2023, you have the right to access, correct, port and delete your data. Write to <a className="text-[#FF6B2B] underline" href="mailto:privacy@gaadibazaar.in">privacy@gaadibazaar.in</a>.</p>
      </div>
    </PageShell>
  );
}
