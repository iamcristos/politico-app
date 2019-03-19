import supertest from 'supertest';
import expect from 'expect';
import app from '../src/app';
import db from '../src/models/db'


const request = supertest;

describe('/CREATE POLITICAL PARTY', () => {
  it('should not create a political party without token', (done) => {
    const body = {
       name: 'PPP', hqAddress: 'Tafawa road', logourl: 'link',
    };
    
    request(app)
      .post('/api/v1/parties')
      .send(body)
      .expect(401)
      .end(done);
  });


  it('should not create a political party', (done) => {
    const party = {};
    request(app)
      .post('/api/v1/parties')
      .send(party)
      .expect(401)
      .end(done);
  });
});


describe('/GET ALL PARTIES', ()=>{
  it('should not return all political party without token', (done)=>{
    request(app)
      .get('/api/v1/parties')
      .expect(401)
      .end(done)
  })
});

describe('/GET A SPECIFIC PARTY ', ()=>{
  it('should return a specific political party', (done)=>{
    request(app)
      .get(`/api/v1/parties/1.toHexString()`)
      .expect(401)
      .end(done)
  })
})


describe('/EDIT A SPECIFIC PARTY', ()=>{
it ('should not Edit a party name without token', (done)=>{
  const name = 'her'
  request(app)
    .patch(`/api/v1/parties/1.toHexString()`)
    .send({name:'her'})
    .expect(401)
    .end(done)
});

it ('should not Edit other field without token', (done)=>{
  request(app)
    .patch(`/api/v1/parties/1.toHexString()`)
    .send({logourl:'url'})
    .expect(401)
    .end(done)
})
})

describe('/DELETE A SPECIFIC PARTY', ()=>{
it('should not Delete a Party wihout authorization', (done)=>{
  request(app)
    .delete(`/api/v1/parties/1.toHexString()`)
    .expect(401)
    .end(done)
})
})


