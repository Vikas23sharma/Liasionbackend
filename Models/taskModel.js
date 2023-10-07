const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true },
    userid: { type: String, required: true },
    user: { type: String, required: true },
})

const taskmodel = mongoose.model("tasks", taskSchema)

module.exports = { taskmodel }

// {"title":"Learn Node",
//   "description":"Learn to make API's",
//   "status":false
// }