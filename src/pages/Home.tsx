import { Link } from "react-router-dom";


export default function Home() {
  return (
    <>
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
              <h3 className="title is-5 mt-2">Surveying Equipment Rentals</h3>
              <p>We have surveying equipments for hire, we also process the raw data and provide
                site plans and indentures. We also register lands as well in record time.
              </p>
            </div>
          </div>
          <div className="columns">
            <div className="column has-text-centered">
              <span className="icon is-large has-text-primary">
                <i className="fas fa-drafting-compass fa-2x"></i>
              </span>
              <h3 className="title is-5 mt-2">Drone Services</h3>
              <p>Modern drone-based 3D site mapping for detailed project visualization.
                We provide drone images of the entire land.
              </p>
            </div>
            <div className="column has-text-centered">
              <span className="icon is-large has-text-primary">
                <i className="fas fa-drafting-compass fa-2x"></i>
              </span>
              <h3 className="title is-5 mt-2">Loader and Tipper Rentals</h3>
              <p>For loader services, we have contract works, hourly works. Also for the tippers,
                we provide sand, stones, black soil and gravels for all kinds of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section has-background-danger mb-4">
        <div className="container has-text-centered">
          <h2 className="title is-4">Need a Site Survey or Construction Plan?</h2>
          <p className="has-text-white" >Get in touch with our expert team for a free consultation.</p>
          <Link to="/contact" className="button is-link is-medium mt-3">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}