export const textFormatter = (description: string, characters = 100) => {
  return description.length < characters
    ? description
    : description.substring(0, characters).concat('...');
};
