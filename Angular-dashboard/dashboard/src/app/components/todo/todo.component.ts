import { Component, OnInit, ChangeDetectorRef, effect, runInInjectionContext, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';
import { FilterTodosPipe } from '../../pipes/filter-todos.pipe';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-todo',
    standalone: true,
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    imports: [CommonModule, FormsModule, FilterTodosPipe, RouterModule],
})
export class TodoComponent implements OnInit {
    newTodoTitle: string = '';
    filter: 'all' | 'completed' | 'pending' = 'all';
    public todoService = inject(TodoService);
    private cdr = inject(ChangeDetectorRef);
    private injector = inject(Injector);
    private router = inject(Router);  // Inject Router for navigation

    ngOnInit() {
        console.log('TodoComponent ngOnInit called');
        console.log('Initial todos:', this.todoService.todos());
        this.todoService.loadTodos();

        runInInjectionContext(this.injector, () => {
            effect(() => {
                const todos = this.todoService.todos();
                console.log('todos signal changed', todos);
                this.cdr.detectChanges();
            });
        });
    }

    addTodo() {
        if (this.newTodoTitle.trim()) {
            this.todoService.addTodo(this.newTodoTitle.trim());
            this.newTodoTitle = '';
        }
    }

    toggleTodo(todo: Todo) {
        this.todoService.toggleTodo(todo);
    }

    deleteTodo(id: string) {
        this.todoService.deleteTodo(id);
    }

    editTodo(todo: Todo) {
        todo.editing = true;
    }

    saveEdit(todo: Todo) {
        todo.editing = false;
        this.todoService.toggleTodo(todo); // By calling toggle todo, the backend will be updated.
    }

    trackByTodoId(index: number, todo: Todo): string | undefined {
        return todo?._id;
    }

    // New method to navigate back to home
    goHome() {
        this.router.navigate(['/']);
    }
}
