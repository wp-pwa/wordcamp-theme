export default {
  test: ({ tagName, attributes }) =>
    tagName === 'aside' &&
    attributes &&
    attributes.className &&
    attributes.className.includes('gaz_relnot'),
  converter: () => null
};
