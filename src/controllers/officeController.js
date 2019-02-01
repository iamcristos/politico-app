import office from '../db/officeDb';

class officeController {
    static createOffice(req, res) {
      const newOffice = {
        id: office.length + 1,
        name: req.body.name,
        type: req.body.type
      };
      office.push(newOffice);
      return res.status(201).send({
        success: true,
        message: 'office created succesfully',
        office
      });
    }

    static getAllOffice(req, res) {
      return res.status(200).send({
        success: true,
        office
      })
    }
}

export default officeController;