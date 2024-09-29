import React, { useEffect, useState } from 'react';
import './styles.css';
import './components/Footer';
import './components/Header';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductsGrid from './components/ProductsGrid';

function App() {

  return (
    <div className="App">
      <div>
      <Header></Header>
      <ProductsGrid></ProductsGrid>
      </div>
        <Footer></Footer>
    </div>
  );
}

export default App;
