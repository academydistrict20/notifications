import fetchMock from 'jest-fetch-mock'
import CreatePlugin from './index'
import { Notification } from '@asd20/notifications-shared/dist/types'

const sourceItems = [
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

const notifications: Notification[] = [
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

let jsonPlugin = CreatePlugin({
  endpoint: 'https://site.com/my.json',
  dataTransformer: (d) => d,
})

describe('load', () => {
  beforeEach(() => {
    fetchMock.enableMocks()
    fetchMock.resetMocks()
  })
  it('is present', () => {
    expect(jsonPlugin.load).toBeDefined()
  })

  it('returns empty array if config is missing', async () => {
    jsonPlugin = CreatePlugin()
    const items = await jsonPlugin.load()
    expect(Array.isArray(items)).toBeTruthy()
    expect(items).toHaveLength(0)
  })

  it('calls fetch', async () => {
    jsonPlugin = CreatePlugin({
      endpoint: 'https://site.com/my.json',
    })
    fetchMock.mockResponseOnce(JSON.stringify(sourceItems))
    await jsonPlugin.load()
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual('https://site.com/my.json')
  })
  it('data is transformed', async () => {
    jsonPlugin = CreatePlugin({
      endpoint: 'https://site.com/my.json',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dataTransformer: (d: any) => d.values,
    })
    fetchMock.mockResponseOnce(JSON.stringify({ values: sourceItems }))
    const items = await jsonPlugin.load()
    expect(items.length).toEqual(2)
  })
  it('single object responses handled', async () => {
    jsonPlugin = CreatePlugin({
      endpoint: 'https://site.com/my.json',
    })
    fetchMock.mockResponseOnce(JSON.stringify(sourceItems[0]))
    const items = await jsonPlugin.load()
    expect(items.length).toEqual(1)
  })
})

describe('groupByType', () => {
  it('places notifications in the correct type', () => {
    const notificationsByType = jsonPlugin.groupByType(notifications)
    expect(notificationsByType.banner).toBeDefined()
    expect(notificationsByType.banner).toHaveLength(1)
    expect(notificationsByType.floating).toBeDefined()
    expect(notificationsByType.floating).toHaveLength(1)
  })
})
