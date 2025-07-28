import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../services/todo.service';

@Pipe({
  name: 'filterTodos',
  standalone: true,
  pure: false,
})
export class FilterTodosPipe implements PipeTransform {
  transform(todos: Todo[], filter: 'all' | 'completed' | 'pending'): Todo[] {
    if (!todos) return [];

    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
}
