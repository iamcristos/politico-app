import db from '../models/db'
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'

class userController{
    static userSignup(req,res){
      const {firstname, lastname, othername, email, phoneNumber, passportUrl, password} = req.body;
      let hashPassword= passwordHash.generate(password);
        const text = `INSERT INTO Users(firstname, lastname , othername, email, phoneNumber, passportUrl, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`
        const values = [firstname,lastname,othername,email,phoneNumber,passportUrl,hashPassword];
        db.query(text,values).then((user)=>{
            return res.status(201).send({
                success: true,
                data: [{
                    token : jwt.sign(user.rows[0].id, 'politico app'),
                    user: {
                            firstname: user.rows[0].firstname,
                            email: user.rows[0].email,
                            phoneNumber: user.rows[0].phoneNumber,
                            passportUrl: user.rows[0].passportUrl
                        }
                }],
            })
        }).catch((err)=>{
            return res.status(400).send({
                success: false,
                message: err
            })
        });
    }

    static userSignin(req,res){
        const {email, password} = req.body;
        const text = 'SELECT * FROM Users WHERE email = $1'
        const values = [email]
        db.query(text, values).then((user)=>{
            let confirmPassword= passwordHash.verify(password, user.rows[0].password);
            if (confirmPassword === true){
                return res.status(200).send({
                    success : true,
                    data: [{
                        token : jwt.sign(user.rows[0].id, 'politico app'),
                        user: {
                                id: user.rows[0].id,
                                firstname: user.rows[0].firstname,
                                email: user.rows[0].email,
                                phoneNumber: user.rows[0].phoneNumber,
                                passportUrl: user.rows[0].passportUrl
                        }
                    }],
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: 'invalid user password'
                });
            }

        }).catch((error)=>{
            console.log(error)
            return res.status(400).send({
                success: false,
                message: 'error'
            })
        })
    }

}

export default userController;