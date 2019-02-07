import jwt from 'jsonwebtoken';
import db from '../models/db';


class  aunthenticate{

    static async verifyToken(req,res,next){
        const token = req.headers['x-access-token'];
        
        if(!token) {
            console.log('hey')
            return res.status(401).send({
                success: false,
                message: 'token required'
            });
        }
        
          try {
            console.log(token)
            const verify= await jwt.verify(token,'politico app');
            console.log(verify)
            const text= 'SELECT * FROM Users WHERE id= $1 ';
            console.log(text)
            const values= [verify]
            const {rows}= await db.query(text,values)
            console.log(rows)
            if (!rows[0]) {
                return res.status(400).send({
                    error: "invalid user"
                })
            }
            next()
          } catch (error) {
              return res.status(400).send({
                  error: error
              });
          }
    }
}

export default aunthenticate