import React, { useEffect, useState, useMemo } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import {listProducts} from '../graphql/queries'
import { processOrder } from "../graphql/mutations";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([false]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const checkout = async (orderDetails) => {
    const payload = {
      id: uuidv4(),
      ...orderDetails
    };
    try {
      await API.graphql(graphqlOperation(processOrder, { input: payload }));
      console.log("Order is successful");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.graphql({
        query: listProducts,
        authMode: "API_KEY"
      });
      console.log("Fetched Products:", data);
      const products = data.listProducts.items;
      const featured = products.filter((product) => {
        return !!product.featured;
      });
      setProducts(products);
      setFeatured(featured);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  
  const value = useMemo(() => ({ products, featured, loading, checkout }), [products, featured, loading]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };

