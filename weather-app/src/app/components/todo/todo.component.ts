import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TodoService } from '../../services/todo.service';
import {Todo} from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../../pipes/filter-todos.pipe';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [CommonModule, FormsModule, FilterTodosPipe, DragDropModule],
})
export class TodoComponent {
  filter: 'all' | 'completed' | 'pending' = 'all';
  newTodoTitle: string = ''; // ✅ Fix for missing property
  todos!: Todo[]; // ✅ Fix for initialization
  

  constructor(public todoService: TodoService) {
   
    // ✅ Fix for NG0203: Place effect inside constructor
    effect(() => {
      this.todos = this.todoService.todos();
      console.log('Todos updated:', this.todos);
    });
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle.trim());
      this.newTodoTitle = ''; // ✅ Reset input
    }
  }

  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter; // ✅ Fix for missing method
  }

  toggleTodo(id: any) {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: any) {
    this.todoService.deleteTodo(id);
  }

  drop(event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex); // ✅ Drag & drop fix
  }
}
