import jwt from 'jsonwebtoken';
import db from '../models/db';

let  aunthenticate= async (req,res,next)=>{
    const token = req.headers['x-access-token']

    if(!token) {
        return res.status(401).send({
            success: false,
            message: 'token required'
        });
    }
  }

export default aunthenticate