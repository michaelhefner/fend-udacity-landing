/********************************************************************
 * Import Statements
 *******************************************************************/

import toggleHamburgerAnimation from "./hamburger.js";
import createElement from "./createElement.js";

/********************************************************************
 * Initialize variables
 *******************************************************************/

let navToggle = false;
let sectionStyle = [];

const sectionList = [
  { id: "section1", content: "Section 1" },
  { id: "section2", content: "Section 2" },
  { id: "section3", content: "Section 3" },
];

let activeSection = "section1";

const colors = ["#DEBDA6", "#D0DEA6", "#DFCCBE", "#A6D9DE", "#D0B1DE"];
const defaultContent = `Lorem ipsum dolor sit amet, consectetur adipiscing 
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
  ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
  culpa qui officia deserunt mollit anim id est laborum.`;

/******************************************************************
 * Show / Hide Header and Footer
 *****************************************************************/
let timer;
const hideTimer = () =>
  (timer = setTimeout(() => {
    document.getElementsByTagName("header")[0].style.opacity = "0";
    document.getElementsByTagName("footer")[0].style.opacity = "0";
  }, 6000));

const showElements = (timeout) => {
  clearTimeout(timer);
  document.getElementsByTagName("header")[0].style.opacity = "1";
  document.getElementsByTagName("footer")[0].style.opacity = "1";
  hideTimer(timeout);
};

/******************************************************************
 * Wait for DOM to be loaded
 *****************************************************************/

document.addEventListener("DOMContentLoaded", () => {
  let isMobileView = window.innerWidth < 768;

  /******************************************************************
   * Toggle Navbar Visibility
   *****************************************************************/

  const toggleNav = () => {
    if (isMobileView) {
      const navbar = document.getElementById("navbar");
      navToggle = !navToggle;
      navToggle
        ? (navbar.style.display = "flex")
        : (navbar.style.display = "none");
      toggleHamburgerAnimation(navToggle);
    }
  };

  /******************************************************************
   * Start scroll listeners
   *****************************************************************/

  function updateSection(e) {
    startShowTimer();
    const sections = document.getElementsByTagName("section");
    const currentY =
      e.target && e.target.scrollingElement
        ? e.target.scrollingElement.scrollTop
        : 0;
    for (let i = 0; i < sections.length; ++i) {
      const start =
        (sections[i].scrollHeight * (i + 1) - sections[i].scrollHeight) * 0.825;
      const end = sections[i].scrollHeight * (i + 1) * 0.825;
      if (currentY > start && currentY < end) {
        document.getElementById("section-display").innerHTML =
          sectionList[i].content;
        setSectionActive(
          document.getElementById(`li-${sectionList[i].id}`).childNodes[0]
        );
      }
    }
  }

  function startShowTimer() {
    showElements(6000);
  }

  function startHideTimer() {
    hideTimer();
  }
  document.addEventListener("scroll", updateSection);

  window.addEventListener("resize", (event) => {
    isMobileView = event.target.innerWidth < 768;

    if (isMobileView) {
      document.addEventListener("scrollEnd", startHideTimer);
      document.addEventListener("click", startShowTimer);
      document.addEventListener("mousemove", (event) =>
        event.clientY < 200 ? startShowTimer() : null
      );
      document.getElementById("navbar").style.display = "none";
    } else {
      document.getElementById("navbar").style.display = "flex";
    }
  });

  /******************************************************************
   * Set active section
   *****************************************************************/

  const setSectionActive = (element) => {
    const elements = document.getElementsByTagName("li");
    for (let li of elements) {
      li.childNodes[0].classList.remove("active");
    }
    element.classList.add("active");
  };

  const aTagClickHandler = (event) => {
    toggleNav();
    setSectionActive(event.target);
    document.getElementById(`section${event.target.id}`).scrollIntoView({behavior: "smooth"})
    document.getElementById("section-display").innerHTML = sectionList.find(
      (x) => `li-${x.id}` == event.target.parentNode.id
    ).content;
  };

  /******************************************************************
   * Hamburger for nav visibility toggle
   *****************************************************************/

  document
    .getElementById("hamburger")
    .addEventListener("click", toggleHamburgerAnimation);

  /******************************************************************
   * Add Section helper class Nav list
   * item and create section in main
   * content
   *****************************************************************/

  const addSection = () => {
    /****************************************************************
     * Get nav list item count
     ***************************************************************/

    const sectionCount = document.getElementsByTagName("li").length;
    sectionStyle.push({
      backgroundColor:
        colors[sectionCount > 4 ? sectionCount - 4 : sectionCount],
    });

    sectionList.push({
      id: `section${sectionCount}`,
      content: `Section ${sectionCount}`,
    });

    /****************************************************************
     * Create DOM elements on initial load
     * using the createElement module
     ***************************************************************/

    createElement(document, "ul", {
      tag: "li",
      id: `li-section${sectionCount}`,
    });
    createElement(document, `#li-section${sectionCount}`, {
      tag: "a",
      content: `Section ${sectionCount}`,
      id: `${sectionCount}`,
      click: aTagClickHandler,
    });
    createElement(document, "main", {
      tag: "section",
      id: `section${sectionCount}`,
      click: updateSection,
      style: sectionStyle,
    });

    createElement(document, `#section${sectionCount}`, {
      tag: "p",
      content: defaultContent,
    });
    toggleNav();
  };

  /******************************************************************
   * Create DOM elements on initial load
   * using the createElement module
   *****************************************************************/

  createElement(document, "header", {
    tag: "nav",
    id: "navbar",
  });

  createElement(document, "nav", {
    tag: "ul",
  });

  createElement(document, "ul", {
    tag: "li",
    id: "add-section",
  });

  createElement(document, `#add-section`, {
    tag: "button",
    content: "Add Section",
    click: addSection,
  });

  for (let index of sectionList) {
    const sectionCount = sectionList.indexOf(index);
    sectionStyle.push({ backgroundColor: colors[sectionCount] });

    createElement(document, "ul", {
      tag: "li",
      id: `li-${index.id}`,
    });

    createElement(document, `#li-${index.id}`, {
      tag: "a",
      content: index.content,
      id: sectionList.findIndex(x=>x.id === index.id) + 1,
      click: aTagClickHandler,
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
