import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app.js';

describe('GET /api/v1/health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('auth validation', () => {
  it('rejects invalid registration payload', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({ email: 'nope' });
    expect(res.status).toBe(400);
  });

  it('blocks /users/me without a token', async () => {
    const res = await request(app).get('/api/v1/users/me');
    expect(res.status).toBe(401);
  });
});
