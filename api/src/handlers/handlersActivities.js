const { getAllActivities, postAvtivity } = require("../controllers/controllersActivities");

const handlersGetActivities = async (req, res) => {
  try {
    const activityResult = await getAllActivities();
    if (activityResult.length < 1) throw new Error('Activities not found');
    res.status(200).send(activityResult);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handlerPostActivities = async (req, res) => {
  const body = req.body;
  try {
    const activity = {
      name: body.name,
      difficulty: body.difficulty,
      duration: body.duration,
      seasson: body.seasson,
      arrayCountries: body.arrayCountries,
    }
    const activityResult = await postAvtivity(activity);
    if (activityResult === null) throw new Error('Error creation activity');
    const bodyCountries = body.arrayCountries;
    activityResult.setCountries(bodyCountries)
    res.status(200).send(activityResult);
  } catch (error) {
    res.status(400).send(error.message);
  };
};

module.exports = {
  handlersGetActivities,
  handlerPostActivities
}