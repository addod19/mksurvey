import { useState } from 'react';
import BackButton from '../components/BackButton';

type FormData = {
  name: string;
  email: string;
  message: string;
  phone: string;
  project: string;
};

type Errors = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

type Status = "SUCCESS" | "ERROR" | null;

export default function Contact() {
  const [status, setStatus] = useState<Status>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    phone: '',
    project: '',
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        setFormData({ name: '', email: '', message: '', phone: '', project: '' });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    }
  };

  return (
    <div className="mk-marketing mk-contact-page">
      <section className="mk-hero mk-hero--contact">
        <div className="mk-container">
          <div className="mk-contact-hero">
            <div className="mk-contact-hero-text mk-reveal">
              <BackButton className="mk-back-btn" />
              <p className="mk-eyebrow">Contact MK Surveying</p>
              <h1 className="mk-hero-title">Let's map your next project</h1>
              <p className="mk-hero-sub">
                Share your site details and timeline. Our team will respond with
                a survey plan and next steps within 24 hours.
              </p>
              <div className="mk-contact-highlights">
                <div className="mk-contact-highlight">
                  <strong>Office</strong>
                  <span>Mampong, Akuapem, Ghana</span>
                </div>
                <div className="mk-contact-highlight">
                  <strong>Phone</strong>
                  <span>+233 24 252 5042</span>
                </div>
                <div className="mk-contact-highlight">
                  <strong>Email</strong>
                  <span>info@mksurveying.com</span>
                </div>
              </div>
            </div>

            <div className="mk-contact-card mk-reveal delay-1">
              {status === "SUCCESS" && (
                <div className="mk-alert mk-alert--success">
                  🎉 Message sent successfully! Refreshing...
                </div>
              )}
              {status === "ERROR" && (
                <div className="mk-alert mk-alert--error">
                  ❌ Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="mk-contact-form mk-contact-form--page" noValidate>
                <p className="mk-form-title">Send a message</p>
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
                    placeholder="Tell us about the site and timeline"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                  />
                  {errors.message && <p className="mk-field-error">{errors.message}</p>}
                </div>

                <div className="mk-form-actions">
                  <button className="mk-btn mk-btn-primary" type="submit">
                    Send request
                  </button>
                  <BackButton className="mk-btn mk-btn-outline" label="Back to previous" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
