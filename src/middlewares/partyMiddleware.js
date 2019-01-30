import party from '../db/partyDb'
let errorMessage=[];
class partyValidator {
    static createParty(req,res,next){
        try {
            const {name, hqAddress, logourl} = req.body
            if (!name) throw  "name field required"
            if (!hqAddress) throw  'hqAddress required'
            if (!logourl) throw  'logourl is required'
        } catch (error) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    msg: error
                });
            }
    next()
    }
}

    export default partyValidator