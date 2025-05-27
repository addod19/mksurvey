import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="section">
      <div className="container content">
        <h1 className="title has-text-centered">About MK Surveying & Construction</h1>

        <p>
          <strong>MK Surveying and Construction</strong> is a leading provider of land surveying and construction solutions across the region. With a team of experienced professionals, we are committed to delivering accurate, reliable, and timely services tailored to the unique needs of each client.
        </p>

        <h2 className="subtitle">Our Mission</h2>
        <p>
          To provide top-tier surveying and construction services with integrity, precision, and innovation — ensuring every project is built on a foundation of excellence.
        </p>

         <h2 className="subtitle">Watch Us In Action</h2>
        <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            src="https://www.youtube.com/embed/KIfi5w3sYbY"
            title="MK Surveying & Construction"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
          ></iframe>
        </div>


        <h2 className="subtitle">What We Do</h2>
        <ul>
          <li>✔️ Boundary and topographical land surveys</li>
          <li>✔️ Construction layout and staking</li>
          <li>✔️ Site development planning</li>
          <li>✔️ Project management and consultation</li>
        </ul>

        <h2 className="subtitle">Why Choose Us</h2>
        <p>
          With a reputation for professionalism and accuracy, MK Surveying and Construction is your trusted partner in building projects that last. Our attention to detail and dedication to client satisfaction set us apart in the industry.
        </p>

        <div className="has-text-centered mt-5">
          <Link to="/contact"
            className="button is-primary is-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}