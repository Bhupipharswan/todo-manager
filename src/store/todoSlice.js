import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
    filter: "all",
    theme: "light"
};

const todoSlice = createSlice({
    name: "todos",
    initialState,

    reducers: {
        setSearch(state, action) {
            state.filter = action.payload;
        },

        setFilter(state, action) {
            state.filter = action.payload;
        },

        toggleTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
});

export const { setSearch, setFilter, toggleTheme } = todoSlice.actions;

export default todoSlice.reducer;