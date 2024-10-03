import React, {useState, useEffect} from "react";
import '../styles.css';


export default function ProductsGrid(){

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [price, setPrice] = useState("All");

  useEffect(()=>{
    fetch("/products", {
      method:'GET'})
      .then(res => res.json())
      .then( products => {
              setProducts(products)
              console.log(products)
      })
      .catch(error => console.error('Error fetching products', error));
  }, []);

  const handleError = (e) => {
    e.target.src = "public/logo_webshop.png";
  }


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }

  const matchesPrice = (product, price) => {
    switch(price){
        case "All":
            return true;
        case "0 - 100.000":
            return product.price <= 100;
        case "100.000 - 200.000":
            return product.price > 100 && product.price <= 200;
        case "200.000 - 300.000":
            return product.price > 200 && product.price <= 300;
        case "300.000 - 400.000":
            return product.price > 400 && product.price <= 500;
        case "500.000+":
            return product.price >= 500;
        default:
            return false;
    }
 }
    

  const matchesSearchTerm = (product, searchTerm) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  const filteredProducts = products.filter(product =>
    matchesPrice(product, price) &&
    matchesSearchTerm(product, searchTerm)
  );

    return(
        <div>
            <ul><input 
            className ="search-input" 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={handleSearchChange}>

            </input></ul>

            <div className="filter-bar">
                <div className="filter-slot">
                    <label>Price </label>
                    <select className="filter-dropdown" value={price} onChange={handlePriceChange}>
                        <option>All</option>
                        <option>0 - 100.000</option>
                        <option>100.000 - 200.000</option>
                        <option>200.000 - 300.000</option>
                        <option>300.000 - 400.000</option>
                        <option>500.000+</option>
                    </select>
                </div>
            </div>

            <div className="products-grid">
                {
                    filteredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={`images/${product.image}`} alt={product.name} onError={handleError}></img>
                            <div className="product-card-info">
                                <h3 className="product-card-title">{product.name}</h3>
                                <p className="product-card-price">{product.price} HUF</p>
                                <p className="product-card-description">{product.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}