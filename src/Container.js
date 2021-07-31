import createElement from "./createElement";
import { addMultipleClasses } from "./addAttribute";

const Container = (element, attributes) => {
  const container = createElement(element);
  addMultipleClasses(container, attributes);
  return container;
};

export default Container;
