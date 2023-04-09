import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ idDetail, name, image, continent}) => {
  return (
    <article className='card' >
      <figure>
        <img src={image} alt={`País ${name}`} />
      </figure>
      <div className='card__description' >
        <h3>{name}</h3>  
        <h4>{continent}</h4>
        <Link className='card-Link' to={`/details/${idDetail}`} >Detail</Link>
      </div>
    </article>
  );
};

export default Card;