import db from '../models/db'
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'

class userController{
    static userSignup(req,res){
      const {firstname, lastname, othername, email, phoneNumber, password, isadmin} = req.body;
      const passportUrl = req.file.url
      let hashPassword= passwordHash.generate(password);
        const text = `INSERT INTO Users(firstname, lastname , othername, email, phoneNumber, passportUrl, password, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
        const values = [firstname,lastname,othername,email,phoneNumber,passportUrl,hashPassword, isadmin];
        db.query(text,values).then((user)=>{
            return res.status(201).send({
                status:201,
                success: true,
                data: [{
                    token : jwt.sign({userId:user.rows[0].id, userEmail:user.rows[0].email}, 'politico app'),
                    user: {
                            firstname: user.rows[0].firstname,
                            lastname: user.rows[0].lastname,
                            email: user.rows[0].email,
                            phoneNumber: user.rows[0].phonenumber,
                            passportUrl: user.rows[0].passporturl
                        }
                }],
                
            })
        }).catch((err)=>{
            return res.status(400).send({
                status:400,
                success: false,
                message: ['email already in use by a user'],
                err
            })
        });
    }

    static userSignin(req,res){
        const {email, password} = req.body;
        const text = 'SELECT * FROM Users WHERE email = $1 '
        const values = [email]
        db.query(text, values).then((user)=>{
            console.log(passwordHash.verify(password, user.rows[0].password))
            let confirmPassword= passwordHash.verify(password, user.rows[0].password);
            if (confirmPassword === true){
                return res.status(200).send({
                    status:200,
                    success : true,
                    data: [{
                        token : jwt.sign({userId:user.rows[0].id, userEmail:user.rows[0].email}, 'politico app'),
                        user: {
                                id: user.rows[0].id,
                                firstname: user.rows[0].firstname,
                                lastname:user.rows[0].lastname,
                                email: user.rows[0].email,
                                phoneNumber: user.rows[0].phonenumber,
                                passportUrl: user.rows[0].passporturl,
                                isadmin: user.rows[0].isadmin
                        }
                    }],
                })
            } else {
                return res.status(401).send({
                    status:401,
                    success: false,
                    message: 'invalid user password'
                });
            }

        }).catch((error)=>{
            console.log(error)
            return res.status(400).send({
                status:400,
                success: false,
                message: 'error'
            })
        })
    }

    static getAllUsers (req,res) {
        const text = `SELECT * FROM Users`
        db.query(text).then((user)=>{
            res.status(200).send({
                status:200,
                user: user.rows
            })
        }).catch((err)=>{
            res.status(400).send({
                status:400,
                err
            })
        })
    }

    static getAUser (req,res) {
        const id = req.params.id
        const Id = parseInt(id)
        const text = `SELECT * FROM Users WHERE id = $1`
        const values = [Id]
        db.query(text,values).then((user)=>{
            if(user.rowCount===0){
                res.status(404).send({
                    status:404,
                    message:'no user found'
                })
            }
            res.status(200).send({
                status:200,
                user:user.rows
            })
        }).catch((err)=>{
            res.status(404).send({
                status:404,
                message: 'no such user'
            })
        })
    }

}

export default userController;