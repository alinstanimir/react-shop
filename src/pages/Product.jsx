import { useEffect, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import { default as ProductComponent } from "../components/Product";
import { sanityClient, urlFor } from "../helpers/client";
import { useStateContext } from "../context/StateContext";

async function getSanityData(slug) {
  const productsQuery = '*[_type == "product"]';
  const products = await sanityClient.fetch(productsQuery);

  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await sanityClient.fetch(productQuery);
  console.log(product);
  return { products, product };
}

function Product() {
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  useEffect(() => {
    getSanityData(slug).then((data) => {
      setProducts(data.products);
      setProduct(data.product);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <h3>Loading...</h3>;

  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image.map((img, idx) => (
              <img
                key={idx}
                src={urlFor(img)}
                className={
                  idx === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(idx)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>20</p>
          </div>

          <h4> Details:</h4>
          <p>{details}</p>
          <p className="price">{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button className="add-to-cart" onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((p) => (
              <ProductComponent key={p._id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
