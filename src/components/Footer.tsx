
export default function About() {
  return (
    <footer className="footer has-background-link mt-6">
      <div className="content has-text-centered">
        <p>
          <strong>
            MK Surveying & Construction
          </strong> © {new Date().getFullYear()} — All rights reserved.
        </p>
        <p>
          Connect with me on LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/daniel-larbi-addo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="has-text-white">Daniel Larbi Addo</p>
          </a>
        </p>
      </div>
    </footer>
  );
}
