import { useState } from "react";
import { Link } from "react-router-dom";

type FormData = {
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
};

type Errors = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

type Status = "SUCCESS" | "ERROR" | null;

export default function Home() {
  const [status, setStatus] = useState<Status>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    project: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.phone.trim().length < 10) newErrors.phone = 'Phone must be at least 10 characters';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;

    try {
      const res = await fetch("https://formspree.io/f/xrbqwobw", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus("SUCCESS");
        setFormData({ name: '', phone: '', email: '', project: '', message: '' });
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    }
  };

  return (
    <div className="mk-marketing">
      <section className="mk-hero">
        <div className="mk-container">
          <div className="mk-hero-inner">
            <div className="mk-hero-text mk-reveal">
              <p className="mk-eyebrow">MK Surveying and Construction</p>
              <h1 className="mk-hero-title">
                Producing surveys and construction plans of the highest quality
              </h1>
              <p className="mk-hero-sub">
                We combine modern equipment with seasoned field teams to deliver
                boundary surveys, topographic mapping, and site layouts that are
                trusted by builders and developers.
              </p>
              <div className="mk-hero-actions">
                <Link className="mk-btn mk-btn-primary" to="/contact">
                  Request a site visit
                </Link>
                <Link className="mk-btn mk-btn-outline" to="/about">
                  About MK
                </Link>
              </div>
              <div className="mk-metrics">
                <div className="mk-metric">
                  <span>20+</span>
                  <small>years of field experience</small>
                </div>
                <div className="mk-metric">
                  <span>500+</span>
                  <small>projects delivered</small>
                </div>
                <div className="mk-metric">
                  <span>24/7</span>
                  <small>client support</small>
                </div>
              </div>
            </div>

            <div className="mk-hero-panel mk-reveal delay-2">
              <div className="mk-hero-panel-inner">
                <p className="mk-panel-label">Today in field</p>
                <h3>Site layouts and elevation control</h3>
                <p>
                  We keep your crews aligned with clear benchmarks, staking
                  plans, and dependable on-site updates.
                </p>
                <ul className="mk-checklist">
                  <li>Boundary validation and re-establishment</li>
                  <li>Cut and fill volume calculations</li>
                  <li>Construction staking and as-built plans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-container">
          <div className="mk-split">
            <div className="mk-split-left mk-reveal">
              <div className="mk-split-item">
                <span className="mk-split-number">01</span>
                <h3>Surveying and mapping</h3>
                <p>
                  Boundary, topographic, and site surveys delivered with
                  dependable accuracy for design and legal compliance.
                </p>
              </div>
              <div className="mk-split-item">
                <span className="mk-split-number">02</span>
                <h3>Construction planning</h3>
                <p>
                  Layouts, staking, and elevation controls that keep projects
                  on schedule and on budget.
                </p>
              </div>
            </div>

            <div className="mk-split-right mk-reveal delay-1">
              <p className="mk-eyebrow">About us</p>
              <h2 className="mk-section-title">
                Grounded in precision, built for growth
              </h2>
              <p>
                MK Surveying and Construction is a trusted partner for
                developers, contractors, and landowners who need clear answers
                in complex terrain. We deliver field data, construction support,
                and actionable reporting that keeps every stakeholder aligned.
              </p>
              <div className="mk-photo-grid">
                <div className="mk-photo mk-photo-one" aria-hidden="true"></div>
                <div className="mk-photo mk-photo-two" aria-hidden="true"></div>
                <div className="mk-photo mk-photo-three" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mk-section mk-services">
        <div className="mk-container">
          <div className="mk-section-head">
            <p className="mk-eyebrow">Our services</p>
            <h2 className="mk-section-title">What we deliver</h2>
            <p>
              From pre-construction planning to site delivery, our services are
              tailored to keep projects moving.
            </p>
          </div>
          <div className="mk-service-grid">
            <article className="mk-service-card mk-reveal delay-1">
              <div className="mk-service-icon">LS</div>
              <h3>Land surveying</h3>
              <p>Boundary, cadastral, and topographic surveys for every stage.</p>
            </article>
            <article className="mk-service-card mk-reveal delay-2">
              <div className="mk-service-icon">CP</div>
              <h3>Construction planning</h3>
              <p>Site layout, elevation control, and staking for active builds.</p>
            </article>
            <article className="mk-service-card mk-reveal delay-3">
              <div className="mk-service-icon">DR</div>
              <h3>Drone mapping</h3>
              <p>Rapid 3D site capture and progress mapping for stakeholders.</p>
            </article>
            <article className="mk-service-card mk-reveal delay-1">
              <div className="mk-service-icon">ER</div>
              <h3>Equipment rentals</h3>
              <p>Survey instruments with setup, calibration, and support.</p>
            </article>
            <article className="mk-service-card mk-reveal delay-2">
              <div className="mk-service-icon">LT</div>
              <h3>Loader and tipper</h3>
              <p>On-demand earthworks, hauling, and material supply.</p>
            </article>
            <article className="mk-service-card mk-reveal delay-3">
              <div className="mk-service-icon">PM</div>
              <h3>Project coordination</h3>
              <p>Clear reporting, documentation, and client-ready deliverables.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mk-banner">
        <div className="mk-container">
          <p className="mk-eyebrow">Builders know our products</p>
          <h2 className="mk-banner-title">Survey outputs you can build on</h2>
          <p>
            Our field deliverables translate into clean linework, reliable
            contours, and construction-ready plans.
          </p>
        </div>
      </section>

      <section className="mk-section mk-products">
        <div className="mk-container">
          <div className="mk-section-head">
            <p className="mk-eyebrow">Our products</p>
            <h2 className="mk-section-title">Field data and materials</h2>
            <p>
              We provide detailed outputs alongside construction materials to
              keep sites active.
            </p>
          </div>
          <div className="mk-product-grid">
            <article className="mk-product-card mk-reveal delay-1">
              <div className="mk-product-media"></div>
              <h3>Topographic plans</h3>
              <p>Contour maps and digital terrain models for design teams.</p>
            </article>
            <article className="mk-product-card mk-reveal delay-2">
              <div className="mk-product-media"></div>
              <h3>Boundary reports</h3>
              <p>Certified boundary plans for legal and planning approvals.</p>
            </article>
            <article className="mk-product-card mk-reveal delay-3">
              <div className="mk-product-media"></div>
              <h3>As-built drawings</h3>
              <p>Verification surveys for completed structures and utilities.</p>
            </article>
            <article className="mk-product-card mk-reveal delay-1">
              <div className="mk-product-media"></div>
              <h3>Blocks and materials</h3>
              <p>Quality blocks, sand, and aggregates for active sites.</p>
            </article>
            <article className="mk-product-card mk-reveal delay-2">
              <div className="mk-product-media"></div>
              <h3>Stakeout packs</h3>
              <p>Coordinates, marking plans, and field notes for crews.</p>
            </article>
            <article className="mk-product-card mk-reveal delay-3">
              <div className="mk-product-media"></div>
              <h3>Site progress maps</h3>
              <p>Drone snapshots and weekly progress visuals.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mk-contact">
        <div className="mk-container mk-contact-grid">
          <div className="mk-contact-info mk-reveal">
            <p className="mk-eyebrow">Our contacts</p>
            <h2>Ready to plan your next site?</h2>
            <p>
              Reach out for site visits, quotations, and quick turnaround on
              urgent work.
            </p>
            <div className="mk-contact-details">
              <div>
                <strong>Address</strong>
                <span>Mampong, Akuapem, Ghana</span>
              </div>
              <div>
                <strong>Phone</strong>
                <span>+233 24 253 5042</span>
              </div>
              <div>
                <strong>Email</strong>
                <span>info@mksurveying.com</span>
              </div>
            </div>
          </div>

          <form className="mk-contact-form mk-reveal delay-2" onSubmit={handleSubmit} noValidate>
            <p className="mk-form-title">Contact form</p>
            {status === "SUCCESS" && (
              <div className="mk-alert mk-alert--success">
                Message sent successfully. We'll reply soon.
              </div>
            )}
            {status === "ERROR" && (
              <div className="mk-alert mk-alert--error">
                Something went wrong. Please try again.
              </div>
            )}
            <div className="mk-form-row">
              <div className="mk-field">
                <input
                  className={errors.name ? 'mk-input-error' : ''}
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="mk-field-error">{errors.name}</p>}
              </div>
              <div className="mk-field">
                <input
                  className={errors.phone ? 'mk-input-error' : ''}
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="mk-field-error">{errors.phone}</p>}
              </div>
            </div>
            <div className="mk-form-row">
              <div className="mk-field">
                <input
                  className={errors.email ? 'mk-input-error' : ''}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="mk-field-error">{errors.email}</p>}
              </div>
              <div className="mk-field">
                <input
                  type="text"
                  name="project"
                  placeholder="Project type"
                  value={formData.project}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mk-field">
              <textarea
                className={errors.message ? 'mk-input-error' : ''}
                name="message"
                rows={4}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <p className="mk-field-error">{errors.message}</p>}
            </div>
            <div className="mk-form-actions">
              <button type="submit" className="mk-btn mk-btn-dark">
                Send request
              </button>
              <Link to="/contact" className="mk-btn mk-btn-light">
                Full contact page
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
