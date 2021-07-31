const createElement = (type = "div") => document.createElement(type);

export const createManyElements = (...elements) => elements.map(createElement);

export default createElement;
