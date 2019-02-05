import party from '../db/partyDb';
import db from '../models/db'

class PartyController {
  static createParty(req, res) {
    const {name, hqAddress,logourl} = req.body
    const text = 'INSERT INTO Party(name,hqAddress,logourl) VALUES($1 ,$2 ,$3) RETURNING *';
    const values = [name,hqAddress,logourl];

    db.query(text,values).then((newParty)=>{
        return res.status(201).send({
          success: true,
          message: 'party created succesfully',
          party: newParty.rows[0],
        });
      }).catch((err)=>{
        return res.status(422).send({
          success: false,
          message: 'party was not created',
          err
        })
      })
    
  }

  static getAllParties(req, res) {
    const text = 'SELECT * from Party';
    db.query(text).then((party)=>{ 
      return res.status(200).send({
      success: true,
      party : party.rows[0]
        })
      }).catch((err)=>{
        return res.status(400).send({
          success: false,
          message: 'error'
        })
      })
  }

  static getASpecificParty(req,res) {
    const id = req.params.id
    const Id= parseInt(id)
    const text= `SELECT * FROM Party WHERE id = ${Id} `;

    db.query(text).then((party)=>{
      res.status(200).send({
        success: true,
        message: party.rows[0]
      });
    }).catch((err)=>{
      return res.status(404).send({
        success: false,
        message: 'Political party dont exist'
      });
    })
  }

  static editAParty(req,res){
    const id = (req.params.id);
    const Id = parseInt(id)
    const {name} = req.body
    const text = `UPDATE Party SET name = ${name} WHERE id = ${Id} `
    console.log(typeof(name))
    
    db.query(text).then((party)=>{
      return res.status(200).send({
        success: true,
        message: party.rows[0]
      })
    }).catch((err)=>{
      console.log(err)
      return res.status(404).send({
        success: false,
        message:"party dont exist"
      })
    })
        
      } 
    
    
  

  static deleteAParty(req,res){
    const id = parseInt(req.params.id);
    try {
      party.find((item)=>{
        if (item.id === id) {
          party.splice(id-1, 1)
          return res.status(200).send({
            success:true,
            message:'Party succesfully deleted',
            party: item
          })
        } 
      }) 
      }   catch (error) {
          return res.status(404).send({
          success: false,
          message: 'Party dont exist'
      })
    }
  };
}

export default PartyController

