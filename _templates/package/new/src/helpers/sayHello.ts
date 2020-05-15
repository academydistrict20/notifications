---
to: "<%= useHelperFunctions ? `packages/${h.changeCase.param(pkg)}/src/helpers/sayHello.ts` : null %>"
---
export default function sayHello(name:string) {
  return `Hello ${name}, I'm the <%= pkg %> package`
}