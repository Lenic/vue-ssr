import Vue from 'vue';
import Router from 'vue-router';

import Home from './home';
import Other from './other';

Vue.use(Router);

export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/other',
        component: Other,
      },
    ],
  });
}
