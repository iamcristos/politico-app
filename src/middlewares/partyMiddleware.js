import party from '../db/partyDb'

class partyValidator {
    static createParty(req,res,next){
        req.checkBody('name', 'name is required').notEmpty().trim();
        req.checkBody('hqAddress', 'hqAddress is required').notEmpty().trim();
        req.checkBody('logourl', 'logourl is required').notEmpty().trim();
       
        let errors = req.validationErros()
        if(errors) {
            return res.send({
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

    static editAParty(req,res,next) {
        try {
            const {name} = req.body;
            if (!name) throw 'Can only edit party name'
        } catch (error) {
            return res.status(405).send({
                success: false,
                message: error
            })
        }
        next()
    }
}

    export default partyValidator