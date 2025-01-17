import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductsFecthAPI";
import { CartContext } from "../context/Cart";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const {addToCart}  = useContext(CartContext);

  const product = products.find((product) => {
    return product.id === id;
  });
  if (!product) {
    return <h3>Loading...</h3>;
  }

  const { image: url, name, description,price } = product;

  return (
    <section className="details-container">
      <div className="left-column">
        <img src={url} alt="" />
      </div>
      <div className="right-column">
        <div className="product-description">
        <h1>{name}</h1>
        <p>{description}</p>
        <h2 className="product-price">{price}  FT</h2>
        </div>
        <button
          className="cart-btn"
          onClick={() => {
            addToCart({ ...product, id });
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;