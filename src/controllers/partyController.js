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
    party.map((item)=>{
      if(item.id === Id ) {
        return res.status(200).send({
          success: true,
          message: item
        })
      // } else{
      //   return res.status(404).send({
      //     success: false,
      //     message: 'Political party dont exist'
      //   });
      }
    });
  }
}

export default PartyController

