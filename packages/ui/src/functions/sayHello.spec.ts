import sayHello from './sayHello'

it('has events', () => {
  expect(sayHello('World')).toMatch('Hello World, I\'m the ui package')
})
