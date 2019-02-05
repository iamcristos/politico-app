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
      return+- res.status(200).send({
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
    const name = req.body.name
    const text = `UPDATE Party SET name = $1 WHERE id = $2 RETURNING * ` 
    const values = [name , Id]
    console.log(typeof(name))
    
    db.query(text,values).then((party)=>{
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
      const text = `DELETE FROM Party  WHERE id = $1 RETURNING * `
      const values = [id]
      db.query(text,values).then((party)=>{
        return res.status(200).send({
          success:true,
          message:'Party succesfully deleted',
          party: party.rows[0]
        })
      }).catch((err)=>{
        console.log(err)
        return res.status(404).send({
          success: false,
          message: 'Party dont exist'
      })   
      })
    }
  };


export default PartyController

