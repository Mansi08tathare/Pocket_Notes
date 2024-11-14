// utils.js
export const getAbbreviation = (name) => {
  if (!name) return '';
  const words = name.split(' ');
  return words.length === 1
    ? words[0].slice(0, 2).toUpperCase()
    : words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
};
