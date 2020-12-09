require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // cross-origin resource sharing

const dbConfig = require('./config/db');

const passport = require('passport');
require('./config/passport')(passport);

// --- Require router 
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const updateProfileRouter = require('./routes/update-profile');

const app = express();

// --- App use
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionsSuccessStatus: 200 
}));

// cookie parser
app.use(cookieParser());

// express session
const sessionOptions = {
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie: { 
		secure: true,
		maxAge: 24 * 60 * 60 * 1000, 
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		sameSite: 'none'
	}
};
app.use(session(sessionOptions));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// global variables
app.use(function(req, res, next) {
	next();
});

// --- URL
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/update-profile', updateProfileRouter);

module.exports = app;
