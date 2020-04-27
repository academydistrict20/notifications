import DisplayMessage from '@/components/DisplayMessage'
import { mount } from '@vue/test-utils'
import { getMessage } from '@/services/axios.js'
import flushPromises from 'flush-promises'

jest.mock('@/services/axios.js')

describe('DisplayMessage', () => {
  it('Calls the message and displays the message', async () => {
    // Mock the api call
    // Mock payload return
    const mockMessage = 'Example Emergency Lockout'
    getMessage.mockResolvedValueOnce({ title: mockMessage })
    const wrapper = mount(DisplayMessage)

    // Wait for it to resolve, flushPromises is a fake promise
    await flushPromises()

    // Check that call happened once
    expect(getMessage).toHaveBeenCalledTimes(1)

    // Check that component displays message
    const message = wrapper.find('[data-testid="message"]').element.textContent
    expect(message).toEqual(mockMessage)
  })
})
