import "./styles.css";
import Carousel from "./Carousel"; //Carousel UI
import append from "./append"; //appends to given root

const root = document.getElementById("app");

append(root, Carousel());
