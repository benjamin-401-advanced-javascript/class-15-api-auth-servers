'use strict';

const express = require('express');
const productsRouter = express.Router();

const auth = require('../auth/middleware.js');

const Products = require('../models/products/products.js');
const products = new Products();

productsRouter.get('/products', getProducts);
productsRouter.get('/products/:id', getProduct);
productsRouter.post('/products', auth(), addProduct);
productsRouter.put('/products/:id', auth(), replaceProduct);
productsRouter.patch('/products/:id', auth(), updateProduct);
productsRouter.delete('/products/:id', auth(), deleteProduct);

function getProducts(req, res, next) {

  products.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);

}

function getProduct(req, res, next) {
  products.get(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function addProduct(req, res, next) {
  if (req.user.can('create')) {
    products.create(req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

function replaceProduct(req, res, next) {
  if (req.user.can('update')) {
    products.update(req.params.id, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

function updateProduct(req, res, next) {
  if (req.user.can('update')) {
    products.update(req.params.id, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

function deleteProduct(req, res, next) {
  if (req.user.can('delete')) {
    products.delete(req.params.id)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  } else {
    next('You do not have the required level of user permissions to preform this action')
  }
}

module.exports = productsRouter;
