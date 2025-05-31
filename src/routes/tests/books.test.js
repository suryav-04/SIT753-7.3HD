const request = require('supertest');
const app = require('../src/app');

describe('Book API', () => {
  it('GET /books returns empty list initially', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
