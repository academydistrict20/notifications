<template>
  <div>
    <Asd20NotificationGroup :notifications="notifications" type="banner" ></Asd20NotificationGroup>
    <Asd20NotificationGroup :notifications="notifications" type="inline" ></Asd20NotificationGroup>
    <Asd20Notification v-bind="notifications[0]" ></Asd20Notification>
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
    n    id: '907307e4-36ef-8640-74ff-c67e324201e7',
        title: 'Test Notification',
        icon: 'weather-sun',
        description: 'Sic gorgiamus allos subjectatos nunc.',
        callToActionUrl: 'https://www.asd20.org',
        callToActionLabel: "Learn more",
        dismissible: true,
        color: "",
        notificationStyle: 'banner',
        importance: 'emergency',
      },
      {
        id: '907307e4-36ef-8640-74ff-c67e324201e9',
        title: 'Test Notification',
        icon: 'weather-snow',
        description: 'Sic gorgiamus allos subjectatos nunc.',
        callToActionUrl: 'https://www.asd20.org',
        callToActionLabel: "Learn more",
        dismissible: true,
        color: "hsla(200,80%,40%,1)",
        notificationStyle: 'inline',
        importance: 'emergency',
      },
      {
        id: '907307e4-36ef-8640-74ff-c67e324201e2',
        title: 'Test Notification',
        icon: 'alert',
        description: 'Sic gorgiamus allos subjectatos nunc.',
        callToActionUrl: 'https://www.asd20.org',
        callToActionLabel: "Learn more",
        dismissible: true,
        color: "",
        notificationStyle: 'inline',
        importance: 'emergency',
      }
    ]
  }),
}
</script>
