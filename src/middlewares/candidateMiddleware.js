import db from '../models/db'

class candidateValidation{

    static createCandidate(req,res,next){    
        req.checkBody('candidate', 'kindly insert a valid candidate').notEmpty().trim().isNumeric().withMessage('must be a number');
        req.checkBody('office', 'kindly insert a valid office').notEmpty().trim().isNumeric().withMessage('must be a number');
        req.checkBody('party', 'kindly insert a political party').notEmpty().trim().isNumeric().withMessage('must be a number');
        let errors= req.validationErrors();

        if (errors){
            return res.status(400).send({
                success: false,
                message: errors
            })
        }
        next()
    }
}

export default candidateValidation;
