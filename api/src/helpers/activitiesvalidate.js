const { Country } = require('../db');

const validatePostActivity = async (req, res, next) => {
  try {
    const { name, difficulty, duration, seasson, arrayCountries} = req.body;
    if (!req.body.hasOwnProperty('name')) 
      throw new Error('Name does not exist');
    if (!req.body.hasOwnProperty('difficulty')) 
      throw new Error('Dificult does not exist');
    if (difficulty < 1 || difficulty > 5) 
      throw new Error('The range of difficulty must be between 1 and 5');
    if (req.body.hasOwnProperty('duration') && duration < 0) 
      throw new Error('Duration does not exist');
    if (!req.body.hasOwnProperty('seasson')) 
      throw new Error('Seasson does not exist');
    if (!['Summer', 'Autumn', 'Winter', 'Spring'].includes(seasson)) 
      throw new Error('The Seasson must be any of Summer, Autumn, Winter, Spring');
    if (!req.body.hasOwnProperty('arrayCountries')) 
      throw new Error('Arrangement of Countries does not exist');
    if (arrayCountries.length < 1) 
      throw new Error('Arrangement of Countries is empty');
    let countryFound;
    for (let i = 0; i < arrayCountries.length; i++) {
      countryFound = await Country.findByPk(arrayCountries[i]);
      if (!countryFound) 
        throw new Error('Country in arrangement of countries not found in database');
    }
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  validatePostActivity,
};