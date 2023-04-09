const { Op } = require('sequelize');
const { Country, Activity } = require('../db');

// Obtener todas las countries de la DB
const getCountries = async () => {
  const countries = await Country.findAll({ include: {
    model: Activity, 
    attibutes : ['id', 'name'],
    through: {
      attibutes: [],
    },  
  }});
  return countries;
};

// Obtener la country por id
const getCountryById = async (idPais) => {
  const country = await Country.findByPk(idPais.toUpperCase(), { include: {
    model: Activity, 
    attibutes : ['id', 'name'],
    through: {
      attibutes: [],
    },
  }});
  return country;
};

// Obtener la country por name
const getCountryByName = async (name) => {
  const country = await Country.findAll({
  where: { name: {[Op.iLike]: `%${name}%` }},
  include: {
    model: Activity, 
    attibutes : ['id', 'name'],
    through: {
      attibutes: [],
    },
  }});
  return country;
}

module.exports = {
  getCountries,
  getCountryById,
  getCountryByName,
};



// si se tiene problemas con el encoding de psql shell
// SET CLIENT_ENCODING TO 'UTF-8';