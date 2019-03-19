// import validation from 'express-validator';
import {check, validationResult} from 'express-validator/check'
import db from '../models/db';

class userMiddleware{
    static usersForm() {
        [
            check('firstname').isLength({min: 1}).withMessage('firstname is required'),
            check('user').isLength({min:1}).withMessage('user is required')
        ]
    }
    static signUpValidate(req,res,next){
        
        const {firstname, lastname, othername, email,phoneNumber,password,passord2} = req.body;
        // req.checkBody('firstname', 'first name is required').notEmpty().trim();
        // req.checkBody('lastname', 'last name is required').notEmpty().trim();
        // req.checkBody('othername', 'other name is required').notEmpty().trim();
        // req.checkBody('email', 'email is required').notEmpty().trim();
        // req.checkBody('email', 'a valid email is required').isEmail()
        // req.checkBody('phoneNumber', 'phonenumber is required').notEmpty().trim();
        // // req.checkBody('passportUrl', 'passport Url is required').notEmpty().trim();
        // req.checkBody('password', 'password is required').notEmpty();
        // req.checkBody('password', 'password must be above 5').isLength({ min: 6 });
        // req.checkBody('password2', 'password must match').equals(password);
               // const errMsg=[];
        // let errors= req.validationErrors();
        // for(let i=0;i<errors.length;i++){
        //     errMsg.push(errors[i].msg)
        // }
        let errors = validationResult(req)

        // console.log(errors.array())
        console.log(errors.mapped())
        if (errors){
            return res.status(400).send({
                status:400,
                success: false,
                // message: errMsg
                errors: errors.mapped()
            })
        }

        // next()
    }


    static signInValidate(req,res,next){
        const {email , password} = req.body;
        req.checkBody('email', 'kindly input email used in registering').notEmpty().trim().isEmail().withMessage('input a valid email address');
        req.checkBody('password', 'Kindly insert your password').notEmpty();

        const errMsg=[];
        let errors= req.validationErrors();
        for(let i=0;i<errors.length;i++){
            errMsg.push(errors[i].msg)
        }

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