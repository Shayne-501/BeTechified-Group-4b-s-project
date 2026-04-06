const express = require('express');
const app = express();

app.use(express.json());

let tasks = [
    { id: 1, title: "Read", status: "pending" },
    { id: 2, title: "Code", status: "pending" }
];

// POST /tasks - Create a new task
app.post("/tasks", (req, res) => {
    const { title, status } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        status: status || "pending"
    };
    tasks.push(newTask);
    res.status(201).json({
        message: "Task created",
        task: newTask
    });
});
