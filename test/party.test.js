import supertest from 'supertest';
import expect from 'expect';
import app from '../src/app';
import party from '../src/db/partyDb';


const request = supertest;

describe('/CREATE POLITICAL PARTY', () => {
  it('should create a political party', (done) => {
    const body = {
      "id": 3, "name": 'PPP', "hqAddress": 'Tafawa road', "logourl": 'link',
    };
    console.log(typeof(body))
    request(app)
      .post('/api/v1/parties')
      .send(body)
      .expect(201)
      .expect((result) => {
        console.log((result.body.party) )
        expect(result.body.party).toEqual(body);
      })
      .end(done);
  });

  it('should not create a political party', (done) => {
    const party = {};
    request(app)
      .post('/api/v1/parties')
      .send(party)
      .expect(400)
      .end(done);
  });
});

describe('/GET ALL PARTIES', ()=>{
  it('should return all political party', (done)=>{
    request(app)
      .get('/api/v1/parties')
      .expect(200)
      .expect((result) => {
        expect(result.body.party).toEqual(party)
      })
      .end(done)
  })
});

describe('/GET A SPECIFIC PARTY ', ()=>{
  it('should return a specific political party', (done)=>{
    let id= party.find((item)=> item.id)
    console.log(id)
    request(app)
      .get(`/api/v1/parties/1.toHexString()`)
      .expect(200)
      .expect((result) => {
        expect(result.body.message).toEqual(party[0])
      })
      .end(done)
  })
})


describe('/EDIT A SPECIFIC PARTY', ()=>{
it ('should Edit a party name', (done)=>{
  const name = 'her'
  request(app)
    .patch(`/api/v1/parties/1.toHexString()`)
    .send({name:'her'})
    .expect(200)
    .expect((result)=>{
      expect(result.body.message[0].name).toBe(name)
    })
    .end(done)
});

it ('should not Edit other field', (done)=>{
  request(app)
    .patch(`/api/v1/parties/1.toHexString()`)
    .send({logourl:'url'})
    .expect(405)
    .end(done)
})
})

describe('/DELETE A SPECIFIC PARTY', ()=>{
it('should Delete a Party', (done)=>{
  request(app)
    .delete(`/api/v1/parties/1.toHexString()`)
    .expect(204)
    .end(done)
})
})

