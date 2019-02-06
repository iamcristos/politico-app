import db from '../models/db';

class candidate{

    static createCandidate(req,res){
        const {user,office,party} = req.body;
        const text = 'INSERT INTO Candidate (user, office, party) WHERE VALUES($1,$2,$3)'
        const values= [user,office,party];

        db.query(text,values).then((candidate)=>{
            return res.status(201).send({
               success: true,
               message: 'Candidate Added',
               data: [candidate.rows[0]] 
            })
        }).catch((err)=>{
            console.log(err)
        });
    }
}

export default candidate