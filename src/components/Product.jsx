import { Link } from "react-router-dom";
import { urlFor } from "../helpers/client";

function Product({ product }) {
  return (
    <div>
      <Link to={`/product/${product.slug.current}`} />
      <div className="product-card">
        <img
          src={urlFor(product.image[0])}
          className="product-image"
          width={250}
          height={250}
        />
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price}</p>
      </div>
    </div>
  );
}

export default Product;
