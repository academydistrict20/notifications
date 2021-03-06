---
to: "<%= useVueComponents ? `packages/${h.changeCase.param(pkg)}/examples/vue-app/App.vue` : null %>"
---
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
import {sayHello, Asd20SayHello} from '@asd20/notifications-<%= h.changeCase.param(pkg) %>'

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
