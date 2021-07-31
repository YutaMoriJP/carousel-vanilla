import Image from "./Image";
import Button from "./Button";
import Container from "./Container";

import { appendMultiple } from "./append";
import imgOne from "./img/one.jpeg";
import imgTwo from "./img/two.jpeg";
import imgThree from "./img/three.jpeg";

import delay from "./Delay";
import reset from "./resetTimer";

const Carousel = () => {
  //wrappers
  const container = Container("div", { class: "wrapper" });
  const imgContainer = Container("div", { class: "center" });
  const btnContainer = Container("div", { class: "btnContainer" });

  //dom elements
  const images = [
    Image({
      src: imgOne,
      class: "visible",
      id: "imgOne",
      "aria-hidden": false,
    }),
    Image({ src: imgTwo, class: "hidden", id: "imgTwo", "aria-hidden": true }),
    Image({
      src: imgThree,
      class: "hidden",
      id: "imgThree",
      "aria-hidden": true,
    }),
  ];
  const buttons = [
    Button({ name: "imgOne", "data-number": 0 }),
    Button({ name: "imgTwo", "data-number": 1 }),
    Button({ name: "imgThree", "data-number": 2 }),
  ];

  //appending functions, like ReactDOM.render
  appendMultiple(imgContainer, images);
  appendMultiple(btnContainer, buttons);
  appendMultiple(container, [imgContainer, btnContainer]);

  //carousel functionality
  let intervalID = delay(images, 0);

  //buttion event handlers
  buttons.forEach(button => {
    button.addEventListener("click", event => {
      let id = intervalID;
      intervalID = reset(id, images, event);
    });
  });

  return container;
};

export default Carousel;
