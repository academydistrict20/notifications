/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Notification } from '../../shared/src/types'
import { NotificationsPlugin } from '../../shared/src/plugin'
import NotificationsClient from '../src/client'

const notifications: Notification[] = [
  {
    id: '10000000-0000-0000-0000-000000000000',
    title: 'Notification 1',
    description: 'Description',
    startDateTime: '2020-05-14T21:02:15.716Z',
    endDateTime: '2020-05-14T21:02:15.716Z',
    categories: ['Emergency'],
  },
  {
    id: '20000000-0000-0000-0000-000000000000',
    title: 'Notification 2',
    description: 'Description',
    startDateTime: '2020-05-14T21:02:15.716Z',
    endDateTime: '2020-05-14T21:02:15.716Z',
    categories: ['Urgent'],
  },
]

const mockPlugin: NotificationsPlugin = {
  name: 'test',
  async load() {
    return Promise.resolve().then(() => notifications)
  },
  groupByType(notifications) {
    return {
      banner: notifications.filter((n) => n.categories.includes('Emergency')),
      floating: notifications.filter((n) => !n.categories.includes('Emergency')),
    }
  },
}

let instance: NotificationsClient

describe('constructor', () => {
  it('creates an instance', () => {
    const instance = new NotificationsClient()
    expect(instance).toBeDefined()
    expect(instance).toBeInstanceOf(NotificationsClient)
  })
})

describe('storage', () => {
  beforeEach(() => {
    instance = new NotificationsClient({
      storageKey: 'testKey',
      storage: localStorage,
      plugins: [mockPlugin],
    })
  })
  it('loads from storage after init', () => {
    expect(localStorage.getItem).toHaveBeenCalledTimes(1)
  })
  it('storage to be updated after dimsiss', () => {
    instance.dismiss(notifications[0])
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.getItem('testKey')).toBeDefined()
  })
})

describe('onUpdate', () => {
  it('returns payload', (done) => {
    const mockOnUpdate = jest.fn((payload) => {
      try {
        expect(payload).toBeDefined()
        done()
      } catch (error) {
        done(error)
      }
    })
    instance = new NotificationsClient({
      plugins: [mockPlugin],
      onUpdate: mockOnUpdate,
    })
  })
})

describe('dismissal', () => {
  beforeEach(() => {
    instance = new NotificationsClient({
      plugins: [mockPlugin],
    })
  })
  it('can dismiss one', (done) => {
    const mockOnUpdate = jest.fn((payload) => {
      try {
        expect(payload.dismissedNotifications).toHaveLength(1)
        expect(payload.activeNotifications).toHaveLength(1)
        done()
      } catch (error) {
        done(error)
      }
    })
    instance.config.onUpdate = mockOnUpdate
    instance.dismiss(notifications[0])
  })
  it('can dismiss all', (done) => {
    const mockOnUpdate = jest.fn((payload) => {
      try {
        expect(payload.dismissedNotifications).toHaveLength(2)
        done()
      } catch (error) {
        done(error)
      }
    })
    instance.config.onUpdate = mockOnUpdate
    instance.dismissAll()
  })
  it('empty call is ignored', () => {
    // @ts-ignore
    expect(instance.dismiss()).toBeFalsy()
  })
  it('can clear all dismissed', (done) => {
    const mockOnUpdate = jest.fn((payload) => {
      try {
        expect(payload.dismissedNotifications).toHaveLength(0)
        expect(payload.activeNotifications).toHaveLength(2)
        done()
      } catch (error) {
        done(error)
      }
    })
    instance.dismissAll()
    instance.config.onUpdate = mockOnUpdate
    instance.clearDismissions()
  })
  it('can not dismiss if plugin gaurd blocks it', (done) => {
    const p: NotificationsPlugin = {
      name: 'test-block-dismiss',
      async load() {
        return Promise.resolve().then(() => [])
      },
      groupByType: () => ({}),
      beforeDismiss: () => false,
    }
    const mockOnUpdate = jest.fn((payload) => {
      try {
        expect(payload.dismissedNotifications).toHaveLength(0)
        expect(payload.activeNotifications).toHaveLength(2)
        done()
      } catch (error) {
        done(error)
      }
    })
    if (instance.config.plugins) instance.config.plugins.push(p)
    instance.dismiss(notifications[0])
    instance.config.onUpdate = mockOnUpdate
    instance.update()
  })
  it('calls onDimiss plugin hook', (done) => {
    const p: NotificationsPlugin = {
      name: 'test-on-dismiss',
      load: () => Promise.resolve().then(() => []),
      groupByType: () => ({}),
      onDismiss: jest.fn((payload) => {
        try {
          expect(payload).toBeDefined()
          done()
        } catch (error) {
          done(error)
        }
      }),
    }
    if (instance.config.plugins) instance.config.plugins.push(p)
    instance.dismiss(notifications[0])
  })
})

describe('byType', () => {
  beforeEach(() => {
    instance = new NotificationsClient({
      plugins: [mockPlugin],
    })
  })
  it('updated notifications by type', (done) => {
    const mockOnUpdate = jest.fn((payload) => {
      try {
        expect(payload.activeNotificationsByType).toBeDefined()
        expect(payload.activeNotificationsByType.banner).toBeDefined()
        expect(payload.activeNotificationsByType.banner).toHaveLength(1)
        expect(payload.activeNotificationsByType.floating).toBeDefined()
        expect(payload.activeNotificationsByType.floating).toHaveLength(1)
        done()
      } catch (error) {
        done(error)
      }
    })
    instance.config.onUpdate = mockOnUpdate
    instance.update()
  })

  it('returns types even if plugin does not implement groupByType', (done) => {
    // @ts-ignore
    const p: NotificationsPlugin = {
      name: 'test-no-group-by',
      load: () => Promise.resolve().then(() => []),
      beforeDismiss: () => false,
    }
    const mockOnUpdate = jest.fn((payload) => {
      try {
        expect(payload.activeNotificationsByType).toBeDefined()
        expect(payload.activeNotificationsByType.banner).toBeDefined()
        expect(payload.activeNotificationsByType.banner).toHaveLength(1)
        expect(payload.activeNotificationsByType.floating).toBeDefined()
        expect(payload.activeNotificationsByType.floating).toHaveLength(1)
        done()
      } catch (error) {
        done(error)
      }
    })
    // @ts-ignore
    instance.config.plugins.push(p)
    instance.config.onUpdate = mockOnUpdate
    instance.update()
  })

  it('combines duplicate notifications from plugins', (done) => {
    // @ts-ignore
    const mockOnUpdate = jest.fn((payload) => {
      try {
        expect(payload.activeNotificationsByType).toBeDefined()
        expect(payload.activeNotificationsByType.banner).toBeDefined()
        expect(payload.activeNotificationsByType.banner).toHaveLength(1)
        expect(payload.activeNotificationsByType.floating).toBeDefined()
        expect(payload.activeNotificationsByType.floating).toHaveLength(1)
        done()
      } catch (error) {
        done(error)
      }
    })
    // @ts-ignore
    instance.config.plugins.push(mockPlugin)
    instance.config.onUpdate = mockOnUpdate
    instance.update()
  })

  it('handles undefined plugins gracefully', (done) => {
    const mockOnUpdate = jest.fn((payload) => {
      try {
        expect(payload.activeNotificationsByType).toBeDefined()
        done()
      } catch (error) {
        done(error)
      }
    })
    // @ts-ignore
    instance.config.plugins = undefined
    instance.config.onUpdate = mockOnUpdate
    instance.update()
  })

  it('handles plugins undefined group key gracefully', (done) => {
    const p: NotificationsPlugin = {
      name: 'test-no-group-by',
      load: () => Promise.resolve().then(() => []),
      // @ts-ignore
      beforeDismiss: () => ({
        // @ts-ignore
        banner: undefined,
      }),
    }
    const mockOnUpdate = jest.fn((payload) => {
      try {
        expect(payload.activeNotificationsByType).toBeDefined()
        expect(Array.isArray(payload.activeNotificationsByType.banner)).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
    // @ts-ignore
    instance.config.plugins.push(p)
    instance.config.onUpdate = mockOnUpdate
    instance.update()
  })
})
