'use strict';

const express = require('express');
const categoryRouter = express.Router();

const auth = require('../auth/middleware.js');

const Categories = require('../models/categories/categories.js');
const categories = new Categories();

categoryRouter.get('/categories', getCategories);
categoryRouter.get('/categories/:id', getCategory);
categoryRouter.post('/categories', auth(), addCategory);
categoryRouter.put('/categories/:id', auth(), replaceCategory);
categoryRouter.patch('/categories/:id', auth(), updateCategory);
categoryRouter.delete('/categories/:id', auth(), deleteCategory);

function getCategories(req, res, next) {

  categories.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);

}

function getCategory(req, res, next) {
  categories.get(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function addCategory(req, res, next) {
  if (req.user.can('create')) {
    categories.create(req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

function replaceCategory(req, res, next) {
  if (req.user.can('update')) {
    categories.update(req.params.id, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

function updateCategory(req, res, next) {
  if (req.user.can('update')) {
    categories.update(req.params.id, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

function deleteCategory(req, res, next) {
  if (req.user.can('delete')) {
    categories.delete(req.params.id)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

module.exports = categoryRouter;
