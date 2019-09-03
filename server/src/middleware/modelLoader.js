'use strict';

// creates a model of request param type and attaches model to request
const modelLoader = (req, res, next) => {
  const modelParam = req.param.model
  const schema = require(`../models/${modelParam}/${modelParam}-schema.js`);
  const Model = require(`../models/${modelParam}/${modelParam}.js`);
  req.model = new Model(schema);
  next();
}

module.exports = modelLoader;