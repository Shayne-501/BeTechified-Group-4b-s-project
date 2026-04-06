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

// PUT /tasks/:id - Update a task (full update)
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    const { title, status } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    tasks[taskIndex] = { id, title, status: status || "pending" };
    res.json({
        message: "Task updated",
        task: tasks[taskIndex]
    });
});

// DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.json({
        message: "Task deleted",
        task: deletedTask
    });
});

// PATCH /tasks/:id - Update a task (partial update)
app.patch("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    // Update fields dynamically
    Object.assign(task, req.body);

    res.json({
        message: "Task updated",
        task
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});