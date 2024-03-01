// attributes = [{ name: ?, value: ?}]
const createElement = (tag, innerText, attributes) => {
    const el = document.createElement(tag);
    if (attributes) {
      attributes.forEach((attr) => {
        el.setAttribute(attr.name, attr.value);
      });
    }
  
    el.innerText = innerText;
    return el;
  };

  
  