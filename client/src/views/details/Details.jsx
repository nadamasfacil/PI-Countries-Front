import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCountriesById } from '../../redux/actions';
import './Details.css';

const Details = ({ searchBarChange, formFlagChange, detailsFlag, detailsFlagChange }) => {

  const { idDetail } = useParams();
  const navigate = useNavigate();

  const [ showCountry, setShowCountry ] = useState({});

  const goHome = () => {
    searchBarChange(true);
    formFlagChange(true);
    navigate('/home');
  };

  const loadinCountry = async(idDetail) => {
    const countryDetail = await getCountriesById(idDetail);
    if (countryDetail.hasOwnProperty('error')) window.alert(countryDetail.error);
    else {
      setShowCountry(countryDetail);
    };
  };

  useEffect(() => {
    loadinCountry(idDetail);
    searchBarChange(false);
    formFlagChange(false);
    detailsFlagChange({...detailsFlag, flag: true});
    // eslint-disable-next-line
  },[idDetail]);

  return (
    <div className='detail' >
      <div className='detail__description' >
        <section className='detail__title'>
          <h2>{showCountry.name}</h2>
          <button className='detail__gohome' onClick={goHome} >Go Home</button>
        </section>
        <section className='detail-section__data' >
          <figure className='detail-img' >
            <img src={showCountry.image} alt={showCountry.name} />
          </figure>
          <article className='detail-article' >
            <div className='detail-article__data' >
              <p>Capital:</p>
              <h4>{showCountry.capital}</h4>
            </div>
            <div className='detail-article__data' >
              <p>Continent:</p>
              <h4>{showCountry.continent}</h4>
            </div>
            <div className='detail-article__data' >
              <p>Subregion:</p>
              <h4>{showCountry.subregion}</h4>
            </div>
            <div className='detail-article__data' >
              <p>Area:</p>
              <h4>{showCountry.area}</h4>
            </div>
            <div className='detail-article__data' >
              <p>Population:</p>
              <h4>{showCountry.population}</h4>
            </div>  
          </article>
          <article className='detail-article__activities' >
            <p>Activities:</p>
            <div className='detail-article-showActivities' >
              { showCountry.activities && showCountry.activities.length > 0 && showCountry.activities.map(act => {
                return (
                  <h4 key={act.id} >{act.name}</h4>
                )
              })}
            </div>
          </article>
        </section>
      </div>  
    </div>
  );
};

export default Details;

