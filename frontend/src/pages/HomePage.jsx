import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardList,
  Compass,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

const features = [
  {
    icon: ClipboardList,
    number: "01",
    title: "One clear place to report",
    description: "Capture the issue, its category, and the details campus teams need to act."
  },
  {
    icon: Compass,
    number: "02",
    title: "The right team, sooner",
    description: "Admins can assign reports to staff and keep ownership visible from the start."
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Progress you can follow",
    description: "Students and staff can see status changes without chasing updates."
  }
];

const HomePage = () => (
  <main className="landing-page">
    <header className="landing-nav">
      <Link to="/" className="brand-lockup" aria-label="Campus Care home">
        <span className="brand-mark"><Wrench size={18} /></span>
        <span>campus<span className="brand-dot">.</span>care</span>
      </Link>
      <nav className="landing-nav-links" aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a href="#built-for-campus">Built for campus</a>
      </nav>
      <div className="landing-nav-actions">
        <Link to="/login" className="nav-login">Sign in</Link>
        <Link to="/register" className="button button-dark button-small">
          Get started <ArrowUpRight size={16} />
        </Link>
      </div>
    </header>

    <section className="landing-hero">
      <div className="hero-copy">
        <div className="landing-kicker"><span /> A better way to care for campus</div>
        <h1>Small fixes.<br /><span>Better campus</span><br />days.</h1>
        <p className="hero-description">
          A shared place to report campus issues, get them to the right people, and follow every fix through.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="button button-blue">
            Report an issue <ArrowRight size={17} />
          </Link>
          <Link to="/login" className="button button-quiet">
            Sign in to your workspace
          </Link>
        </div>
        <div className="hero-note"><Check size={15} /> For students, staff, and campus teams</div>
      </div>

      <div className="hero-art" aria-label="Issue reports moving through a campus response workflow">
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="art-glow" />
        <div className="art-label"><span className="live-dot" /> Campus response, in motion</div>
        <div className="campus-building">
          <div className="building-roof" />
          <div className="building-front">
            <div className="building-sign">CAMPUS<br /><strong>CARE</strong></div>
            <div className="building-windows">
              <i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div className="building-door" />
          </div>
          <div className="building-base" />
        </div>
        <div className="floating-card report-card">
          <span className="mini-icon mini-blue"><ClipboardList size={16} /></span>
          <span><strong>Report intake</strong><small>Details captured in one place</small></span>
          <span className="mini-arrow"><ArrowUpRight size={15} /></span>
        </div>
        <div className="floating-card progress-card">
          <span className="progress-check"><Check size={14} /></span>
          <span><strong>Clear assignment</strong><small>The right team can take it from here</small></span>
        </div>
        <div className="art-caption"><Sparkles size={14} /> Clear ownership. Better follow-through.</div>
      </div>

      <a className="scroll-cue" href="#how-it-works" aria-label="Scroll to see how it works">
        <ArrowDown size={16} />
      </a>
    </section>

    <section className="landing-proof" id="built-for-campus">
      <p>MADE FOR THE PEOPLE WHO KEEP CAMPUS MOVING</p>
      <div className="proof-roles">
        <span><span className="proof-number">01</span> Students report</span>
        <span><span className="proof-number">02</span> Admins coordinate</span>
        <span><span className="proof-number">03</span> Staff resolve</span>
      </div>
    </section>

    <Reveal>
    <section className="feature-section" id="how-it-works">
      <div className="section-intro">
        <div className="landing-kicker"><span /> A calmer way to get things done</div>
        <h2>From “someone should fix this”<br /><span>to handled.</span></h2>
        <p>Every report gets a clear path forward, with the right information and people in the loop.</p>
      </div>
      <div className="feature-grid">
        {features.map(({ icon: Icon, number, title, description }, index) => (
          <article className="feature-card" key={number} style={{ "--card-index": index }}>
            <div className="feature-card-top"><span className="feature-icon"><Icon size={19} /></span><span>{number}</span></div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="feature-line" />
          </article>
        ))}
      </div>
    </section>
    </Reveal>

    <Reveal>
    <section className="landing-cta">
      <div>
        <div className="landing-kicker"><span /> Your campus, better connected</div>
        <h2>Make the next fix<br />a little easier.</h2>
      </div>
      <Link to="/register" className="button button-white">Create your account <ArrowRight size={17} /></Link>
    </section>
    </Reveal>

    <footer className="landing-footer">
      <Link to="/" className="brand-lockup"><span className="brand-mark"><Wrench size={16} /></span><span>campus<span className="brand-dot">.</span>care</span></Link>
      <span>A more thoughtful way to look after campus.</span>
      <Link to="/login">Sign in <ArrowRight size={14} /></Link>
    </footer>
  </main>
);

export default HomePage;
