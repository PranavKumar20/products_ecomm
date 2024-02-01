const request = require('supertest');
const app = require('../index');

test('PUT /update - Update a product', async () => {
  const response = await request(app)
    .put('/update?id=your-product-id') // Replace with an actual product ID
    .send({
      name: 'Updated Product',
    });

  expect(response.status).toBe(200);
  expect(response.body.msg).toBe('Product updated successfully');
});
