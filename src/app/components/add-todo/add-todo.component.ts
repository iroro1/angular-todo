import { Component } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  newTodoTitle: string = '';

  constructor(private todoService: TodoService) {}

  addTodo(): void {
    const newTodo: Todo = {
      userId: 1,
      id: Date.now(),
      title: this.newTodoTitle,
      completed: false,
    };
    this.todoService.addTodo(newTodo);
    this.newTodoTitle = '';
  }
}
