import { Router } from 'express';
import axios from 'axios';

import LeanResponse from './functions/LeanResponse';

const routes = new Router();

routes.post('/', async (req, res) => {
  const { url } = req.body;

  const $ = await axios.get(url).catch(() => {
    return res.status(400).json({ error: 'URL não encontrada' });
  });
  try {
    const objectReturn = await LeanResponse($.data);
    if (objectReturn.error) {
      return res.status(400).json(objectReturn);
    }
    return res.json(objectReturn);
  } catch (error) {
    return res.status(400).json({ error: 'Aconteceu algum erro inesperado' });
  }
});

export default routes;
