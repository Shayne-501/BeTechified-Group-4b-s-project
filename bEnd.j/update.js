//UPDATE CRUD Operations /tasks/:id - Update a task (partial update)
let tasks = [
    { id: 1, title: "Read", status: "pending" },
    { id: 2, title: "Code", status: "pending" }
];

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

if (updatedTask.dueDate < new Date() && updatedTask.status !== "completed") {
    updatedTask.status = "overdue";
}