import request from 'supertest';
import app from '../server';

describe('User Routes', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpass', role: 'user' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('should login an existing user', async () => {
    await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'testpass', role: 'user' });

    const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'testpass' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
