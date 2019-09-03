'use strict';

const server = require('../../src/app.js').server;
const supergoose = require('../supergoose.js');
const mockRequest = supergoose.server(server);

describe('Products Routes', () => {

  it('can post() a new products', () => {
    let obj = { name: 'Book' };
    return mockRequest.post('/content/products')
      .send(obj)
      .then(data => {
        let record = data.body;
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() a category', () => {
    let obj = { name: 'Banana' };
    return mockRequest.post('/content/products')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/content/products/${data.body._id}`)
          .then(record => {
            Object.keys(obj).forEach(key => {
              expect(record.body[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can get() all products', () => {
    let obj = { name: 'Spoon' };
    return mockRequest.post('/content/products')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/content/products`)
          .then(record => {
            Object.keys(obj).forEach(key => {
              expect(record.body.count).toEqual(3);
            });
          });
      });
  });

  it('can put() a category', () => {
    let obj1 = { name: 'Short Shirt' };
    let obj2 = { name: 'Long Shirt' };
    return mockRequest.post('/content/products')
      .send(obj1)
      .then(data => {
        return mockRequest.put(`/content/products/${data.body._id}`)
          .send(obj2)
          .then(record => {
            Object.keys(obj2).forEach(key => {
              expect(record.body[key]).toEqual(obj2[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    return mockRequest.get(`/content/products`)
      .then(Originalrecords => {
        const idToDelete = Originalrecords.body.results[0]._id;
        return mockRequest.delete(`/content/products/${idToDelete}`)
          .then(deletedResult => {
            return mockRequest.get(`/content/products`)
              .then(newrecords => {
                const matchingResults = newrecords.body.results.filter(e => e._id === deletedResult.body._id);
                expect(matchingResults.length).toEqual(0);
              })
          });
      });
  });

});
