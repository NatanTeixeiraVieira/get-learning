const slugGenerator = (value: string, lowercase = false) => {
  const slug = value
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (lowercase) {
    return slug.toLocaleLowerCase();
  }
  return slug;
};

export default slugGenerator;
