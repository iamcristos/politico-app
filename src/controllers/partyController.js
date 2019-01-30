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
}

export default PartyController

