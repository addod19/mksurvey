
export default function Footer() {
  return (
    <footer className="site-footer footer mt-6">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>MK Surveying & Construction</strong> © {new Date().getFullYear()} — All rights reserved.
          </p>
          <p>
            Connect with me on LinkedIn:{' '}
            <a
              href="https://www.linkedin.com/in/daniel-larbi-addo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="has-text-white">Daniel Larbi Addo</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
