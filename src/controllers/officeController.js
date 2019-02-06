import office from '../db/officeDb';
import db from '../models/db'

class officeController {
    static createOffice(req, res) {
      const {name, type} = req.body;

      const text = 'INSERT INTO Office(name,type) VALUES($1,$2)';
      const values = [name,type];

      db.query(text,values)
        .then((office)=>{
          return res.status(201).send({
            success: true,
            message: 'office created succesfully',
            office : office.rows[0]
        }) 
      }).catch((err)=>{
         return res.status(422).send({
           success: false,
           message: 'political office not created',
           err
         })
      });
    }

    static getAllOffice(req, res) {
      const text = 'SELECT * from Office';
      db.query(text)
        .then((office)=>{
          return res.status(200).send({
            success: true,
            office: office.rows[0]
          })
        }).catch((err)=>{
          return res.status(400).send({
            success: false,
            message: "error"
          })
        })
    }

    static getASpecificOffice(req,res) {
      const id = req.params.id
      const Id= parseInt(id)
      const text = `SELECT * FROM Office WHERE id = ${Id} RETURNING *`

      db.query(text).then((office)=>{
        return res.status(200).send({
          success: true,
          message: office.rows[0]
        })
      }).catch((err)=>{
        return res.status(404).send({
          success: false,
          message: 'Political office dont exist'
        });
      })
        
    }
}

export default officeController;