import db from '../models/db'

class voteCandidate{

    static vote(req,res){
        const {office, candidate, voter } = req.body;
        const text = 'INSERT INTO Vote(office, candidate, voter) VALUES($1,$2,$3) RETURNING *'
        const values= [office,candidate,voter];

        db.query(text,values).then((votes)=>{
            return res.status(200).send({
                success: false,
                data: [{
                    office: votes.rows[0].office,
                    candidate: votes.rows[0].candidate,
                    voter: votes.rows[0].voter
                }]
            })

        }).catch((err)=>{
            return res.status(400).send({
                success: false,
                message: err
            })
        });
    }
}

export default voteCandidate;