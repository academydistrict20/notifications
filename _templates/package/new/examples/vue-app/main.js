---
to: packages/<%= h.changeCase.snake(pkg) %>/examples/vue-app/main.js
---
import Vue from 'vue';
import App from './App.vue';

new Vue({ render: createElement => createElement(App) }).$mount('#app');