import TaskCard from "./TaskCard";
import type { Column } from "@prisma/client";
type TaskColumnProps = {
  column: Column;
};
const TaskColumn: React.FC<TaskColumnProps> = ({ column }) => {
  return (
    <div className="flex-shrink-0 flex flex-col bg-gray-50 rounded-lg  dark:bg-gray-800 w-72">
      <div className="px-4 py-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
        <h2 className="font-semibold text-lg flex items-center justify-between">
          {column.title} <span className="text-sm">(2)</span>
        </h2>
      </div>
      <div className="p-4 space-y-4">
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  );
};

export default TaskColumn;
