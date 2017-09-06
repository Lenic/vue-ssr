import fs from 'fs';
import Vue from 'vue';
import path from 'path';
import express from 'express';

const ssr = require('vue-server-renderer');

const app = express()
  , renderer = ssr.createRenderer({
    template: fs.readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8'),
  });

app.use((req, res, next) => {
  const Root = new Vue({
    data() {
      return {
        url: req.url,
      };
    },
    template: `<div>您的访问地址是：{{ url }}</div>`,
  });

  const context = {
    title: Date.now().toString(36).substr(0, 8).toUpperCase(),
  }

  renderer.renderToString(Root, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error.');
    } else {
      res.end(html);
    }
  })
});

app.listen(3000, () => console.log('Listening at http://localhost:3000/'));
