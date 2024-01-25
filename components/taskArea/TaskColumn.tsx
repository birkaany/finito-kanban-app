import { getTasks } from "@/actions/boardActions";
import { AddNewTaskForm } from "../forms/AddNewTaskForm";
import TaskCard from "./TaskCard";
import type { Column } from "@prisma/client";
type TaskColumnProps = {
  column: Column;
};

type Column = {
  id: number;
  title: string;
};
const TaskColumn: React.FC<TaskColumnProps> = async ({
  column,
}: {
  column: Column;
}) => {
  const tasks = await getTasks(column.id);

  return (
    <div className="flex-shrink-0 flex flex-col bg-gray-50 rounded-lg  dark:bg-gray-800 w-72">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          {column.title} <span className="text-sm">(2)</span>
        </h2>
        <AddNewTaskForm columnId={column.id} />
      </div>
      <div className="p-4 space-y-4">
        {Array.isArray(tasks) &&
          tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default TaskColumn;
