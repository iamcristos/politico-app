import db from '../models/db'


class resultController{

    static viewResult(req,res){
        const office= parseInt(req.params.id)
        const text= 'SELECT office, candidate,name, COUNT(candidate) FROM vote WHERE office=$1 GROUP BY candidate, office, name';
        const values= [office]

        db.query(text,values).then((result)=>{
            if (result.rowCount === 0) {
                return res.status(200).send({
                    status:204,
                    success: true,
                    message: 'no votes'
                })
            }
            return res.status(200).send({
                status:200,
                success: true,
                data: result.rows
            })
        }).catch((err)=>{
            return res.status(400).send({
                status:400,
                success: false,
                message: 'no election for such office'
            })
        })
    }
}

export default resultController;