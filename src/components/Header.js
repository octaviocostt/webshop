import {React} from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  




  return (
    <header className="header">
      <nav className="nav">
        <img className="logo" src='logo_webshop.png' alt="infinitefindings"></img>
        <ul>
          <li>
            <Link to='/Home' className='click-btn'>Home</Link>
          </li>
          <li>
            <Link to='/products' className='click-btn'>Products</Link>
          </li>
          <li>
            <Link to='/cart' className='click-btn'>Cart</Link>
          </li>
          <li>
            <Link to='/checkout' className='click-btn'>Checkout</Link>
          </li>
        </ul>
      </nav>
      <h2 className="app-subtitle">The place where you can find your needs! Find your next product here.</h2>
      
    </header>
  );
};

export default Header;
