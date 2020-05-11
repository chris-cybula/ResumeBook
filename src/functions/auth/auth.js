
const passport = require('passport');
const express = require('express');
const serverless = require('serverless-http');
const cookieParser = require('cookie-parser');
const session = require('express-session');



require('../utils/auth');

const {
  ENDPOINT,
  COOKIE_SECURE,
} = require('../utils/config');

const app = express();

app.use(cookieParser())
app.use(passport.initialize());

const handleCallback = () => (req, res) => {
  res
    .cookie('jwt', req.user.jwt, { httpOnly: true, COOKIE_SECURE })
    .redirect('/');
};


app.get('/.netlify/functions/auth/', (req, res) => {
    res.send('hi');
});
app.get(`${ENDPOINT}/auth/linkedin`, passport.authenticate('linkedin', {session: false}));

app.get(`${ENDPOINT}/auth/linkedin/callback`, 
  passport.authenticate('linkedin', { failureRedirect: '/', session: false }),
  handleCallback()
);

app.get(
  `${ENDPOINT}/auth/status`,
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.json({ email: req.user.email }),
);

module.exports.handler = serverless(app)