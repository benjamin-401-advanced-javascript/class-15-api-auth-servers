'use strict';

const Model = require('../mongo.js');
const schema = require('./products-schema.js');

// How can we connect ourselves to the mongo interface?
// What do we export?
class Products extends Model {
  constructor() {
    super(schema)
  }
}

module.exports = Products;
