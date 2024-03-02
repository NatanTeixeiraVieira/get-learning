export const dateFormatter = (date: string) => {
  return new Date(date).toLocaleString('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};
