import React, { useContext } from "react";
import { CartContext } from "../context/Cart";
import {FiChevronUp} from 'react-icons/fi';
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart = [], total, increaseAmount, decreaseAmount } = useContext(CartContext);

  if (!cart.length) {
    return <h3 className="cart-header">Empty Cart</h3>
  }
  return (
    <section className="cart-container">
      <header className="cart-header">
        <h2>Shopping Cart</h2>
      </header>
      <div className="cart-items">
        {cart.map(({ id, name, price, image, amount }) => (
          <article key={id} className="cart-item">
            <div  className="left-column">
              <img src={image} alt="" />
            </div>
            <div className="cart-item-name">
              <p >{name}</p>
              <p>{price} HUF</p>
            </div>
            <div className="cart-item-price">
              <button className="summary-item" onClick={() => increaseAmount(id)}><FiChevronUp /></button>
              <p className="cart-summary">{amount}</p>
              <button className="summary-item" onClick={() => decreaseAmount(id, amount)}><FiChevronDown /></button>
            </div>
          </article>
        ))}
      </div>
      <div>
        <h3 className="summary-item summary-total">Total: {total} HUF</h3>
      </div>
      <div>
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </section>
  );
};

export default Cart;
