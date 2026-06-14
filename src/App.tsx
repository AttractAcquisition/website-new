import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ArrowRight, Check, Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  hideMobile?: boolean;
};

type SystemCard = {
  number: string;
  name: string;
  role: string;
  description: string;
  colorVar: string;
  glow: string;
};

const navItems: NavItem[] = [
  { label: "The Problem", href: "/#problem", hideMobile: true },
  { label: "How It Works", href: "/#engine", hideMobile: true },
  { label: "Proof", href: "/#proof", hideMobile: true },
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
    featured: false,
  },
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
          <a href="/#book" className="btn btn-primary" onClick={() => setOpen(false)}>
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

function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);
  const systemStyle = useMemo(
    () => (card: SystemCard) => ({ "--c": card.colorVar, "--cg": card.glow }) as CSSProperties,
    [],
  );

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
                <a href="#book" className="btn btn-primary btn-lg">
                  Book a free strategy call <ArrowRight size={17} />
                </a>
                <a href="#engine" className="btn btn-ghost btn-lg">
                  See how it works
                </a>
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
                <div className="term">
                  <span className="tw">Proof</span>
                  <span className="td">you deliver</span>
                </div>
                <span className="op">x</span>
                <div className="term">
                  <span className="tw">Volume</span>
                  <span className="td">unignorable</span>
                </div>
                <span className="op">x</span>
                <div className="term">
                  <span className="tw">Consistency</span>
                  <span className="td">compounding</span>
                </div>
                <span className="op">=</span>
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
              {systems.map((system) => (
                <article className="sys rv in" style={systemStyle(system)} key={system.number}>
                  <div className="snum">System {system.number}</div>
                  <div className="sname">{system.name}</div>
                  <div className="srole">{system.role}</div>
                  <p>{system.description}</p>
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
              <p className="sec-intro">We hold ourselves to the same standard we build for you: let the proof do the talking.</p>
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
                  <a href="#book" className={`btn ${offer.featured ? "btn-primary" : "btn-ghost"}`}>
                    {offer.cta} {offer.featured ? <ArrowRight size={16} /> : null}
                  </a>
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
                <a href="mailto:hello@attractacq.com?subject=Strategy%20call" className="btn btn-primary btn-lg">
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
              <a href="/#engine">Attraction Engine</a>
              <a href="/#engine">Ad System</a>
              <a href="/#engine">Proof System</a>
              <a href="/#engine">Story System</a>
              <a href="/#engine">CLOSER System</a>
            </div>
            <div className="fcol">
              <h5>Engagements</h5>
              <a href="/#offers">Proof Sprint</a>
              <a href="/#offers">Proof Brand</a>
              <a href="/#offers">Authority Brand</a>
            </div>
            <div className="fcol">
              <h5>Company</h5>
              <a href="/#problem">The Problem</a>
              <a href="/#proof">Proof</a>
              <a href="/#faq">FAQ</a>
              <a href="/#book">Book a call</a>
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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/engine" element={<PlaceholderPage title="Engine" />} />
      <Route path="/proof" element={<PlaceholderPage title="Proof" />} />
      <Route path="/engagements" element={<PlaceholderPage title="Engagements" />} />
      <Route path="*" element={<PlaceholderPage title="Page not found" />} />
    </Routes>
  );
}
