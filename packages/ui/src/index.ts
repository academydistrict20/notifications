// @ts-ignore
import Asd20Notification from './components/Asd20Notification.vue'
// @ts-ignore
import Asd20NotificationGroup from './components/Asd20NotificationGroup.vue'
// @ts-ignore
import wrap from '@vue/web-component-wrapper'

// Install the web component
(async function() {
  const w:any = (typeof window !== undefined) ? window : undefined
  if (typeof w !== undefined) {
    if (typeof w.Vue !== undefined) {
      window.customElements.define('asd20-notification-group', wrap(w.Vue, Asd20NotificationGroup))
      window.customElements.define('asd20-notification', wrap(w.Vue, Asd20Notification))
    } else {
      console.error('Cannot install web components, Vue is not in global namespace')
    }
  }
})()

export {
  Asd20Notification,
  Asd20NotificationGroup
}