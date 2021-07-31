import addAttribute, { addMultipleClasses } from "./addAttribute";

import delay from "./Delay";

const reset = (id, elements, event, buttons) => {
  window.clearInterval(id);
  //use either getAttribute or dataset property
  //let newStart = event.target.getAttribute("data-number");
  let newStart = event.target.dataset.number;

  elements.forEach((element, index) => {
    if (element.id === event.target.name) {
      //event.target.name points at a string that describes the position of the button
      //that is equal to the position of the image (element.id)
      addMultipleClasses(element, {
        class: "visible",
        "aria-hidden": false,
      });
      //the index is the value of the current iteration
      //inside the if block, it's the position of the element that becomes visible
      //that can be used to change the style of the button - turn it black
      addAttribute(buttons[index], "class", "currentButton");
    } else {
      addMultipleClasses(element, {
        class: "hidden",
        "aria-hidden": true,
      });
      //same as above, but here, it's used to turn the button to grey
      //which is the previous image/button
      buttons[index].removeAttribute("class");
    }
  });
  const intervalID = delay(elements, newStart, buttons);
  return intervalID;
};

export default reset;
