const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res, next) => {
    // Visit Count Cookie
    // if (!req.session.visitcount) {
    //   req.session.visitcount = 0;
    // }
    // req.session.visitcount += 1;
    // console.log(`Number of visits: ${req.session.visitcount}`);
    try {
      const artwork = await speakerService.getAllArtwork();
      const topSpeakers = await speakerService.getList();

      return res.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
