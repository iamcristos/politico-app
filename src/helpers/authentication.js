import jwt from 'jsonwebtoken';
import db from '../models/db';


let  aunthenticate=  (req,res,next)=>{
    const token = req.headers['x-access-token']
    const verify= jwt.verify(token,'politico app');
    if(!token) {
        return res.status(401).send({
            success: false,
            message: 'token required'
        });
      }

    
  }

export default aunthenticate