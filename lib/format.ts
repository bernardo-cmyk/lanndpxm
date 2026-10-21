const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export const formatMXN = (pesos: number) => `${mxn.format(pesos)} MXN`;
