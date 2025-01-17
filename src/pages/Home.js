import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import '../styles.css';


import { ProductContext } from "../context/ProductsFecthAPI";

const Home = () => {
    const { featured = [] } = useContext(ProductContext);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      }

    const matchesSearchTerm = (product, searchTerm) => {
        return product.name?.toLowerCase().includes(searchTerm.toLowerCase());
      }

      const filteredProducts = featured.filter(featured =>
        matchesSearchTerm(featured, searchTerm)
      );

    if (!featured.length) {
        return <h3>No Featured Products</h3>
    }
    return (
        <>
            <section>
                <ul><input 
            className ="search-input" 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={handleSearchChange}>
            </input></ul>
                <div className="products-grid">
                    {filteredProducts.map(({ id, image, name, price = "N/A"}, index) => (
                        <article key={id || index} className="product-card">
                            <div className="product-card-info">
                                <img src={image} alt={name} className="product-card img"/>
                                <h3 className="product-card-name">{name}</h3>
                                <p className="product-card-price">{price} HUF</p>
                            </div>
                            <Link to={`/products/${id}`} className="click-btn">Details</Link>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Home;
