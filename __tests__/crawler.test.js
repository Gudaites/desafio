/* eslint-disable no-undef */
import request from 'supertest';
import app from '../src/app';

describe('Test crawler API', () => {
  it('should succeeds with correct url', async () => {
    await request(app)
      .post('/')
      .send({ url: 'https://www.smartmei.com.br/' })
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          planoProfissional: {
            cobranca: 'R$ 5,00 por boleto pago.',
            trasnferencia: 'R$ 7,00',
            mensalidade: 'R$ 15,00 *pagando R$45,00 trimestre',
          },
        });
      });
  });

  it('should fail with incorrect url', async () => {
    await request(app)
      .post('/')
      .send({ url: 'https://www.smartmeit.com/' })
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: 'URL solicitada nao encontrada',
        });
      });
  });

  it('should fail with correct url, but not have right information', async () => {
    await request(app)
      .post('/')
      .send({ url: 'https://www.facebook.com/' })
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          error: 'Nenhuma informação de plano profissional encontrada.',
        });
      });
  });
});
