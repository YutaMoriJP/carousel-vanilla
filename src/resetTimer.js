import { addMultipleClasses } from "./addAttribute";

import delay from "./Delay";

const reset = (id, elements, event) => {
  window.clearInterval(id);
  //use either getAttribute or dataset property
  //let newStart = event.target.getAttribute("data-number");
  let newStart = event.target.dataset.number;
  elements.forEach(element => {
    if (element.id === event.target.name) {
      addMultipleClasses(element, {
        class: "visible",
        "aria-hidden": false,
      });
    } else {
      addMultipleClasses(element, {
        class: "hidden",
        "aria-hidden": true,
      });
    }
  });
  console.log(newStart);
  const intervalID = delay(elements, newStart);
  return intervalID;
};

export default reset;
