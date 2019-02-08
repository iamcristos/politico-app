import db from '../models/db'

class voteCandidate{

    static vote(req,res){
        const {office, candidate, voter } = req.body;
        const text = 'INSERT INTO Vote(office, candidate, voter) VALUES($1,$2,$3) RETURNING *'
        const values= [office,candidate,voter];

        db.query(text,values).then((votes)=>{
            return res.status(200).send({
                status:200,
                success: true,
                data: [{
                    office: votes.rows.office,
                    candidate: votes.rows.candidate,
                    voter: votes.rows.voter
                }]
            })

        }).catch((err)=>{
            return res.status(400).send({
                status:400,
                success: false,
                message: "invalid input"
            })
        });
    }
}

export default voteCandidate;