import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Todo } from './todo.model';
import { addTodo, deleteTodo, updateTodo, loadTodos } from 'src/app/state/todos/todos.actions';
import { selectAllTodos } from 'src/app/state/todos/todos.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  allTodos$ = this.store.select(selectAllTodos);

  // Form variables
  addFormIsOpen: boolean = true;
  formMessage!: string;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  toggleAddForm() {
    this.addFormIsOpen = !this.addFormIsOpen;
  }

  toggleTodoChecked(todo: Todo) {
    const newTodo: Todo = {
      ...todo,
      checked: !todo.checked
    }
    this.onUpdateTodo(newTodo);
  }

  onTodoSubmit(): void {
    console.log();
    this.store.dispatch(
      addTodo({ content: this.formMessage })
    )
    this.formMessage = "";
  }

  onDeleteTodo(todo: Todo): void {
    this.store.dispatch(deleteTodo({ id: todo.id }));
  }

  onUpdateTodo(todo: Todo): void {
    this.store.dispatch(updateTodo(todo));
  }

  debug(string: string) {
    console.log(string)
  }

}
