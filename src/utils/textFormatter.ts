export const textFormatter = (text?: string, characters = 100) => {
  if (text) {
    return text.length > characters
      ? text.substring(0, characters).concat('...')
      : text;
  }
  return '';
};
