"use client";

import { useState } from "react";
import PageShell from "@/components/public/PageShell";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Users,
  Zap,
  Shield,
  Clock,
  IndianRupee,
  CheckCircle,
  Eye,
  MessageSquare,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function ForDealersPage() {
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "pro" | "elite">("pro");

  const features = [
    {
      icon: Eye,
      title: "Inventory Management",
      desc: "List unlimited cars. Auto-calculate valuations. Track inspection status in real-time.",
    },
    {
      icon: TrendingUp,
      title: "Lead Routing & CRM",
      desc: "Get buyer leads sent to you. Track conversations. Close deals faster with our integrated messaging.",
    },
    {
      icon: MapPin,
      title: "Multi-City Visibility",
      desc: "Appear in 32+ cities simultaneously. Buyers nationwide see your inventory.",
    },
    {
      icon: Users,
      title: "Dealer Network",
      desc: "Partner with 1,200+ verified dealers. Cross-list inventory. Share buyer leads.",
    },
    {
      icon: FileText,
      title: "Legal & Compliance",
      desc: "Generate RC transfer docs, insurance transfers, PUC verification—all in one place.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      desc: "Real-time dashboards: conversion rates, lead sources, sales trends, inventory velocity.",
    },
    {
      icon: Shield,
      title: "Buyer Verification",
      desc: "CIBIL checks, ID verification, insurance eligibility—reduce fraud risk.",
    },
    {
      icon: Zap,
      title: "AI-Powered Pricing",
      desc: "Get market-based price recommendations. Auto-adjust based on market demand.",
    },
  ];

  const plans = {
    starter: {
      name: "Starter",
      price: "₹4,999",
      period: "/month",
      description: "Perfect for independent dealers with small inventory",
      features: [
        "Up to 50 active listings",
        "Single city visibility",
        "Basic CRM (messages & notes)",
        "Email support",
        "Manual valuation",
      ],
    },
    pro: {
      name: "Professional",
      price: "₹12,999",
      period: "/month",
      description: "Our most popular plan for growing dealer networks",
      features: [
        "Unlimited listings",
        "Multi-city visibility (all 32 cities)",
        "Advanced CRM with lead routing",
        "AI-powered pricing suggestions",
        "Legal document generation",
        "Phone + email support",
        "Real-time analytics dashboard",
        "Buyer verification tools",
      ],
    },
    elite: {
      name: "Elite",
      price: "₹29,999",
      period: "/month",
      description: "For dealer groups and enterprise partners",
      features: [
        "Everything in Professional",
        "API access for inventory sync",
        "Dedicated account manager",
        "Custom integrations",
        "Bulk document processing",
        "Priority support (phone, email, chat)",
        "Training for your team",
        "Co-branded storefront",
        "Lead guarantees (up to 50/month)",
      ],
    },
  };

  const successStories = [
    {
      dealer: "Raj Motors, Delhi",
      size: "8 locations, 200+ cars/month",
      result: "3x leads in first month, ₹2.3 Cr annual GMV",
    },
    {
      dealer: "Mumbai Motors Co.",
      size: "Single large lot",
      result: "Reduced sell-through time from 45 to 18 days",
    },
    {
      dealer: "Bangalore Car World",
      size: "Chain of 5 outlets",
      result: "Unified inventory across locations, +150% sales",
    },
  ];

  return (
    <PageShell
      eyebrow="For Car Dealers"
      title="Your all-in-one SaaS platform for selling cars online"
      subtitle="GaadiBazaar helps independent and chain dealers reach buyers nationwide, manage inventory, close deals faster, and scale profitably."
    >
      {/* Problem + Solution */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
          <h3 className="text-xl font-bold text-amber-900 mb-4">The Problem</h3>
          <ul className="space-y-3 text-amber-800">
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span>Stuck with inventory you can't sell quickly</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span>Can't reach buyers outside your city</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span>Scattered across multiple platforms (OLX, local websites, phone calls)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span>Manual paperwork: RC transfers, insurance, compliance checks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span>No insight into what's working (pricing, which cars sell best, lead ROI)</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-4">Our Solution</h3>
          <ul className="space-y-3 text-emerald-800">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>List once, reach nationwide:</strong> Your cars appear in 32+ cities</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Buyer leads delivered to you:</strong> Pre-qualified inquiries routed to your CRM</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Paperwork handled:</strong> Auto-generate legal docs, verify buyers, no compliance risk</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Data-driven pricing:</strong> AI recommends prices based on market demand</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Full visibility:</strong> Real-time dashboards show what converts</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#0A1628] mb-8" style={{ fontFamily: "var(--font-syne)" }}>
          Everything dealers need to scale
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                <Icon className="w-8 h-8 text-[#FF6B2B] mb-3" />
                <h3 className="font-bold text-[#0A1628] mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#0A1628] mb-2" style={{ fontFamily: "var(--font-syne)" }}>
          Simple, transparent pricing
        </h2>
        <p className="text-gray-600 mb-8">All plans include 30-day free trial. Cancel anytime, no long-term contracts.</p>

        <div className="grid lg:grid-cols-3 gap-6">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              onClick={() => setSelectedPlan(key as "starter" | "pro" | "elite")}
              className={`rounded-2xl border-2 transition-all cursor-pointer p-6 ${
                selectedPlan === key
                  ? "border-[#FF6B2B] bg-gradient-to-br from-orange-50 to-transparent shadow-lg"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <h3 className="text-xl font-bold text-[#0A1628] mb-1">{plan.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-[#FF6B2B]">{plan.price}</span>
                <span className="text-gray-600 text-sm">{plan.period}</span>
              </div>
              <Button asChild className="w-full mb-6">
                <a href={`mailto:sales@gaadibazaar.in?subject=I want to join ${plan.name} plan`}>
                  Get Started
                </a>
              </Button>
              <div className="space-y-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mt-6 border border-blue-100">
          <p className="text-sm text-blue-900">
            <strong>For dealer groups and enterprise partners:</strong> Custom plans available. We offer API access, dedicated account managers, co-branded solutions, and lead guarantees.{" "}
            <a href="mailto:enterprise@gaadibazaar.in" className="text-blue-700 hover:underline font-semibold">
              Contact our enterprise team
            </a>
          </p>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#0A1628] mb-8" style={{ fontFamily: "var(--font-syne)" }}>
          Trusted by 1,200+ dealers
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {successStories.map((story) => (
            <div key={story.dealer} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <p className="font-bold text-[#0A1628] mb-1">{story.dealer}</p>
              <p className="text-xs text-gray-400 mb-3">{story.size}</p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <p className="text-sm font-semibold text-emerald-800">{story.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works for Dealers */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#0A1628] mb-8" style={{ fontFamily: "var(--font-syne)" }}>
          Get started in 3 steps
        </h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            {
              num: "1",
              title: "Sign Up & Onboard",
              desc: "Register your dealership, verify documents, upload your inventory in bulk.",
            },
            {
              num: "2",
              title: "Start Getting Leads",
              desc: "Your cars appear nationwide. Buyer inquiries come to your dashboard.",
            },
            {
              num: "3",
              title: "Close & Scale",
              desc: "Manage deals end-to-end. Get insights. Repeat. Grow your sales 2-3x.",
            },
          ].map((step) => (
            <div key={step.num} className="relative">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#FF6B2B] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-[#0A1628] mb-2 mt-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
              {parseInt(step.num) < 3 && (
                <ArrowRight className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#0A1628] mb-8" style={{ fontFamily: "var(--font-syne)" }}>
          Frequently asked
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Is there a long-term contract?",
              a: "No. All plans are month-to-month. Cancel anytime. We work hard to keep you happy.",
            },
            {
              q: "Can I upload my existing inventory?",
              a: "Yes. We support bulk CSV uploads. Our team can help migrate your data from other platforms.",
            },
            {
              q: "Do you handle buyer verification?",
              a: "Yes. We run CIBIL checks, ID verification, and insurance eligibility. Reduces fraud risk.",
            },
            {
              q: "What if I have multiple locations?",
              a: "Manage all locations from one dashboard. Inventory, leads, and analytics are unified.",
            },
            {
              q: "Is there a setup fee?",
              a: "No setup fee. Just the monthly subscription. First 30 days are free.",
            },
            {
              q: "How do you compare to OLX or Facebook?",
              a: "We focus on dealers, not individual buyers. Our CRM, legal tools, pricing AI, and dealer network are built specifically for scaled operations. Plus, you don't compete with 1000s of other listings.",
            },
          ].map((faq) => (
            <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-[#0A1628] mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1a2a4a] text-white rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-syne)" }}>
          Ready to scale your dealership?
        </h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Join 1,200+ dealers who are selling more cars in less time. Start your free 30-day trial today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-[#FF6B2B] hover:bg-[#ff5a1a]">
            <a href="mailto:sales@gaadibazaar.in?subject=Dealer Onboarding - Start Free Trial">
              Start Free Trial
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <a href="tel:+911800123456">Call Us: 1800-123-4567</a>
          </Button>
        </div>
        <p className="text-gray-400 text-xs mt-4">30-day free trial. No credit card required. Cancel anytime.</p>
      </div>
    </PageShell>
  );
}
