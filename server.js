/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const routes = require('./routes');

const app = express();

const port = 3000;

// Setting needed for deploy
app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['asdu89sua', 'lkasfjk0'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Meetups';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames();
    res.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakerService,
  })
);

app.listen(port, () => {
  console.log(`Express Server listening on port ${port}`);
});
