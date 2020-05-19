<template>
  <div>
    <Asd20NotificationsEmbed :config="config" :groups="groups" />
  </div>
</template>

<script>
import Asd20NotificationsEmbed from '@asd20/notifications-embed'

export default {
  name: 'MyExampleVueApp',

  data: () => ({
    config: {

    },
    groups: {
        banner: {
          selector: `#header`,
        },
        floating: {
          selector: `#header`,
        },
        inline: {
          selector: `#body`,
        }
      }
  }),

  components: { Asd20NotificationsEmbed }
}
</script>
