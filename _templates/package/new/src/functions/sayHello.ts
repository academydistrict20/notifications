---
to: packages/<%= h.changeCase.snake(pkg) %>/src/functions/sayHello.ts
---
export default function sayHello(name:string) {
  return `Hello ${name}, I'm the <%= pkg %> package`
}