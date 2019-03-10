import db from '../models/db'

class PartyController {
  static createParty(req, res) {
    const {name, hqAddress} = req.body;
    const logourl = req.file
    const text = 'INSERT INTO Party(name,hqAddress,logourl) VALUES($1 ,$2 ,$3) RETURNING *';
    const values = [name,hqAddress,logourl];

    db.query(text,values).then((newParty)=>{
        return res.status(201).send({
          status:201,
          success: true,
          message: 'party created succesfully',
          party: newParty.rows[0],
        });
      }).catch((err)=>{
        return res.status(422).send({
          status:422,
          success: false,
          message: 'party name already exist',
          err
        })
      })
    
  }
 

  static getAllParties(req, res) {
    const text = `SELECT * FROM Party `;
    db.query(text).then((party)=>{ 
      return res.status(200).send({
      status:200,
      success: true,
      party : party.rows
        })
      }).catch((err)=>{
        return res.status(400).send({
          status:400,
          success: false,
          message: 'error'
        })
      })
  }

  static getASpecificParty(req,res) {
    const id = req.params.id
    const Id= parseInt(id)
    const text= `SELECT * FROM Party WHERE id = $1 `;
    const values= [Id]

    db.query(text,values).then((party)=>{
      if(party.rowCount === 0){
        return res.status(404).send({
          status:404,
          success: false,
          message: 'Political party dont exist'
        })
      }
      res.status(200).send({
        status:200,
        success: true,
        message: party.rows
      });
    }).catch((err)=>{
      return res.status(404).send({
        status: 404,
        success: false,
        message: 'Political party dont exist'
      });
    })
  }

  static editAParty(req,res){
    const id = (req.params.id);
    const Id = parseInt(id)
    const {name} = req.body
    const text = 'UPDATE Party SET name = $1 WHERE id = $2 RETURNING *'
    const values = [name,Id]
    
    db.query(text,values).then((party)=>{
      if(party.rowCount === 0){
        return res.status(404).send({
          status:404,
          success: false,
          message: 'Political party dont exist'
        })
      }
      return res.status(200).send({
        status:200,
        success: true,
        message: party.rows
      })
    }).catch((err)=>{
        return res.status(404).send({
          status:404,
          success: false,
          message:"party dont exist"
        })
      });
        
    } 
    
    
  

  static deleteAParty(req,res){
    const id = parseInt(req.params.id);
    const text = `DELETE FROM Party WHERE id = $1 RETURNING * ` 
    const values= [id]
    
    db.query(text,values).then((party)=>{
      if(party.rowCount === 0){
        return res.status(404).send({
          status:404,
          success: false,
          message: 'Political party dont exist'
        })
      }
      return res.status(200).send({
        status:200,
        success:true,
        message:'Party succesfully deleted',
        party: party.rows
      })
    }).catch((error)=>{
        return res.status(404).send({
          status:404,
          success: false,
          message: 'Party dont exist'
        })
    })
          
    }
  }

export default PartyController

