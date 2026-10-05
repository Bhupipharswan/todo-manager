import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAddTodo } from "../hooks/useAddTodo"

function AddTodo() {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const {
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
  } = useAddTodo();

  function handleSubmit(e) {
    e.preventDefault();

    if(!title.trim()) {
      return;
    }

    mutate({
      title: title.trim(),
      completed: false,
      userId: 1,
    });
  }

  if(isSuccess) {
    navigate("/todos");
  }

  return (
    <div>
        <h1 className="text-3xl font-bold text-gray-900">
            Add Todo
        </h1>

        <p className="mt-2 text-gray-600">
            Create a new todo
        </p>

        <form onSubmit={handleSubmit}
        className="mt-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
          <label htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-white">
            Todo Title
          </label>

          <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />

          { isError && (
            <p className="mt-2 text-sm text-red-600">Error: {error.message}</p>
          )}

          <button 
          type="submit"
          disabled={isPending}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
            {isPending ? "Adding" : "Add Todo"}
          </button>
        </form>
    </div>
  )
}

export default AddTodo;