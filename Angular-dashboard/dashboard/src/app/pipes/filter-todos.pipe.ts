import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../services/todo.service';

@Pipe({
  name: 'filterTodos',
  standalone: true,
})
export class FilterTodosPipe implements PipeTransform {
  transform(todos: Todo[] | null | undefined, filter: 'all' | 'completed' | 'pending'): Todo[] {
    if (!todos) {
      return []; // Return an empty array if todos is null or undefined
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    } else if (filter === 'pending') {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  }
}