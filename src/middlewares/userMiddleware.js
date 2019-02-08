import validation from 'express-validator';
import db from '../models/db';

class userMiddleware{
    static signUpValidate(req,res,next){
        
        const {firstname, lastname, othername, email,phoneNumber, passportUrl ,password,passord2} = req.body;
        req.checkBody('firstname', 'first name is required').notEmpty().trim();
        req.checkBody('lastname', 'last name is required').notEmpty().trim();
        req.checkBody('othername', 'other name is required').notEmpty().trim();
        req.checkBody('email', 'email is required').notEmpty().trim();
        req.checkBody('email', 'a valid email is required').isEmail()
        req.checkBody('phoneNumber', 'phonenumber is required').notEmpty().trim();
        req.checkBody('passportUrl', 'passport Url is required').notEmpty().trim();
        req.checkBody('password', 'password is required').notEmpty();
        req.checkBody('password', 'password must be above 5').isLength({ min: 6 });
        req.checkBody('password2', 'reqired').equals(password);
        
        const errMsg=[];
        let errors= req.validationErrors();
        for(let i=0;i<errors.length;i++){
            errMsg.push(errors[i].msg)
        }

        if (errors){
            return res.status(400).send({
                status:400,
                success: false,
                message: errMsg
            })
        }

        next()
    }


    static signInValidate(req,res,next){
        const {email , password} = req.body;
        req.checkBody('email', 'kindly input email used in registering').notEmpty().trim().isEmail().withMessage('input a valid email address');
        req.checkBody('password', 'Kindly insert your password').notEmpty();

        const errMsg=[];
        let errors= req.validationErrors();
        errors.map((err)=>{
            errMsg.push(err.msg)
        })

        if(errors){
            return res.status(401).send({
                status: 401,
                success: false,
                message: errMsg
            })
        }
        next()
    }
}


export default userMiddleware;