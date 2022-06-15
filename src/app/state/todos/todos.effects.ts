import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TodoService } from "src/app/core/todo/todo.service";
import { AppState } from "../app.state";
import { addTodo, deleteTodo, loadTodos, loadTodosFailure, loadTodosSuccess, updateTodo } from "./todos.actions";
import { catchError, from, map, of, switchMap, withLatestFrom } from "rxjs";
import { selectAllTodos } from "./todos.selectors";

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private todoServive: TodoService,
  ) {}

  // Run this code when a loadTodos action is dispatched
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        // Call the getTodos method, convert it to an observable
        from(this.todoServive.getTodos()).pipe(
          // Take the returned value and return a new success action containing the todos
          map((todos) => loadTodosSuccess({ todos: todos })),
          // Or, if it errors return a new failure action containing the error message
          catchError(error => of(loadTodosFailure({ error })))
        )
      )
    )
  );

  saveTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo, deleteTodo, updateTodo),
      withLatestFrom(this.store.select(selectAllTodos)),
      switchMap(([action, todos]) => from(this.todoServive.saveTodos(todos)))
    ),
    // Most effects dispatch another action, but this one is just a "fire"
    { dispatch: false }
  )
}
