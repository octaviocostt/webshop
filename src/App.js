import React from 'react';
import './styles.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductsDetails from './pages/ProductsDetails';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Amplify} from "aws-amplify";
import awsExports from "./aws-exports";
import { ProductProvider } from './context/ProductsFecthAPI';
import { CartProvider } from './context/Cart';
import Admin from './pages/Admin';
import NewProductForm from './components/NewProductForm';

Amplify.configure(awsExports);

function App() {

  return (
    <ProductProvider>
      <CartProvider>
    <Router>
      <div className="App">
        <div className='container'>
          <Header />
          <Routes>
          <Route exact path='/' element={<Home/>} />
            <Route exact path='/home' element={<Home/>} />
            <Route exact path='/products' element={<Products/>} />
            <Route exact path='/cart' element={<Cart/>} />
            <Route exact path='/checkout' element={<Checkout/>} />
            <Route exact path='/products/:id' element={<ProductsDetails/>} />
            <Route exact path='/admin' element={<Admin/>} />
            <Route exact path='/newproductform' element={<NewProductForm/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </CartProvider>
    </ProductProvider>
    
  );
}

export default App;
