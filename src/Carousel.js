import Image from "./Image";
import Button from "./Button";
import Container from "./Container";
import Header from "./Header";

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
  const headContainer = Header(
    "Carousel UI achieved with Vanilla JS. The image rotates to the next one after 2 seconds, or by clicking the button below the image."
  );

  //dom elements, images and button
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
    Button({ name: "imgOne", "data-number": 0, class: "currentButton" }),
    Button({ name: "imgTwo", "data-number": 1 }),
    Button({ name: "imgThree", "data-number": 2 }),
  ];

  //appending functions, like ReactDOM.render
  appendMultiple(imgContainer, images);
  appendMultiple(btnContainer, buttons);
  //appends ALL Components to Container
  appendMultiple(container, [headContainer, imgContainer, btnContainer]);

  //carousel functionality
  let intervalID = delay(images, 0, buttons);

  //buttion event handlers
  buttons.forEach(button => {
    button.addEventListener("click", event => {
      let id = intervalID;
      intervalID = reset(id, images, event, buttons);
    });
  });

  return container;
};

export default Carousel;
