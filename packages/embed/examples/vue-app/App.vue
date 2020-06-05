<template>
<div>
  <div class="container">
    <header id="header"><h1>Header</h1></header>
    <section id="body"><h2>Section</h2></section>
    <aside><h3>Aside</h3></aside>
    <footer><h2>Footer</h2></footer>
    </div>
    <Asd20NotificationsEmbed :config="config" :groups="groups" ></Asd20NotificationsEmbed>
  </div>
</template>

<script>
// Embed Component
import Asd20NotificationsEmbed from '@asd20/notifications-embed/src/components/Asd20NotificationsEmbed'
// import Asd20NotificationsEmbed from '../../src/components/Asd20NotificationsEmbed'

// Plugin
// import { Create as CcMessagesPlugin } from '@asd20/notifications-plugin-cc-messages'
import CcMessagesPlugin from '@asd20/notifications-plugin-cc-messages/src/plugin/index'

export default {
  name: 'MyExampleVueApp',
  
  components: { Asd20NotificationsEmbed },

  data: () => ({
    config: {
      // pollInterval: 1000,
      plugins: [
        CcMessagesPlugin({
          endpoint: 'https://asd20-search-dev.search.windows.net',
          index: 'messages-index',
          apiKey: '937716815402758ADC2FE799FE288142',
          apiVersion: '2019-05-06',
          channels: ['Notification'],
          locations: ['*.asd20.org'],
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
        text-align: center;
        font-family: sans-serif;
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
        background: linear-gradient(270deg, plum, purple, #0e2c6c);
	      background-size: 400% 400%;
        text-align: left;
        animation: shimmer 15s ease-in-out infinite;
        background:#fff;
      }
      aside{
        grid-row-start:2;
        grid-row-end: 3;
        grid-column-start:4;
        grid-column-end: 6;
      }
      @keyframes shimmer { 
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
      }
    </style>