import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WritableSignal, signal } from '@angular/core';

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  editing?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/todos';
  
  // ✅ Initialize todos properly
  todos: WritableSignal<Todo[]> = signal([]);

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe({
      next: (todos) => this.todos.set(todos),
      error: (err) => {
        console.error('Error fetching todos:', err);
        this.todos.set([]); // ✅ Prevents undefined/null issues
      }
    });
  }

  addTodo(title: string) {
    const newTodo: Partial<Todo> = { title, completed: false }; // ✅ _id is optional
  
    this.http.post<Todo>(this.apiUrl, newTodo).subscribe((todo) => {
      this.todos.set([...this.todos(), todo]); // ✅ Server returns todo with _id
    });
  }
  

  toggleTodo(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.http.put<Todo>(`${this.apiUrl}/${todo._id}`, updatedTodo).subscribe(updated => {
      this.todos.set(this.todos().map(t => (t._id === updated._id ? updated : t)));
    });
  }

  deleteTodo(id?: string) {
    if (!id) {
      console.error('Error: Cannot delete todo without a valid ID');
      return;
    }
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.todos.set(this.todos().filter(todo => todo._id !== id));
    });
  }
  
}
