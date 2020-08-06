import fetchMock from 'jest-fetch-mock'
import CreatePlugin from './index'
import mockSearchResult from '../../tests/mocks/mock-search-result'
import { NotificationImportance, NotificationTypes } from '@asd20/notifications-shared'

const jsonPlugin = CreatePlugin({
  endpoint: 'https://site.com/my.json',
  apiKey: '123123',
  displayRules: [
    {
      terms: ['weather', 'urgent'],
      importance: NotificationImportance.ALERT,
      type: NotificationTypes.BANNER,
      icon: 'somthing',
    },
    {
      terms: ['Emergency'],
      importance: NotificationImportance.EMERGENCY,
      type: NotificationTypes.BANNER,
    },
    {
      terms: ['weather', 'status', 'normal'],
      importance: NotificationImportance.INFO,
      type: NotificationTypes.STATUS,
      icon: 'weather-sun',
    },
    {
      terms: ['weather', 'status', 'delayed'],
      importance: NotificationImportance.ALERT,
      type: NotificationTypes.STATUS,
      icon: 'weather-snow',
      color: 'blue',
    },
    {
      terms: ['weather', 'status', 'closed'],
      importance: NotificationImportance.ALERT,
      type: NotificationTypes.STATUS,
      icon: 'weather-snow',
      color: 'red',
    },
    {
      terms: ['important notice'],
      importance: NotificationImportance.INFO,
      type: NotificationTypes.FLOATING,
      icon: '',
      color: '',
    },
  ],
})

describe('load', () => {
  beforeEach(() => {
    fetchMock.enableMocks()
    fetchMock.resetMocks()
  })
  it('is present', () => {
    expect(jsonPlugin.load).toBeDefined()
  })

  it('data is transformed', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSearchResult))
    const items = await jsonPlugin.load()
    expect(items.length).toEqual(7)
  })

  it('importance is assigned', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSearchResult))
    const items = await jsonPlugin.load()
    expect(items[0].importance).toEqual('alert')
    expect(items[1].importance).toEqual('emergency')
  })

  it('normal status displayRules apply correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSearchResult))
    const items = await jsonPlugin.load()
    expect(items[2].importance).toEqual('info')
    expect(items[2].icon).toEqual('weather-sun')
    expect(items[2].type).toEqual('status')
  })

  it('delay status displayRules apply correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSearchResult))
    const items = await jsonPlugin.load()
    expect(items[3].importance).toEqual('alert')
    expect(items[3].icon).toEqual('weather-snow')
    expect(items[3].type).toEqual('status')
    expect(items[3].color).toEqual('blue')
  })

  it('closed status displayRules apply correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSearchResult))
    const items = await jsonPlugin.load()
    expect(items[4].importance).toEqual('alert')
    expect(items[4].icon).toEqual('weather-snow')
    expect(items[4].type).toEqual('status')
    expect(items[4].color).toEqual('red')
  })

  it('important notice displayRules apply correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSearchResult))
    const items = await jsonPlugin.load()
    expect(items[5].importance).toEqual('info')
    expect(items[5].icon).toEqual('')
    expect(items[5].type).toEqual('floating')
    expect(items[5].color).toEqual('')
  })

  it('displayRules field matches are weighted correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSearchResult))
    const items = await jsonPlugin.load()
    expect(items[6].importance).toEqual('info')
    expect(items[6].icon).toEqual('')
    expect(items[6].type).toEqual('floating')
    expect(items[6].color).toEqual('')
  })

  it('links to be evaluated', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSearchResult))
    const items = await jsonPlugin.load()
    expect(items[0].callToActionLabel).toEqual('Take Action')
    expect(items[0].callToActionUrl).toEqual('https://www.asd20.org/action')
    expect(items[0].detailLinkLabel).toEqual('Learn More')
    expect(items[0].detailLinkUrl).toEqual('https://www.asd20.org')

    expect(items[1].callToActionLabel).toEqual('')
    expect(items[1].callToActionUrl).toEqual('')
    expect(items[1].detailLinkLabel).toEqual('')
    expect(items[1].detailLinkUrl).toEqual('')
    // expect(items[1].importance).toEqual('alert')
  })
})
