import validation from 'express-validator';
import db from '../models/db';

class userMiddleware{
    static signUpValidate(req,res,next){
        
            const {firstname, lastname, othername, email,phoneNumber, passportUrl ,password,} = req.body;
            req.checkBody('firstname', 'first name is required').notEmpty().trim();
            req.checkBody('lastname', 'last name is required').notEmpty().trim();
            req.checkBody('othername', 'other name is required').notEmpty().trim();
            req.checkBody('email', 'email is required').notEmpty().trim();
            req.checkBody('email', 'a valid email is required').isEmail()
            req.checkBody('phoneNumber', 'phonenumber is required').notEmpty().trim();
            req.checkBody('passportUrl', 'passport Url is required').notEmpty().trim();
            req.checkBody('password', 'password is required').notEmpty();
            req.checkBody('password', 'password must be above 5').isLength({ min: 6 });
            req.checkBody('password2', 'reuired').notEmpty().equals(req.body.password);
            
            let errors= req.validationErrors();
            if(errors){
                return res.status(400).send({
                    success: false,
                    message: errors
                })
            }
            next()
        
        }
    }


export default userMiddleware;