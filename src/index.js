import fs from 'fs';
import Vue from 'vue';
import path from 'path';
import express from 'express';

const ssr = require('vue-server-renderer');

import createApp from './server';

const app = express()
  , renderer = ssr.createRenderer({
    template: fs.readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8'),
  });

app.use((req, res, next) => {
  const context = { url: req.url, };

  createApp(context).then(
    v => {
      renderer.renderToString(v, (err, html) => {
        if (err) {
          res.status(500).end('Internal Server Error.');
        } else {
          res.end(html);
        }
      });
    },
    e => res.status(e.code).end('Error.'),
  );
});

app.listen(3000, () => console.log('Listening at http://localhost:3000/'));
