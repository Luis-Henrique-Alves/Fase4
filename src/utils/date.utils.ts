
export const formatarDataBR = (data: string): string => {
  if (!data) return '';

  const dataLimpa = data.split('T')[0];

  const partes = dataLimpa.split('-');

  if (partes.length !== 3) return '';

  const [ano, mes, dia] = partes;

  return `${dia}/${mes}/${ano}`;
};

export const converterDataParaAPI = (data: string): string | null => {
  const partes = data.split('/');

  if (partes.length !== 3) return null;

  const [dia, mes, ano] = partes;

  if (!/^\d{2}$/.test(dia) ||
      !/^\d{2}$/.test(mes) ||
      !/^\d{4}$/.test(ano)) {
    return null;
  }

  const diaNumero = Number(dia);
  const mesNumero = Number(mes);
  const anoNumero = Number(ano);

  const dataValidada = new Date(
    Date.UTC(anoNumero, mesNumero - 1, diaNumero)
  );

  if (
    dataValidada.getUTCFullYear() !== anoNumero ||
    dataValidada.getUTCMonth() !== mesNumero - 1 ||
    dataValidada.getUTCDate() !== diaNumero
  ) {
    return null;
  }

  return `${ano}-${mes}-${dia}`;
};
