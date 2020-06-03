<template>
  <div id="container">
    <header id="header">Header</header>
    <section id="body">Section</section>
    <aside>Aside</aside>
    <footer>Footer</footer>
    <Asd20NotificationsEmbed :config="config" :groups="groups" ></Asd20NotificationsEmbed>
  </div>
</template>

<script>
// Embed Component
import Asd20NotificationsEmbed from '@asd20/notifications-embed/src/components/Asd20NotificationsEmbed'
// import Asd20NotificationsEmbed from '../../src/components/Asd20NotificationsEmbed'

// Plugin
import { Create as CcMessagesPlugin } from '@asd20/notifications-plugin-cc-messages'

export default {
  name: 'MyExampleVueApp',
  
  components: { Asd20NotificationsEmbed },

  data: () => ({
    config: {
      plugins: [
        CcMessagesPlugin({
          endpoint: 'https://asd20-search-dev.search.windows.net',
          index: 'messages-index',
          apiKey: '937716815402758ADC2FE799FE288142',
          apiVersion: '2019-05-06',
          channels: ['Notification'],
          locations: ['District Wide', 'Test Subscription Location'],
          categories: ['Weather', 'Emergency', 'Tests'],
        }),
      ],
    },
    groups: {
      banner: {
        selector: `#header`,
      },
      floating: {
        selector: `aside`,
      },
      inline: {
        selector: `section`,
      }
    }
  })
}
</script>
    <style>
      #container{
        display: grid;
        grid-template-columns: 40px 50px auto 50px 40px;
        grid-template-rows: 25% auto 100px;
        color: #fff;
      }
      header{    
        grid-column-start: 1;
        grid-column-end: 6;
        grid-row-start: 1;
        grid-row-end: 2;
        background: purple;
      }
      footer{
        grid-row-start: 3;
        grid-row-end: 4;
        grid-column-start: 1;
        grid-column-end: 6;
        background: plum;
      }
      section{
        grid-row-start: 3;
        grid-row-end: 4;
        grid-column-start: 1;
        grid-column-end: 5;
        background:#fff;
      }
      aside{
        grid-row-start:2;
        grid-row-end: 3;
        grid-column-start:4;
        grid-column-end: 6;
        background:rosybrown;
      }
    </style>