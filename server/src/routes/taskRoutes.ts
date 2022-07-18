import express from 'express'
const router = express.Router()
import protect from '../middleware/auth'

import {
    getAllTasks,
    addNewTask,
    toggleTaskStatus,
    editTaskName,
    deleteTask
} from '../controllers/taskControllers'

router.get('/', protect, getAllTasks).post('/', protect, addNewTask)
router.patch('/toggle-status/:id', protect, toggleTaskStatus)
router.patch('/edit-name/:id', protect, editTaskName)
router.delete('/delete/:id', protect, deleteTask)

export default router