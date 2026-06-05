import PageShell from "@/components/public/PageShell";
import { Briefcase, MapPin } from "lucide-react";

export const metadata = { title: "Careers" };

const openings = [
  { title: "Senior Full-Stack Engineer", team: "Engineering", location: "Bangalore / Remote", type: "Full-time" },
  { title: "Product Designer (B2B SaaS)", team: "Design", location: "Gurgaon", type: "Full-time" },
  { title: "Dealer Success Manager — North", team: "Operations", location: "Delhi NCR", type: "Full-time" },
  { title: "Growth Marketing Lead", team: "Marketing", location: "Mumbai", type: "Full-time" },
  { title: "Data Scientist — Pricing", team: "Data", location: "Bangalore", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Join Us"
      title="Build the future of car commerce in India"
      subtitle="We're a small, ambitious team rebuilding how 4 lakh+ dealers do business. If that excites you, we'd love to talk."
    >
      <div className="space-y-3">
        {openings.map((job) => (
          <div key={job.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#FF6B2B] transition-colors">
            <div>
              <h3 className="font-bold text-[#0A1628]">{job.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.team}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                <span>{job.type}</span>
              </div>
            </div>
            <a
              href={`mailto:careers@gaadibazaar.in?subject=Application: ${encodeURIComponent(job.title)}`}
              className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-[#0A1628] text-white text-sm font-semibold hover:bg-[#1a2a4a] transition-colors"
            >
              Apply
            </a>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
