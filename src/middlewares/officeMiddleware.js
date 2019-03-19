import db from '../models/db'

class officeValidator {
    static createOffice(req,res,next){
        req.checkBody('name', 'name is required').notEmpty().trim();
        req.checkBody('type', 'type is required').notEmpty().trim();
       
        const errMsg=[];
        let errors= req.validationErrors();
        for(let i=0;i<errors.length;i++){
            errMsg.push(errors[i].msg)
        }
        if(errors) {
            return res.status(400).send({
                success: false,
                status: 400,
                msg: errMsg
            });
        }
        next()
    }

    static getAllOffice(req,res,next) {
        const text = 'SELECT * from Office';
        db.query(text).then((office)=>{
            if (office.rowCount === 0) {
                return res.status(200).send({
                    status:200,
                    success: true,
                    message: 'There are no registerd political offices'
                })
            }
        })
        next()
    }

    static editAOffice(req,res,next) {
        try {
            const {name} = req.body;
            if (!name) throw 'Can only edit office name'
        } catch (error) {
            return res.status(405).send({
                status: 405,
                success: false,
                message: error
            })
        }
        next()
    }
}

export default officeValidator;

