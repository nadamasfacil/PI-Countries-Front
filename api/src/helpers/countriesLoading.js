require ('dotenv').config();
const { readFileSync } = require('fs');
const axios = require('axios');
const { Country, Activity } = require('../db');
const { END_POINT_COUNTRIES } = process.env;


// Obtener todas las Countries de la Api
const getAllCountriesApi = async (req, res) => {
    try {
      const allCountries = await axios.get(END_POINT_COUNTRIES);
      const countriesApi = allCountries.data;
      if (countriesApi === undefined || countriesApi.length < 1) throw new Error('Countries Not Found');
      let countries = countriesApi.map((country) => {
        return {
          id: country.cca3,
          name: country.translations.spa.common,
          image: country.flags[0],
          continent: country.region,
          capital: country.capital ? country.capital[0] : 'No Capital',
          subregion: country.subregion ? country.subregion : 'No Region',
          area: country.area,
          population: country.population,
        }
      })

      let countryObj;
      for (let i = 0; i < countries.length; i++) {
        countryObj = await Country.create(countries[i]);
      }

      countries = await Country.findAll({ include: [{ model: Activity }]});
      return countries;
    } catch (error) {
      console.log('Wrong endpoint ');
      console.log(error.message);
      res.status(400).send(error.message);
    }
  };

  module.exports = {
    getAllCountriesApi,
  }
