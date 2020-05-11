---
to: packages/<%= h.changeCase.snake(pkg) %>/src/index.ts
---
// @ts-ignore
import Asd20SayHello from './components/Asd20SayHello.vue'
import sayHello from './functions/sayHello'
// @ts-ignore
import wrap from '@vue/web-component-wrapper'

// Install the web component
(async function() {
  const w:any = (typeof window !== undefined) ? window : undefined
  if (typeof w !== undefined) {
    if (typeof w.Vue !== undefined) {
      window.customElements.define('asd20-say-hello', wrap(w.Vue, Asd20SayHello))
    } else {
      console.error('Cannot install web components, Vue is not in global namespace')
    }
  }
})()

export {
  sayHello,
  Asd20SayHello
}