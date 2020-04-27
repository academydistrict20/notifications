import LoginForm from '@/components/loginForm'
import { mount } from '@vue/test-utils'

describe('LoginForom', () => {
  it('emits an event with a user payload', () => {
    const wrapper = mount(LoginForm)

    // find the input
    const input = wrapper.find('[data-testid = "name-input"]')

    // Set the value for the input
    input.setValue('Luke Harris')

    // Simulate Form Submission
    wrapper.trigger('submit')

    // Assert event has been emited
    const formSubmitedCalled = wrapper.emitted('formSubmited')
    expect(formSubmitedCalled).toHaveLength(1)

    // Assert payload is correct
    const expectedPayload = { name: 'Luke Harris' }
    expect(wrapper.emitted('formSubmited')[0][0]).toMatchObject(expectedPayload)
  })
})
