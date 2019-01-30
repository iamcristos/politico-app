import supertest from 'supertest';
import expect from 'expect';
import app from '../src/app';


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
