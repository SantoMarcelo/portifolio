/** Arredonda para 2 casas decimais (evita erros de ponto flutuante em valores monetários). */
export const round2 = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
