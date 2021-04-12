const createElement = (doc, parent, docData) => {
  /**************************************
   * Create element on document loaded
   * in arguments.
   *************************************/

  const newElement = doc.createElement(docData.tag);

  /**************************************
   * Create style if one exists
   *************************************/

  if (docData.style) {
    docData.style.forEach((element) => {
      for (let el in element) {
        newElement.style[el] = element[el];
      }
    });
  }

  /**************************************
   * Create href if one exists
   *************************************/
  if (docData.href) {
    newElement.setAttribute("href", docData.href);
  }

  /**************************************
   * Create ID if one exists
   *************************************/
  if (docData.id) newElement.setAttribute("id", docData.id);

  /**************************************
   * Create click listener
   *************************************/
  newElement.addEventListener("click", docData.click);

  /**************************************
   * Create content
   *************************************/
  newElement.innerText = docData.content || "";

  /**************************************
   * Attach element to parent
   *************************************/
  document.querySelector(parent).appendChild(newElement);
};

export default createElement;
