import { COUNTRIES_FILTER_ACTIVITIES, COUNTRIES_FILTER_CONTINENT, COUNTRIES_ORDER, GET_ALLACTIVITIES, GET_ALLCOUNTRIES, GET_COUNTRIESBYNAME, GET_SHOWCOUNTRIES } from "./actions";

const initialState = {
  allCountries: [],
  showAllCountries: [],
  showCountries: [],
  allActivities: [],
  searchCountry: '---All---',
};

const rootReducer = ( state = initialState, action) => {
  switch (action.type) {
    case GET_ALLCOUNTRIES: 
      return {
        ...state,
        allCountries: action.payload,
        searchCountry: '---All---'
      };
    case GET_COUNTRIESBYNAME:
      return {
        ...state,
        showCountries: action.payload.payloadData,
        showAllCountries: action.payload.payloadData,
        searchCountry: action.payload.payloadName
      };
    case GET_SHOWCOUNTRIES: 
      return {
        ...state,
        showCountries: action.payload,
        showAllCountries: action.payload
      };
    case COUNTRIES_FILTER_CONTINENT: {
      const showAllCountries = state.showAllCountries;
      const showFilterContinent = action.payload === 'All' 
        ? showAllCountries
        : showAllCountries.filter(cou => cou.continent === action.payload);
      return {
        ...state,
        showCountries: showFilterContinent
      }
    };
    case COUNTRIES_FILTER_ACTIVITIES: {
      const showAllCountries = state.showCountries;
      let showFilterActivities = [];
      if (action.payload === 'All')
        showFilterActivities = showAllCountries;
      if (action.payload === 'With')
        showFilterActivities = showAllCountries.filter(cou => cou.activities.length > 0);
      if (action.payload === 'Without')
        showFilterActivities = showAllCountries.filter(cou => cou.activities.length < 1);
      else {
        for (let cou of showAllCountries)
          for (let i = 0; i < cou.activities.length; i++) {
            if (cou.activities[i].id === action.payload) showFilterActivities.push(cou);
          };
        };
      return {
        ...state,
        showCountries: showFilterActivities
      };
    };
    case COUNTRIES_ORDER: {
      const showAllCountries = state.showCountries;
      let showCountriesOrder = [];
      if (action.payload.organ === 'population')
        if (action.payload.order === 'desc')
          showCountriesOrder = showAllCountries.sort((a, b) => b.population - a.population);
        else
          showCountriesOrder = showAllCountries.sort((a, b) => a.population - b.population);
      else 
        if (action.payload.order === 'desc')
          showCountriesOrder = showAllCountries.sort((a, b) => b.name.localeCompare(a.name));
        else 
          showCountriesOrder = showAllCountries.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        showCountries: showCountriesOrder,
      }
    };
    case GET_ALLACTIVITIES:
      const showActivitiesOrder = action.payload.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        allActivities: showActivitiesOrder
      };
    default:
      return {...state};
  };
};

export default rootReducer;
