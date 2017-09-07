import Vue from 'vue';

import Main from './main';
import createRouter from './router';

export default context => {
  const router = createRouter();

  const app = new Vue({
    router,
    render: h => h(Main),
  });

  return {
    app,
    router,
  };
}
