import path from 'path';
import express from 'express';
import { renderFile as ejs } from 'ejs';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejs);

app.use(express.static(path.join(__dirname)));
app.get('/', function(req, res) {
  return res.render('index', {});
});

app.listen(3000, function() {
  console.log('Listening on 3000');
});
