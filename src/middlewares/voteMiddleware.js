class voteValidation{
    static vote(req,res,next){
        req.checkBody('candidate', 'kindly insert a valid candidate').notEmpty().trim();
        req.checkBody('office', 'kindly insert a valid office').notEmpty().trim();
        req.checkBody('voter', 'kindly insert a valid voter').notEmpty().trim();

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

export default voteValidation;