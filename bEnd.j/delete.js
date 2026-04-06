const express = require("express");
const app = express();
app.use(express.json());

// DELETE CRUD Operations /tasks/:id - Delete a task
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});