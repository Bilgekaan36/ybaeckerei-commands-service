export class InMemoryStore {
  todos: any[];
  constructor() {
    // Intentionally left blank.
  }

  async initialize() {
    this.todos = [];
  }

  async noteTodo({ todo }: { todo: any }) {
    this.todos.push(todo);
  }

  async markTodoAsDone({ id }: { id: any }) {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new Error('Todo not found.');
    }

    todo.status = 'done';
  }

  async getRemainingTodos() {
    return this.todos.filter((todo) => todo.status === 'open');
  }
}
