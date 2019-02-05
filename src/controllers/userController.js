import db from '../models/db'
import bcrypt from 'bcryptjs';
import passwordHash from 'password-hash'

class userController{
    static userSignup(req,res){
      const {firstname, lastname, othername, email,phoneNumber, passportUrl ,password} = req.body;
      let hashPassword= passwordHash.generate(password)
        console.log(hashPassword)
        const text = `INSERT INTO Users(firstname, lastname , othername, email , phoneNumber,passportUrl,password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`
        const values = [firstname,lastname,othername,email,phoneNumber,passportUrl,hashPassword]

        db.query(text,values).then((user)=>{
            return res.status(201).send({
                success: true,
                user: user.rows[0]
            })
        }).catch((err)=>{
            console.log(err)
            return res.status(500).send({
                success: false,
                message: 'Kindly try again'
            })
        })
    }

}

export default userController;