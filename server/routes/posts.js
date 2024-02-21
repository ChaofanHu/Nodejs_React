import express from 'express'
const router = express.Router()

import {addPost, deletePost, getPost, getPosts, updatePost} from '../controller/postController.js'

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', addPost)
router.delete('/:id',deletePost)
router.put('/:id',updatePost)

export default router;