import { addMultipleClasses } from "./addAttribute";

const counter = (initial = 0) => {
  let count = initial;
  return {
    getCount: () => count,
    increment: () => ++count,
    reset: () => (count = 0),
  };
};

const delay = (elements, start) => {
  let { getCount, increment, reset } = counter(start);
  console.log("newCount is", getCount());
  console.log("current elements", elements);
  const intervalID = setInterval(() => {
    if (getCount() >= 2) {
      reset();
    } else {
      increment();
    }
    const img = elements[getCount()];
    let count = getCount();
    if (count === 0) {
      const hiddenElement = elements[2];
      //addAttribute(hiddenElement, "class", "hidden");
      addMultipleClasses(hiddenElement, {
        class: "hidden",
        "aria-hidden": true,
      });
    } else {
      let newCount = count - 1;
      const hiddenElement = elements[newCount];
      // addAttribute(hiddenElement, "class", "hidden");
      addMultipleClasses(hiddenElement, {
        class: "hidden",
        "aria-hidden": true,
      });
    }
    addMultipleClasses(img, {
      class: "visible",
      "aria-hidden": false,
    });
    console.log("updated elements", elements);
  }, 2000);
  return intervalID;
};

export default delay;
