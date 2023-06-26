export const dateFormatter = (date: number) => {
  return new Date(date).toLocaleString('default', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};
