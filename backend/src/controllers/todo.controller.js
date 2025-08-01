import { Todo } from "../models/todo.model.js";

export const getTodoList = async (req, res) => {
  const { userId } = req.params;
  const myId = req.user._id;

  try {
    const todo = await Todo.findOne({ participants: { $all: [myId, userId] } }).populate("tasks.createdBy", "fullName username");
    res.status(200).json(todo?.tasks || []);
  } catch (error) {
    console.error("❌ Error fetching todo:", error);
    res.status(500).json({ message: "Failed to fetch todo" });
  }
};

export const addTask = async (req, res) => {
  const { userId } = req.params;
  const myId = req.user._id;
  const { title, description, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    let todo = await Todo.findOne({ participants: { $all: [myId, userId] } });

    if (!todo) {
      todo = await Todo.create({
        participants: [myId, userId],
        tasks: [{
          title,
          description,
          dueDate,
          createdBy: myId,
          lastEdited: new Date(),
        }]
      });
    } else {
      todo.tasks.push({
        title,
        description,
        dueDate,
        createdBy: myId,
        lastEdited: new Date(),
      });
      await todo.save();
    }

    res.status(200).json(todo.tasks);
  } catch (error) {
    console.error("❌ Error adding task:", error);
    res.status(500).json({ message: "Failed to add task" });
  }
};

export const editTask = async (req, res) => {
  const { userId, todoId } = req.params;
  const myId = req.user._id;
  const { title, description, dueDate } = req.body;

  try {
    const todo = await Todo.findOne({ participants: { $all: [myId, userId] } });

    if (!todo) return res.status(404).json({ message: "Todo list not found" });

    const task = todo.tasks.id(todoId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.lastEdited = new Date();

    await todo.save();
    res.status(200).json(todo.tasks);
  } catch (error) {
    console.error("❌ Error editing task:", error);
    res.status(500).json({ message: "Failed to edit task" });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { userId, todoId } = req.params;
  const myId = req.user._id;
  const { checked } = req.body;

  try {
    const todo = await Todo.findOne({ participants: { $all: [myId, userId] } });
    if (!todo) return res.status(404).json({ message: "Todo list not found" });

    const task = todo.tasks.id(todoId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Determine which user is updating
    if (task.createdBy.toString() === myId.toString()) {
      task.creatorCompleted = checked;
    } else {
      task.mateCompleted = checked;
    }

    // Determine overall task status
    if (task.creatorCompleted && task.mateCompleted) {
      task.status = "done";
    } else {
      task.status = "pending";
    }

    task.lastEdited = new Date();
    await todo.save();

    res.status(200).json(todo.tasks);
  } catch (error) {
    console.error("❌ Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  const { userId, todoId } = req.params;
  const myId = req.user._id;

  try {
    const todo = await Todo.findOne({ participants: { $all: [myId, userId] } });
    if (!todo) return res.status(404).json({ message: "Todo list not found" });

    const taskIndex = todo.tasks.findIndex(task => task._id.toString() === todoId);
    if (taskIndex === -1) return res.status(404).json({ message: "Task not found" });

    todo.tasks.splice(taskIndex, 1); // ✅ Correct removal
    await todo.save();

    res.status(200).json(todo.tasks);
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
