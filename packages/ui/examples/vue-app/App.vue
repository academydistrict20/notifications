<template>
  <div id="app">
    <!-- Embed Code/Component -->
    <Asd20NotificationGroup type="banner" :notifications="notifications.banner"></Asd20NotificationGroup>
    <Asd20NotificationGroup type="status" :notifications="notifications.status"></Asd20NotificationGroup>

    <header>
      <!-- Embed Code/Component -->
      <Asd20NotificationGroup type="floating" :notifications="notifications.floating"></Asd20NotificationGroup>
      <h1>My App</h1>
    </header>
    <main>
      <!-- Embed Code/Component -->
      <Asd20NotificationGroup type="inline" :notifications="notifications.inline"></Asd20NotificationGroup>

      <h2>Body</h2>
      <p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      <h3>Vestibulum Fringilla Pharetra</h3>
      <p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
    </main>
    <aside>
      <h2>Sidebar</h2>

      <p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo.</p>

      <ul>
        <li>list item</li>
        <li>list item</li>
        <li>list item</li>
      </ul>
    </aside>
  </div>
</template>

<script>
import Asd20NotificationGroup from '@asd20/notifications-ui/src/components/Asd20NotificationGroup'

export default {
  name: 'MyExampleVueApp',

  components: { Asd20NotificationGroup },

  data: () => ({
    notifications: {
      banner: [
        {
          id: '907307e4-36ef-8640-74ff-c67e324201e7',
          title: 'Test Notification 1',
          icon: 'alert',
          description: 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
          callToActionUrl: 'https://www.asd20.org',
          callToActionLabel: 'Learn more',
          detailLinkUrl: 'https://www.asd20.org',
          detailLinkLabel: 'Read all about it.',
          dismissible: true,
          color: '',
          notificationStyle: 'banner',
          importance: 'emergency',
        },
        {
          id: '907307e4-36ef-8640-74ff-c67e324201e9',
          title: 'Test Notification 2 with a very, very long title.',
          icon: 'weather-snow',
          description: 'Urgent banner notification. Lorem ipsum dolor sit amet, in nam saepe assueverit, ad verear propriae has, nonumes definiebas duo ea. Ad illum libris phaedrum has. Eum te praesent consectetuer, ei vero veritus nam. Vel corrumpit quaerendum ad.',
          callToActionUrl: 'https://www.asd20.org',
          callToActionLabel: "Learn more",
          detailLinkUrl: 'https://www.asd20.org',
          detailLinkLabel: 'Read all about it.',
          dismissible: true,
          color: '',
          notificationStyle: 'banner',
          importance: 'alert',
        },
        {
          id: '907307e4-36ef-8640-74ff-c67e324201e1',
          title: 'Test Notification 3',
          icon: 'info',
          description: 'Informational banner notification. Dolores referrentur interpretaris mei no, his te saepe luptatum abhorreant. Vel enim modus eripuit in, ex ubique tacimates vis, vero regione imperdiet ei per.',
          callToActionUrl: 'https://www.asd20.org',
          callToActionLabel: "Learn more",
          detailLinkUrl: 'https://www.asd20.org',
          detailLinkLabel: 'Read all about it.',
          dismissible: true,
          color: '',
          notificationStyle: 'banner',
          importance: 'info',
        },
      ],
      inline: [
        {
          id: '907307e4-36ef-8640-74ff-c67e324201e4',
          title: 'Test Notification 4',
          icon: 'alert',
          description: 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
          callToActionUrl: 'https://www.asd20.org',
          callToActionLabel: "Learn more",
          detailLinkUrl: 'https://www.asd20.org',
          detailLinkLabel: 'Read all about it.',
          dismissible: true,
          color: '',
          notificationStyle: 'inline',
          importance: 'emergency',
        },
        {
          id: '907307e4-36ef-8640-74ff-c67e324201e4',
          title: 'Test Notification 5 With a very, very long title.',
          icon: 'alert',
          description: 'Urgent inline notification. Dolores referrentur interpretaris mei no, his te saepe luptatum abhorreant. Vel enim modus eripuit in, ex ubique tacimates vis, vero regione imperdiet ei per.',
          callToActionUrl: 'https://www.asd20.org',
          callToActionLabel: "Learn more",
          dismissible: true,
          color: '',
          notificationStyle: 'inline',
          importance: 'alert',
        },
        {
          id: '907307e4-36ef-8640-74ff-c67e324201e4',
          title: 'Test Notification 6',
          icon: 'info',
          description: 'Informational inline notification. Dolores referrentur interpretaris mei no, his te saepe luptatum abhorreant. Vel enim modus eripuit in, ex ubique tacimates vis, vero regione imperdiet ei per.',
          callToActionUrl: 'https://www.asd20.org',
          callToActionLabel: "Learn more",
          detailLinkUrl: 'https://www.asd20.org',
          detailLinkLabel: 'Read all about it.',
          dismissible: true,
          color: '',
          notificationStyle: 'inline',
          importance: 'info',
        },
      ],
      floating: [
        {
          id: '907307e4-36ef-8640-74ff-c67e324201e5',
          title: 'Test Notification 7',
          icon: 'weather-sun',
          description: 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu leo.',
          callToActionUrl: 'https://www.asd20.org',
          callToActionLabel: "Learn more",
          detailLinkUrl: 'https://www.asd20.org',
          detailLinkLabel: 'Read all about it.',
          dismissible: true,
          color: '',
          notificationStyle: 'floating',
          importance: 'emergency',
        },
        {
          id: '907307e4-36ef-8640-74ff-c67e324201e5',
          title: 'Test Notification 8',
          icon: 'alert',
          description: 'Urgent floating notification. Dolores referrentur interpretaris mei no, his te saepe luptatum abhorreant. Vel enim modus eripuit in, ex ubique tacimates vis, vero regione imperdiet ei per. <br/><br/>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
          callToActionUrl: 'https://www.asd20.org',
          callToActionLabel: "Learn more",
          dismissible: true,
          color: '',
          notificationStyle: 'floating',
          importance: 'alert',
        },
        {
          id: '907307e4-36ef-8640-74ff-c67e324201e5',
          title: 'Test Notification 9',
          icon: 'info',
          description: 'Informational floating notification. Dolores referrentur interpretaris mei no, his te saepe luptatum abhorreant.',
          callToActionUrl: 'https://www.asd20.org',
          callToActionLabel: "Learn more",
          dismissible: true,
          color: '',
          notificationStyle: 'floating',
          importance: 'info',
        },
      ],
      status: [
        {
          id: '907307e4-36ef-8640-74ff-c67e324201f5',
          title: 'Weather Status',
          icon: 'weather-sun',
          description: 'Normal',
          callToActionUrl: 'https://www.asd20.org',
          callToActionLabel: "",
          dismissible: true,
          color: '#3e642b',
          notificationStyle: 'status',
          importance: 'info',
        },
      ]
    }
  }),
}
</script>

<style>
body {
  margin: 0;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

h1,
h2,
h3,
h4,
p {
  margin: 0 0 1rem 0;
}

#app {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

header {
  grid-column: 1 / -1;
  background: hsl(200, 20%, 90%);
}

.notification-group {
  grid-column: 1 / -1;
}

header {
  position: relative;
  padding: 4rem 2rem;
}

main,
aside {
  position: relative;
  padding: 2rem;
}
</style>

