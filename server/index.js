import express from 'express'
import postRouter from './routes/posts.js'
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import manageRouter from './routes/manage.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
const upload = multer({ storage });
app.use(cors({
    origin: 'http://106.14.57.212:3000',
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser())
app.use('/api/posts', postRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/manage', manageRouter)
app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});
// app.get('/test', (req, res) => {
//     res.json("It works")
// })

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})