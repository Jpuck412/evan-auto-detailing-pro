'use client';

import { FormEvent, useState } from 'react';

const services = [
  { title: 'Signature Interior', kicker: 'RESET THE CABIN', price: 'From $149', text: 'Deep vacuum, steam treatment, surfaces, vents, glass, mats, stain work, and a crisp OEM-style finish.', icon: '✦' },
  { title: 'Exterior Revival', kicker: 'BRING BACK THE GLOSS', price: 'From $179', text: 'Foam wash, iron decon, wheel and tire detail, clay treatment, gloss enhancement, trim finish, and protection.', icon: '◈' },
  { title: 'Full Detail', kicker: 'THE COMPLETE RESET', price: 'From $279', text: 'Interior restoration plus full exterior decontamination and protection. Built for vehicles that need everything.', icon: '◆' },
  { title: 'Paint Enhancement', kicker: 'CUT • POLISH • REFINE', price: 'Custom quote', text: 'Machine polishing engineered to remove haze and light defects while dramatically increasing clarity and depth.', icon: '✧' },
  { title: 'Ceramic Protection', kicker: 'LONG-TERM DEFENSE', price: 'Custom quote', text: 'Premium ceramic protection with intensive prep for hydrophobic performance, chemical resistance, and deep gloss.', icon: '⬡' },
  { title: 'Maintenance Detail', kicker: 'KEEP IT DIALED', price: 'Members', text: 'Recurring care for existing clients who want their vehicle preserved at a consistently high standard.', icon: '↻' },
];

const process = [
  ['01', 'Inspect', 'We assess paint, interior condition, contamination, defects, and your priorities.'],
  ['02', 'Engineer', 'We match the service to the actual condition of the vehicle—not a generic checklist.'],
  ['03', 'Transform', 'Controlled products, proper lighting, disciplined tools, and obsessive finishing.'],
  ['04', 'Protect', 'We finish with the right protection and clear aftercare instructions.'],
];

const reviews = [
  ['“The paint looked deeper than the day I bought it.”', 'PAINT CORRECTION CLIENT'],
  ['“Every crack, vent and seam was clean. It felt brand new.”', 'FULL DETAIL CLIENT'],
  ['“Finally a detailer who cares about the finish, not just getting cars out the door.”', 'CERAMIC CLIENT'],
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [menu, setMenu] = useState(false);

  function submitQuote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <div className="noise" />
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Home">
          <span className="brand-mark">E</span>
          <span><b>EVAN'S</b><small>AUTO DETAILING</small></span>
        </a>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? '×' : '☰'}</button>
        <nav className={menu ? 'navlinks open' : 'navlinks'}>
          <a href="#services">Services</a><a href="#work">Work</a><a href="#process">Process</a><a href="#quote">Quote</a>
        </nav>
        <a className="nav-cta" href="#quote">BOOK / QUOTE <span>↗</span></a>
      </header>

      <section id="top" className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> DETAILING WITHOUT COMPROMISE</p>
          <h1>MAKE YOUR CAR<br/><em>LOOK EXPENSIVE.</em></h1>
          <p className="hero-sub">Precision interior restoration, gloss-driven exterior detailing, paint refinement and ceramic protection for people who notice the difference.</p>
          <div className="hero-actions"><a href="#quote" className="btn primary">GET A QUOTE <span>↗</span></a><a href="#services" className="btn ghost">EXPLORE SERVICES</a></div>
          <div className="trust-row"><div><b>DETAIL</b><span>Obsessive finish work</span></div><div><b>PROTECTION</b><span>Built to last</span></div><div><b>RESULTS</b><span>Designed to impress</span></div></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-one"/><div className="orb orb-two"/>
          <div className="stage"><div className="car-shadow"/><div className="car-card">
            <div className="shine"/><div className="car-roof"/><div className="car-glass"/><div className="car-body"/><div className="car-wheel left"/><div className="car-wheel right"/>
          </div></div>
          <div className="floating-tag tag-one"><small>PAINT</small><b>DEEP GLOSS</b></div>
          <div className="floating-tag tag-two"><small>FINISH</small><b>SHOWROOM</b></div>
          <div className="ring ring-a"/><div className="ring ring-b"/>
        </div>
        <div className="scroll">SCROLL TO EXPERIENCE <span>↓</span></div>
      </section>

      <section className="marquee"><div>INTERIOR DETAILING ✦ EXTERIOR DETAILING ✦ PAINT ENHANCEMENT ✦ CERAMIC PROTECTION ✦ MAINTENANCE CARE ✦</div></section>

      <section id="services" className="section shell">
        <div className="section-head"><div><p className="eyebrow"><span/> SERVICES</p><h2>CARE BUILT AROUND<br/><em>THE VEHICLE.</em></h2></div><p>From clean daily drivers to high-gloss weekend cars, every service is selected around condition, expectations, and the finish you want.</p></div>
        <div className="service-grid">{services.map((s,i)=><article className="service-card" key={s.title}><div className="card-top"><span className="service-num">0{i+1}</span><span className="service-icon">{s.icon}</span></div><small>{s.kicker}</small><h3>{s.title}</h3><p>{s.text}</p><div className="service-foot"><b>{s.price}</b><a href="#quote">QUOTE ↗</a></div></article>)}</div>
      </section>

      <section id="work" className="work-section">
        <div className="shell work-inner"><div className="work-copy"><p className="eyebrow light"><span/> THE STANDARD</p><h2>THE DIFFERENCE<br/>IS IN THE <em>FINISH.</em></h2><p>A great detail isn't just clean. It's uniform reflections, properly dressed trim, crisp glass, clean seams, untouched-looking materials, and zero sloppy residue.</p><ul><li>Paint-safe wash methods</li><li>Professional decontamination</li><li>Machine polishing when needed</li><li>Interior material-specific care</li><li>Protection matched to your goals</li></ul><a className="btn primary" href="#quote">TRANSFORM YOUR VEHICLE ↗</a></div>
          <div className="finish-display"><div className="panel back"/><div className="panel middle"/><div className="panel front"><div className="reflection"/><span>01</span><b>CLARITY</b><small>Clean reflections. Deep color. Controlled finish.</small></div></div>
        </div>
      </section>

      <section id="process" className="section shell"><div className="section-head"><div><p className="eyebrow"><span/> PROCESS</p><h2>ZERO GUESSWORK.<br/><em>EVERY STEP MATTERS.</em></h2></div></div><div className="process-grid">{process.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>

      <section className="proof shell"><div className="proof-statement"><p className="eyebrow"><span/> WHY EVAN'S</p><h2>NOT A CAR WASH.<br/>NOT A RUSH JOB.<br/><em>A FINISH SERVICE.</em></h2></div><div className="stats"><div><b>100%</b><span>FOCUS ON FINISH</span></div><div><b>1:1</b><span>VEHICLE ATTENTION</span></div><div><b>∞</b><span>DETAILS TO NOTICE</span></div></div></section>

      <section className="reviews shell"><p className="eyebrow"><span/> CLIENT EXPERIENCE</p><div className="review-grid">{reviews.map(([q,a])=><blockquote key={a}><div className="stars">★★★★★</div><p>{q}</p><cite>{a}</cite></blockquote>)}</div></section>

      <section id="quote" className="quote-section"><div className="shell quote-grid"><div><p className="eyebrow light"><span/> START HERE</p><h2>YOUR CAR.<br/><em>DONE RIGHT.</em></h2><p className="quote-intro">Tell us what you're driving and what you want improved. We'll recommend the right service instead of overselling the wrong one.</p><div className="quote-points"><span>✓ No-pressure recommendation</span><span>✓ Condition-based pricing</span><span>✓ Clear service expectations</span></div></div>
          {sent ? <div className="success"><span>✓</span><h3>REQUEST RECEIVED.</h3><p>This demo is ready for Evan's real email/phone connection. Add his contact destination before launch and the form becomes the live lead funnel.</p><button onClick={()=>setSent(false)}>SEND ANOTHER</button></div> : <form className="quote-form" onSubmit={submitQuote}><div className="field-row"><label>NAME<input required name="name" placeholder="Your name"/></label><label>PHONE<input required name="phone" placeholder="(555) 555-5555"/></label></div><div className="field-row"><label>VEHICLE<input required name="vehicle" placeholder="Year / Make / Model"/></label><label>SERVICE<select name="service" defaultValue=""><option value="" disabled>Select service</option>{services.map(s=><option key={s.title}>{s.title}</option>)}</select></label></div><label>WHAT DOES IT NEED?<textarea name="message" placeholder="Tell us about the condition, concerns, stains, paint defects, or the result you want." rows={5}/></label><button className="submit" type="submit">REQUEST MY QUOTE <span>↗</span></button><small>By submitting, you agree to be contacted about your quote request.</small></form>}
        </div></section>

      <footer><div className="shell footer-grid"><div className="brand footer-brand"><span className="brand-mark">E</span><span><b>EVAN'S</b><small>AUTO DETAILING</small></span></div><div><b>SERVICES</b><a href="#services">Interior</a><a href="#services">Exterior</a><a href="#services">Paint</a><a href="#services">Ceramic</a></div><div><b>EXPLORE</b><a href="#work">Our Standard</a><a href="#process">Process</a><a href="#quote">Get a Quote</a></div><div><b>CONTACT</b><span>Phone: Add Evan's number</span><span>Email: Add Evan's email</span><span>Location: Add shop city</span></div></div><div className="shell copyright"><span>© {new Date().getFullYear()} Evan's Auto Detailing</span><span>PRECISION • GLOSS • PROTECTION</span></div></footer>
    </main>
  );
}
