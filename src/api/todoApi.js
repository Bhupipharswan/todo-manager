import axios from "axios";

const todoApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
})

// GET all todos
export async function getTodos() {
    const response = await todoApi.get("/todos");

    return response.data;
}

// GET single todo
export async function getTodo(id) {
    const response = await todoApi.get(`/todos/${id}`);

    return response.data;
}

// POST a new todo
export async function addTodo(todo) {
    const response = await todoApi.post("/todos", todo);

    return response.data;
}

// PUT update todo
export async function updateTodo(id, todo) {
    const response = await todoApi.put(`/todos/${id}`, todo)

    return response.data;
}

// DELETE todo 
export async function deleteTodo(id) {
    const response = await todoApi.delete(`/todos/${id}`);

    return response.data;
}