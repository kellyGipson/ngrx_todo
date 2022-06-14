import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [
    {
      id: "1",
      content: "hello world",
      checked: false,
    },
    {
      id: "2",
      content: "something with a longer name like this that demontrates",
      checked: true,
    }
  ];

  // Form variables
  addFormIsOpen: boolean = true;
  todoForm = this.formBuilder.group({
    formMessage: "",
  })

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  toggleAddForm() {
    this.addFormIsOpen = !this.addFormIsOpen;
  }

  onTodoSubmit(): void {
    console.log(this.todoForm.value);
  }

}
