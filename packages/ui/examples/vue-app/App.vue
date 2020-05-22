<template>
  <div>
    <label>Your Name:
    <input v-model="name" />
    </label>
    <Asd20SayHello :name="name"/>
    <button @click="onSayHello">Say hello in the console</button>
    <Asd20NotificationGroup :notifications="notifications" />
  </div>
</template>

<script>
import {sayHello, Asd20SayHello} from '@asd20/notifications-ui'
import Asd20Notification from '@asd20/notifications-ui'
import Asd20NotificationGroup from '@asd20/notifications-ui'
// import Asd20Notification from '../../src/components/Asd20Notification.vue'
// import Asd20NotificationGroup from '../../src/components/Asd20NotificationGroup.vue'

export default {
  name: 'MyExampleVueApp',

  components: { Asd20SayHello, Asd20Notification, Asd20NotificationGroup },

  data: () => ({
    name: 'World',
    notifications: {
      "type": "notification",
      "title": "Test Notification",
      "description": "Sic gorgiamus allos subjectatos nunc.",
      "locations": [
        "District Wide"
      ],
      "categories": [
        "Tests"
      ],
      "callToActionUrl": "",
      "callToActionLabel": "Learn more",
      "dismissible": true,
      "startsDismissed": false,
      "style": "sticky",
      "icon": "weather-snow",
      "color": "hsla(200,80%,40%,1)",
      "createdBy": "david.hayes@asd20.org",
      "lastModifiedBy": "david.hayes@asd20.org",
      "startDateTime": "2019-01-30T22:20:28Z",
      "endDateTime": "2019-05-30T22:20:28Z",
      "createdDateTime": "2019-01-30T22:20:28Z",
      "lastModifiedDateTime": "2019-01-30T22:20:28Z",
      "id": "907307e4-36ef-8640-74ff-c67e324201e2",
      "_rid": "SEw0APTSKP8+AwAAAAAAAA==",
      "_self": "dbs/SEw0AA==/colls/SEw0APTSKP8=/docs/SEw0APTSKP8+AwAAAAAAAA==/",
      "_etag": "\"040060e2-0000-0700-0000-5cd1fca90000\"",
      "_attachments": "attachments/",
      "_ts": 1557265577
    }
  }),

  methods: {
    onSayHello() {
      sayHello(this.name)
    }
  }
}
</script>
