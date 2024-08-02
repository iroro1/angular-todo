import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list-api',
  templateUrl: './todo-list-api.component.html',
  styleUrl: './todo-list-api.component.css',
})
export class TodoListApiComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;
  }

  ngOnInit(): void {
    this.todoService.fetchTodosApi();
  }
}
