import React from 'react';
import './SetPages.css';

const SetPages = ({countriesByPage, countriesLength, countriesSetPage, pageView}) => {

  const pages = [];
  for (let i = 0; i < Math.ceil( countriesLength / countriesByPage); i++) {
    pages.push(i+1);
  }

  return (
    <nav className='pages'>
      <ul className='pages-ul'>
        <div className='pages-li' >
        { 
        pages.length > 1 && pages.map( num => {
          return (
            <li key={num} >
              <button 
                className={num === pageView ? 'pages-ul__number pages-ul__active' : 'pages-ul__number'} 
                onClick={() => countriesSetPage(num)} 
              >
                {num}
              </button>
            </li>
          )
        })
        }
        </div>
      </ul>
    </nav>
  )
}

export default SetPages