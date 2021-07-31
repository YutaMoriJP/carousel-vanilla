import createElement from "./createElement";
import { addMultipleClasses } from "./addAttribute";

const Image = attributes => {
  const img = createElement("button");
  addMultipleClasses(img, attributes);
  return img;
};

export default Image;
