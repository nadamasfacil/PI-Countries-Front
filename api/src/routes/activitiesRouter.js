const { Router } = require('express');
const { handlersGetActivities, handlerPostActivities } = require('../handlers/handlersActivities');
const { validatePostActivity } = require('../helpers/activitiesvalidate');

const activitiesRouter = Router();

activitiesRouter.get('/', handlersGetActivities);
activitiesRouter.post('/', validatePostActivity, handlerPostActivities);


module.exports = activitiesRouter;
