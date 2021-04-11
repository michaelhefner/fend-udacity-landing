/**************************************
 * Import Statements
 *************************************/
import toggleHamburgerAnimation from "./hamburger.js";
import createElement from "./createElement.js";
import swipeListener from "./swipe.js";

/**************************************
 * Initialize variables
 *************************************/
let navToggle = false;

const sectionList = [
  { id: "section1", content: "Section 1" },
  { id: "section2", content: "Section 2" },
  { id: "section3", content: "Section 3" },
];

const colors = ["#DEBDA6", "#D0DEA6", "#DFCCBE", "#A6D9DE", "#D0B1DE"];
const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

/**************************************
 * Initialize styles
 *************************************/

const sectionStyle = [
  { width: "100%" },
  { minHeight: "100vh" },
  { display: "flex" },
  { justifyContent: "center" },
  { alignItems: "center" },
  { maxWidth: "100%" },
];

const liStyle = [{ width: "100%" }, { textAlign: "center" }];

const aStyle = [
  { width: "100%" },
  { height: "100%" },
  { padding: "10px 0" },
  { display: "block" },
];

const buttonStyle = [
  { margin: "auto" },
  { border: "none" },
  { backgroundColor: "#54aaf0" },
  { color: "white" },
  { boxShadow: "0 0 4px rgba(0,0,0, .5)" },
  { padding: "10px" },
  { display: "block" },
];

const navStyle = [
  { backgroundColor: "#fbfbfb" },
  { width: "100vw" },
  { alignSelf: "flex-end" },
  { marginTop: "auto" },
  { padding: "10px 0" },
  { display: "none" },
];

const ulStyle = [
  { display: "flex" },
  { flexDirection: "column" },
  { width: "100%" },
  { justifyContent: "space-around" },
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
  sectionStyle.push({
    backgroundColor: colors[sectionCount > 4 ? sectionCount - 4 : sectionCount],
  });

  /**************************************
   * Create DOM elements on initial load
   * using the createElement module
   *************************************/
  createElement(document, "ul", {
    tag: "li",
    id: `li-section${sectionCount}`,
    style: liStyle,
  });
  createElement(document, `#li-section${sectionCount}`, {
    tag: "a",
    content: `Section ${sectionCount}`,
    href: `#section${sectionCount}`,
    click: toggleNav,
    style: aStyle,
  });
  createElement(document, "main", {
    tag: "section",
    id: `section${sectionCount}`,
    style: sectionStyle,
  });

  createElement(document, `#section${sectionCount}`, {
    tag: "p",
    content: defaultContent,
  });
};

/**************************************
 * Show / Hide Header and Footer
 *************************************/

const hideTimer = (timeout) => {
  setTimeout(() => {
    console.log("hideNav");
    document.getElementsByTagName("header")[0].style.opacity = "0";
    document.getElementsByTagName("footer")[0].style.opacity = "0";
  }, timeout);
};

const showTimer = (timeout) => {
  document.getElementsByTagName("header")[0].style.opacity = "1";
  document.getElementsByTagName("footer")[0].style.opacity = "1";
  hideTimer(timeout);
};
/**************************************
 * Wait for DOM to be loaded
 *************************************/
document.addEventListener("DOMContentLoaded", () => {
  /**************************************
   * Start scroll listeners
   *************************************/
  function scrollStart() {
    showTimer(3000);
  }

  function scrollEnd() {
    hideTimer(2000);
  }

  document.addEventListener("scrollStart", scrollStart);
  document.addEventListener("scrollEnd", scrollEnd);

  document.addEventListener("scroll", scrollStart);

  /**************************************
   * End scroll listener
   *************************************/

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
    style: navStyle,
  });

  createElement(document, "nav", {
    tag: "ul",
    style: ulStyle,
  });

  createElement(document, "ul", {
    tag: "li",
    id: "add-section",
    style: liStyle,
  });

  createElement(document, `#add-section`, {
    tag: "button",
    content: "Add Section",
    click: addSection,
    style: buttonStyle,
  });

  for (let index of sectionList) {
    const sectionCount = sectionList.indexOf(index);
    sectionStyle.push({ backgroundColor: colors[sectionCount] });

    createElement(document, "ul", {
      tag: "li",
      id: `li-${index.id}`,
      style: liStyle,
    });

    createElement(document, `#li-${index.id}`, {
      tag: "a",
      content: index.content,
      href: `#${index.id}`,
      click: toggleNav,
      style: aStyle,
    });

    createElement(document, "main", {
      tag: "section",
      id: index.id,
      style: sectionStyle,
    });

    createElement(document, `#${index.id}`, {
      tag: "p",
      content: defaultContent,
    });
  }

  document.getElementById("hamburger").addEventListener("click", toggleNav);
});
