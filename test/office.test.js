import supertest from 'supertest';
import expect from 'expect';
import app from '../src/app';
import office from '../src/db/officeDb';

const request = supertest;

// describe('/CREATE POLITICAL OFFICE', () => {
//   it('should create a political party', (done) => {
//     const body = {
//       "id": 3, "name": 'President', "type": 'Federal'
//     };
//     request(app)
//       .post('/api/v1/offices')
//       .send(body)
//       .expect(201)
//       .expect((result) => {
//         expect(result.body.office[2]).toEqual(body);
//       })
//       .end(done);
//   });

//   it('should not create a political party', (done) => {
//     const party = {};
//     request(app)
//       .post('/api/v1/offices')
//       .send(party)
//       .expect(400)
//       .end(done);
//   });
// });

// describe('/GET ALL OFFICE', ()=>{
//   it('should return all political office', (done)=>{
//     request(app)
//       .get('/api/v1/offices')
//       .expect(200)
//       .expect((result) => {
//         expect(result.body.office).toEqual(office)
//       })
//       .end(done)
//   })
// });

// describe('/GET A SPECIFIC OFFICE ', ()=>{
//     it('should return a specific political party', (done)=>{
//       let id= office.find((item)=> item.id)
      
//       request(app)
//         .get(`/api/v1/offices/1.toHexString()`)
//         .expect(200)
//         .expect((result) => {
//           expect(result.body.message).toEqual(office[0])
//         })
//         .end(done)
//     })
//   })

