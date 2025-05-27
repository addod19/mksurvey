export default function LandingPage() {
  return (
    <>
      <section className="hero is-primary is-fullheight">
        <div className="hero-body has-text-centered">
          <div className="container">
            <h1 className="title is-1">MK Surveying & Construction</h1>
            <h2 className="subtitle is-4">Reliable land surveying & construction planning solutions</h2>
            <a className="button is-light is-medium mt-4" href="#services">Explore Our Services</a>
          </div>
        </div>
      </section>
       <section className="section" id="services">
        <div className="container">
          <h2 className="title has-text-centered">Our Services</h2>
          <div className="columns">
            <div className="column has-text-centered">
              <span className="icon is-large has-text-primary">
                <i className="fas fa-drafting-compass fa-2x"></i>
              </span>
              <h3 className="title is-5 mt-2">Land Surveying</h3>
              <p>Accurate boundary, topographic, and site surveys for legal and design purposes.</p>
            </div>
            <div className="column has-text-centered">
              <span className="icon is-large has-text-primary">
                <i className="fas fa-hard-hat fa-2x"></i>
              </span>
              <h3 className="title is-5 mt-2">Construction Planning</h3>
              <p>Strategic site planning, layouts, and elevation designs for all construction projects.</p>
            </div>
            <div className="column has-text-centered">
              <span className="icon is-large has-text-primary">
                <i className="fas fa-map-marked-alt fa-2x"></i>
              </span>
              <h3 className="title is-5 mt-2">3D Mapping & Modeling</h3>
              <p>Modern drone-based 3D site mapping for detailed project visualization.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section has-background-primary-light">
        <div className="container has-text-centered">
          <h2 className="title is-4">Need a Site Survey or Construction Plan?</h2>
          <p>Get in touch with our expert team for a free consultation.</p>
          <a className="button is-primary is-medium mt-3" href="#contact">Contact Us</a>
        </div>
      </section>
    </>
    

     
  );
}