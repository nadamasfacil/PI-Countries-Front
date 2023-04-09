const { getCountries, getCountryById, getCountryByName } = require('../controllers/controllersCountries');

 
const handlerCountries = async (req, res) => {
  const { name } = req.query;
  try {
    const allCountries = name ? await getCountryByName(name) : await getCountries();
    if (allCountries.length < 1) throw new Error('Not found Countries');
    res.status(200).send(allCountries);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handlerCountryById = async (req, res) => {
  const { idPais } = req.params;
  try {
    const country = await getCountryById(idPais);
    if (country === null) throw new Error('Country not found');
    res.status(200).send(country);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  handlerCountries,
  handlerCountryById,
};