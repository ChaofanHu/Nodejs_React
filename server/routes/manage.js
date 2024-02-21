import express from 'express'
const router = express.Router()

import { getPosts } from '../controller/manageController.js';

router.get('/:id', getPosts)

export default router;