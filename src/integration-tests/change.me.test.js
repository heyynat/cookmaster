const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const server = require('../api/server');
const connection = require('../api/models/connection');

const { expect } = chai;

chai.use(chaiHttp);

describe('POST - Users', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await (await connection());
    await connectionMock.collection('users').deleteMany({});
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  
  after(() => {
    MongoClient.connect.restore();
  });
  
  describe('Quando user é criado com sucesso', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Mary Jane',
        email: 'maryjanezinha@gmail.com',
        password: '12345678'
      });
    });
    
    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });
    
    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });
    
    it('a propriedade "user" deve possuir um objeto contendo "_id", "name", "email" e "role"',
    () => {
      expect(response.body.user).to.have.property('_id');
      expect(response.body.user.name).to.be.equal('Mary Jane');
      expect(response.body.user.email).to.be.equal('maryjanezinha@gmail.com');
      expect(response.body.user.role).to.be.equal('user');
      expect(response.body.user).not.to.have.property('password');
    });
  });  
});

describe('POST - Login', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await (await connection());
    await connectionMock.collection('users').insertOne({ name: 'Admin Master', email: 'masteradmin@gmail.com', password: 'admin123', role: 'admin' });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  
  after(() => {
    MongoClient.connect.restore();
  });
  
  describe('Quando não é passado email e password', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({});
    });
    
    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });
    
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" contém o texto "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });
  
  describe('Quando não é passado email', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
        password: '12345678'
      });
    });
    
    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });
    
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" contém o texto "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });
  
  describe('Quando não é passado password', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
        email: 'maryjanezinha@gmail.com',
      });
    });
    
    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });
    
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" contém o texto "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });
  
  describe('Quando login é feito com sucesso', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
        email: 'maryjanezinha@gmail.com',
        password: '12345678'
      });
    });
    
    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });
    
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
    
    it('a propriedade "token" tem um token JWT válido', () => {
      const token = response.body.token;
      const userWithoutPassword = jwt.decode(token);
      expect(userWithoutPassword.data.name).to.be.equals('Mary Jane');
    });
  });
  
  describe('Quando Admin é logado com sucesso', () => {
    let response;
    before(async () => {      
      response = await chai.request(server)
      .post('/login')
      .send({
        email: 'masteradmin@gmail.com',
        password: 'admin123'
      });
    });
    
    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });
    
    it('resposta é um objeto', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
    
    it('a propriedade "token" tem um token JWT válido', () => {
      const token = response.body.token;
      const userWithoutPassword = jwt.decode(token);
      expect(userWithoutPassword.data.name).to.be.equals('Admin Master');
    });
  });
});

describe('POST - Recipes', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await (await connection());
    await connectionMock.collection('users').deleteMany({});
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  
  after(() => {
    MongoClient.connect.restore();
  });
  
  describe('Quando recipe é criado com sucesso', () => {
    let response;
    before(async () => {   
      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Mary Jane',
        email: 'maryjanezinha@gmail.com',
        password: '12345678'
      });
      const token = await chai.request(server)
      .post('/login')
      .send({
        email: 'maryjanezinha@gmail.com',
        password: '12345678'
      }).then((res) => res.body.token);
      response = await chai.request(server)
      .post('/recipes')
      .send({
        name: 'Macarronada Especial',
        ingredients: 'Molho, Macarrão, Queijo, Almôndegas e Bacon',
        preparation: 'Ferver água á 150°'
      }).set('authorization', token);
    });
    
    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });
    
    it('o objeto possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('a propriedade "recipe" deve possuir um objeto contendo "_id", "name", "ingredients", "preparation" e "userId"',
    () => {
      expect(response.body.recipe).to.have.property('_id');
      expect(response.body.recipe).to.have.property('userId');
      expect(response.body.recipe.name).to.be.equal('Macarronada Especial');
      expect(response.body.recipe.ingredients).to.be.equal('Molho, Macarrão, Queijo, Almôndegas e Bacon');
      expect(response.body.recipe.preparation).to.be.equal('Ferver água á 150°');
    });
  });
});
