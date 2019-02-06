import supertest from 'supertest';
import expect from 'expect';
import app from '../src/app';
import db from '../src/models/db'


const request = supertest;

describe('/CREATE POLITICAL PARTY', () => {
  it('should create a political party', (done) => {
    const body = {
       name: 'PPP', hqAddress: 'Tafawa road', logourl: 'link',
    };
    
    request(app)
      .post('/api/v1/parties')
      .send(body)
      .expect(201)
      // .expect((result) => {
      //   console.log(result)
      //   // expect(result.body.party).toEqual(body);
      // })
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

// describe('/GET ALL PARTIES', ()=>{
//   it('should return all political party', (done)=>{
//     request(app)
//       .get('/api/v1/parties')
//       .expect(200)
//       .expect((result) => {
//         expect(result.body.party).toEqual(party.rows[0])
//       })
//       .end(done)
//   })
// });

// describe('/GET A SPECIFIC PARTY ', ()=>{
//   it('should return a specific political party', (done)=>{
//     let id= party.find((item)=> item.id)
//     console.log(id)
//     request(app)
//       .get(`/api/v1/parties/1.toHexString()`)
//       .expect(200)
//       .expect((result) => {
//         expect(result.body.message).toEqual(party.rows[0])
//       })
//       .end(done)
//   })
// })


// describe('/EDIT A SPECIFIC PARTY', ()=>{
// it ('should Edit a party name', (done)=>{
//   const name = 'her'
//   request(app)
//     .patch(`/api/v1/parties/1.toHexString()`)
//     .send({name:'her'})
//     .expect(200)
//     .expect((result)=>{
//       expect(result.body.message.name).toBe(name)
//     })
//     .end(done)
// });

// it ('should not Edit other field', (done)=>{
//   request(app)
//     .patch(`/api/v1/parties/1.toHexString()`)
//     .send({logourl:'url'})
//     .expect(405)
//     .end(done)
// })
// })

// describe('/DELETE A SPECIFIC PARTY', ()=>{
// it('should Delete a Party', (done)=>{
//   request(app)
//     .delete(`/api/v1/parties/1.toHexString()`)
//     .expect(200)
//     .end(done)
// })
// })


