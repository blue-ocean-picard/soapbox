/*

Manual testing using curl commands

1.) Curl command to login a user and will save to database if it doesn't already exist
curl --header "Content-Type: application/json" --request POST --data '{"name": "testing do not delete me", "password": "password123", "password2": "password123", "email": "g@gmail.com", "usernames": {"twitter": "asdf"}}' 'http://localhost:3000/user/register'

2.) No password or incorrect password provided, will fail and log error message
curl --header "Content-Type: application/json" --request POST --data '{"email": "g@gmail.com"}' 'http://localhost:3000/user/login'
curl --header "Content-Type: application/json" --request POST --data '{"email": "g@gmail.com", "password": "12"}' 'http://localhost:3000/user/login'

3.) Password provided, will succeed and log success message and update last login date and time in database
curl --header "Content-Type: application/json" --request POST --data '{"email": "g@gmail.com", "password": "password123"}' 'http://localhost:3000/user/login'

4.) User log out
curl 'http://localhost:3000/user/logout'
*/

const mongoose = require('mongoose');
const { User } = require('../../db/schema');
const faker = require('faker');
const request = require('supertest');
const app = require('../index');

const userRegister = {
  name: 'testing testing',
  password: 'test123',
  password2: 'test123',
  email: 'sdlfjalsdjfsafklj@sdlfjalsdjfsafklj.com',
  usernames: {
    twitter: 'hello',
    youtube: 'hello'
  }
};

const userLogin = {
  password: userRegister.password,
  email: userRegister.email,
};

const userIncorrectLogin = {
  password: faker.internet.password(),
  email: userRegister.email,
};


describe('Authentication routes', () => {
  var server, agent;

  beforeEach((done) => {
    server = app.listen(5000, (err) => {
      if (err) { done(err); }
      agent = request.agent(server);
      done();
    });
  });

  afterEach((done) => {
    server.close(done);
  });

  afterAll( async () => {
    await User.findOneAndDelete({email: userRegister.email});
    mongoose.disconnect();
  });

  describe('Register', () => {

    test('should return 200 if all fields are correct and not already in db', async () => {
      const response = await request(app).post('/user/register').send(userRegister);
      expect(response.statusCode).toBe(200);
    });

    test('should return 403 if email already exists', async () => {
      const response = await request(app).post('/user/register').send(userRegister);
      expect(response.statusCode).toBe(403);
      expect(response.body).toBeDefined();
    });
  });

  describe('Login', () => {

    test('should return 200 and session if email and password are correct', async () => {
      const response = await request(app).post('/user/login').send(userLogin);
      expect(response.statusCode).toBe(200);
    });

    test('should return 403 if email or password are incorrect', async () => {
      const response = await request(app).post('/user/login').send(userIncorrectLogin);
      expect(response.statusCode).toBe(403);
    });
  });

  describe('Logout', () => {

    test('should return 200 if user logs out', async () => {
      const response = await request(app).get('/user/logout');
      expect(response.statusCode).toBe(200);
    });
  });

});