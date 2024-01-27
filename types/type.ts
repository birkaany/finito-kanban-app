export type UserProps = {
  id: string;
  name: string;
};

export type BoardProps = {
  id?: string;
  title: string;
  columns?: ColumnProps[];
  userId?: string;
};
export type ColumnProps = {
  id?: string;
  title: string;
  tasks?: TaskProps[];
  boardId?: string;
};
export type TaskProps = {
  id?: string;
  title: string;
  description: string;
  columnId?: string;
  subtasks?: SubtaskProps[];
};
export type SubtaskProps = {
  id?: string;
  title: string;
  taskId?: string;
  isDone: boolean;
};
