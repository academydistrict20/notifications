/* eslint-disable @typescript-eslint/ban-ts-ignore */
import Create from './plugin'
// TODO: Consider if we want to auto load plugins
// ;(async function (): Promise<void> {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const w: any = typeof window !== undefined ? window : undefined
//   if (typeof w !== undefined) {
//     if (typeof w.Asd20NotificationsClient !== undefined) {
//       // @ts-ignore
//       window.Asd20NotificationsClient.registerSourcePlugin(Create())
//     }
//   }
// })()

export { Create }
