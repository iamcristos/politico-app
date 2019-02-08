import db from '../models/db'
class partyValidator {
    static createParty(req,res,next){
        req.checkBody('name', 'name is required').notEmpty().trim();
        req.checkBody('hqAddress', 'hqAddress is required').notEmpty().trim();
        req.checkBody('logourl', 'logourl is required').notEmpty().trim();
       
        const errMsg=[];
        let errors= req.validationErrors();
        for(let i=0;i<errors.length;i++){
            errMsg.push(errors[i].msg)
        }

        if(errors) {
            return res.send({
                status: 400,
                success: false,
                msg: errMsg
            });
        }
        next()
    }

    static getAPoliticalParty(req,res,next){
    const id = req.params.id
    const Id= parseInt(id)
    
    
    }

    static editAParty(req,res,next) {
        try {
            const {name} = req.body;
            if (!name) throw 'Can only edit party name'
        } catch (error) {
            return res.status(405).send({
                status:405,
                success: false,
                message: error
            })
        }
        next()
    }
}

    export default partyValidator