import { Link, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "./store/todoSlice";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Todos = lazy(() => import("./pages/Todos"));
const TodoDetails = lazy(() => import("./pages/TodoDetails"));
const AddTodo = lazy(() => import("./pages/AddTodo"));

function App() {
  const theme = useSelector(
    (state) => state.todos.theme
  );

  const dispatch = useDispatch();

  return (
    <div className={`min-h-screen ${theme === "dark"
      ? "dark bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Navbar */}
      <nav className="bg-gray-900 px-6 py-4">
        <div className="flex gap-6">
          <Link to="/" className="font-medium text-white hover:text-blue-400">
          Dashboard
          </Link>

          <Link to="/todos" className="font-medium text-white hover:text-blue-400">
          Todos
          </Link>

          <Link to="/todos/add"
          className="font-medium text-white hover:text-blue-400">
            Add Todo
          </Link>
        </div>

        <button
        onClick={() => dispatch(toggleTheme())}
        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">
          {theme === "light"  ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <p className="text-lg font-medium text-gray-600">Loading page...</p>
          </div>
        }
        >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/todos' element={<Todos />} />
          <Route path="/todos/add" element={<AddTodo />} />
          <Route path="/todos/:id" element={<TodoDetails />} />
        </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App;