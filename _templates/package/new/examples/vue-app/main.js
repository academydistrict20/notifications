---
to: "<%= useVueComponents ? `packages/${h.changeCase.snake(pkg)}/examples/vue-app/main.js` : null %>"
---
import Vue from 'vue';
import App from './App.vue';

new Vue({ render: createElement => createElement(App) }).$mount('#app');