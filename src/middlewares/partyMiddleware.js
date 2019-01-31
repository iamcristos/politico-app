import party from '../db/partyDb'

class partyValidator {
    static createParty(req,res,next){
        try {
            const {name, hqAddress, logourl} = req.body
            if (!name) throw "name field required"
            if (!hqAddress) throw 'hqAddress required'
            if (!logourl) throw 'logourl is required'
        } catch (error) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    msg: error
                });
            }
    next()
    }

    static getAPoliticalParty(req,res,next){
    const id = req.params.id
    const Id= parseInt(id)
    
    party.map((item)=>{
        console.log(item);
      if (item.id === Id ) {
          return res.send(item)
      } else {
        next()
      }
    });
    }
}

    export default partyValidator