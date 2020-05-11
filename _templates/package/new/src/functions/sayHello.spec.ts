---
to: packages/<%= h.changeCase.snake(pkg) %>/src/functions/sayHello.spec.ts
---
import sayHello from './sayHello'

it('has events', () => {
  expect(sayHello('World')).toMatch('Hello World, I\'m the <%= pkg %> package')
})
