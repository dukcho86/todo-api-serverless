import * as uuid from 'uuid';

import TodoRepository from '../repositories/TodoRepository';
import { TodoItem } from '../TodoItem';

export default class TodoService {
  todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository = new TodoRepository()) {
    this.todoRepository = todoRepository;
  }

  async getAllTodos(): Promise<TodoItem[]> {
    return this.todoRepository.getAllTodos();
  }

  async createTodo(name: string): Promise<TodoItem> {
    const id = uuid.v4();

    return await this.todoRepository.createTodo({
      id,
      name,
      done: false,
      createdAt: new Date().toISOString(),
    });
  }

  async updateTodo(partialTodo: Partial<TodoItem>) {
    return await this.todoRepository.updateTodo(partialTodo);
  }

  async deleteTodoById(id: string) {
    return await this.todoRepository.deleteTodoById(id);
  }
}
