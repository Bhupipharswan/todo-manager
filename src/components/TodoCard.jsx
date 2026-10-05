import { Link } from "react-router-dom";

import { useDeleteTodo } from "../hooks/useDeleteTodo";

function TodoCard({ todo }) {
    const {
        mutate,
        isPending,
    } = useDeleteTodo();

    function handleDelete() {
        const confirmed = window.confirm(
            "Are tou sure you want to delete this todo?"
        );

        if(!confirmed) {
            return;
        }

        mutate(todo.id)
    }
  return (
    <div className="rounded-xl bg-white p-5 shadow-md dark:bg-gray-800">
        <div className="flex items-start justify-between gap-4">
            <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">{todo.title}</h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-white">Status: {" "} {todo.completed ? "Completed" : "Pending"}</p>
            </div>

            <div className="flex gap-2">
            <Link to={`/todos/${todo.id}`}
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                View
            </Link>

            <button
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
                {isPending ? "Deleting..." : "Delete"}
            </button>
            </div>
        </div>
    </div>
  )
}

export default TodoCard;