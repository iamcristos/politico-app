import db from '../models/db'

class voteCandidate{

    static vote(req,res){
        const {office, candidate, user } = req.body;
        const text = 'INSERT INTO Vote(office, candidate, user) VALUES($1,$2,$3) RETURNING *'
        const values= [office,candidate,user];
    }
}