const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/server');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando é criado com sucesso', () => {
  let response = {};
  const DBServer = new MongoMemoryServer();

  before(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true }
      );
      
      sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
      
      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Mary Jane',
        email: 'maryjanezinha@gmail.com',
        password: '12345678'
      });
    });
    
    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
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
    
    it('a propriedade "user" possui o seguinte objeto como retorno"',
    () => {
      expect(response.body.user).to.have.property('_id');
      expect(response.body.user.name).to.be.equal('Mary Jane');
      expect(response.body.user.email).to.be.equal('maryjanezinha@gmail.com');
      expect(response.body.user.role).to.be.equal('user');
      expect(response.body.user).not.to.have.property('password');
    }
    );
  });
});
