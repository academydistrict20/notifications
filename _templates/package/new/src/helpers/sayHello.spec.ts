---
to: "<%= useHelperFunctions ? `packages/${h.changeCase.param(pkg)}/src/helpers/sayHello.spec.ts` : null %>"
---
import sayHello from './sayHello'

it('has events', () => {
  expect(sayHello('World')).toMatch('Hello World, I\'m the <%= pkg %> package')
})
