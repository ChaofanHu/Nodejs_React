import {db} from '../database/db.js'
import jwt from 'jsonwebtoken'
import {promisify} from 'util'

export const getPosts = async (req, res) => {
    if(!req.params.id){
        return res.status(401).json("You are not authenticated.");
    }
    try {

       let id = req.params.id;

        const q = "SELECT p.id , title, description FROM tb_posts p LEFT JOIN tb_user u ON p.user_id = u.id WHERE user_id = ?";
        db.query(q, [id], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log(data);
            return res.status(200).json(data);
        });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};