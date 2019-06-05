const DOM = {
  id(id) {
    return document.getElementById(id)
  },
  create(element) {
    return document.createElement(element)
  }
}

export {
  DOM as default
}