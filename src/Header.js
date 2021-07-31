import Container from "./Container";
import Text from "./Text";
import append from "./append";

const Header = txt => {
  const Wrapper = Container("div", { class: "headWrapper" });
  const text = Text(txt, "p");
  append(Wrapper, text);
  return Wrapper;
};

export default Header;
