import jwt from 'jsonwebtoken';
import db from '../models/db';
import { error } from 'util';


class  aunthenticate{

    static  verifyToken(req,res,next){
        const token = req.headers['x-access-token'];
        
        if(!token) {
            console.log('hey')
            return res.status(401).send({
                success: false,
                message: 'token required'
            });
        }
        const verify = jwt.verify(token, 'politico app')
        const text= 'SELECT * FROM Users WHERE id= $1'
        db.query(text,[verify]).then((user)=>{
            if (user.rows.isAdmin === false){
                return res.send({
                    status: 401,
                    message: 'unathourized request'
                })
            }
        }).catch((err)=>{
            return res.send({
                status:400,
                message: 'invalid token'
            })
        })

        next()
        
    }

    static verifyUser(req,res,next) {
        const token = req.headers['x-access-token'];
        
        if(!token) {
            console.log('hey')
            return res.status(401).send({
                success: false,
                message: 'token required'
            });
        }
        const verify = jwt.verify(token, 'politico app')
        const text= 'SELECT * FROM Users WHERE id= $1'
        db.query(text,[verify]).then((user)=>{
            if (!user) {
                return res.send({
                    status:401,
                    success:false,
                    message: 'invalid user token'
                })
            }
        }).catch((err)=>{
            return res.send({
                status:401,
                success:false,
                message: 'invalid user token'
            })

        })
    }
}

export default aunthenticate