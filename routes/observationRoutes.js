const express = require('express');
const observationModel = require('../models/observation');
const app = express();

app.get('/observations', async (req, res) => {
  const observations = await observationModel.find({});

  try {
    res.send(observations);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app