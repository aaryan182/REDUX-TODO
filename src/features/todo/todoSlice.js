import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    todos: [
        { id: '1', text: "WORK WORK WORK" , createdAt: new Date().toISOString() },
    ]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // Adds a newtodo item with a unique ID
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), // Generates a unique ID for eachtodo
                text: action.payload,
                createdAt: new Date().toISOString()
            }
            state.todos.push(todo)
        },
        // Removes atodo item by ID
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        // Updates the text of an existingtodo item by ID
        updateTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.text = action.payload.text
            }
        }
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer
