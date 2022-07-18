import express from 'express'
import Task from '../models/Task'
import User from '../models/User'
import asyncWrapper from '../middleware/async'

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getAllTasks = asyncWrapper(async (req: express.Request, res: express.Response) => {
    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tasks = await Task.find({user: req?.user?.id})
    res.status(200).json(tasks)
})

// @desc    Add new task
// @route   POST /api/tasks
// @access  Private
export const addNewTask = asyncWrapper(async (req: express.Request, res: express.Response) => {
    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const task = await Task.create({
        name: req.body.name,
        user: req?.user?.id
    })

    res.status(201).json(task)
})

// @desc    Toggle task status
// @route   PATCH /api/tasks/toggle-status/:id
// @access  Private
export const toggleTaskStatus = asyncWrapper(async (req: express.Request, res: express.Response) => {
    // Ckeck for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const task = await Task.findById(req.params.id)

    // Check for task
    if(!task) {
        res.status(401)
        throw new Error('Not found task')
    }

    // Make sure the logged in user matches the task user
    if(task.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const toggledTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(toggledTask)
})

// @desc Edit task name
// @route PATCH /api/tasks/edit-name/:id
// @access Private
export const editTaskName = asyncWrapper(async (req: express.Request, res: express.Response) => {
    // Check for User
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check for task
    const task = await Task.findById(req.params.id)

    if(!task) {
        res.status(401)
        throw new Error('Not found task')
    }

    // Make sure the logged in user matches the task user
    if(task.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const editedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(editedTask)
})

// @desc Delete task
// @route DELETE /api/tasks/delete/:id
// @access Private
export const deleteTask = asyncWrapper(async (req: express.Request, res: express.Response) => {
    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check for task
    const task = await Task.findById(req.params.id)

    if(!task) {
        res.status(401)
        throw new Error('Task not found')
    }

    // Make sure the logged in user matches the task user
    if(task.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // Delete task
    await task.remove()
    res.status(200).json(req.params.id)
})