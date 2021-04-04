/**************************************
 * Import Statements
 *************************************/
import toggleHamburgerAnimation from "./hamburger.js";
import createElement from "./createElement.js";

/**************************************
 * Initialize variables
 *************************************/
let navToggle = false;

const sectionList = [
  { id: "section1", content: "Section 1" },
  { id: "section2", content: "Section 2" },
  { id: "section3", content: "Section 3" },
];

/**************************************
 * Toggle Navbar Visibility
 *************************************/
const toggleNav = () => {
  const navbar = document.getElementById("navbar");
  console.log(navToggle);
  navToggle = !navToggle;
  navToggle ? (navbar.style.display = "flex") : (navbar.style.display = "none");
  toggleHamburgerAnimation(navToggle);
};

/**************************************
 * Add Section helper class Nav list
 * item and create section in main
 * content
 *************************************/
const addSection = () => {
  
  /**************************************
   * Get nav list item count
   *************************************/
  const sectionCount = document.getElementsByTagName("li").length;

  /**************************************
   * Create DOM elements on initial load
   * using the createElement module
   *************************************/
  createElement(document, "ul", {
    tag: "li",
    id: `li-section${sectionCount}`,
    style: [{ width: "100%" }, { textAlign: "center" }, { margin: "10px 0" }],
  });
  createElement(document, `#li-section${sectionCount}`, {
    tag: "a",
    content: `Section ${sectionCount}`,
    href: `#section${sectionCount}`,
    click: toggleNav,
    style: [
      { width: "100%" },
      { height: "100%" },
      { padding: "10px 0" },
      { display: "block" },
      { color: "white" },
    ],
  });
  createElement(document, "main", {
    tag: "section",
    id: `section${sectionCount}`,
    style: [
      { width: "100%" },
      { minHeight: "30vh" },
      { padding: "25px 0" },
      { maxWidth: "100%" },
    ],
  });
};

/**************************************
 * Wait for DOM to be loaded
 *************************************/
document.addEventListener("DOMContentLoaded", () => {
  /**************************************
   * Hamburger for nav visibility toggle
   *************************************/
  document
    .getElementById("hamburger")
    .addEventListener("click", toggleHamburgerAnimation);

  /**************************************
   * Create DOM elements on initial load
   * using the createElement module
   *************************************/
  createElement(document, "header", {
    tag: "nav",
    id: "navbar",
    style: [
      { backgroundColor: "#1d048b" },
      { width: "100vw" },
      { alignSelf: "flex-end" },
      { marginTop: "auto" },
      { display: "none" },
    ],
  });

  createElement(document, "nav", {
    tag: "ul",
    style: [
      { display: "flex" },
      { flexDirection: "column" },
      { width: "100%" },
      { justifyContent: "space-around" },
    ],
  });
  createElement(document, "ul", {
    tag: "li",
    id: "add-section",
    style: [{ width: "100%" }, { textAlign: "center" }, { margin: "10px 0" }],
  });
  createElement(document, `#add-section`, {
    tag: "button",
    content: "Add Section",
    click: addSection,
    style: [
      { width: "100%" },
      { height: "100%" },
      { padding: "10px 0" },
      { display: "block" },
      { color: "white" },
    ],
  });

  for (let index of sectionList) {
    createElement(document, "ul", {
      tag: "li",
      id: `li-${index.id}`,
      style: [{ width: "100%" }, { textAlign: "center" }, { margin: "10px 0" }],
    });
    createElement(document, `#li-${index.id}`, {
      tag: "a",
      content: index.content,
      href: `#${index.id}`,
      click: toggleNav,
      style: [
        { width: "100%" },
        { height: "100%" },
        { padding: "10px 0" },
        { display: "block" },
        { color: "white" },
      ],
    });
    createElement(document, "main", {
      tag: "section",
      id: index.id,
      style: [
        { width: "100%" },
        { minHeight: "30vh" },
        { padding: "25px 0" },
        { maxWidth: "100%" },
      ],
    });
  }

  document.getElementById("hamburger").addEventListener("click", toggleNav);
});
