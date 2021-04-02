import toggleHamburgerAnimation from './hamburger.js';

const createElement = (doc, parent, docData) => {
  const newElement = doc.createElement(docData.tag);
  if (docData.style) {
    docData.style.forEach((element) => {
      newElement.style[element.name] = element.value;
    });
  }
  if (docData.href) {
    newElement.setAttribute("href", docData.href);
  }
  if (docData.id) newElement.setAttribute("id", docData.id);
  newElement.addEventListener("click", docData.click);
  newElement.innerText = docData.content || "";
  document.querySelector(parent).appendChild(newElement);
};
let navToggle = false;

const toggleNav = () => {
  const navbar = document.getElementById("navbar");
  console.log(navToggle);
  navToggle = !navToggle;
  navToggle ? (navbar.style.display = "flex") : (navbar.style.display = "none");
  toggleHamburgerAnimation(navToggle);

};

let sectionList = [{id:"section1", content: "Section 1"}, {id:"section2", content: "Section 2"},{id: "section3", content: "Section 3"}]
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("hamburger").addEventListener("click", toggleHamburgerAnimation);
  createElement(document, "header", {
    tag: "nav",
    id: "navbar",
    style: [
      { name: "backgroundColor", value: "#1d048b" },
      { name: "width", value: "100vw" },
      { name: "alignSelf", value: "flex-end" },
      { name: "marginTop", value: "auto" },
      { name: "display", value: "none" },
    ],
  });

  createElement(document, "nav", {
    tag: "ul",
    style: [
      { name: "display", value: "flex" },
      { name: "flexDirection", value: "column" },
      { name: "width", value: "100%" },
      { name: "justifyContent", value: "space-around" },
    ],
  });

  for (let index of sectionList) {
    createElement(document, "ul", {
      tag: "li",
      id: `li-${index.id}`,
      style: [
        { name: "width", value: "100%" },
        { name: "textAlign", value: "center" },
        { name: "margin", value: "10px 0" },
      ],
    });
    createElement(document, `#li-${index.id}`, {
      tag: "a",
      content: index.content,
      href: `#${index.id}`,
      click: toggleNav,
      style: [
        { name: "width", value: "100%" },
        { name: "height", value: "100%" },
        { name: "padding", value: "10px 0" },
        { name: "display", value: "block" },
        { name: "color", value: "white" },
      ],
    });
    createElement(document, "main", {
      tag: "section",
      id: index.id,
      style: [
        { name: "width", value: "100%" },
        { name: "minHeight", value: "30vh" },
        { name: "padding", value: "25px 0" },
        { name: "maxWidth", value: "100%" },
      ],
    });
  }

  document.getElementById("hamburger").addEventListener("click", toggleNav);
});
