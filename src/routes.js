const { Router } = require('express');
const projectController = require('../controllers/projectController');

const routes = Router();

routes.post('/projects', projectController.store)

routes.get('/projects', projectController.index)

routes.put(
    '/projects/:id', 
    projectController.checkProjectExist, 
    projectController.update
)

routes.delete(
    '/projects/:id', 
    projectController.checkProjectExist, 
    projectController.destroy
)

routes.post(
    '/projects/:id/tasks', 
    projectController.checkProjectExist, 
    projectController.updateTask
)

module.exports = routes;