import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountriesByName } from '../../redux/actions';
import './SearchBar.css';


const SearchBar = () => {

  const dispatch = useDispatch();
  const [ name, setName ] = useState('');

  const handlerChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handlerSubmit = async () => {
    if (!name) window.alert('Input empty');
    else {
      const nameFound = await getCountriesByName(name);
      if (nameFound.hasOwnProperty('error')) { 
        window.alert(nameFound.error);
        setName('');
      } else {
        setName('');
        dispatch(nameFound);
      };
    };
  };

  return (
    <div className='searchbar' >
      <input
        className='searchbar-input__text'
        type='text'
        value={name}
        placeholder=' Find...'
        onChange={handlerChange}
      />
      <input className='searchbar-input__submit' type='submit' value='🔎' onClick={handlerSubmit} />
    </div>
    // U+1F50E lupa
  );
};

export default SearchBar;