'use strict';

const express = require('express');
const modelRouter = express.Router();

const auth = require('../auth/middleware.js');

const modelLoader = require('../middleware/modelLoader.js')

// middleware
modelRouter.param('model', modelLoader);
//routes
modelRouter.get('/:model', getAll);
modelRouter.get('/:model/:id', get);
modelRouter.post('/:model', auth(), addModel);
modelRouter.put('/:model/:id', auth(), replaceModel);
modelRouter.patch('/:model/:id', auth(), updateModel);
modelRouter.delete('/:model/:id', auth(), deleteModel);

function getAll(req, res, next) {
  req.model.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);

}

function get(req, res, next) {
  req.model.get(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function addModel(req, res, next) {
  if (req.user.can('create')) {
    req.model.create(req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

function replaceModel(req, res, next) {
  if (req.user.can('update')) {
    req.model.update(req.params.id, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

function updateModel(req, res, next) {
  if (req.user.can('update')) {
    req.model.update(req.params.id, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

function deleteModel(req, res, next) {
  if (req.user.can('delete')) {
    req.model.delete(req.params.id)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

module.exports = modelRouter;
