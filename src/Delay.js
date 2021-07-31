import addAttribute, { addMultipleClasses } from "./addAttribute";

const counter = (initial = 0) => {
  let count = initial;
  return {
    getCount: () => count,
    increment: () => ++count,
    reset: () => (count = 0),
  };
};

const delay = (elements, start, buttons) => {
  let { getCount, increment, reset } = counter(start);
  console.log("newCount is", getCount());
  console.log("current elements", elements);
  const intervalID = setInterval(() => {
    //control flow that manages count logic
    //i.e. ensures count does not go higher than 2
    //if 2, count gets reset to 0.
    if (getCount() >= 2) {
      reset();
    } else {
      increment();
    }
    //count is updated, so img points at image that should be visible
    let count = getCount();
    const img = elements[count];
    const currentButton = buttons[count];

    //this if statement hides previous image
    if (count === 0) {
      //hides previous image element
      //if new count is 0, then previous image must be 2
      const hiddenElement = elements[2];
      const previousButton = buttons[2];
      //addAttribute(hiddenElement, "class", "hidden");
      addMultipleClasses(hiddenElement, {
        class: "hidden",
        "aria-hidden": true,
      });
      previousButton.removeAttribute("class");
    } else {
      //if count is not 0, then simply subtract new count by one
      let newCount = count - 1;
      const hiddenElement = elements[newCount];
      const previousButton = buttons[newCount];
      // addAttribute(hiddenElement, "class", "hidden");
      addMultipleClasses(hiddenElement, {
        class: "hidden",
        "aria-hidden": true,
      });
      previousButton.removeAttribute("class");
    }

    //after hiding previous image, new is shown
    addMultipleClasses(img, {
      class: "visible",
      "aria-hidden": false,
    });
    addAttribute(currentButton, "class", "currentButton");

    console.log("updated elements", elements);
  }, 2000);
  return intervalID;
};

export default delay;
