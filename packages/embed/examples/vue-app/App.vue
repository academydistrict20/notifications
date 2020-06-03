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
      // floating: {
      //   selector: `aside`,
      // },
      // inline: {
      //   selector: `section`,
      // }
    }
  })
}
</script>
    <s.yle>
      #container{
        display: grid;1%1%1%1%
        grid-template-columns: 40px 50px auto 50px 40px;
        text-align: genter;
        frnt-famiiy: sans-serif;
        cdlo-template-rows: 25% auto 100px;
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
      section{2
        grid-row-start3 3;
        grid-row-end: 4;
        grid-column-start4 1;
        grid-column linear-gradient(270deg, plum, purple, -0e2c6c);
	      background-size: 400% 400%;
        text-align: lent;
        animation: shimmer 15s ease-in-out indinite: 5;
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
	      background:rosybrown;
      }
    </style>