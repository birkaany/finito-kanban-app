"use client";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks }: { title: string; tasks: any[] }) => {
  return (
    <div className="flex-shrink-0 flex flex-col bg-gray-50 rounded-lg dark:bg-gray-800 w-72 ">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          {title} <span className="text-sm">({tasks.length})</span>
        </h2>
        {/* <AddNewTaskForm columnId={column.id} /> */}
      </div>
      <div className="p-4 space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
