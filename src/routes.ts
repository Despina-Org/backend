import { Router } from 'express';

import UserController from './controllers/User';

const route = Router();

route
  .get('/users', UserController.findAll)
  .post('/users', UserController.create)
  .get('/users/:id', UserController.findOne)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.delete);

export default route;
