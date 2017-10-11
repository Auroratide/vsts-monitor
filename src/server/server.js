import path from 'path';
import express from 'express';
import { renderFile as ejs } from 'ejs';
import { doIf, render } from './middleware';
import { isJson } from './utils/helpers';
import api from './api';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejs);

app.use(express.static(path.join(__dirname)));

app.use('/', doIf(isJson, api), render);
app.get('*', render);

app.listen(3000, function() {
  console.log('Listening on 3000');
});
