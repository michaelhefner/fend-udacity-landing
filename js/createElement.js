const createElement = (doc, parent, docData) => {
  const newElement = doc.createElement(docData.tag);
  if (docData.style) {
    docData.style.forEach((element) => {
      for (let el in element) {
        newElement.style[el] = element[el];
      }
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

export default createElement;
