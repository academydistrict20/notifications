<template>
  <div>
    <button v-show="loggedIn">logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
