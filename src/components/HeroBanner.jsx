import { Link } from "react-router-dom";
import { urlFor } from "../helpers/client";

function HeroBanner({ heroBanner }) {

console.log(heroBanner);

    return(
  <div className="hero-banner-container">
    <div>
      <p className="beats-solo">{heroBanner.smallText}</p>
      <h3>{heroBanner.midText}</h3>
      <h1>{heroBanner.largeText}</h1>
      <img
        src={urlFor(heroBanner.image)}
        alt="headphones"
        className="hero-banner-image"
      />
    </div>

    <div>
      <Link to={`/product/${heroBanner.product}`}>
        <button>{heroBanner.buttonText} </button>
      </Link>
      <div className="desc">
        <h5>Description</h5>
        <p>{heroBanner.description}</p>
      </div>
    </div>
  </div>
  )
}

export default HeroBanner;
