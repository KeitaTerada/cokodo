/* Todoの型付け*/

export type Todo = {
  id: string;
  title: string;
  description: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  priority: boolean;
};
