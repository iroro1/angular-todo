import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(
    this.getTodosFromLocalStorage()
  );
  public todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getTodosFromLocalStorage(): Todo[] {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  }

  private updateLocalStorage(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  fetchTodos(): void {
    // call from localstorage
    this.todosSubject.next(this.getTodosFromLocalStorage());
  }
  fetchTodosApi(): void {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe(
        (todos) => this.todosSubject.next(todos),
        (error) => console.error(error)
      );
  }

  addTodo(newTodo: Todo): void {
    const todos = this.todosSubject.getValue();
    todos.push(newTodo);
    this.todosSubject.next(todos);
    this.updateLocalStorage(todos);
    // redirect to /
    window.location.href = '/';
  }

  toggleTodoCompletion(todoId: number): void {
    const todos = this.todosSubject
      .getValue()
      .map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
    this.todosSubject.next(todos);
    this.updateLocalStorage(todos);
  }

  deleteTodo(todoId: number): void {
    const todos = this.todosSubject
      .getValue()
      .filter((todo) => todo.id !== todoId);
    this.todosSubject.next(todos);
    this.updateLocalStorage(todos);
  }
}
