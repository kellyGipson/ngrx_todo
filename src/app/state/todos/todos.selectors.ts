import { createSelector, createFeatureSelector } from "@ngrx/store";
import { TodoState } from "./todos.reducers";

export const selectTodos = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodos,
  (state: TodoState) => state.todos,
);
