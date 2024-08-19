const chai = require('chai');
const supertest = require('supertest');
const chaiHttp = require('chai-http');
const app = require('../src/app'); 
const sinon = require('sinon');
const passport = require('passport');
const expect = chai.expect;
const User = require('../src/models/user'); // Adjust the path and import as necessary
chai.use(chaiHttp);

describe('Protected Route Authentication', () => {
  it('should reject unauthenticated request to /payment', (done) => {
    chai.request(app)
      .get('/payment')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').that.includes('Unauthorized');
        done();
      });
  });
});


describe('Auth API', () => {
  let mockUserData;

  beforeEach(() => {
    mockUserData = {
      fullName: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    };
  });

  afterEach(async () => {
    // Remove the test user from the database
    console.log(mockUserData.email)
    console.log(User)
    const count = User.destroy({where: { email: mockUserData.email }});
  });


  describe('POST /api/v1/register', () => {
    it('should fail to register a new user and return 401', async () => {
      const res = await chai.request(app)
        .post('/api/v1/register')
        .send(mockUserData);

      expect(res).to.have.status(200);
      console.log(res.body)
    });
  });
});

  // describe('POST /api/v1/register', () => {
  //   beforeEach(async () => {
  //     await supertest(server)
  //       .post('/register')
  //       .send(mockUserData);
  //   });

  //   it('should log in the user', async () => {
  //     const response = await supertest(server)
  //       .post('/login')
  //       .send({
  //         username: mockUserData.username,
  //         password: mockUserData.password
  //       });

  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toHaveProperty('token');
  //   });
  // });
// });