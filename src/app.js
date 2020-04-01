import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

app.use(express.json());

const LeanResponde = html => {
  const $ = cheerio.load(html);
  const cobranca = $('.tarifas-2-1-2').text();
  const transferencia = $('.tarifas-2-2-2').text();
  const saque = $('.tarifas-2-3-2').text();
  const mensalidade = $('.tarifas-2-4-2').text();

  const cobrancaFormatada = cobranca.trimLeft().trimRight();
  const transferenciaFormatada = transferencia.trimLeft().trimRight();
  const saqueFormatada = saque.trimLeft().trimRight();
  const mensalidadeFormatada = mensalidade
    .trimLeft()
    .trimRight()
    .replace('\n', ' ')
    .replace('/', ' ');

  return {
    planoProfissional: {
      cobranca: cobrancaFormatada,
      trasnferencia: transferenciaFormatada,
      saque: saqueFormatada,
      mensalidade: mensalidadeFormatada,
    },
  };
};

const SearchPlans = async LeanResponse => {
  const response = await axios({
    url: 'https://www.smartmei.com.br/',
    method: 'get',
  });
  const objectReturn = await LeanResponse(response.data);
  return objectReturn;
};

app.get('/', async function(req, res) {
  try {
    const teste = await SearchPlans(LeanResponde);
    return res.json(teste);
  } catch (err) {
    return res.json({ error: 'Aconteceu algum erro' });
  }
});

app.listen('3333');
module.exports = app;
