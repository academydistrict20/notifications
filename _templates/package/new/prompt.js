module.exports = [
  {
    type: 'input',
    name: 'pkg',
    message: "Package Name (@asd20/notifications-???)"
  },
  {
    type: 'input',
    name: 'desc',
    message: "Description"
  },
  {
    type: 'toggle',
    name: 'useVueComponents',
    message: "Create example Vue component?"
  },
  {
    type: 'toggle',
    name: 'useHelperFunctions',
    message: "Create example function?"
  }
]
