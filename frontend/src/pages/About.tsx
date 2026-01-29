import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="mk-marketing">
      <section className="mk-hero mk-hero--about">
        <div className="mk-container">
          <div className="mk-hero-inner">
            <div className="mk-hero-text mk-reveal">
              <p className="mk-eyebrow">About MK Surveying and Construction</p>
              <h1 className="mk-hero-title">Built on accuracy, trusted by crews</h1>
              <p className="mk-hero-sub">
                Our teams operate at the intersection of field precision and
                construction delivery. We partner with builders, engineers, and
                landowners to keep projects clear, safe, and on track.
              </p>
              <div className="mk-hero-actions">
                <Link className="mk-btn mk-btn-primary" to="/contact">
                  Talk to our team
                </Link>
                <Link className="mk-btn mk-btn-outline" to="/">
                  Back to home
                </Link>
              </div>
            </div>

            <div className="mk-hero-panel mk-reveal delay-2">
              <div className="mk-hero-panel-inner">
                <p className="mk-panel-label">Our promise</p>
                <h3>Clear outputs, clear decisions</h3>
                <p>
                  Every deliverable is reviewed for accuracy, clarity, and
                  on-site usability so your teams can build with confidence.
                </p>
                <ul className="mk-checklist">
                  <li>Field verified data</li>
                  <li>Transparent reporting</li>
                  <li>Responsive site support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-container">
          <div className="mk-about-grid">
            <div className="mk-reveal">
              <p className="mk-eyebrow">Our story</p>
              <h2 className="mk-section-title">
                A focused team with regional reach
              </h2>
              <p>
                MK Surveying and Construction has grown through referrals and
                long-term partnerships. We support residential, commercial, and
                infrastructure projects with dependable field crews and modern
                surveying tools.
              </p>
              <div className="mk-stat-row">
                <div className="mk-stat">
                  <span>18</span>
                  <small>active field specialists</small>
                </div>
                <div className="mk-stat">
                  <span>6</span>
                  <small>regions served</small>
                </div>
                <div className="mk-stat">
                  <span>96%</span>
                  <small>repeat clients</small>
                </div>
              </div>
            </div>

            <div className="mk-about-card mk-reveal delay-1">
              <h3>Mission</h3>
              <p>
                Deliver precise surveying and construction support that keeps
                projects compliant, safe, and efficient from planning to
                handover.
              </p>
              <h3>Vision</h3>
              <p>
                To be the most reliable field partner for builders who demand
                clarity in every measurement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-container">
          <div className="mk-split mk-split--reverse">
            <div className="mk-split-left mk-reveal">
              <div className="mk-split-item">
                <span className="mk-split-number">01</span>
                <h3>Integrity</h3>
                <p>
                  We document every detail so clients always know what to
                  expect.
                </p>
              </div>
              <div className="mk-split-item">
                <span className="mk-split-number">02</span>
                <h3>Safety</h3>
                <p>
                  Our crews follow strict site protocols and clear reporting.
                </p>
              </div>
              <div className="mk-split-item">
                <span className="mk-split-number">03</span>
                <h3>Reliability</h3>
                <p>We keep timelines realistic and communication consistent.</p>
              </div>
            </div>

            <div className="mk-split-right mk-reveal delay-1">
              <p className="mk-eyebrow">How we work</p>
              <h2 className="mk-section-title">A process you can trust</h2>
              <p>
                From pre-site assessment to final documentation, our workflow
                is built on clear checkpoints. You get updates, site photos, and
                field notes that keep the project moving.
              </p>
              <div className="mk-timeline">
                <div className="mk-timeline-item">
                  <span>Site visit and assessment</span>
                  <small>We confirm scope, access, and required outputs.</small>
                </div>
                <div className="mk-timeline-item">
                  <span>Field data collection</span>
                  <small>Survey crews capture and verify key benchmarks.</small>
                </div>
                <div className="mk-timeline-item">
                  <span>Plans and reporting</span>
                  <small>We deliver plans, models, and compliance notes.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mk-section mk-services">
        <div className="mk-container">
          <div className="mk-section-head">
            <p className="mk-eyebrow">Watch us in action</p>
            <h2 className="mk-section-title">On-site precision</h2>
            <p>
              Our teams combine modern instruments with experienced judgment.
            </p>
          </div>
          <div className="mk-video">
            <iframe
              src="https://www.youtube.com/embed/KIfi5w3sYbY"
              title="MK Surveying and Construction"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="mk-section mk-values">
        <div className="mk-container">
          <div className="mk-section-head">
            <p className="mk-eyebrow">Why choose us</p>
            <h2 className="mk-section-title">Field partner advantages</h2>
            <p>
              We bring reliable crews, responsive updates, and clean
              documentation to every project.
            </p>
          </div>
          <div className="mk-values-grid">
            <article className="mk-value-card mk-reveal delay-1">
              <h3>Experienced teams</h3>
              <p>Dedicated crews with local and regional knowledge.</p>
            </article>
            <article className="mk-value-card mk-reveal delay-2">
              <h3>Fast turnaround</h3>
              <p>Efficient field capture and reporting when you need it.</p>
            </article>
            <article className="mk-value-card mk-reveal delay-3">
              <h3>Clear communication</h3>
              <p>Daily updates, progress photos, and structured reports.</p>
            </article>
            <article className="mk-value-card mk-reveal delay-1">
              <h3>Modern tools</h3>
              <p>GNSS, drones, and CAD integration for precise outputs.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mk-cta">
        <div className="mk-container">
          <div className="mk-cta-inner">
            <div>
              <p className="mk-eyebrow">Ready to start?</p>
              <h2>Let us map your next build</h2>
              <p>
                Talk to our team about your site, schedule, and deliverables.
              </p>
            </div>
            <Link className="mk-btn mk-btn-primary" to="/contact">
              Get a quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
