const { Country, Activity } = require('../db');

const getAllActivities = async () => {
  const allActivities = await Activity.findAll({ 
    include: { 
      model: Country, 
      attibutes : ['id', 'name'],
      through: {
        attibutes: [],
      },
    }});
  return allActivities;
};

const postAvtivity = async (activity) => {
  let activityPost = await Activity.create(activity);
  const idActivity = activityPost.id;
  activityPost = await Activity.findByPk(idActivity, { include: {
    model: Country, 
    attibutes : ['id', 'name'],
    through: {
      attibutes: [],
    },
  }});
  return activityPost;
};

module.exports = {
  getAllActivities,
  postAvtivity,
}