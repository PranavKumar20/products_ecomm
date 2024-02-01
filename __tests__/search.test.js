const request = require('supertest');
const app = require('../index');

test('GET /search - Search for products', async () => {
  const response = await request(app).get('/search?query=your-search-term'); // Replace with an actual search term

  expect(response.status).toBe(200);
});
