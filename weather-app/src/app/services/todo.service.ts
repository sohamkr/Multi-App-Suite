import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WritableSignal, signal } from '@angular/core';

 export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
  
} 

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: WritableSignal<Todo[]> = signal([]);

  private apiUrl = 'http://localhost:5000/todos';

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe(todos => this.todos.set(todos));
  }

  addTodo(title: string) {
    const newTodo: Todo = { title, completed: false };
    this.http.post<Todo>(this.apiUrl, newTodo).subscribe(todo => {
      this.todos.set([...this.todos(), todo]);
    });
  }

  toggleTodo(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, updatedTodo).subscribe(updated => {
      this.todos.set(this.todos().map(t => (t.id === updated.id ? updated : t)));
    });
  }

  deleteTodo(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.todos.set(this.todos().filter(todo => todo.id !== id));
    });
  }
}
