const toggleHamburgerAnimation = (toggleState) => {
  let bottomSVG = document.getElementById("svg-bottom-x");
  let topSVG = document.getElementById("svg-top-x");
  let middleSVG = document.getElementById("svg-middle-x");
  bottomSVG.setAttribute(
    "class",
    !toggleState ? "svg-bottom-collapse-x" : "svg-bottom-expand-x"
  );
  topSVG.setAttribute(
    "class",
    !toggleState ? "svg-top-collapse-x" : "svg-top-expand-x"
  );
  middleSVG.setAttribute(
    "class",
    !toggleState ? "svg-middle-collapse-x" : "svg-middle-expand-x"
  );
};
export default toggleHamburgerAnimation;
