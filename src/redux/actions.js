import axios from 'axios';

export const GET_ALLCOUNTRIES = 'GET_ALLCOUNTRIES';
export const GET_SHOWCOUNTRIES = 'GET_SHOWCOUNTRIES';
export const GET_COUNTRIESBYNAME = 'GET_COUNTRIESBYNAME';
export const COUNTRIES_FILTER_CONTINENT = 'COUNTRIES_FILTER_CONTINENT';
export const COUNTRIES_FILTER_ACTIVITIES = 'COUNTRIES_FILTER_ACTIVITIES';
export const COUNTRIES_ORDER = 'COUNTRIES_ORDER';
export const GET_ALLACTIVITIES = 'GET_ALLACTIVITIES';

export const getAllCountries = async () => {
  // return await fetch('http://localhost:3001/countries')
  return await fetch('http://pi-countries-back-production-5a32.up.railway.app/countries')
              .then(res => {
                if (!res.ok) throw new Error('Countries not found');
                return res.json()
              })
              .then((data) => {
                return {
                  type: GET_ALLCOUNTRIES,
                  payload: data
                };
              })
              .catch(error => {return { error: error.message }});
};

export const getCountriesByName = async (name) => {
  // return await fetch('http://localhost:3001/countries?name=' + name)
  return await fetch('http://pi-countries-back-production-5a32.up.railway.app/countries?name=' + name)
  .then(res => {
    if (!res.ok) throw new Error('Countries not found');
    return res.json()
  })
  .then((data) => {
    const dataName = {
      payloadData: data,
      payloadName: name
    };
    return {
      type: GET_COUNTRIESBYNAME,
      payload: dataName
    };
  })
  .catch(error => {return { error: error.message }});
};

export const getCountriesById = async (id) => {
  // return await fetch('http://localhost:3001/countries/' + id)
  return await fetch('http://pi-countries-back-production-5a32.up.railway.app/countries/' + id)
  .then(res => {
    if (!res.ok) throw new Error('Country not found');
    return res.json()
  })
  .catch(error => {return { error: error.message }});
};

export const getShowCountries = (countries) => {
  return {
    type: GET_SHOWCOUNTRIES,
    payload: countries
  };
};


export const countriesFilterContinent = (filter) => {
  return {
    type: COUNTRIES_FILTER_CONTINENT,
    payload: filter
  };
};

export const countriesFilterActivities = (filter) => {
  return {
    type: COUNTRIES_FILTER_ACTIVITIES,
    payload: filter
  }
}

export const countriesOrder = (payload) => {
  return {
    type: COUNTRIES_ORDER,
    payload
  };
};

export const getAllActivities = async () => {
  // return await fetch('http://localhost:3001/activities')
  return await fetch('http://pi-countries-back-production-5a32.up.railway.app/activities')
              .then(res => {
                if (!res.ok) throw new Error('Activities not found');
                return res.json()
              })
              .then((data) => {
                return {
                  type: GET_ALLACTIVITIES,
                  payload: data
                };
              })
              .catch(error => {return { error: error.message }});
};

export const postActivity = async (activity) => {
  try {
    // const sendActivity = await axios.post('http://localhost:3001/activities', activity);
    const sendActivity = await axios.post('http://pi-countries-back-production-5a32.up.railway.app/activities', activity);
    return sendActivity.data;
    
  } catch (error) {
    return { error: error.message }
  }

};