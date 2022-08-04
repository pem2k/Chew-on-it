const express = require('express');
const router = express.Router()
const exphbs = require('express-handlebars');

const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/login', (req, res) => res.render('login'));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force:false}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});