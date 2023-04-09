const validateIdCountry = (req, res, next) => {
  try {
    const expAlpha = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    const { idPais } = req.params;
    if (idPais.length !== 3) throw new Error('Country identifier must be 3 characters long');
    if (!expAlpha.includes(idPais[0].toUpperCase()) || !expAlpha.includes(idPais[1].toUpperCase()) || !expAlpha.includes(idPais[2].toUpperCase())) throw new Error('Country identifier must be only letters');
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const validateNameCountry = (req, res, next) => {
  try {
    const arrayQuery = Object.getOwnPropertyNames(req.query);
    if (arrayQuery.length > 0)
      if (req.query.hasOwnProperty('name')) {
        const { name } = req.query;
        if (name.length < 1) throw new Error('Name undefined');
      } else throw new Error('Query Name does not Exist');
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }

};

module.exports = {
  validateIdCountry,
  validateNameCountry,
}