import db from '../models/db'
class partyValidator {
    static createParty(req,res,next){
        // let logourl = req.file
        // console.log(logourl)
        req.checkBody('name', 'name is required').notEmpty().trim();
        req.checkBody('hqAddress', 'hqAddress is required').notEmpty().trim();
        // req.checkBody('logourl', 'kindly upload an image for logo').notEmpty().trim();
        // logourl = typeof req.files['logourl'] !== "undefined" ? req.files['logourl'][0].filename : ''
    //    req.checkBody('logourl', 'kindly upload an image for logo' ).isImage(logourl)

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

    static getAllParty(req,res,next) {
        const text = 'SELECT * from Party';
        db.query(text).then((party)=>{
            if (party.rowCount === 0) {
                return res.status(200).send({
                    status:200,
                    success: true,
                    message: 'There are no registerd political party'
                })
            }
        })
        next()
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