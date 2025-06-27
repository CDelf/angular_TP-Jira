export type TaskData = {
  description: string;
  dueDate: string;
  priority: string;
  done: boolean;
};

export type ListData = {
  title: string;
  tasks: TaskData[];
};

export type BoardData = {
  id: string;
  title: string;
  lists: ListData[];
};
