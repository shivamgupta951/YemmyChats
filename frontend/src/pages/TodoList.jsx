import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Plus, Trash, Pencil, ChevronLeft, Notebook } from "lucide-react";
import { motion } from "framer-motion";
import {
  fetchTodos,
  addTodo,
  editTodo,
  toggleTodo,
  deleteTodo,
} from "../lib/todoApi";

const TodoList = () => {
  const { userId } = useParams();
  const { authUser } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [todoForm, setTodoForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const navigate = useNavigate();

  const getTodos = async () => {
    try {
      const data = await fetchTodos(userId);
      setTasks(data || []);
    } catch {
      toast.error("Failed to fetch todos");
    }
  };

  useEffect(() => {
    getTodos();
  }, [userId]);

  const handleInput = (e) => {
    setTodoForm({ ...todoForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (!todoForm.title.trim()) {
        toast.error("Title is required");
        return;
      }

      if (editingTaskId !== null) {
        await editTodo(userId, editingTaskId, todoForm);
        toast.success("Task updated!");
      } else {
        await addTodo(userId, todoForm);
        toast.success("Task added!");
      }

      setTodoForm({ title: "", description: "", dueDate: "" });
      setEditingTaskId(null);
      setShowModal(false);
      getTodos();
    } catch {
      toast.error("Error saving task");
    }
  };

  const toggleStatus = async (todoId, isChecked) => {
    // Optimistically update UI
    setTasks((prev) =>
      prev.map((task) =>
        task._id === todoId
          ? {
              ...task,
              [task.createdBy._id === authUser._id
                ? "creatorCompleted"
                : "mateCompleted"]: isChecked,
            }
          : task
      )
    );

    try {
      await toggleTodo(userId, todoId, isChecked);
      toast.success(isChecked ? "Marked complete" : "Marked incomplete");
      // Optionally sync with server again
      getTodos();
    } catch {
      toast.error("Status update failed");
      getTodos(); // Re-fetch to rollback if failed
    }
  };

  const handleDelete = async (todoId) => {
    const confirmDel = confirm("Delete this task?");
    if (!confirmDel) return;

    try {
      await deleteTodo(userId, todoId);
      toast.success("Deleted!");
      getTodos();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="my-20 min-h-screen mx-60 md:px-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="btn btn-sm btn-outline flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Back to Chat
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-200 shadow-xl px-6 py-4 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
            <Notebook className="text-primary" size={24} />
            Shared Todo List
          </h2>
          <p className="text-sm text-base-content/70">
            Collaborate and track tasks together.
          </p>
        </motion.div>
      </div>

      {/* Add Task Button */}
      <div className="flex justify-end mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="btn btn-success btn-sm"
          onClick={() => {
            setTodoForm({ title: "", description: "", dueDate: "" });
            setEditingTaskId(null);
            setShowModal(true);
          }}
        >
          <Plus size={16} className="mr-1" /> Add Task
        </motion.button>
      </div>

      {/* Tasks Grid */}
      {tasks.length === 0 ? (
        <p className="text-center text-base-content/70 border p-20">No tasks yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 border p-10 rounded-ee-3xl rounded-tl-3xl bg-base-300 border-error">
          {tasks.map((task) => {
            const isCreator = task.createdBy._id === authUser._id;
            const yourCheck = isCreator
              ? task.creatorCompleted
              : task.mateCompleted;
            const otherCheck = isCreator
              ? task.mateCompleted
              : task.creatorCompleted;

            return (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="card border bg-base-100 shadow-xl p-4 transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3
                    className={`font-semibold text-lg ${
                      task.creatorCompleted && task.mateCompleted
                        ? "line-through text-success"
                        : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => {
                        setEditingTaskId(task._id);
                        setTodoForm({
                          title: task.title,
                          description: task.description,
                          dueDate: task.dueDate?.slice(0, 16),
                        });
                        setShowModal(true);
                      }}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(task._id)}
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-base-content/80 mb-2">
                  {task.description}
                </p>

                {task.dueDate && (
                  <p className="text-xs text-base-content/60 mb-1">
                    📅 Due: {format(new Date(task.dueDate), "PPPp")}
                  </p>
                )}

                <div className="text-xs text-base-content/60 flex justify-between mb-2">
                  <span>👤 {task.createdBy?.fullName}</span>
                  {task.lastEdited && (
                    <span>🕒 {format(new Date(task.lastEdited), "PPPp")}</span>
                  )}
                </div>

                {/* Dual Checkboxes */}
                <div className="form-control mt-2 flex flex-col gap-1">
                  <div className="text-accent">✔CheckList</div>
                  <label className="label cursor-pointer gap-2 items-center">
                    <span className="label-text">You</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-success"
                      checked={yourCheck}
                      onChange={(e) => toggleStatus(task._id, e.target.checked)}
                    />
                  </label>

                  <label className="label cursor-not-allowed gap-2 items-center opacity-60">
                    <span className="label-text text-error">Chat-Mate</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={otherCheck}
                      disabled
                    />
                  </label>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="modal-box w-full max-w-md bg-base-100 border shadow-xl"
          >
            <h3 className="font-bold text-lg mb-4">
              {editingTaskId !== null ? "Edit Task" : "Add New Task"}
            </h3>

            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered w-full mb-3"
              value={todoForm.title}
              onChange={handleInput}
            />

            <textarea
              name="description"
              className="textarea textarea-bordered w-full mb-3"
              placeholder="Description (optional)"
              value={todoForm.description}
              onChange={handleInput}
            />

            <input
              type="datetime-local"
              name="dueDate"
              className="input input-bordered w-full mb-3"
              value={todoForm.dueDate}
              onChange={handleInput}
            />

            <div className="modal-action justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingTaskId(null);
                }}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-sm btn-success">
                {editingTaskId !== null ? "Update" : "Add"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
