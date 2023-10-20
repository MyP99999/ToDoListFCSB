import { Schema, model, models } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'On Going'
    },
}, { timestamps: true })

const Todo = models.todo || model('todo', todoSchema)

export default Todo