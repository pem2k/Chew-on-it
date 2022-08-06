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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use("/", routes);

// Root page goes to login since that's the first thing a user will need to see.
// Redirects user to feed page if they are already logged in however.
// All pages need to pass req.session.user at a minimum.
app.get('/', (req, res) => (!req.session.user)
	? res.render('login', req.session.user)
	: res.redirect("/feed"));

// Feed acts as the landing point for logged-in users.
router.get('/feed', async (req, res) => {
	// Make new users log in first.
	if(!req.session.user)
		return res.redirect("login", req.session.user);

	try {
		// TODO: grab friend data and pass it with the session user.
		res.render('feed', req.session.user);
	} catch(err) {
		// Error handling. Defaults to a catch-all for now.
		if(err) {
			res.status(500).json({msg:"ERROR",err})
		}
	}
});

// Profile redirects you to your user page if logged in. Otherwise to login.
router.get("/profile", (res, req) => (req.session.user)
	? res.redirect("/users/" + req.session.user.id)
	: res.redirect("/")
);

// Static about page. Not much to be said; justs gives credits the team.
router.get("/about", (res, req) => res.render('about', req.session.user));

// sync sequelize models to the database, then turn on the server
sequelize.sync({force:false}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});