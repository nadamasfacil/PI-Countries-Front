import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countriesOrder, getShowCountries, getAllCountries, countriesFilterContinent, countriesFilterActivities, getCountriesByName } from '../../redux/actions';
import Card from '../card/Card';
import SetPages from '../../componentes/setPages/SetPages';
import './Home.css'

const Home = ({ searchBarChange, formFlagChange, detailsFlag, detailsFlagChange }) => {

  const dispatch = useDispatch();

  const showActivities = useSelector(state => state.allActivities);
  const showCountries = useSelector(state => state.showCountries);
  const searchCountryByName = useSelector(state => state.searchCountry);

  const [ pageView, setPageView ] = useState(1);
  const countriesByPage = 12;
  const countryIndEnd = (pageView * countriesByPage);
  const countryIndIni = countryIndEnd - countriesByPage;
  const showCountriesByPage = showCountries.slice(countryIndIni, countryIndEnd);

  const [ countryContinent , setCountryContinent ] = useState('All');
  const [ countryActivity, setCountryActivity ] = useState('All');
  const [ countryOrgan, setCountryOrgan ] = useState('Selected');
  const [ countryOrder, setCountryOrder ] = useState('Selected');

  const countriesSetPage = (page) => {
    setPageView(page);
    detailsFlagChange({ ...detailsFlag, pageView: page });
  };

  const handlerFilterContinent = (e) => {
    e.preventDefault();
    dispatch(countriesFilterContinent(e.target.value)); 
    setCountryContinent(e.target.value);
    setCountryActivity('All');
    setCountryOrgan('Selected');
    setCountryOrder('Selected');
    setPageView(1);
    detailsFlagChange({ 
      countryContinent: e.target.value,
      countryActivity: 'All',
      countryOrgan: 'Selected',
      countryOrder: 'Selected',
      pageView: 1
    });
  }
  
  const handlerFilterActivities = (e) => {
    e.preventDefault();
    dispatch(countriesFilterContinent(countryContinent)); 
    dispatch(countriesFilterActivities(e.target.value)); 
    setCountryActivity(e.target.value);
    setCountryOrgan('Selected');
    setCountryOrder('Selected');
    setPageView(1);
    detailsFlagChange({ 
      countryContinent: countryContinent,
      countryActivity: e.target.value,
      countryOrgan: 'Selected',
      countryOrder: 'Selected',
      pageView: 1
    });
  }

  const handlerOrgan = (e) => {
    e.preventDefault();
    if (e.target.value !== 'Selected' && countryOrder !== 'Selected')
      dispatch(countriesOrder({organ: e.target.value, order: countryOrder}));
    setCountryOrgan(e.target.value);
    setPageView(1);
    detailsFlagChange({ 
      countryContinent: countryContinent,
      countryActivity: countryActivity,
      countryOrgan: e.target.value,
      countryOrder: countryOrder,
      pageView: 1 
    });
  };

  const handlerOrder = (e) => {
    e.preventDefault();
    if (e.target.value !== 'Selected' && countryOrgan !== 'Selected')
      dispatch(countriesOrder({organ: countryOrgan, order: e.target.value}));
    setCountryOrder(e.target.value);
    setPageView(1);
    detailsFlagChange({ 
      countryContinent: countryContinent,
      countryActivity: countryActivity,
      countryOrgan: countryOrgan,
      countryOrder: e.target.value,
      pageView: 1 
    });
  };
  
  const handlerAll = async (hand) => {
    if (hand) {
      const allCountries = await getAllCountries();
      dispatch(allCountries);
      dispatch(getShowCountries(allCountries.payload));
    } else {
      const nameFound = await getCountriesByName(searchCountryByName);
      dispatch(nameFound);
    }
    setCountryContinent('All');
    setCountryActivity('All');
    setCountryOrgan('Selected');
    setCountryOrder('Selected');
    detailsFlagChange({
      flag: false,
      countryContinent: 'All',
      countryActivity: 'All',
      countryOrgan: 'Selected',
      countryOrder: 'Selected',
      pageView: 1
    });
  };

  const handlerRestart = () => {
    const restDetailsFlag = detailsFlag
    detailsFlagChange({ ...restDetailsFlag, flag: false });
    setCountryContinent(detailsFlag.countryContinent);
    setCountryActivity(detailsFlag.countryActivity);
    setCountryOrgan(detailsFlag.countryOrgan);
    setCountryOrder(detailsFlag.countryOrder)
    setPageView(detailsFlag.pageView);
  };
  

  useEffect(() => {
    searchBarChange(true);
    formFlagChange(true);
    if (!detailsFlag.flag)
      if (searchCountryByName === '---All---') {
        handlerAll(true);
      } else {
        handlerAll(false);
      }
    else {
      handlerRestart();
    }
    // eslint-disable-next-line
  },[searchCountryByName]);

  return (
    <div className='home' >
      <section className='home-section__filters' >
        <h3>Selected Countries</h3>
        <h4>{searchCountryByName}</h4>
        <section>
          <h3>Filter by Continent:</h3>
          {/* <select className='home-select__items' onChange={handlerFilterContinent} defaultValue={countryContinent} >
            <option value="All">All</option> 
            <option value="Americas">Americas</option> 
            <option value="Africa">Africa</option> 
            <option value="Antarctic">Antarctic</option> 
            <option value="Asia">Asia</option> 
            <option value="Europe">Europe</option> 
            <option value="Oceania">Oceania</option>  */}
          <select className='home-select__items' onChange={handlerFilterContinent} >
            { countryContinent === 'All' ? <option value="All" selected >All</option> : <option value="All">All</option> }
            { countryContinent === 'Americas' ? <option value="Americas" selected >Americas</option> : <option value="Americas">Americas</option> }
            { countryContinent === 'Africa' ? <option value="Africa" selected >Africa</option> : <option value="Africa">Africa</option> }
            { countryContinent === 'Antarctic' ? <option value="Antarctic" selected >Antarctic</option> : <option value="Antarctic">Antarctic</option> }
            { countryContinent === 'Asia' ? <option value="Asia" selected >Asia</option> : <option value="Asia">Asia</option> }
            { countryContinent === 'Europe' ? <option value="Europe" selected >Europe</option> : <option value="Europe">Europe</option> }
            { countryContinent === 'Oceania' ? <option value="Oceania" selected >Oceania</option> : <option value="Oceania">Oceania</option> }
          </select>
        </section>
        <section>
          <h3>Filter by Activities:</h3>
          {/* <select className='home-select__items' onChange={handlerFilterActivities} defaultValue={countryActivity} >
            <option value='All' >W/Without activities</option> 
            <option value='With' >With activities</option> 
            <option value='Without' >Without activities</option> 
            { showActivities.length > 0 && showActivities.map(act => {
              return (
                  <option value={act.id} key={act.id} >{act.name}</option>
              )
            })} */}
          <select className='home-select__items' onChange={handlerFilterActivities} >
            { countryActivity === 'All' ? <option value='All' selected >W/Without activities</option> : <option value='All' >W/Without activities</option> }
            { countryActivity === 'With' ? <option value='With' selected >With activities</option> : <option value='With' >With activities</option> }
            { countryActivity === 'Without' ? <option value='Without' selected >Without activities</option> : <option value='Without' >Without activities</option> }
            { showActivities.length > 0 && showActivities.map(act => {
              const rowActivity = countryActivity === act.id 
                ? <option value={act.id} key={act.id} selected >{act.name}</option> 
                : <option value={act.id} key={act.id} >{act.name}</option>;
              return (
                rowActivity
              )
            })}
          </select>
        </section>
        <section>
          <h3>Organize by:</h3>
          {/* <select className='home-select__items' onChange={handlerOrgan} defaultValue={countryOrgan} >
            { countryOrgan === 'Selected' ? <option >Selection</option> : ''}
            <option value="name">Country</option>
            <option value="population">Population</option>  */}
          <select className='home-select__items' onChange={handlerOrgan} >
            { countryOrgan === 'Selected' ? <option >Selection</option> : ''}
            { countryOrgan === 'name' ? <option value="name" selected >Country</option> : <option value="name">Country</option> }          
            { countryOrgan === 'population' ? <option value="population" selected >Population</option> : <option value="population">Population</option> } 
          </select>
       </section>
        <section>
          <h3>Short in shape:</h3>
          {/* <select className='home-select__items' onChange={handlerOrder} defaultValue={countryOrder} >
            { countryOrder === 'Selected' ? <option >Selection</option> : ''}
            <option value="asc">Ascending</option> 
            <option value="desc">Descending</option>  */}
          <select className='home-select__items' onChange={handlerOrder} >
            { countryOrder === 'Selected' ? <option >Selection</option> : ''}
            { countryOrder === 'asc' ? <option value="asc" selected >Ascending</option> : <option value="asc">Ascending</option> }
            { countryOrder === 'desc' ? <option value="desc" selected >Descending</option> : <option value="desc">Descending</option> }
          </select>
        </section>
        <button onClick={handlerAll} >Return All Countries</button>
      </section>
      <section className='home-section__shows' >
        <section className='home-section__showcards' >
          { showCountriesByPage.length > 0 && showCountriesByPage.map((cou, ind) => {
            return (
              <Card 
              key={ind}
              idDetail={cou.id}
              name={cou.name}
              image={cou.image}  
              continent={cou.continent}
              />
              );
            })}
        </section>
        <section className='home-section__showPages' >
          {
            Math.ceil(showCountries.length / countriesByPage) > 1 && <SetPages 
            countriesByPage = {countriesByPage}
            countriesLength = {showCountries.length}
            countriesSetPage = {countriesSetPage}
            pageView = {pageView}
            />
          }
        </section>
      </section>
    </div>
  )
};

export default Home;