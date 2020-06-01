<template>
  <div>
    <Asd20NotificationGroup :notifications="notifications" type="status" ></Asd20NotificationGroup>
    <Asd20NotificationGroup :notifications="notifications" type="banner" ></Asd20NotificationGroup>
    <Asd20NotificationGroup :notifications="notifications" type="inline" ></Asd20NotificationGroup>
    <!-- <Asd20Notification v-bind="notifications[0]" ></Asd20Notification> -->
  </div>
</template>

<script>
import Asd20Notification from '../../src/components/Asd20Notification'
import Asd20NotificationGroup from '@asd20/notifications-ui/src/components/Asd20NotificationGroup'

export default {
  name: 'MyExampleVueApp',

  components: { Asd20Notification, Asd20NotificationGroup },

  data: () => ({
    notifications: [
      {
        id: '907307e4-36ef-8640-74ff-c67e324201e7',
        title: 'Test Notification 1',
        icon: 'info',
        description: 'Emergency banner notification',
        callToActionUrl: 'https://www.asd20.org',
        callToActionLabel: "Learn more",
        dismissible: true,
        color: '',
        notificationStyle: 'banner',
        importance: 'emergency',
      },
      {
        id: '907307e4-36ef-8640-74ff-c67e324201e9',
        title: 'Test Notification 2',
        icon: 'weather-snow',
        description: 'Informational in-line notification',
        callToActionUrl: 'https://www.asd20.org',
        callToActionLabel: "Learn more",
        dismissible: true,
        color: '',
        notificationStyle: 'inline',
        importance: 'info',
      },
      {
        id: '907307e4-36ef-8640-74ff-c67e324201e1',
        title: 'Test Notification 3',
        icon: 'alert',
        description: 'Alert in-line notification',
        callToActionUrl: 'https://www.asd20.org',
        callToActionLabel: "Learn more",
        dismissible: true,
        color: '',
        notificationStyle: 'inline',
        importance: 'alert',
      },
      {
        id: '907307e4-36ef-8640-74ff-c67e324201e4',
        title: 'Test Notification 4',
        icon: 'alert',
        description: 'Alert banner notification',
        callToActionUrl: 'https://www.asd20.org',
        callToActionLabel: "Learn more",
        dismissible: true,
        color: '',
        notificationStyle: 'banner',
        importance: 'alert',
      },
      {
        id: '907307e4-36ef-8640-74ff-c67e324201e5',
        title: 'Test Notification 5',
        icon: 'weather-sun',
        description: 'Status notification',
        callToActionUrl: 'https://www.asd20.org',
        callToActionLabel: "Learn more",
        dismissible: false,
        color: '',
        notificationStyle: 'status',
        importance: 'info',
      }
    ]
  }),
}
</script>
