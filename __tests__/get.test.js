const request = require('supertest');
const app = require('../index');

test('GET /get - Get all products', async () => {
  const response = await request(app).get('/get');

  expect(response.status).toBe(200);
});
