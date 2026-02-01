import { useState, useEffect } from "react";
import { useTheme } from "../../context/index";
import PageHeading from "../shared/PageHeading";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

type FilterType = "all" | "active" | "completed";

const STORAGE_KEY = "working-hours-todos";

const TodoList = () => {
  const { isDarkMode } = useTheme();
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [todo, ...prev]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const progressPercent =
    todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  // Styles
  const cardClass = `rounded-2xl p-6 shadow-lg ${
    isDarkMode ? "bg-gray-800" : "bg-white"
  }`;

  const inputClass = `flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
  }`;

  const filterBtnClass = (isActive: boolean) =>
    `px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
      isActive
        ? "bg-blue-500 text-white shadow-md"
        : isDarkMode
          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
    }`;

  return (
    <>
      <PageHeading
        title="Todo List"
        subtitle="Manage your tasks and stay organized"
      />

      <div className={cardClass}>
        {/* Progress Bar */}
        {todos.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span
                className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Progress
              </span>
              <span
                className={`text-sm font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
              >
                {completedCount}/{todos.length} completed
              </span>
            </div>
            <div
              className={`h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
            >
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="flex gap-3 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            className={inputClass}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add
          </button>
        </form>

        {/* Filter Buttons */}
        <div
          className={`flex gap-2 mb-6 p-2 rounded-xl ${isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}`}
        >
          <button
            onClick={() => setFilter("all")}
            className={filterBtnClass(filter === "all")}
          >
            All ({todos.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={filterBtnClass(filter === "active")}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={filterBtnClass(filter === "completed")}
          >
            Done ({completedCount})
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <div
              className={`text-center py-12 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}
            >
              <p
                className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {filter === "all"
                  ? "No todos yet"
                  : filter === "active"
                    ? "All caught up!"
                    : "Nothing completed yet"}
              </p>
              <p
                className={`text-sm mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
              >
                {filter === "all" ? "Add your first task above" : ""}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all border-2 ${
                  todo.completed
                    ? isDarkMode
                      ? "bg-green-900/20 border-green-800/50"
                      : "bg-green-50 border-green-200"
                    : isDarkMode
                      ? "bg-gray-700/50 border-gray-600/50 hover:border-gray-500"
                      : "bg-white border-gray-100 hover:border-gray-200 shadow-sm"
                }`}
              >
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit();
                        if (e.key === "Escape") cancelEdit();
                      }}
                      className={`flex-1 px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer"
                      aria-label="Save"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={cancelEdit}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        isDarkMode
                          ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                      aria-label="Cancel"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${
                        todo.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : isDarkMode
                            ? "border-gray-500 hover:border-green-400 hover:bg-green-400/10"
                            : "border-gray-300 hover:border-green-500 hover:bg-green-50"
                      }`}
                      aria-label={
                        todo.completed ? "Mark incomplete" : "Mark complete"
                      }
                    >
                      {todo.completed && (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                    <span
                      className={`flex-1 transition-all ${
                        todo.completed
                          ? `line-through ${isDarkMode ? "text-gray-500" : "text-gray-400"}`
                          : isDarkMode
                            ? "text-white"
                            : "text-gray-800"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEditing(todo)}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${
                          isDarkMode
                            ? "text-gray-400 hover:text-blue-400 hover:bg-blue-400/10"
                            : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                        }`}
                        aria-label="Edit"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${
                          isDarkMode
                            ? "text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                            : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                        aria-label="Delete"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div
            className={`flex justify-between items-center mt-6 pt-4 border-t-2 ${
              isDarkMode ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <span
              className={`font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {activeCount} task{activeCount !== 1 ? "s" : ""} remaining
            </span>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 font-medium transition-all rounded-lg cursor-pointer"
              >
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TodoList;
