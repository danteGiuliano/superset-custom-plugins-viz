function calculateValue(rows: any[], metric: string, mode: string) {
  const values = rows
    .map(r => Number(r[metric]))
    .filter(v => !isNaN(v));

  if (!values.length) return 0;

  switch (mode) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0);
    case 'avg':
      return values.reduce((a, b) => a + b, 0) / values.length;
    case 'max':
      return Math.max(...values);
    case 'min':
      return Math.min(...values);
    case 'count':
      return values.length;
    default:
      return values[0];
  }
}
