import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useTodo } from "../hooks/useTodo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";

function TodoDetails() {
    const { id } = useParams();

    const {
        data: todo,
        isLoading,
        isError,
        error,
    } = useTodo(id);

    const {
        mutate,
        isPending,
        isError: isUpdateError
    } = useUpdateTodo();

    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if(isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg font-medium text-gray-600">Loading todo...</p>
            </div>
        );
    }

    if(isError) {
       return (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">Error: {error.message}</div>
       );
    }

    function startEditing() {
        setTitle(todo.title);
        setCompleted(todo.completed);
        setIsEditing(true);
    }

    function handleSubmit(e) {
        e.preventDefault();

        mutate({
            id: todo.id,
            todo: {
                title: title.trim(),
                completed,
                userId: todo.userId,
            },
        });
    }

  return (
    <div className="mx-auto max-w-2xl">
        <Link to="/todos" className="text-sm font-medium text-blue-600 hover:text-blue-700">
        ← Back to todos
        </Link>

        <div className="mt-6 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
            <p className="text-sm font-medium upperCase text-gray-500">Todo #{todo.id}</p>

            {!isEditing ? (
                <>
                <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{todo.title}</h1>

                <div className="mt-6">
                <p className="text-sm text-gray-500">Status</p>

                <p className={`mt-1 font-semibold ${todo.completed ? "text-green-600" : "text-orange-600"}`}>{todo.completed ? "Completed" : "Pending"}</p>
            </div>

             <div className="mt-6">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{todo.userID}</p>
            </div>

            <button 
            onClick={startEditing}
            className="mt-6 rtounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700">Edit Todo</button>
                </>
            ) : (
                <form onSubmit={handleSubmit} className="mt-6">
                    <label className="text-sm font-medium text-gray-700">Todo Title</label>
                    <input type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500" />

                    <label className="mt-5 flex items-center gap-2">
                        <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)} />
                        <span className="text-sm text-gray-700">Completed</span>
                    </label>

                    {isUpdateError && (
                        <p className="mt-3 text-sm text-red-600">Failed to update todo.</p>
                    )}

                    <div className="mt-6 flex gap-3">
                        <button 
                        type="submit"
                        disabled={isPending || !title.trim()}
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                            {isPending ? "Updating" : "Save Changes"}
                        </button>

                        <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-lg bg-gray-200 px-5 py-2 font-medium text-gray-800 hover:bg-gray-300">Cancel</button>
                    </div>
                </form>
            )}

        </div>
    </div>
  )
}

export default TodoDetails;