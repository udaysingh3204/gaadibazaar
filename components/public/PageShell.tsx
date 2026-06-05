import { ReactNode } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageShell({ eyebrow, title, subtitle, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0A1628] to-[#1a2a4a] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {eyebrow && (
            <p className="text-[#FF6B2B] font-semibold text-sm uppercase tracking-widest mb-3">
              {eyebrow}
            </p>
          )}
          <h1
            className="text-3xl sm:text-5xl font-extrabold leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-300 text-lg mt-3 max-w-2xl">{subtitle}</p>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </section>
    </div>
  );
}
