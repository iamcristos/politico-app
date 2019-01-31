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
    request(app)
      .post('/api/v1/parties')
      .send(body)
      .expect(201)
      .expect((result) => {
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

describe('/GET A PARTY', ()=>{
  it('should retun a political party', (done)=>{
    request(app)
      .get('/api/v1/parties}/1')
      .expect(200)
      .expect((result)=> {

      })
      .end(done)
  })
})
