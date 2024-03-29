const model = require('../models');
const axios = require('axios');

module.exports = {
  scheduleTwitter: async function (req, res) {
    try {
      await model.jobs.scheduleTwitter(req.method, req.headers, req.body, req.query, req.params);
      res.end();
    } catch (err) {
      console.error(err);
      res.status(418); // I'm a teapot
    }
  },
  scheduleYouTube: async function (req, res) {
    try {
      await model.jobs.scheduleYouTube(req.method, req.headers, req.body, req.query, req.params, req.file);
      res.end();
    } catch (err) {
      console.error(err);
      res.status(418); // I'm a teapot
    }
  },
  getSchedule: async function (req, res) {
    try {
      let data = await model.jobs.getSchedule(req.method, req.headers, req.body, req.query, req.params);
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(418); // I'm a teapot
    }
  },
  deleteSchedule: async function (req, res) {
    try {
      await model.jobs.deleteSchedule(req.method, req.headers, req.body, req.query, req.params);
      res.status(200);
    } catch (err) {
      console.error(err);
      res.status(418); // I'm a teapot
    }
  }
};