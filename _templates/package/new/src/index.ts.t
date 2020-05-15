---
to: packages/<%= h.changeCase.param(pkg) %>/src/index.ts
---
/* eslint-disable @typescript-eslint/ban-ts-ignore */

<% if(useHelperFunctions){ -%>
import sayHello from './helpers/sayHello'
<% } -%>
<% if(useVueComponents){ -%>
// @ts-ignore
import Asd20SayHello from './components/Asd20SayHello.vue'
// @ts-ignore
import wrap from '@vue/web-component-wrapper'

// Install the web component
;(async function (): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w: any = typeof window !== undefined ? window : undefined
  if (typeof w !== undefined) {
    if (typeof w.Vue !== undefined) {
      window.customElements.define('asd20-say-hello', wrap(w.Vue, Asd20SayHello))
    } else {
      console.error('Cannot install web components, Vue is not in global namespace')
    }
  }
})()
<% } -%>

export {
<% if(useHelperFunctions){ -%>
  sayHello,
<% } -%>
<% if(useVueComponents){ -%>
  Asd20SayHello
<% } -%>
}
