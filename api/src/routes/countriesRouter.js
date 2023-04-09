const { Router } = require('express');
const { handlerCountries, handlerCountryById } = require('../handlers/handlersCountries');
const { validateIdCountry, validateNameCountry } = require('../helpers/countriesValidate');

const countriesRouter = Router();

countriesRouter.get('/', validateNameCountry, handlerCountries);
countriesRouter.get('/:idPais', validateIdCountry, handlerCountryById);

module.exports = countriesRouter;
