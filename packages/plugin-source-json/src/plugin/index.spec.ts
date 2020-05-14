import jsonSourcePlugin, { JsonSourceItem } from '.'
import { Notification } from '@asd20/notifications-shared/dist/types'

const sourceItems: JsonSourceItem[] = [
  {
    id: '10000000-0000-0000-0000-000000000000',
    title: 'Notification 1',
    summary: 'Summary',
    description: 'Description',
    startDateTime: '2020-05-14T21:02:15.716Z',
    endDateTime: '2020-05-14T21:02:15.716Z',
    categories: ['Emergency'],
  },
  {
    id: '20000000-0000-0000-0000-000000000000',
    title: 'Notification 2',
    summary: 'Summary',
    description: 'Description',
    startDateTime: '2020-05-14T21:02:15.716Z',
    endDateTime: '2020-05-14T21:02:15.716Z',
    categories: ['Urgent'],
  },
]

const notification: Notification = {
  id: '10000000-0000-0000-0000-000000000000',
  title: 'Notification 1',
  summary: 'Summary',
  description: 'Description',
  startDateTime: '2020-05-14T21:02:15.716Z',
  endDateTime: '2020-05-14T21:02:15.716Z',
  categories: ['Emergency'],
}

describe('loadSourceItems', () => {
  it('is present', () => {
    expect(jsonSourcePlugin.loadSourceItems).toBeDefined()
  })
  it('returns results', async () => {
    jsonSourcePlugin.loadSourceItems = jest.fn().mockResolvedValue(sourceItems)
    const items = await jsonSourcePlugin.loadSourceItems('https://website.com/notifications.json')
    expect(items.length).toEqual(2)
  })
})

describe('mapSourceItemToNotification', () => {
  it('maps correctly', () => {
    expect(jsonSourcePlugin.mapSourceItemToNotification(sourceItems[0])).toEqual(notification)
  })
})

describe('groupNotificationIntoTypes', () => {
  it('places notifications in the correct type', () => {
    const notifications = sourceItems.map(jsonSourcePlugin.mapSourceItemToNotification)
    const notificationsByType = jsonSourcePlugin.groupNotificationsByType(notifications)
    expect(notificationsByType.banner).toBeDefined()
    expect(notificationsByType.banner).toHaveLength(1)
    expect(notificationsByType.floating).toBeDefined()
    expect(notificationsByType.floating).toHaveLength(1)
  })
})
