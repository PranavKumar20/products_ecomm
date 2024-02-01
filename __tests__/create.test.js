const request = require('supertest');
const app = require('../index');

test('POST /create - Create a new product', async () => {
  const response = await request(app)
    .post('/create')
    .send({
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
      variants: ['Test Variant'],
    });

  expect(response.status).toBe(200);
  expect(response.body.msg).toBe('Product Created successfully');
});
