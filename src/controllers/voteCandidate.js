import db from '../models/db'

class voteCandidate{

    static vote(req,res){
        const {office, candidate, voter, name } = req.body;
        const text = 'INSERT INTO Vote(office, candidate, voter, name) VALUES($1,$2,$3,$4) RETURNING *'
        const values= [office,candidate,voter,name];

        db.query(text,values).then((votes)=>{
            return res.status(200).send({
                status:200,
                success: true,
                data: [{
                    office: votes.rows[0].office,
                    candidate: votes.rows[0].candidate,
                    voter: votes.rows[0].voter,
                    name: votes.rows[0].name
                }]
            })

        }).catch((err)=>{
            return res.status(400).send({
                status:400,
                success: false,
                message: "You cannot vote more than once",
                err
            })
        });
    }
}

export default voteCandidate;