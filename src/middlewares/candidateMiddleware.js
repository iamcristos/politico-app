import db from '../models/db'

class candidateValidation{

    static createCandidate(req,res,next){    
        req.checkBody('candidate', 'kindly insert a valid candidate').notEmpty().trim().isNumeric().withMessage('must be a number');
        req.checkBody('office', 'kindly insert a valid office').notEmpty().trim().isNumeric().withMessage('must be a number');
        req.checkBody('party', 'kindly insert a political party').notEmpty().trim().isNumeric().withMessage('must be a number');
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
}

export default candidateValidation;
