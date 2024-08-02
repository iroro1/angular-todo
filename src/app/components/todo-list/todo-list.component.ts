import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  isEmpty = false;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;
  }

  hasTodos(): void {
    // check is todos$ has value
    this.todos$.subscribe((todos) => {
      if (todos.length === 0) {
        this.isEmpty = true;
      }
    });
  }

  ngOnInit(): void {
    this.todoService.fetchTodos();
    this.hasTodos();
  }
}
