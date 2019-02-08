class voteValidation{
    static vote(req,res,next){
        req.checkBody('candidate', 'kindly insert a valid candidate id').notEmpty().trim().isNumeric().withMessage('candidate id must be a number');
        req.checkBody('office', 'kindly insert a valid office id').notEmpty().trim().isNumeric().withMessage('office id must be a number');
        req.checkBody('voter', 'kindly insert a valid voter id').notEmpty().trim().isNumeric().withMessage('voter id must be a number');

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

export default voteValidation;