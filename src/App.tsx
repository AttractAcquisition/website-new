import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, ReactNode } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Menu, X } from "lucide-react";
import { supabase } from "./lib/supabase";

type ContactMode = "whatsapp" | "email";

type SystemCard = {
  number: string;
  name: string;
  role: string;
  description: string;
  colorVar: string;
  glow: string;
};

type OfferPageData = {
  slug: "sprint" | "brand" | "authority";
  eyebrow: string;
  sectionNumber: string;
  badge: string;
  offerNumber: string;
  name: string;
  headline: string;
  intro: string;
  items: Array<{ label: string; value: string }>;
  totalLabel: string;
  totalValue: string;
  priceLabel: string;
  price: string;
  priceNote: string;
  guaranteeTitle: string;
  guaranteeText: string;
  irresistible: string;
  adBudget: string;
};

type EnginePageData = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  role: string;
  outcomes: string[];
  details: string[];
  accent: string;
};

const CALENDLY_URL = "https://calendly.com/attractacquisition/attract-acquisition-1-1-call?month=2026-03";

const navItems = [
  { label: "The Problem", href: "/#problem", hideMobile: true },
  { label: "How It Works", href: "/engine", hideMobile: true },
  { label: "Proof", href: "/#proof", hideMobile: true },
  { label: "Free MJR", href: "/mjr", hideMobile: true },
  { label: "Engagements", href: "/#offers", hideMobile: true },
];

const stats = [
  { value: "3x", label: "The multiplier in the engine" },
  { value: "16", label: "Trade niches we deploy into" },
  { value: "4", label: "Systems working as one engine" },
  { value: "14-day", label: "To validated demand" },
];

const pains = [
  {
    icon: "FE",
    title: "Feast or famine",
    copy: "Booked solid one month, dead quiet the next. No predictability, no way to plan, no control over the pipeline.",
  },
  {
    icon: "WM",
    title: "Hostage to word-of-mouth",
    copy: "Referrals are great until they dry up. You can't scale, forecast, or grow on a channel you don't control.",
  },
  {
    icon: "VS",
    title: "Out-marketed by worse operators",
    copy: "Competitors who do half the quality of work get the calls simply because they're visible and you're not.",
  },
  {
    icon: "AG",
    title: "Burned by an agency before",
    copy: 'You paid for "marketing," got a stack of impressions and pretty posts, and not a single extra booked job.',
  },
];

const systems: SystemCard[] = [
  {
    number: "01",
    name: "Ad System",
    role: "Attract · Awareness",
    description:
      "Psychologically-sequenced ad campaigns that stop the scroll and pull your market toward you, manufacturing attention from cold strangers.",
    colorVar: "var(--sys-ad)",
    glow: "rgba(255,92,43,.4)",
  },
  {
    number: "02",
    name: "Proof System",
    role: "Credibility · Capability",
    description:
      "A proof-saturated profile so that the moment someone lands, they know instantly that you can deliver the outcome they want.",
    colorVar: "var(--sys-proof)",
    glow: "rgba(255,182,39,.4)",
  },
  {
    number: "03",
    name: "Story System",
    role: "Convert · Desire",
    description:
      "Story sequences engineered to build desire and dismantle objections, warming your audience until they're ready to act.",
    colorVar: "var(--sys-story)",
    glow: "rgba(0,229,195,.4)",
  },
  {
    number: "04",
    name: "CLOSER System",
    role: "Decision · Booked",
    description:
      "A conversion site built on the proven CLOSER framework that turns a warmed, believing visitor into a booked, qualified job.",
    colorVar: "var(--sys-closer)",
    glow: "rgba(139,109,255,.4)",
  },
];

const enginePages: EnginePageData[] = [
  {
    slug: "engine",
    eyebrow: "The Engine",
    title: "Attraction Engine",
    summary:
      "The operating system that turns your proof into consistent local demand: proof captured from real jobs, distributed at volume, and repeated until your business becomes the obvious choice.",
    role: "Proof x Volume x Consistency = Brand",
    outcomes: [
      "A predictable pipeline built from your actual work",
      "A market position that compounds instead of resetting every month",
      "One connected system across ads, proof, story, and conversion",
    ],
    details: [
      "We capture proof from the work you already do, package it into faceless creative, distribute it to your local market, and route qualified enquiries back to you.",
      "The engine is built for owner-operated trade and service businesses that do good work but lose jobs to more visible competitors.",
      "Each system hands a warmer, more convinced prospect to the next, so demand is earned through evidence rather than rented through generic marketing.",
    ],
    accent: "var(--teal)",
  },
  {
    slug: "ad-system",
    eyebrow: "System 01",
    title: "Ad System",
    summary:
      "The paid distribution layer that turns cold local attention into warm, qualified demand by putting proof of your work in front of the right homeowners, in the right sequence.",
    role: "Attract · Awareness · Demand",
    outcomes: [
      "Your best proof reaches people who have never heard of you",
      "Campaigns move prospects from awareness to trust before asking for action",
      "Ad spend is judged against enquiries, conversations, and booked-work signals",
    ],
    details: [
      "The Ad System is not post boosting. It is a structured campaign layer that introduces your work to cold local homeowners, warms the people who engage, and sends the most interested prospects into the next step.",
      "We lead with proof, not hype: finished work, visible standards, customer outcomes, process footage, and the specific problems your market already recognises.",
      "The system is built to learn quickly. We test which proof, pain points, and offers create the strongest response, then move budget toward the combinations most likely to become qualified enquiries.",
    ],
    accent: "var(--sys-ad)",
  },
  {
    slug: "proof-system",
    eyebrow: "System 02",
    title: "Proof System",
    summary:
      "The credibility layer that makes your capability obvious the moment someone checks you out, turning finished work into visible evidence your market can trust.",
    role: "Credibility · Capability · Trust",
    outcomes: [
      "A proof-dense profile that quickly answers: are these people legit?",
      "Finished jobs turned into before/after, process, review, and outcome assets",
      "A repeatable proof-capture rhythm that keeps your credibility current",
    ],
    details: [
      "Most good trade businesses have proof scattered across phones, WhatsApp chats, and half-finished folders. The Proof System turns that raw evidence into a visible credibility surface.",
      "When ad traffic, referrals, or searchers check your profile, they should immediately see real jobs, real outcomes, real reviews, and a clear next step.",
      "The point is simple: reduce doubt before the first conversation. When your proof is obvious, prospects arrive warmer, trust faster, and ask better questions.",
    ],
    accent: "var(--sys-proof)",
  },
  {
    slug: "story-system",
    eyebrow: "System 03",
    title: "Story System",
    summary:
      "The nurture and conversion layer that turns warm attention into real intent by staying visible, answering doubts, and giving prospects the right next step at the right moment.",
    role: "Nurture · Desire · Action",
    outcomes: [
      "Warm prospects keep seeing relevant proof after they visit your profile",
      "Common doubts are answered before they become lost enquiries",
      "Interested viewers are moved toward DMs, quote requests, bookings, or lead capture",
    ],
    details: [
      "Not every buyer acts the first time they see your work. The Story System keeps your brand present while their intent builds and their questions become clearer.",
      "We use short, proof-led story content to teach, reassure, answer objections, create urgency when it is honest, and make action feel natural instead of forced.",
      "By the time a prospect reaches the conversion point, they should already understand why you are different, why the result matters, and what to do next.",
    ],
    accent: "var(--sys-story)",
  },
  {
    slug: "closer-system",
    eyebrow: "System 04",
    title: "CLOSER System",
    summary:
      "The decision layer that turns warmed, proof-aware visitors into qualified enquiries, booked calls, and jobs worth quoting.",
    role: "Decision · Conversion · Booked",
    outcomes: [
      "A focused conversion page built around one outcome and one next step",
      "Proof, objections, guarantees, and reviews carried into the moment of decision",
      "High-intent visitors routed into bookings, quote requests, lead forms, or DMs",
    ],
    details: [
      "Attention without a strong decision page leaks money. Once someone has seen your ads, checked your proof, and warmed up through your content, the website has one job: make the next step obvious and safe.",
      "The CLOSER System turns your offer, proof, reviews, guarantee, and buying objections into a focused page that guides the visitor from recognition to action.",
      "Every page is built mobile-first because most traffic arrives from social. The copy is direct, the proof is visible, and the call to action stays consistent from the first screen to the final close.",
    ],
    accent: "var(--sys-closer)",
  },
];

const adSystemClientSections = [
  {
    title: "No random boosting",
    copy: "Every campaign has a job: earn attention, build belief, or create a qualified next step. We do not spend your budget on disconnected posts and hope the market figures it out.",
  },
  {
    title: "Proof before pressure",
    copy: "Cold prospects are not asked to book before they trust you. They see the work, understand the problem, recognise your standard, and only then get a clear call to action.",
  },
  {
    title: "Local demand focus",
    copy: "Campaigns are shaped around your service area, buyer profile, job value, and available proof, so your spend is aimed at the jobs you actually want to quote.",
  },
  {
    title: "Measured by pipeline",
    copy: "The reporting lens is simple: what attention became engagement, what engagement became enquiry, and what enquiries are worth following up.",
  },
];

const adSystemFlow = [
  {
    step: "01",
    title: "Find the trigger",
    copy: "We test the proof and problem frames that make your local market stop, watch, and self-identify.",
  },
  {
    step: "02",
    title: "Warm the interested",
    copy: "People who engage see deeper proof: process, standards, reviews, outcomes, and reasons to trust your business.",
  },
  {
    step: "03",
    title: "Create the next step",
    copy: "Warm prospects are directed into the right action: message, lead form, quote request, or booking path depending on the offer.",
  },
];

const proofSystemClientSections = [
  {
    title: "First-screen credibility",
    copy: "Your public profile needs to answer three questions fast: what you do, whether you do it well, and what someone should do next.",
  },
  {
    title: "Real work, not stock polish",
    copy: "We prioritise actual jobs, real before/afters, raw reviews, process footage, and visible standards over over-designed marketing graphics.",
  },
  {
    title: "Proof captured from daily jobs",
    copy: "Your team captures simple job evidence as work happens. We turn that into usable assets for ads, stories, profile content, and sales conversations.",
  },
  {
    title: "A profile that supports paid traffic",
    copy: "When someone taps an ad and checks you out, the profile confirms the promise instead of breaking belief and wasting the click.",
  },
];

const proofSystemFlow = [
  {
    step: "01",
    title: "Capture",
    copy: "Before, process, after, review, and outcome evidence is collected from the jobs you are already doing.",
  },
  {
    step: "02",
    title: "Package",
    copy: "The raw material becomes proof-led posts, reels, highlights, pinned content, ad assets, and conversion evidence.",
  },
  {
    step: "03",
    title: "Compound",
    copy: "Every week adds more credibility, creating a proof wall competitors cannot fake quickly.",
  },
];

const storySystemClientSections = [
  {
    title: "Warm traffic does not go cold",
    copy: "People who have seen your ads or checked your profile continue seeing useful, relevant proof instead of being left to forget you.",
  },
  {
    title: "Objections get answered publicly",
    copy: "Price, trust, timing, risk, and uncertainty are handled through content before the prospect ever needs to ask.",
  },
  {
    title: "Conversion feels earned",
    copy: "The ask comes after credibility has been built, so the next step feels like the obvious move rather than a hard sell.",
  },
  {
    title: "Your audience keeps refilling",
    copy: "Engagement-led content keeps the warm audience active, giving ads and conversion pages more interested people to work with.",
  },
];

const storySystemFlow = [
  {
    step: "01",
    title: "Warm",
    copy: "We build familiarity and authority with people who have already seen your proof.",
  },
  {
    step: "02",
    title: "Reassure",
    copy: "We answer the doubts that usually stop a homeowner from messaging, booking, or asking for a quote.",
  },
  {
    step: "03",
    title: "Move",
    copy: "When the audience is ready, we give one clear action: DM, tap, book, claim, or request the next step.",
  },
];

const closerSystemClientSections = [
  {
    title: "One page, one decision",
    copy: "The page is not a brochure. It focuses on the single outcome your buyer wants and repeats one clear action instead of scattering attention across services and links.",
  },
  {
    title: "Proof at the point of action",
    copy: "Before/afters, reviews, guarantees, credentials, and case evidence sit inside the conversion path, so trust is reinforced exactly when the buyer is deciding.",
  },
  {
    title: "Objections handled before the call",
    copy: "Price anxiety, trust concerns, timing, risk, and uncertainty are addressed on the page with evidence, not vague reassurance.",
  },
  {
    title: "Built for phone traffic",
    copy: "The experience is designed for fast mobile decisions: clear first screen, short sections, repeated CTA, quick load, and no unnecessary escape routes.",
  },
];

const closerSystemFlow = [
  {
    step: "01",
    title: "Clarify",
    copy: "The first screen confirms the exact result they came for, where you serve, and the one next step they can take.",
  },
  {
    step: "02",
    title: "Convince",
    copy: "The page mirrors their problem, explains why ordinary fixes fail, and shows the proof that your approach gets the outcome.",
  },
  {
    step: "03",
    title: "Convert",
    copy: "Reviews, guarantees, FAQs, and a simple final action remove hesitation and route the enquiry into the right workflow.",
  },
];

const outcomes = [
  {
    icon: "01",
    title: "A pipeline you can predict",
    copy: "Booked jobs arriving on a schedule, not a prayer. You can finally plan, hire, and grow with confidence.",
  },
  {
    icon: "02",
    title: "The name people trust first",
    copy: "When someone in your area needs your trade, yours is the name they already know and the one they call before anyone else.",
  },
  {
    icon: "03",
    title: "Proof that lets you charge more",
    copy: "When the evidence speaks for you, you stop competing on price. You win the job and the margin before the first call.",
  },
  {
    icon: "04",
    title: "Stay in the work you love",
    copy: "We run the entire distribution engine. You keep doing what you're great at, while the pipeline fills itself.",
  },
  {
    icon: "05",
    title: "A channel you actually own",
    copy: "No more hostage to referrals or shared leads. A demand system that belongs to your brand and compounds over time.",
  },
  {
    icon: "06",
    title: "A system, working without you",
    copy: "Proof captured from your daily jobs, turned into content, ads, and conversions on autopilot, consistently.",
  },
];

const testimonials = [
  {
    quote:
      "For years I relied on word-of-mouth and prayed. Now I've got a steady stream of the exact jobs I want coming in every week. It changed how I run the business.",
    name: "Damp & Waterproofing",
    role: "Cape Town",
    initials: "DM",
  },
  {
    quote:
      "I'd been burned by two agencies. This was different. It actually felt like a system built for a trade, not a marketing campaign. The proof angle is what sold my customers for me.",
    name: "Roofing Contractor",
    role: "Owner-operator",
    initials: "RJ",
  },
  {
    quote:
      "They didn't touch how I do the work. They took the proof of it to market. Within months I was the name people in my area recognised. I can charge what I'm worth now.",
    name: "Kitchen Renovations",
    role: "Owner-operator",
    initials: "SP",
  },
];

const faqs = [
  {
    q: "Aren't you just another marketing agency?",
    a: "No. An agency sells you activity: posts, ads, impressions. We're a distribution partner. We sit in the distribution stage of your business and take your proven service to market through a fixed system. The measure isn't reach or likes. It's booked jobs.",
  },
  {
    q: "Will this actually work for my trade?",
    a: "The engine is built to be plug-and-play across trades: plumbing, roofing, electrical, flooring, renovations, landscaping and more. The systems stay the same; we skin them to your niche, your proof, and your offer.",
  },
  {
    q: "How fast will I see results?",
    a: "We start most partnerships with a 14-day Proof Sprint. It is a focused validation that proves there's demand for your offer in your market, and at what cost, before committing to the full engine.",
  },
  {
    q: "Do I need to be on camera or create content myself?",
    a: "No. Our content engine is built around faceless, proof-led formats. The work itself is the star. You photograph jobs to a simple standard, and we turn that raw proof into ads, content and conversions.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the engagement tier and your goals, from a one-off Proof Sprint to a full Authority Brand partnership. The honest answer comes after a short strategy call where we understand your market and what you're aiming for.",
  },
  {
    q: "What do you need from me to start?",
    a: "Three things: a service you're genuinely proud of, a willingness to capture proof of your jobs, and the decision to let a system run. You bring the craft; we bring the reach.",
  },
];

const offers = [
  {
    tier: "Entry · Validate",
    name: "Proof Sprint",
    description: "A 14-day demand test. Prove the market wants your offer before you commit to the full engine.",
    points: [
      "One ad system, deployed to your niche",
      "Minimum-viable proof profile",
      "Clear go / no-go read on demand",
      "The fastest honest signal, no lock-in",
    ],
    cta: "Start a Sprint",
    href: "/sprint",
    featured: false,
  },
  {
    tier: "Core · Grow",
    name: "Proof Brand",
    description: "The full four-system engine on retainer. Proof, ads, stories and a CLOSER site running as one.",
    points: [
      "All four systems, working together",
      "Ongoing proof capture & content engine",
      "Continuous campaigns & conversion site",
      "A predictable, owned pipeline",
    ],
    cta: "Build my engine",
    href: "/brand",
    featured: true,
  },
  {
    tier: "Premium · Dominate",
    name: "Authority Brand",
    description: "Compounding category dominance. Always-on, with a proof moat competitors can't replicate.",
    points: [
      "Always-on saturation across your market",
      "A deepening, unbeatable proof moat",
      "You become the default local choice",
      "The full weight of the engine, compounding",
    ],
    cta: "Own my category",
    href: "/authority",
    featured: false,
  },
];

const offerPages: OfferPageData[] = [
  {
    slug: "sprint",
    eyebrow: "Start here",
    sectionNumber: "02",
    badge: "Offer 01 / 03",
    offerNumber: "Proof Sprint",
    name: "Proof Sprint",
    headline: "See it work before you commit a cent of risk.",
    intro:
      "A 14-day proof-of-concept for the owner who wants evidence, not promises. We set up the engine, ship your first proof, launch your first campaign, and land your first qualified leads.",
    items: [
      { label: "Proof-capture system set up on your business", value: "R4,000" },
      { label: "Your first 10-12 faceless reels, produced", value: "R6,000" },
      { label: "Meta campaign built & launched in your suburbs", value: "R6,000" },
      { label: "Your personalised Missed Jobs Report", value: "R4,000" },
      { label: "14 days fully managed + your first qualified leads", value: "R5,000" },
    ],
    totalLabel: "Total value",
    totalValue: "R25,000",
    priceLabel: "Your investment · once-off",
    price: "R7,500",
    priceNote: "≈ $500 · 14 days",
    guaranteeTitle: "Zero-risk guarantee",
    guaranteeText: "Proof shipped, campaigns live and your first leads in 14 days, or you don't pay for the Sprint.",
    irresistible:
      'R25,000 of setup, live proof and an MJR, with the risk reversed to zero, for R7,500. The only real question ("does this work for my business?") gets answered by saying yes.',
    adBudget:
      "You cover a small managed test ad budget from ~R2,500, kept separate so the R7,500 stays a clean service fee.",
  },
  {
    slug: "brand",
    eyebrow: "Most popular",
    sectionNumber: "03",
    badge: "Offer 02 / 03",
    offerNumber: "Proof Brand",
    name: "Proof Brand",
    headline: "The engine that keeps the right jobs coming, every month.",
    intro:
      "The monthly distribution engine, and where most clients live. Consistent proof, content and campaigns that keep qualified jobs landing without you finding the time.",
    items: [
      { label: "~25 faceless reels per month, produced for you", value: "R15,000" },
      { label: "Meta ad campaigns, built & optimised by certified hands", value: "R19,500" },
      { label: "Proof-capture app + the three-tap workflow", value: "R3,500" },
      { label: "Monthly Missed Jobs Report refresh", value: "R5,000" },
      { label: "Leads routed to your inbox + client portal", value: "R4,000" },
      { label: "Weekly review & reporting + quarterly strategy + reactivation campaign", value: "R13,000" },
    ],
    totalLabel: "Total value / month",
    totalValue: "R60,000",
    priceLabel: "Your investment · monthly",
    price: "R32,500 / mo",
    priceNote: "≈ $2,000 / mo · month-to-month, no lock-in",
    guaranteeTitle: "~46% under à la carte",
    guaranteeText: "One integrated system instead of five vendors, and it pays for itself at ~2 recovered jobs a month.",
    irresistible:
      "The same outcome a five-vendor stack delivers, for roughly half the assembled cost, run as one engine with no contract trapping you. You stay because it works.",
    adBudget: "Recommended ad budget ~R8,000-15,000/mo, yours, billed separately or paid to Meta directly.",
  },
  {
    slug: "authority",
    eyebrow: "Scale · by application",
    sectionNumber: "04",
    badge: "Offer 03 / 03",
    offerNumber: "Authority Brand",
    name: "Authority Brand",
    headline: "Own your category in your city.",
    intro:
      "For the business ready to be the name. Everything in Proof Brand, scaled across channels and proof volume, with the one thing money can't usually buy: your competitors locked out of your area.",
    items: [
      { label: "~45+ faceless reels per month, across formats", value: "R26,000" },
      { label: "Multi-channel ads: Meta + Google / YouTube", value: "R40,000" },
      { label: "Proof app, monthly MJR, lead routing, portal & brand", value: "R17,500" },
      { label: "Priority account management & advanced strategy", value: "R26,000" },
      { label: "Category exclusivity: we won't market a rival in your area", value: "Priceless" },
    ],
    totalLabel: "Tangible value / month",
    totalValue: "R109,500 + exclusivity",
    priceLabel: "Your investment · monthly",
    price: "R115,000 / mo",
    priceNote: "≈ $7,000 / mo · one client per category, per metro",
    guaranteeTitle: "Exclusivity included",
    guaranteeText:
      "No competitor can buy the same engine in your suburbs. That moat is the reason to move now.",
    irresistible:
      "For a market leader, knowing no rival can run this engine in your area is worth more than the fee itself. You're not buying reach. You're buying the category.",
    adBudget:
      "Recommended ad budget from ~R25,000/mo across channels, yours, billed separately. Limited availability per area.",
  },
];

const compareRows = [
  ["Faceless reels", "10-12", "~25/mo", "~45+/mo"],
  ["Meta ad campaigns", "✓", "✓", "✓"],
  ["Multi-channel (Google / YouTube)", "-", "-", "✓"],
  ["Proof-capture app", "✓", "✓", "✓"],
  ["Missed Jobs Report", "Once", "Monthly", "Monthly"],
  ["Lead routing + client portal", "✓", "✓", "✓"],
  ["Weekly review & reporting", "-", "✓", "✓"],
  ["Quarterly strategy session", "-", "✓", "✓"],
  ["Priority account management", "-", "-", "✓"],
  ["Category exclusivity", "-", "-", "✓"],
  ["14-day guarantee", "✓", "-", "-"],
  ["Commitment", "14 days", "Month-to-month", "Application"],
  ["Investment", "R7,500", "R32,500/mo", "R115,000/mo"],
];

const mjrInsights = [
  "Where high-intent clients search, compare, and choose someone else.",
  "Which local competitors are capturing the demand you should be winning.",
  "What your Google reviews, service-area visibility, and proof assets signal to buyers.",
  "The fastest fixes to stop missed jobs from leaking out of your pipeline.",
];

function Logo() {
  return (
    <a href="/#top" className="logo" aria-label="Attract Acquisition home">
      <span className="dot" />
      Attract&nbsp;Acquisition
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Logo />
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.hideMobile ? "hide-m" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
          >
            Book a strategy call <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rv in ${className}`}>{children}</div>;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function CursorTracker() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cursor || !ring || !finePointer || reducedMotion) return undefined;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx - 16;
    let ry = my - 16;
    let raf = 0;

    document.documentElement.classList.add("custom-cursor-enabled");

    const onMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      cursor.style.opacity = "1";
      ring.style.opacity = "1";
      cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const animate = () => {
      rx += (mx - rx - 16) * 0.12;
      ry += (my - ry - 16) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(animate);
    };

    const hoverTargets = Array.from(
      document.querySelectorAll("a, button, input, select, textarea, [role='button']"),
    );
    const enter = () => ring.classList.add("hovered");
    const leave = () => ring.classList.remove("hovered");

    document.addEventListener("mousemove", onMove);
    hoverTargets.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      hoverTargets.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
      cancelAnimationFrame(raf);
      ring.classList.remove("hovered");
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [pathname]);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Header />
      <main id="top">
        <header className="hero">
          <div className="aurora">
            <div className="blob b1" />
            <div className="blob b2" />
            <div className="blob b3" />
          </div>
          <div className="hero-grid" />
          <div className="wrap">
            <div className="hero-content">
              <span className="eyebrow">
                <span className="d" />
                Distribution partner for owner-operated trade businesses
              </span>
              <h1 className="hero-h">
                Make your trade business the <span className="o">obvious choice.</span>
              </h1>
              <p className="hero-sub">
                You already do the best work in your market. We make sure everyone knows it, turning{" "}
                <b>proof of your work</b> into a predictable pipeline of booked jobs. Not marketing. <b>Distribution.</b>
              </p>
              <div className="hero-cta">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  Book a free strategy call <ArrowRight size={17} />
                </a>
                <a href="#engine" className="btn btn-ghost btn-lg">
                  See how it works
                </a>
                <Link to="/mjr" className="btn btn-ghost btn-lg">
                  Get the free MJR
                </Link>
              </div>
              <div className="hero-trust">
                <div className="ht">
                  <Check size={16} /> Built for trades, not generic SMBs
                </div>
                <div className="ht">
                  <Check size={16} /> <b>Proof-led</b> results, not impressions
                </div>
                <div className="ht">
                  <Check size={16} /> A system, not a retainer of guesswork
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="statband">
          <div className="wrap">
            <div className="stats">
              {stats.map((stat) => (
                <div className="stat rv in" key={stat.label}>
                  <div className="n">{stat.value}</div>
                  <div className="l">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section id="problem">
          <div className="wrap">
            <Reveal>
              <div className="seclabel">The problem</div>
              <h2>
                Great at the <span className="thin">work.</span>
                <br />
                Invisible in the <span className="o">market.</span>
              </h2>
              <p className="sec-intro">
                Most owner-operated trade businesses don't have a quality problem. They have a <b>distribution problem</b>.
                The work is excellent. The reach isn't. Sound familiar?
              </p>
            </Reveal>
            <div className="paincards">
              {pains.map((pain) => (
                <article className="pain rv in" key={pain.title}>
                  <div className="pi">{pain.icon}</div>
                  <div>
                    <h4>{pain.title}</h4>
                    <p>{pain.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why">
          <div className="wrap">
            <Reveal>
              <div className="seclabel">Why the usual fixes fail</div>
              <h2>
                You don't need more <span className="thin">marketing.</span>
                <br />
                You need <span className="o">distribution.</span>
              </h2>
              <p className="sec-intro">
                Everything you've tried fails for the same reason: it tries to be clever instead of doing the one thing
                that compounds, putting <b>proof of your work in front of your market, at volume, consistently.</b>
              </p>
            </Reveal>
            <div className="vsgrid">
              <div className="vscol old rv in">
                <div className="vh">The usual playbook</div>
                <div className="vt">Marketing as a slot machine</div>
                <ul>
                  <li>Agencies sell impressions, reach and brand awareness, vanity metrics that never become booked jobs.</li>
                  <li>Lead-gen companies sell you the same shared lead they sold to five of your competitors.</li>
                  <li>Boosting posts is a gamble you re-roll every week with no system underneath it.</li>
                  <li>DIY means it gets done last, inconsistently, when you're already exhausted from the job.</li>
                </ul>
              </div>
              <div className="vscol new rv in">
                <div className="vh">The Attract Acquisition way</div>
                <div className="vt">Distribution as a system</div>
                <ul>
                  <li>
                    We sit in the <b>distribution stage</b> of your business, taking a proven service to market.
                  </li>
                  <li>
                    We lead with <b>proof of your actual work</b>, so demand is earned, not rented.
                  </li>
                  <li>
                    A pre-built <b>system of four engines</b>, selected and skinned for your trade.
                  </li>
                  <li>
                    It runs <b>consistently</b>, without you, so the pipeline compounds while you stay in the work.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="engine">
          <div className="wrap">
            <div className="center-head rv in">
              <div className="seclabel center">How it works</div>
              <h2>
                The Attraction <span className="o">Engine</span>
              </h2>
              <p className="sec-intro">
                Proof that you deliver, at the volume that makes you unignorable, with the consistency that compounds,
                until you're not competing on price. You're the brand people already trust.
              </p>
            </div>

            <div className="engine rv in">
              <div className="etag">The formula behind the pipeline</div>
              <div className="eq">
                {["Proof", "Volume", "Consistency"].map((term, index) => (
                  <div className="eq-fragment" key={term}>
                    <div className="term">
                      <span className="tw">{term}</span>
                      <span className="td">
                        {index === 0 ? "you deliver" : index === 1 ? "unignorable" : "compounding"}
                      </span>
                    </div>
                    <span className="op">{index < 2 ? "x" : "="}</span>
                  </div>
                ))}
                <div className="term res">
                  <span className="tw">Brand</span>
                  <span className="td">the obvious choice</span>
                </div>
              </div>
              <p className="ed">
                Most businesses have one of the three. The ones that dominate their market have all three working
                together. That's what the engine builds.
              </p>
            </div>

            <div className="center-head rv in subhead-block">
              <div className="seclabel center">The four systems</div>
              <h2>
                One engine. <span className="thin">Four systems.</span>
              </h2>
              <p className="sec-intro">
                Each system does one job in the journey from stranger to booked job. Pre-built, plug-and-play, and tuned
                to your trade.
              </p>
            </div>
            <div className="syscards">
              {systems.map((system, index) => (
                <article
                  className="sys rv in"
                  style={{ "--c": system.colorVar, "--cg": system.glow } as CSSProperties}
                  key={system.number}
                >
                  <div className="snum">System {system.number}</div>
                  <div className="sname">{system.name}</div>
                  <div className="srole">{system.role}</div>
                  <p>{system.description}</p>
                  <Link to={`/${enginePages[index + 1].slug}`} className="sys-link">
                    Explore system <ArrowRight size={15} />
                  </Link>
                  <span className="stage">{system.number}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="outcome">
          <div className="wrap">
            <Reveal>
              <div className="seclabel">What changes for you</div>
              <h2>
                Picture the business <span className="o">12 months</span> from now.
              </h2>
              <p className="sec-intro">
                Not more followers. A fundamentally different position in your market, where the work comes to you and
                you set the terms.
              </p>
            </Reveal>
            <div className="outgrid">
              {outcomes.map((outcome) => (
                <article className="out rv in" key={outcome.title}>
                  <div className="oi">{outcome.icon}</div>
                  <h4>{outcome.title}</h4>
                  <p>{outcome.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="proof">
          <div className="wrap">
            <div className="center-head rv in">
              <div className="seclabel center">Proof, not promises</div>
              <h2>
                What owners <span className="o">say.</span>
              </h2>
              <p className="sec-intro">
                We hold ourselves to the same standard we build for you: let the proof do the talking.
              </p>
            </div>
            <div className="testgrid">
              {testimonials.map((test) => (
                <article className="test rv in" key={test.initials}>
                  <div className="stars">★★★★★</div>
                  <div className="quote">"{test.quote}"</div>
                  <div className="who">
                    <div className="av">{test.initials}</div>
                    <div>
                      <div className="wn">{test.name}</div>
                      <div className="wr">{test.role}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq">
          <div className="wrap">
            <div className="center-head rv in">
              <div className="seclabel center">Questions, answered</div>
              <h2>
                The things you're <span className="o">wondering.</span>
              </h2>
            </div>
            <div className="faq rv in">
              {faqs.map((faq, index) => (
                <div className={`qa ${openFaq === index ? "open" : ""}`} key={faq.q}>
                  <button className="q" type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    <span className="qt">{faq.q}</span>
                    <span className="qi">+</span>
                  </button>
                  <div className="a">
                    <div className="ai">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="offers">
          <div className="wrap">
            <div className="center-head rv in">
              <div className="seclabel center">Ways to work together</div>
              <h2>
                Start small. <span className="o">Scale to dominance.</span>
              </h2>
              <p className="sec-intro">
                Three engagements, one engine. Begin by validating demand, grow into the full system, and ultimately own
                your category.
              </p>
            </div>
            <div className="offers">
              {offers.map((offer) => (
                <article className={`offer rv in ${offer.featured ? "feat" : ""}`} key={offer.name}>
                  {offer.featured ? <div className="obadge">Most popular</div> : null}
                  <div className="otier">{offer.tier}</div>
                  <div className="oname">{offer.name}</div>
                  <div className="odesc">{offer.description}</div>
                  <div className="oline" />
                  <ul>
                    {offer.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <Link to={offer.href} className={`btn ${offer.featured ? "btn-primary" : "btn-ghost"}`}>
                    {offer.cta} {offer.featured ? <ArrowRight size={16} /> : null}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="book">
          <div className="wrap">
            <div className="finalcta rv in">
              <div className="fk">The next step</div>
              <h2>
                Let's make you the <span className="o">obvious choice.</span>
              </h2>
              <p>
                Book a free, no-pressure strategy call. We'll look at your market, your proof, and exactly how the engine
                would work for your trade.
              </p>
              <div className="fcta">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  Book your free strategy call <ArrowRight size={17} />
                </a>
              </div>
              <div className="nextsteps">
                <div className="nextstep">
                  <span className="ns-n">1</span>A short strategy call
                </div>
                <span className="ar">→</span>
                <div className="nextstep">
                  <span className="ns-n">2</span>A plan built for your trade
                </div>
                <span className="ar">→</span>
                <div className="nextstep">
                  <span className="ns-n">3</span>We launch your engine
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function MjrPage() {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [reviews, setReviews] = useState("");
  const [contactMode, setContactMode] = useState<ContactMode>("whatsapp");
  const [contactValue, setContactValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!supabase) {
      setError("The report form is not connected yet. Please try again shortly.");
      return;
    }

    setLoading(true);
    const { error: submitError } = await supabase.from("audit_claims").insert([
      {
        business_name: businessName,
        location,
        google_reviews: reviews,
        contact_method: contactMode,
        contact_info: contactValue,
        status: "pending",
      },
    ]);
    setLoading(false);

    if (submitError) {
      setError("Something went wrong. Please check your details and try again.");
      return;
    }

    navigate("/mjr-confirmation", { state: { contactMode } });
  };

  return (
    <>
      <Header />
      <main className="mjr-page">
        <section className="mjr-hero">
          <div className="aurora">
            <div className="blob b1" />
            <div className="blob b2" />
          </div>
          <div className="wrap mjr-grid">
            <div className="mjr-copy">
              <span className="eyebrow">
                <span className="d" />
                Free report · no obligation
              </span>
              <h1 className="hero-h">
                Claim your free <span className="o">Missed Jobs Report.</span>
              </h1>
              <p className="hero-sub">
                We analyse your business and local market to show where clients are slipping through the cracks: people
                who searched, compared, found someone else, and paid them instead.
              </p>
              <div className="mjr-proof-row">
                <div>
                  <strong>24 hrs</strong>
                  <span>delivery window</span>
                </div>
                <div>
                  <strong>R0</strong>
                  <span>cost to claim</span>
                </div>
                <div>
                  <strong>Local</strong>
                  <span>market data</span>
                </div>
              </div>
              <div className="mjr-panel">
                <div className="mjr-panel-label">What the report shows</div>
                <ul>
                  {mjrInsights.map((insight) => (
                    <li key={insight}>
                      <Check size={16} />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <form className="mjr-form" onSubmit={handleSubmit}>
              <span className="form-eyebrow">Step 1 of 1 · 30 seconds</span>
              <h2>Get your free report</h2>
              <p>Submit your details and we will send your personalised Missed Jobs Report within 24 hours.</p>

              <label>
                Business Name
                <input
                  type="text"
                  placeholder="e.g. Cape Cuts Pet Grooming"
                  value={businessName}
                  onChange={(event) => setBusinessName(event.target.value)}
                  required
                />
              </label>

              <label>
                Location / Area Served
                <input
                  type="text"
                  placeholder="e.g. Claremont, Cape Town"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                />
              </label>

              <label>
                Google Reviews
                <select value={reviews} onChange={(event) => setReviews(event.target.value)} required>
                  <option value="">How many Google reviews?</option>
                  <option value="0">0</option>
                  <option value="1-10">1-10</option>
                  <option value="11-30">11-30</option>
                  <option value="31-60">31-60</option>
                  <option value="61+">61+</option>
                </select>
              </label>

              <div className="mjr-contact">
                <span>Preferred Contact</span>
                <div className="contact-toggle">
                  <button
                    type="button"
                    className={contactMode === "whatsapp" ? "active" : ""}
                    onClick={() => setContactMode("whatsapp")}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    className={contactMode === "email" ? "active" : ""}
                    onClick={() => setContactMode("email")}
                  >
                    Email
                  </button>
                </div>
              </div>

              <label>
                {contactMode === "whatsapp" ? "WhatsApp Number" : "Email Address"}
                <input
                  type={contactMode === "whatsapp" ? "tel" : "email"}
                  placeholder={contactMode === "whatsapp" ? "+27 81 234 5678" : "you@example.com"}
                  value={contactValue}
                  onChange={(event) => setContactValue(event.target.value)}
                  required
                />
              </label>

              {error ? <div className="form-error">{error}</div> : null}

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? "Preparing your report..." : "Send me my free report"} <ArrowRight size={17} />
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function MjrConfirmationPage() {
  return (
    <>
      <Header />
      <main className="plain-page confirmation-page">
        <div className="wrap">
          <div className="confirmation-card">
            <div className="check-ring">✓</div>
            <div className="seclabel center">Report in progress</div>
            <h1>
              Your report is <span className="o">on its way.</span>
            </h1>
            <p>
              We received your business details. Your personalised Missed Jobs Report will be delivered within 24 hours,
              with most reports completed sooner during quieter periods.
            </p>
            <div className="timeline">
              <div>
                <strong>1</strong>
                <span>Details received</span>
              </div>
              <div>
                <strong>2</strong>
                <span>Local market checked</span>
              </div>
              <div>
                <strong>3</strong>
                <span>Report delivered</span>
              </div>
            </div>
            <Link className="btn btn-primary" to="/">
              Back home <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function OfferPage({ offer }: { offer: OfferPageData }) {
  return (
    <>
      <Header />
      <main className="offer-page">
        <header className="offer-hero">
          <div className="aurora">
            <div className="blob b1" />
            <div className="blob b2" />
          </div>
          <div className="wrap">
            <div className="offer-kicker">Attract Acquisition · Pricing & Offers · 2026</div>
            <div className="offer-hero-grid">
              <div>
                <span className="eyebrow">
                  <span className="d" />
                  Distribution partner · Cape Town trade & service
                </span>
                <h1 className="hero-h">
                  Pricing <span className="o">& Offers.</span>
                </h1>
                <p className="hero-sub">
                  Three ways to turn your proof into booked jobs, built, run, and guaranteed by your distribution
                  partner.
                </p>
              </div>
              <div className="offer-engine-card">
                <div className="etag">The Attraction Engine</div>
                <div className="mini-equation">
                  <span>Proof</span>
                  <b>×</b>
                  <span>Volume</span>
                  <b>×</b>
                  <span>Consistency</span>
                  <b>=</b>
                  <span>Brand</span>
                </div>
                <p>Attract Acquisition (Pty) Ltd · attractacq.com</p>
              </div>
            </div>
          </div>
        </header>

        <section className="offer-context">
          <div className="wrap">
            <div className="offer-context-grid">
              <div>
                <div className="seclabel">What you're really buying</div>
                <h2>
                  Not posts. Not brand awareness. <span className="o">Booked jobs.</span>
                </h2>
                <p className="sec-intro">
                  Every package below is priced against one thing: the work it puts back in your diary. Your Missed Jobs
                  Report already shows the gap, the jobs slipping to more-visible competitors every month. These offers
                  close it.
                </p>
              </div>
              <div className="payback-card">
                <strong>Proof Brand pays for itself at ~2 recovered jobs a month.</strong>
                <p>
                  At a R18,500 average job, two extra wins a month covers the fee. Pool, roofing and renovation jobs run
                  far higher. The value is measured in booked work, not deliverables.
                </p>
              </div>
            </div>
            <div className="offer-stat-grid">
              <div>
                <span>Done for you</span>
                <strong>100%</strong>
                <p>Proof, content, and campaigns run end-to-end.</p>
              </div>
              <div>
                <span>Premium tier</span>
                <strong>Top 15%</strong>
                <p>Priced where proof-led distribution partners sit.</p>
              </div>
              <div>
                <span>Your category</span>
                <strong>1 only</strong>
                <p>One client per trade, per area.</p>
              </div>
            </div>
            <p className="price-note">
              Each figure is the management & production fee. Your advertising budget is separate, paid to Meta directly
              or billed as a pass-through, so your fee stays clean and your spend stays yours.
            </p>
          </div>
        </section>

        <section className="offer-detail">
          <div className="wrap offer-detail-grid">
            <aside className="offer-side">
              <span>{offer.sectionNumber}</span>
              <strong>{offer.eyebrow}</strong>
              <p>{offer.badge}</p>
            </aside>
            <article className="offer-main-card">
              {offer.slug === "brand" ? <div className="obadge">Most popular</div> : null}
              <div className="otier">{offer.badge}</div>
              <h2>{offer.name}</h2>
              <h3>"{offer.headline}"</h3>
              <p>{offer.intro}</p>
              <div className="value-stack">
                {offer.items.map((item) => (
                  <div className="value-row" key={item.label}>
                    <span>
                      <Check size={16} />
                      {item.label}
                    </span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              <div className="pricing-box">
                <div>
                  <span>{offer.totalLabel}</span>
                  <strong>{offer.totalValue}</strong>
                </div>
                <div>
                  <span>{offer.priceLabel}</span>
                  <strong>{offer.price}</strong>
                  <em>{offer.priceNote}</em>
                </div>
              </div>
              <div className="guarantee-box">
                <strong>{offer.guaranteeTitle}</strong>
                <p>{offer.guaranteeText}</p>
              </div>
              <div className="why-box">
                <strong>Why it's irresistible:</strong> {offer.irresistible}
              </div>
              <p className="ad-budget">{offer.adBudget}</p>
              <div className="offer-actions">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  Book your strategy call <ArrowRight size={17} />
                </a>
                <Link to="/mjr" className="btn btn-ghost btn-lg">
                  Get your free Missed Jobs Report
                </Link>
              </div>
            </article>
          </div>
        </section>

        <OfferCompare />
        <HowItRuns />
        <OfferFinalCta />
      </main>
      <Footer />
    </>
  );
}

function OfferCompare() {
  return (
    <section className="offer-compare">
      <div className="wrap">
        <div className="center-head">
          <div className="seclabel center">Side by side</div>
          <h2>
            Compare the <span className="o">three.</span>
          </h2>
        </div>
        <div className="compare-table">
          <div className="compare-head">
            <span>What's included</span>
            <span>Proof Sprint</span>
            <span>Proof Brand</span>
            <span>Authority</span>
          </div>
          {compareRows.map((row) => (
            <div className="compare-row-offer" key={row[0]}>
              {row.map((cell) => (
                <span key={cell}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
        <p className="price-note">
          Prices shown in ZAR. Advertising budget is separate on all tiers.
        </p>
      </div>
    </section>
  );
}

function HowItRuns() {
  return (
    <section className="how-runs">
      <div className="wrap">
        <div className="seclabel">How it runs</div>
        <h2>
          Three moving parts. <span className="o">None of them yours.</span>
        </h2>
        <div className="run-grid">
          <div>
            <strong>01</strong>
            <h3>You send proof</h3>
            <p>Finish a job, send the before/after in three taps. The only thing we need from you.</p>
          </div>
          <div>
            <strong>02</strong>
            <h3>We take it to market</h3>
            <p>We turn it into content and campaigns, in front of the right homeowners in your suburbs.</p>
          </div>
          <div>
            <strong>03</strong>
            <h3>Jobs come to you</h3>
            <p>Qualified enquiries land in your inbox. You quote the ones you want. The brand compounds.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferFinalCta() {
  return (
    <section>
      <div className="wrap">
        <div className="finalcta">
          <div className="fk">The next move</div>
          <h2>
            Be the first name <span className="o">they call.</span>
          </h2>
          <p>
            Book a short strategy call. We'll check whether your area is still open and show you exactly what the engine
            would do for your business.
          </p>
          <div className="fcta">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Book your strategy call <ArrowRight size={17} />
            </a>
            <Link to="/mjr" className="btn btn-ghost btn-lg">
              Get your free Missed Jobs Report
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnginePage({ page }: { page: EnginePageData }) {
  const relatedPages = enginePages.filter((item) => item.slug !== page.slug);

  return (
    <>
      <Header />
      <main className="engine-page">
        <header className="system-hero" style={{ "--system-accent": page.accent } as CSSProperties}>
          <div className="aurora">
            <div className="blob b1" />
            <div className="blob b2" />
          </div>
          <div className="wrap system-hero-grid">
            <div>
              <span className="eyebrow">
                <span className="d" />
                {page.eyebrow}
              </span>
              <h1 className="hero-h">
                {page.title.includes(" ") ? (
                  <>
                    {page.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="o">{page.title.split(" ").slice(-1)}</span>
                  </>
                ) : (
                  <span className="o">{page.title}</span>
                )}
              </h1>
              <p className="hero-sub">{page.summary}</p>
              <div className="hero-cta">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                  Book your strategy call <ArrowRight size={17} />
                </a>
                <Link to="/mjr" className="btn btn-ghost btn-lg">
                  Get the free MJR
                </Link>
              </div>
            </div>
            <div className="system-role-card">
              <div className="etag">Role in the engine</div>
              <strong>{page.role}</strong>
              <p>Built for proof-led distribution, not generic content management.</p>
            </div>
          </div>
        </header>

        <section>
          <div className="wrap system-grid">
            <div>
              <div className="seclabel">What it does</div>
              <h2>
                How this creates <span className="o">booked work.</span>
              </h2>
              <div className="system-detail-list">
                {page.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
            </div>
            <div className="system-outcomes">
              <div className="mjr-panel-label">Outcomes</div>
              <ul>
                {page.outcomes.map((outcome) => (
                  <li key={outcome}>
                    <Check size={16} />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {page.slug === "ad-system" ? (
          <section className="ad-client-section">
            <div className="wrap">
              <div className="center-head">
                <div className="seclabel center">Client-facing delivery</div>
                <h2>
                  Campaigns built to <span className="o">earn belief.</span>
                </h2>
                <p className="sec-intro">
                  The visible output is simple: your best proof shows up consistently in front of the right local
                  prospects, then follows up with the proof and next step they need to become a real enquiry.
                </p>
              </div>
              <div className="ad-client-grid">
                {adSystemClientSections.map((section) => (
                  <article className="ad-client-card" key={section.title}>
                    <h3>{section.title}</h3>
                    <p>{section.copy}</p>
                  </article>
                ))}
              </div>
              <div className="ad-flow">
                {adSystemFlow.map((item) => (
                  <div className="ad-flow-step" key={item.step}>
                    <strong>{item.step}</strong>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {page.slug === "proof-system" ? (
          <section className="proof-client-section">
            <div className="wrap">
              <div className="center-head">
                <div className="seclabel center">Client-facing delivery</div>
                <h2>
                  Proof that makes trust <span className="o">instant.</span>
                </h2>
                <p className="sec-intro">
                  The visible output is a credibility surface that supports every other part of the engine: ads land
                  better, stories feel more believable, and conversion pages have evidence to lean on.
                </p>
              </div>
              <div className="proof-client-grid">
                {proofSystemClientSections.map((section) => (
                  <article className="proof-client-card" key={section.title}>
                    <h3>{section.title}</h3>
                    <p>{section.copy}</p>
                  </article>
                ))}
              </div>
              <div className="proof-flow">
                {proofSystemFlow.map((item) => (
                  <div className="proof-flow-step" key={item.step}>
                    <strong>{item.step}</strong>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {page.slug === "story-system" ? (
          <section className="story-client-section">
            <div className="wrap">
              <div className="center-head">
                <div className="seclabel center">Client-facing delivery</div>
                <h2>
                  Warm audiences need <span className="o">direction.</span>
                </h2>
                <p className="sec-intro">
                  The visible output is a steady stream of story content that keeps your market engaged, handles the
                  reasons people hesitate, and guides interested viewers toward a single next step.
                </p>
              </div>
              <div className="story-client-grid">
                {storySystemClientSections.map((section) => (
                  <article className="story-client-card" key={section.title}>
                    <h3>{section.title}</h3>
                    <p>{section.copy}</p>
                  </article>
                ))}
              </div>
              <div className="story-flow">
                {storySystemFlow.map((item) => (
                  <div className="story-flow-step" key={item.step}>
                    <strong>{item.step}</strong>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {page.slug === "closer-system" ? (
          <section className="closer-client-section">
            <div className="wrap">
              <div className="center-head">
                <div className="seclabel center">Client-facing delivery</div>
                <h2>
                  Warm prospects need a <span className="o">clear close.</span>
                </h2>
                <p className="sec-intro">
                  The visible output is a focused conversion page that takes people who already believe the proof and
                  gives them a simple, low-friction path to become a real lead.
                </p>
              </div>
              <div className="closer-client-grid">
                {closerSystemClientSections.map((section) => (
                  <article className="closer-client-card" key={section.title}>
                    <h3>{section.title}</h3>
                    <p>{section.copy}</p>
                  </article>
                ))}
              </div>
              <div className="closer-flow">
                {closerSystemFlow.map((item) => (
                  <div className="closer-flow-step" key={item.step}>
                    <strong>{item.step}</strong>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="related-systems">
          <div className="wrap">
            <div className="center-head">
              <div className="seclabel center">The full system</div>
              <h2>
                Explore the <span className="o">engine.</span>
              </h2>
            </div>
            <div className="related-system-grid">
              {relatedPages.map((item) => (
                <Link
                  to={`/${item.slug}`}
                  className="related-system-card"
                  style={{ "--system-accent": item.accent } as CSSProperties}
                  key={item.slug}
                >
                  <span>{item.eyebrow}</span>
                  <strong>{item.title}</strong>
                  <p>{item.role}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <OfferFinalCta />
      </main>
      <Footer />
    </>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <>
      <Header />
      <main className="plain-page">
        <div className="wrap">
          <div className="seclabel">Attract Acquisition</div>
          <h1>{title}</h1>
          <p>This route is ready for the next content page in the React application.</p>
          <Link className="btn btn-primary" to="/">
            Back home <ArrowRight size={16} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div className="fbrand">
            <Logo />
            <p>
              The distribution partner for owner-operated trade and service businesses. We turn proof of your work into a
              predictable pipeline of booked jobs.
            </p>
          </div>
          <div className="fcols">
            <div className="fcol">
              <h5>The Engine</h5>
              <Link to="/engine">Attraction Engine</Link>
              <Link to="/ad-system">Ad System</Link>
              <Link to="/proof-system">Proof System</Link>
              <Link to="/story-system">Story System</Link>
              <Link to="/closer-system">CLOSER System</Link>
            </div>
            <div className="fcol">
              <h5>Engagements</h5>
              <Link to="/sprint">Proof Sprint</Link>
              <Link to="/brand">Proof Brand</Link>
              <Link to="/authority">Authority Brand</Link>
            </div>
            <div className="fcol">
              <h5>Lead Magnet</h5>
              <a href="/mjr">Missed Jobs Report</a>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a strategy call
              </a>
            </div>
            <div className="fcol">
              <h5>Company</h5>
              <a href="/#problem">The Problem</a>
              <a href="/#proof">Proof</a>
              <a href="/#faq">FAQ</a>
              <a href="/#offers">Engagements</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footbot">
        <span>© 2026 Attract Acquisition (Pty) Ltd · Cape Town</span>
        <span>Proof x Volume x Consistency = Brand</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <CursorTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mjr" element={<MjrPage />} />
        <Route path="/mjr-confirmation" element={<MjrConfirmationPage />} />
        <Route path="/sprint" element={<OfferPage offer={offerPages[0]} />} />
        <Route path="/brand" element={<OfferPage offer={offerPages[1]} />} />
        <Route path="/authority" element={<OfferPage offer={offerPages[2]} />} />
        <Route path="/the-engine" element={<EnginePage page={enginePages[0]} />} />
        <Route path="/engine" element={<EnginePage page={enginePages[0]} />} />
        <Route path="/ad-system" element={<EnginePage page={enginePages[1]} />} />
        <Route path="/proof-system" element={<EnginePage page={enginePages[2]} />} />
        <Route path="/story-system" element={<EnginePage page={enginePages[3]} />} />
        <Route path="/closer-system" element={<EnginePage page={enginePages[4]} />} />
        <Route path="/proof" element={<PlaceholderPage title="Proof" />} />
        <Route path="/engagements" element={<PlaceholderPage title="Engagements" />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Routes>
    </>
  );
}
