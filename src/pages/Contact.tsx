import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  message: string;
};

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

type Status = "SUCCESS" | "ERROR" | null;

export default function Contact() {
  const [status, setStatus] = useState<Status>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submittedData, setSubmittedData] = useState<FormData[]>([]);

  const validate = () => {
    const newErrors: Errors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
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
        setSubmittedData([...submittedData, formData]);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 600 }}>
        <h1 className="title has-text-centered">Contact Us</h1>
        {status === "SUCCESS" && (
          <div className="notification is-success has-text-centered">
            🎉 Message sent successfully! Refreshing...
          </div>
        )}
        {status === "ERROR" && (
          <div className="notification is-danger has-text-centered">
            ❌ Something went wrong. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className={`input ${errors.name ? 'is-danger' : ''}`}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && <p className="help is-danger">{errors.name}</p>}
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className={`input ${errors.email ? 'is-danger' : ''}`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="help is-danger">{errors.email}</p>}
          </div>

          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea
                className={`textarea ${errors.message ? 'is-danger' : ''}`}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            {errors.message && <p className="help is-danger">{errors.message}</p>}
          </div>

          <div className="field has-text-centered mt-4">
            <button className="button is-primary is-medium" type="submit">
              Send Message
            </button>
          </div>
        </form>

        {submittedData.length > 0 && (
          <div className="mt-5">
            <h2 className="subtitle">Submitted Data (Debug)</h2>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </section>
  );
}
