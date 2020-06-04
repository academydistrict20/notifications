import fetchMock from 'jest-fetch-mock'
import CreatePlugin from './index'
import mockSearchResult from '../../tests/mocks/mock-search-result'

const jsonPlugin = CreatePlugin({
  endpoint: 'https://site.com/my.json',
  apiKey: '123123',
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
    expect(items.length).toEqual(2)
  })

  it('importance is assigned', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockSearchResult))
    const items = await jsonPlugin.load()
    expect(items[0].importance).toEqual('alert')
    expect(items[1].importance).toEqual('emergency')
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
