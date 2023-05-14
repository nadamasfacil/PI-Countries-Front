import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllActivities, getAllCountries } from '../../redux/actions';
import worldMap from '../../assets/countries.png';
import './LandingPage.css';

const LandingPage = ({login}) => {

  const dispatch = useDispatch();

  const loadingDb = async () => {
    const allCountries = await getAllCountries();
    if (allCountries.hasOwnProperty('error')) window.alert(allCountries.error);
    else {
      dispatch(allCountries);
      const allActivities = await getAllActivities();
      if (allActivities.hasOwnProperty('error')) window.alert(allActivities.error);
      else dispatch(allActivities);
    };
  };

  useEffect(()=> {
    loadingDb();
    // eslint-disable-next-line
  },[]);

  return (
    <div className='landing' >
      <section className='landing-section__login' >
        <h1 className='landing-h1' >Countries</h1>
        <button className='landing-button__login' onClick={login} >Login</button>
      </section>
      <section className='landing-section__map'>
        <figure className='landing-img__map' >
          <img src={worldMap} alt='World Map' />
        </figure>
      </section>
    </div>
  )
};

export default LandingPage;