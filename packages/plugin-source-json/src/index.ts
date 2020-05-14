/* eslint-disable @typescript-eslint/ban-ts-ignore */
import jsonSourcePlugin from './plugin'
;(async function (): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w: any = typeof window !== undefined ? window : undefined
  if (typeof w !== undefined) {
    if (typeof w.Asd20NotificationsClient !== undefined) {
      // @ts-ignore
      window.Asd20NotificationsClient.registerSourcePlugin(jsonSourcePlugin)
    }
  }
})()

export { jsonSourcePlugin }
