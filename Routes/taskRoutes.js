const express = require("express")
const { taskmodel } = require("../Models/taskModel")
const { Authmiddleware } = require("../Middleware/Authmiddleware")

const taskroute = express.Router()

//Add task route
taskroute.post("/addtask", Authmiddleware, async (req, res) => {
    const { title, description, status } = req.body
    try {
        const task = taskmodel({ title, description, status, ...req.body })
        await task.save()
        res.status(200).send({ message: "Task added successfully!" })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

//Get all tasks of logged in user
taskroute.get("/", Authmiddleware, async (req, res) => {
    const { userid } = req.body
    try {
        const tasks = await taskmodel.find({ userid })
        res.status(200).send({ data: tasks })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

//Get single task
taskroute.get("/:id",Authmiddleware, async (req, res) => {
    const { userid } = req.body
    const { id } = req.params
    try {
        const tasks = await taskmodel.find({ _id:id })
        res.status(200).send({ data: tasks })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

//Update tasks
taskroute.patch("/update/:taskid", async (req, res) => {
    const { taskid } = req.params
    try {
        await taskmodel.findByIdAndUpdate({ _id: taskid }, req.body)
        res.status(200).send({ message: "Task updated successfully!" })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

//Delete Tasks
taskroute.delete("/delete/:taskid", async (req, res) => {
    const { taskid } = req.params
    try {
        await taskmodel.findByIdAndDelete({ _id: taskid })
        res.status(200).send({ message: "Task deleted successfully!" })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

//Update Status of task
taskroute.patch("/updatestatus/:taskid", async (req, res) => {
    const { taskid } = req.params
    try {
        const task = await taskmodel.findOne({ _id: taskid })
        await taskmodel.findByIdAndUpdate({ _id: taskid }, { status: !task.status })
        res.status(200).send({ message: "Task status updated successfully!" })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

module.exports = { taskroute }