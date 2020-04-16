const request = require('supertest');

const app = require('../../app');

describe('Health check endpoint', () => {
  let res = {};
  describe('Successful response', () => {
    beforeAll(async () => {
      res = await request(app)
        .get('/health')
        .send();
    });
    it('Should return status code 200', () => {
      expect(res.statusCode).toEqual(200);
    });
    it('Should return the uptime', () => {
      expect(res.body).toHaveProperty('uptime');
    });
  });
});
