import party from '../db/partyDb';

class PartyController {
  static createParty(req, res) {
    const newParty = {
      id: party.length + 1,
      name: req.body.name,
      hqAddress: req.body.hqAddress,
      logourl: req.body.logourl,
    };
    party.push(newParty);
    return res.status(201).send({
      success: true,
      message: 'party created succesfully',
      party: newParty,
    });
  }

  static getAllParties(req, res) {
    return res.status(200).send({
      success: true,
      party
    })
  }

  static getASpecificParty(req,res) {
    const id = req.params.id
    const Id= parseInt(id)
    for (let i=0; i< party.length; i++){
      if (party[i].id === Id){
         res.status(200).send({
          success: true,
          message: party[i]
        });
      } 
    }
      return res.status(404).send({
        success: false,
        message: 'Political party dont exist'
      });
  }

  static editAParty(req,res){
    const id = parseInt(req.params.id);
    const {name} = req.body
    for (let i=0; i<party.length; i++){
      if (party[i].id === id ) {
        party[i].name = name
        return res.status(200).send({
          success: true,
          message: party[i]
        })
      } 
    }
    return res.status(404).send({
      success: false,
      message:"party dont exist"
    })
  }

  static deleteAParty(req,res){
    const id = parseInt(req.params.id);
    try {
      party.find((item)=>{
        if (item.id === id) {
          party.splice(id-1, 1)
          return res.status(200).send({
            success:true,
            message:'Party succesfully deleted',
            party: item
          })
        } 
      }) 
      }   catch (error) {
          return res.status(404).send({
          success: false,
          message: 'Party dont exist'
      })
    }
  };
}

export default PartyController

