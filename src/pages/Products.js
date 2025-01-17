import React, { useContext, useState, useEffect } from 'react'
import { Link} from "react-router-dom";
import { ProductContext } from '../context/ProductsFecthAPI';
import { Auth } from 'aws-amplify';


const Products = () => {
    const { products = []} = useContext(ProductContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAuthenticated, setisAuthenticated] = useState(false);
    

    useEffect (() => {const checkAuthStatus = async () => {
        try {
            await Auth.currentAuthenticatedUser();
            setisAuthenticated(true);
        }catch{
            setisAuthenticated(false);
        }
    };
    checkAuthStatus();
},[]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      }

    const matchesSearchTerm = (product, searchTerm) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      }

      const filteredProducts = products.filter(product =>
        matchesSearchTerm(product, searchTerm)
      );

    if (!products.length) {
        return <h3>No Products Available</h3>
    }

    return (

        <section >
            <ul><input 
            className ="search-input" 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={handleSearchChange}>
            </input></ul>
            <div className="products-grid">
            {filteredProducts.map(({image, id, name, price = 'N/A' }, index) => (
                <article key={id || index} className="product-card">
                    <div className="product-card-info">
                        <img src={image} alt={name} className="product-card img"/>
                            <h3 className="product-card-name">{name}</h3>
                            <p className="product-card-price">{price} HUF</p>
                    </div>
                    <Link to={`/products/${id}`} className="click-btn">Details</Link>
                    {isAuthenticated && (
                        <Link to={`/newproductform`} className="click-btn">Add Product</Link>    
                    )}
                </article>
            ))}
            </div>
        </section>
    )
}

export default Products
