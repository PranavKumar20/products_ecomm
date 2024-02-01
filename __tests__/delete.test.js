const request = require('supertest');
const app = require('../index');

test('DELETE /delete - Delete a product', async () => {
  const response = await request(app)
    .delete('/delete?id=your-product-id') // Replace with an actual product ID
    .send();

  expect(response.status).toBe(200);
  expect(response.body.msg).toBe('Product deleted successfully');
});
