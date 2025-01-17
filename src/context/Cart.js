import React, { useState, useEffect, useMemo, useCallback } from "react";

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = [...cart].reduce((total, { amount, price }) => {
      return (total += amount * price);
    }, 0);
    setTotal(parseFloat(total.toFixed(2)));
  }, [cart]);

  const increaseAmount = useCallback((id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    setCart(updatedCart);
  }, [cart]);

  const decreaseAmount = useCallback((id, amount) => {
    const updatedCart = amount === 1
      ? cart.filter((item) => item.id !== id)
      : cart.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        );
    setCart(updatedCart);
  }, [cart]);

  const addToCart = useCallback((product) => {
    const { id, name, price, image } = product;
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      increaseAmount(id);
    } else {
      setCart([...cart, { id, name, image, price, amount: 1 }]);
    }
  }, [cart, increaseAmount]); 

  const clearCart = () => {
    setCart([]);
  };

  const value = useMemo(() => ({
    cart,
    total,
    increaseAmount,
    decreaseAmount,
    addToCart,
    clearCart
  }), [cart, total, addToCart, decreaseAmount, increaseAmount]);
  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };