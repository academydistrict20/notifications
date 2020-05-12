<template>
  <div>
    <label>Your Name:
    <input v-model="name" />
    </label>
    <Asd20SayHello :name="name"/>
    <button @click="onSayHello">Say hello in the console</button>
  </div>
</template>

<script>
import {sayHello, Asd20SayHello} from '@academydistrict20/notifications-client'

export default {
  name: 'MyExampleVueApp',

  components: { Asd20SayHello },

  data: () => ({
    name: 'World'
  }),

  methods: {
    onSayHello() {
      sayHello(this.name)
    }
  }
}
</script>
