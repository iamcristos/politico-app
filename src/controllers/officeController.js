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

    static getASpecificOffice(req,res) {
      const id = req.params.id
      const Id= parseInt(id)
      office.map((item)=>{
        if(item.id === Id ) {
          return res.status(200).send({
            success: true,
            message: item
          })
        } else{
          return res.status(404).send({
            success: false,
            message: 'Political office dont exist'
          });
        }
      });
    }
}

export default officeController;