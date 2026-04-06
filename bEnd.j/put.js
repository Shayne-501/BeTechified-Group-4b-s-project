const express = require("express");
const app = express();
app.use(express.json());

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
