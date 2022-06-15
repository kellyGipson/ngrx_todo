import { createReducer, on } from "@ngrx/store";
import { Todo } from "src/app/core/todo/todo.model";
import { addTodo, deleteTodo, loadTodos, loadTodosFailure, loadTodosSuccess, updateTodo } from "./todos.actions";

export interface TodoState {
  todos: Todo[];
  error: string | null;
  status: "pending" | "loading" | "error" | "success";
}

export const initialState: TodoState = {
  todos: [],
  error: null,
  status: "pending",
};

export const todosReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new todo to the todos array
  on(addTodo, (state, { content }) => ({
    ...state,
    todos: [
      ...state.todos,
      { id: Date.now().toString(), content: content, checked: false, }
    ]
  })),
  // Delete the todo from the todos array
  on(deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  })),
  // Update the todo from the todos array
  on(updateTodo, (state, newTodo) => ({
    ...state,
    todos: [
      ...state.todos.filter(todo => todo.id !== newTodo.id),
      newTodo
    ],
  })),
  // Trigger loading the todos
  on(loadTodos, (state) => ({ ...state, status: 'loading'})),
  // Handle Successfully loaded todos
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    error: null,
    status: 'success',
  })),
  // Handle todos load failure
  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
)
