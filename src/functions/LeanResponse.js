import cheerio from 'cheerio';

const LeanResponse = async html => {
  const $ = await cheerio.load(html);
  const cobranca = $('.tarifas-2-1-2').text();
  const transferencia = $('.tarifas-2-2-2').text();
  const mensalidade = $('.tarifas-2-4-2').text();

  if (!cobranca && !transferencia && !mensalidade) {
    return { error: 'Nenhuma informação de plano profissional encontrada.' };
  }

  const cobrancaFormatada = cobranca.trimLeft().trimRight();
  const transferenciaFormatada = transferencia.trimLeft().trimRight();
  const mensalidadeFormatada = mensalidade
    .trimLeft()
    .trimRight()
    .replace('\n', ' ')
    .replace('/', ' ');

  return {
    planoProfissional: {
      cobranca: cobrancaFormatada,
      trasnferencia: transferenciaFormatada,
      mensalidade: mensalidadeFormatada,
    },
  };
};

export default LeanResponse;
