import axios from 'axios';
import LeanResponse from '../functions/LeanResponse';

class JsonController {
  async index(req, res) {
    const { url } = req.body;
    try {
      const $ = await axios.get(url);
      const objectReturn = await LeanResponse($.data);

      if (objectReturn.error) {
        return res.json(objectReturn);
      }

      return res.json(objectReturn);
    } catch (error) {
      return res.status(400).json({ error: 'URL solicitada nao encontrada' });
    }
  }
}

export default new JsonController();
