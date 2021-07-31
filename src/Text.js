import createElement from "./createElement";
import { addMultipleClasses } from "./addAttribute";

const Text = (txt = "", type = "p", attributes = {}) => {
  const text = createElement(type);
  text.textContent = txt;
  addMultipleClasses(text, attributes);
  return text;
};

export default Text;
