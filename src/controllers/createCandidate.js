import db from '../models/db';

class candidate{

    static createCandidate(req,res){
        const {candidate,office,party} = req.body;
        const text = 'INSERT INTO Candidate(candidate, office, party) VALUES($1,$2,$3) RETURNING *'
        const values= [candidate,office,party];

        db.query(text,values).then((candidate)=>{
            return res.status(201).send({
                status:201,
               success: true,
               message: 'Candidate Added',
               data: [candidate.rows[0]] 
            })
        }).catch((err)=>{
            console.log(err)
            return res.status(422).send({
                status:422,
                success: true,
                message:'invalid input kindly input a registered candidate for an office'
            })
        });
    }
}

export default candidate