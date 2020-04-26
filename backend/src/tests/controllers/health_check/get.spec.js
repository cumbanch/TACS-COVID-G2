const { getResponse } = require('../../utils/app');

describe('Health check endpoint', () => {
  let res = {};
  describe('Successful response', () => {
    beforeAll(async () => {
      res = await getResponse({ endpoint: '/health', method: 'get' });
    });
    it('Should return status code 200', () => {
      expect(res.statusCode).toEqual(200);
    });
    it('Should return the uptime', () => {
      expect(res.body).toHaveProperty('uptime');
    });
  });
});
