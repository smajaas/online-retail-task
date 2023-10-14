const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Import Express app
const should = chai.should();

chai.use(chaiHttp);
chai.should();

describe('Product Controller', () => {
  it('should create a new product', (done) => {
    chai
      .request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        price: 19.99,
        description: 'Test Description',
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('name');
        res.body.should.have.property('price');
        res.body.should.have.property('description');
        res.body.name.should.equal('Test Product');
        res.body.price.should.equal(19.99);
        res.body.description.should.equal('Test Description');

        done();
      });
  });

  it('should return a validation error if product data is missing', (done) => {
    chai
      .request(app)
      .post('/api/products')
      .send({}) // Send an empty object to trigger validation errors
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400); // Assuming 400 Bad Request for validation errors
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should retrieve a list of all products', (done) => {
    chai
      .request(app)
      .get('/api/products')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200); // Assuming 200 OK for successful retrieval
        res.body.should.be.an('array');
        done();
      });
  });
});

it('should retrieve a single product by ID', (done) => {
  // First, create a product
  chai
    .request(app)
    .post('/api/products')
    .send({
      name: 'Single Product',
      price: 29.99,
      description: 'Product to retrieve by ID',
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      const productId = res.body._id; // Get the ID of the created product
      // Now, retrieve the product by its ID
      chai
        .request(app)
        .get(`/api/products/${productId}`)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('name');
          res.body.should.have.property('price');
          res.body.should.have.property('description');
          done();
        });
    });
});

it('should update an existing product', (done) => {
  chai
    .request(app)
    .post('/api/products')
    .send({
      name: 'Product to Update',
      price: 49.99,
      description: 'Product to be updated',
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      const productId = res.body._id; // Get the ID of the created product
      // Now, update the product
      chai
        .request(app)
        .put(`/api/products/${productId}`)
        .send({
          name: 'Updated Product',
          price: 59.99,
          description: 'Product has been updated',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('name');
          res.body.should.have.property('price');
          res.body.should.have.property('description');
          res.body.name.should.equal('Updated Product');
          res.body.price.should.equal(59.99);
          res.body.description.should.equal('Product has been updated');
          done();
        });
    });
});
