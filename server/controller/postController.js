import { db } from "../database/db.js";
import jwt from 'jsonwebtoken'

export const getPosts = (req, res) => {
    const q = req.query.cat ? 'SELECT * FROM tb_posts WHERE cat=?' : 'SELECT * FROM tb_posts';
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}
export const getPost = (req, res) => {
    const q =
    "SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImg, `cat`,`date` FROM tb_user u JOIN tb_posts p ON u.id = p.user_id WHERE p.id = ? ";
    
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data[0]);
    });
}


export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "chaofan", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO tb_posts(`title`, `description`, `img`, `cat`, `date`,`user_id`) VALUES (?)";
  
      const values = [
        req.body.title,
        req.body.description,
        req.body.img,
        req.body.cat,
        req.body.date,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err);
        }
        return res.json("Post has been created.");
      });
    });

}
export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, 'chaofan', (err, userInfo) => {
       if(err){
        return res.status(403).json("Token is not valid!");
       } 
       const q = "DELETE FROM tb_posts WHERE `id` = ?";
       console.log(req.params.id)
       try {
        db.query(q, [req.params.id], (err, data) => {
            if(err){
                console.log(err)
                return res.status(500).json(err);
            } 
            if(data.affectedRows > 0) return res.status(200).json("Post has been deleted.");
        })
       } catch (error) {
        console.log(error)
       }
    })
}
export const updatePost = (req, res) => {

}