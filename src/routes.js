import { Router } from 'express';
import JsonController from './controllers/JsonController';

const routes = new Router();

routes.post('/', JsonController.index);

export default routes;
