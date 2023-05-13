import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';
import './NavBar.css';

const NavBar = ({ formFlag, searchBarFlag, logout }) => {

  return (
    <section className='navbar' >
      <h1 className='navbar-h1' >Countries</h1>
      <section className='navbar__menu'>
        { formFlag && <Link className='navbar-Link' to='/home' >Home</Link>}
        { formFlag && <Link className='navbar-Link' to='/create' >Activities</Link>}
        { searchBarFlag
          ? <SearchBar /> : ''
        }
        <button className='navbar-button' onClick={logout} >Logout</button>
      </section>
    </section>
  );
};

export default NavBar;