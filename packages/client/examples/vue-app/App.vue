<template>
  <div>
    <!-- <label>Your Name:
    <input v-model="name" />
    </label> -->
    <Asd20Notifications subscribedCategories="Weather" apiEndpoint="https://asd20-search-dev.search.windows.net/indexes/messages-index/docs/search"
      apiKey="937716815402758ADC2FE799FE288142" apiVersion="2019-05-06"
      subscribedLocations="District"
     />
    <!-- <button @click="onSayHello">Say hello in the console</button> -->
  </div>
</template>

<script>
import { Asd20Notifications} from '@academydistrict20/notifications-client'

export default {
  name: 'MyExampleVueApp',

  components: { Asd20Notifications },

  data: () => ({
    // name: 'World1'
  }),

  methods: {
    // onSayHello() {
    //   console.log(sayHello(this.name))
    // }
  }
}
</script>
