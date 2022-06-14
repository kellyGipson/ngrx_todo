import { createAction, props } from "@ngrx/store";
import { Todo } from "src/app/core/todo/todo.model";

export const addTodo = createAction(
  '[Todo Page] Add Todo',
  props<{ content: string }>(),
);

export const deleteTodo = createAction(
  '[Todo Page] Delete Todo',
  props<{ id: string }>(),
);

export const updateTodo = createAction(
  '[Todo Page] Update Todo',
  props<Todo>(),
);
