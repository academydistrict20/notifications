/* eslint-disable @typescript-eslint/ban-ts-ignore */

// Import vue component
// @ts-ignore
import Asd20NotificationsEmbed from './components/Asd20NotificationsEmbed.vue'

// Declare install function executed by Vue.use()
// @ts-ignore
export function install(Vue): void {
  // @ts-ignore
  if (install.installed) return
  // @ts-ignore
  install.installed = true
  Vue.component('Asd20NotificationsEmbed', Asd20NotificationsEmbed)
}

// Create module definition for Vue.use()
const plugin = {
  install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  // @ts-ignore
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  // @ts-ignore
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// // @ts-ignore
// import wrap from '@vue/web-component-wrapper'

// // Install the web component
// ;(async function (): Promise<void> {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const w: any = typeof window !== undefined ? window : undefined
//   if (typeof w !== undefined) {
//     if (typeof w.Vue !== undefined) {
//       window.customElements.define('asd20-notifications-embed', wrap(w.Vue, Asd20NotificationsEmbed))
//     } else {
//       console.error('Cannot install web components, Vue is not in global namespace')
//     }
//   }
// })()

// To allow use as module (npm/webpack/etc.) export component
export default Asd20NotificationsEmbed
