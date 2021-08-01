import createElement from "./createElement";
import { addMultipleClasses } from "./addAttribute";

const Link = attributes => {
  const element = createElement("a");
  element.textContent = "See React Version";
  addMultipleClasses(element, attributes);
  return element;
};

export default Link;
