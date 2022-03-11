const app = require('../app');
const assert = require('assert');
const axios = require('axios');
const request = require('supertest');
const mongoose = require('mongoose');
const keys = require('../config/keys');
beforeAll(() =>
     mongoose.connect(keys.mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
     })
);
afterAll((done) => {
     mongoose.disconnect(done);
});
describe('Test the login API', () => {
     test('Right username and password should return right user data', async () => {
          const response = await request(app).get(
               '/api/loginUser?username=test&&password=test'
          );
          console.log(response);
          expect(response.statusCode).toBe(200);
          expect(response._body.username).toBeDefined();
          expect(response._body.username).toBe('test');
          expect(response._body.password).toBeDefined();
          expect(response._body.password).toBe(
               '$2b$12$xQwZpuiGvPVpqjgXV/g8ruFJSmVdWJvBLqYiLKt0qfgww2GyCdPy6'
          );
          expect(response._body._id).toBe('619ecf8a3d25236d2807d737');
     });
     test('Wrong password should return right user data', async () => {
          const response = await request(app).get(
               '/api/loginUser?username=test&&password=wrong'
          );
          console.log(response);
          expect(response.statusCode).toBe(200);
          expect(response._body.message).toBeDefined();
          expect(response._body.message).toBe(
               'Username or password is incorrect.'
          );
     });
});
