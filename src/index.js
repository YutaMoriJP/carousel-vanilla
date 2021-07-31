import "./styles.css";
import Carousel from "./Carousel"; //Carousel UI
import Header from "./Header"; //header text - brief explanation
import append from "./append"; //appends to given root

const root = document.getElementById("app");

append(root, Header("Carousel UI achieved with Vanilla JS."));
append(root, Carousel());
