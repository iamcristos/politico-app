import jwt from 'jsonwebtoken';
import db from '../models/db';


class  aunthenticate{

    static  verifyToken(req,res,next){
        const token = req.headers['x-access-token'];
        
        if(!token) {
            return res.status(401).send({
                status:401,
                success: false,
                message: 'token required'
            });
        }
        const verify = jwt.verify(token, 'politico app')
        console.log(verify)
        const text= 'SELECT * FROM Users WHERE id= $1'
        const values= [verify.userId]
        console.log(values)
        db.query(text,values).then((user)=>{
            console.log(user.rows[0].isAdmin === false)
            if (!(user.rows[0].isadmin)){
                return res.send({
                    status: 401,
                    message: 'unathourized request'
                })
            }
            next()
        }).catch((err)=>{
            return res.send({
                status:400,
                message: 'invalid token'
            })
        })
        
    }

    static verifyUser(req,res,next) {
        const token = req.headers['x-access-token'];
        
        if(!token) {
            console.log('hey')
            return res.status(401).send({
                status:401,
                success: false,
                message: 'token required'
            });
        }
        const verify = jwt.verify(token, 'politico app')
        console.log(verify)
        const text= 'SELECT * FROM Users WHERE id= $1'
        const values= [verify.userId]
        db.query(text,values).then((user)=>{
            if (!user) {
                return res.send({
                    status:401,
                    success:false,
                    message: 'invalid user token'
                })
            }
            next()
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