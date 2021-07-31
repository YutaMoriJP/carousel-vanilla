const addClass = (element, key, value) => element.setAttribute(key, value);

export const addMultipleClasses = (element, attributes) =>
  Object.entries(attributes).map(([key, value]) => {
    addClass(element, key, value);
    return element;
  });

export default addClass;
