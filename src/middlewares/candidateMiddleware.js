import db from '../models/db'

class candidateValidation{

    static createCandidate(req,res,next){
        const {candidate,office,party} = req.body;
        
        req.checkBody('candidate', 'kindly insert a valid candidate').notEmpty().trim();
        req.checkBody('office', 'kindly insert a valid office').notEmpty().trim();
        req.checkBody('party', 'kindly insert a political party').notEmpty().trim();

        let errors= req.validationErrors();

        if (errors){
            return res.status(400).send({
                success: false,
                message: errors
            })
        }
    }
}

export default candidateValidation;