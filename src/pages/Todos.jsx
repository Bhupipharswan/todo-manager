import { useDispatch, useSelector } from "react-redux";

import { useTodos } from "../hooks/useTodos";
import TodoCard from "../components/TodoCard";
import { useDebounce } from "../hooks/useDebounce";
import { setSearch, setFilter } from "../store/todoSlice";

function Todos() {
    const search = useSelector((state) => state.todos.search);
    const filter = useSelector((state) => state.todos.filter);

    const dispatch = useDispatch();

    const debouncedSearch = useDebounce(search, 500);

    const {
        data: todos = [],
        isLoading,
        isError,
        error,
    } = useTodos(debouncedSearch);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg font-medium text-gray-600">
                    Loading todos...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-lg bg-red-100 p-4 text-red-700">
                Error: {error.message}
            </div>
        );
    }

    const filteredTodos = todos.filter((todo) => {
        const matchesSearch = todo.title
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());

        const matchesFilter =
            filter === "all" ||
            (filter === "completed" && todo.completed) ||
            (filter === "pending" && !todo.completed);

        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Todos
                </h1>

                <p className="mt-2 text-gray-600">
                    Showing {filteredTodos.length} of {todos.length} todos
                </p>
            </div>

            {/* Search */}
            <div className="mt-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    placeholder="Search todos..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                />
            </div>

            {/* Filters */}
            <div className="mt-4 flex gap-3">
                <button
                    onClick={() => dispatch(setFilter("all"))}
                    className="rounded-lg bg-gray-800 px-4 py-2 text-white"
                >
                    All
                </button>

                <button
                    onClick={() => dispatch(setFilter("completed"))}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white"
                >
                    Completed
                </button>

                <button
                    onClick={() => dispatch(setFilter("pending"))}
                    className="rounded-lg bg-orange-500 px-4 py-2 text-white"
                >
                    Pending
                </button>
            </div>

            {/* Todos */}
            <div className="mt-6">
                {filteredTodos.length === 0 ? (
                    <div className="rounded-xl bg-white p-10 text-center shadow-md dark:bg-gray-800">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            No todos found
                        </h2>

                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Try a different search or filter.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredTodos.map((todo) => (
                            <TodoCard key={todo.id} todo={todo} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Todos;