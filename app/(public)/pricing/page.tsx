"use client";

import PageShell from "@/components/public/PageShell";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "₹4,999",
      period: "/month",
      description: "For independent dealers starting out",
      color: "from-blue-600 to-blue-700",
      cta: "Start Free Trial",
      features: {
        inventory: {
          "Active listings": true,
          "limit": "Up to 50",
        },
        reach: {
          "Single city visibility": true,
          "Multi-city (32 cities)": false,
          "Nationwide reach": false,
        },
        crm: {
          "Basic CRM": true,
          "Advanced CRM with routing": false,
          "Lead scoring": false,
        },
        tools: {
          "Manual valuation": true,
          "AI pricing suggestions": false,
          "Legal documents": false,
        },
        support: {
          "Email support": true,
          "Phone support": false,
          "Dedicated account manager": false,
        },
      },
    },
    {
      name: "Professional",
      price: "₹12,999",
      period: "/month",
      description: "Our most popular plan",
      color: "from-orange-600 to-red-700",
      badge: "Most Popular",
      cta: "Start Free Trial",
      featured: true,
      features: {
        inventory: {
          "Active listings": true,
          "limit": "Unlimited",
        },
        reach: {
          "Single city visibility": false,
          "Multi-city (32 cities)": true,
          "Nationwide reach": true,
        },
        crm: {
          "Basic CRM": true,
          "Advanced CRM with routing": true,
          "Lead scoring": true,
        },
        tools: {
          "Manual valuation": true,
          "AI pricing suggestions": true,
          "Legal documents": true,
        },
        support: {
          "Email support": true,
          "Phone support": true,
          "Dedicated account manager": false,
        },
      },
    },
    {
      name: "Elite",
      price: "₹29,999",
      period: "/month",
      description: "For dealer groups and chains",
      color: "from-purple-600 to-pink-700",
      cta: "Contact Sales",
      features: {
        inventory: {
          "Active listings": true,
          "limit": "Unlimited",
        },
        reach: {
          "Single city visibility": false,
          "Multi-city (32 cities)": true,
          "Nationwide reach": true,
        },
        crm: {
          "Basic CRM": true,
          "Advanced CRM with routing": true,
          "Lead scoring": true,
        },
        tools: {
          "Manual valuation": true,
          "AI pricing suggestions": true,
          "Legal documents": true,
        },
        support: {
          "Email support": true,
          "Phone support": true,
          "Dedicated account manager": true,
        },
        extra: {
          "API access": true,
          "Custom integrations": true,
          "Co-branded storefront": true,
          "Lead guarantees": true,
        },
      },
    },
  ];

  const sections = [
    {
      title: "Inventory Management",
      key: "inventory",
      items: ["Active listings", "limit"],
    },
    {
      title: "Reach & Visibility",
      key: "reach",
      items: ["Single city visibility", "Multi-city (32 cities)", "Nationwide reach"],
    },
    {
      title: "CRM & Lead Management",
      key: "crm",
      items: ["Basic CRM", "Advanced CRM with routing", "Lead scoring"],
    },
    {
      title: "Dealer Tools",
      key: "tools",
      items: ["Manual valuation", "AI pricing suggestions", "Legal documents"],
    },
    {
      title: "Support",
      key: "support",
      items: ["Email support", "Phone support", "Dedicated account manager"],
    },
    {
      title: "Enterprise Features",
      key: "extra",
      items: ["API access", "Custom integrations", "Co-branded storefront", "Lead guarantees"],
    },
  ];

  return (
    <PageShell
      eyebrow="Transparent Pricing"
      title="Simple plans. Scale as you grow."
      subtitle="No hidden fees. All plans include 30-day free trial. Cancel anytime."
    >
      {/* Plan Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border-2 overflow-hidden transition-all ${
              plan.featured
                ? "border-[#FF6B2B] shadow-2xl scale-105 lg:scale-110"
                : "border-gray-100"
            }`}
          >
            <div className={`bg-gradient-to-r ${plan.color} text-white px-6 py-8 relative`}>
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                  {plan.badge}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-white/80 text-sm mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className="text-white/80 text-sm ml-2">{plan.period}</span>
              </div>
              <Button
                asChild
                className={`w-full font-semibold ${
                  plan.featured
                    ? "bg-white text-[#0A1628] hover:bg-gray-100"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <a href="mailto:sales@gaadibazaar.in">{plan.cta}</a>
              </Button>
              <p className="text-white/60 text-xs text-center mt-3">30-day free trial. No credit card.</p>
            </div>

            {/* Features Summary */}
            <div className="p-6 space-y-4">
              {sections.slice(0, 4).map((section) => (
                <div key={section.key}>
                  {section.key === "inventory" && (
                    <>
                      <p className="font-semibold text-[#0A1628] text-sm mb-1">{section.items[0]}</p>
                      <p className="text-sm text-[#FF6B2B] font-bold">
                        {(plan.features as any)[section.key]?.[section.items[1]] || "Limited"}
                      </p>
                    </>
                  )}
                  {section.key !== "inventory" && (
                    <div>
                      <p className="font-semibold text-[#0A1628] text-sm mb-1">{section.title}</p>
                      <ul className="space-y-1">
                        {section.items.map((item) => {
                          const hasFeature = (plan.features as any)[section.key]?.[item];
                          return (
                            <li key={item} className="text-xs text-gray-600 flex items-center gap-2">
                              {hasFeature ? (
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <X className="w-4 h-4 text-gray-300 shrink-0" />
                              )}
                              <span>{item}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Full Feature Comparison Table */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#0A1628] mb-8" style={{ fontFamily: "var(--font-syne)" }}>
          Complete feature comparison
        </h2>
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left font-bold text-[#0A1628] bg-gray-50">Feature</th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={`px-6 py-4 text-center font-bold text-[#0A1628] ${
                      plan.featured ? "bg-orange-50" : "bg-gray-50"
                    }`}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sections.map((section) => (
                <tr key={section.key}>
                  <td className="px-6 py-4 font-semibold text-[#0A1628]">{section.title}</td>
                  {plans.map((plan) => (
                    <td
                      key={plan.name}
                      className={`px-6 py-4 text-center ${plan.featured ? "bg-orange-50" : ""}`}
                    >
                      {section.key === "inventory" ? (
                        <span className="text-[#FF6B2B] font-bold">
                          {(plan.features as any)[section.key]["limit"] || "Limited"}
                        </span>
                      ) : (
                        <div className="space-y-2">
                          {section.items.map((item) => {
                            const hasFeature = (plan.features as any)[section.key]?.[item];
                            return (
                              <div key={item} className="flex items-center justify-center">
                                {hasFeature ? (
                                  <Check className="w-5 h-5 text-emerald-600" />
                                ) : (
                                  <X className="w-5 h-5 text-gray-300" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-bold text-[#0A1628] mb-8" style={{ fontFamily: "var(--font-syne)" }}>
          Pricing questions
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              q: "What's included in the free trial?",
              a: "Full access to all features of your chosen plan. No credit card required. Cancellable anytime.",
            },
            {
              q: "Can I change plans anytime?",
              a: "Yes. Upgrade or downgrade anytime. Changes take effect at the next billing cycle.",
            },
            {
              q: "What if I outgrow my plan?",
              a: "Easy. Upgrade to the next tier. For custom needs, contact our enterprise team.",
            },
            {
              q: "Do you offer discounts for annual billing?",
              a: "Yes. Annual plans save you 20%. Contact sales@gaadibazaar.in for details.",
            },
            {
              q: "Is there a commitment period?",
              a: "No. All plans are month-to-month. Cancel anytime without penalty.",
            },
            {
              q: "What payment methods do you accept?",
              a: "Bank transfers, UPI, Credit/Debit cards, and RazorPay. Invoice billing available for Enterprise.",
            },
          ].map((faq) => (
            <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-[#0A1628] mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
