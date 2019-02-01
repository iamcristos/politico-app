import office from '../db/officeDb'

class officeValidator {
    static createOffice(req,res,next){
        try {
            const {name, type} = req.body
            if (!name) throw "name field required"
            if (!type) throw 'type required'
        } catch (error) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    msg: error
                });
            }
        next()
    }

    static getAllOffice(req,res,next) {
        if (office.length === 0) {
            return res.status(200).send({
                success: true,
                message: 'There are no registerd political parties'
            })
        }
        next()
    }

    static editAOffice(req,res,next) {
        try {
            const {name} = req.body;
            if (!name) throw 'Can only edit office name'
        } catch (error) {
            return res.status(405).send({
                success: false,
                message: error
            })
        }
        next()
    }
}

export default officeValidator;