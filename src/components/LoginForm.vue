<template>
  <form @submit.prevent="onSubmit">
    <input data-testid="name-input" type="text" v-model="name" />
    <button type="submit"></button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('formSubmited', { name: this.name })
    }
  }
}
</script>

<style lang="scss" scoped></style>
