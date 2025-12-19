export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = 'all' | 'completed' | 'pending';

export interface TodosState {
  items: Todo[];
  filter: FilterType;
}
