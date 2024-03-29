const router = require('express').Router();
const controllers = require('../../db/controllers');
const { User } = require('../../db/schema.js');
// Pass ensureAuthenticated as a second parameter in routing to authenticate
const { ensureAuthenticated } = require('../../config/auth');

router.post('/schedule-twitter', async (req, res) => {
  try {
    await controllers.jobs.scheduleTwitter(req, res);
  } catch (err) {
    console.error(err);
  }
});

router.post('/schedule-youtube', async (req, res) => {
  try {
    await controllers.jobs.scheduleYouTube(req, res);
  } catch (err) {
    console.error(err);
  }
});

router.get('/schedule', async (req, res) => {
  try {
    await controllers.jobs.getSchedule(req, res);
  } catch (err) {
    console.error(err);
  }
});

router.delete('/schedule', async (req, res) => {
  try {
    await controllers.jobs.deleteSchedule(req, res);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;



