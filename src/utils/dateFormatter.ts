export const dateFormatter = (date: string) => {
  return new Date(date).toLocaleString('default', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};
