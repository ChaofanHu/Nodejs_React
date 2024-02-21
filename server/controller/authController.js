import { db } from '../database/db.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = (req, res) => {
    console.log('register!');
    const q = 'SELECT * FROM tb_user WHERE email = ? OR username = ?';
    console.log('Executing query:', q, req.body.email, req.body.username);

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) {
            console.log('Query error:', err);
            res.json(err);
            return;
        }

        if (data.length != 0) {
            console.log('User already exists');
            res.status(409).json("User already exists");
            return;
        }

        // if user doesn't exist
        console.log('start to register');
        let salt = bcrypt.genSaltSync(10);
        if(req.body.password === null){
            return;
        }
        let hash = bcrypt.hashSync(req.body.password, salt);

        const q2 = 'INSERT INTO tb_user(`username`, `email`, `password`) VALUES (?, ?, ?)';
        let values = [req.body.username, req.body.email, hash];
        db.query(q2, values, (err, data) => { 
            if (err) {
                console.log(err);
                res.json(err);
                return;
            }
            res.json("User has been created");
            console.log("success");
        });
    });
}

export const login = (req, res) => {
    //check if user exists
    const q = 'SELECT * FROM tb_user WHERE email = ? OR username = ?';
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) {
            res.json(err);
            return;
        }
        if (data.length === 0) {
            console.log('User not found');
            res.status(404).json("User not found");
            return;
        }
        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: data[0].id }, "chaofan");
        const { password, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
            })
            .status(200)
            .json(other);
        });
    
}

export const logout = (req, res) => {
    console.log(req.cookies.access_token);
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out");
};
