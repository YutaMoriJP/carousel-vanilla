import Container from "./Container";
import Text from "./Text";
import append from "./append";
import Link from "./Link";

const Header = txt => {
  const Wrapper = Container("div", { class: "headWrapper" });
  const text = Text(txt, "p");
  const link = Link({
    href: "https://react-carousel-ui.netlify.app/",
    target: "_blank",
    rel: "noreferrer",
  });
  append(Wrapper, text);
  append(Wrapper, link);

  return Wrapper;
};

export default Header;
