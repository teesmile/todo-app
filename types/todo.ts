export interface Todo {
  id: string | number;
  todo: string;
  completed: boolean;
  userId: number;
  isLocal?: boolean;
  syncError?: boolean;
}

export interface SearchParams {
  page?: number;
  limit?: number;
  search?: string;
  filter?: 'all' | 'completed' | 'active';
}

export interface ApiTodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}