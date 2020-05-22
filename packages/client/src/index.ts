// @ts-ignore
import Asd20Notifications from './components/Asd20Notifications.vue'
import sayHello from './functions/sayHello'
import {notifications, init } from './functions/initPlugins'
// @ts-ignore
import wrap from '@vue/web-component-wrapper'

// Install the web component
(async function() {
  const w:any = (typeof window !== undefined) ? window : undefined
  if (typeof w !== undefined) {
    if (typeof w.Vue !== undefined) {
      window.customElements.define('asd20-notifications', wrap(w.Vue, Asd20Notifications))
    } else {
      console.error('Cannot install web components, Vue is not in global namespace')
    }
  }
})()

export {
  init,
  notifications,
  sayHello,
  Asd20Notifications
}