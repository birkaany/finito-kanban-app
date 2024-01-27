import { TaskProps } from "@/types/type";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { TaskActions } from "./TaskActions";

const TaskCard = async ({ task }: { task: TaskProps }) => {
  const doneSubtasks = task.subtasks?.filter((subtask) => subtask.isDone);

  return (
    <Card className="w-full">
      <CardContent className="p-3 flex items-start justify-between">
        <div>
          <CardTitle className="text-base">{task.title}</CardTitle>
          <CardDescription>{`${doneSubtasks?.length} of ${task.subtasks?.length} Subtasks`}</CardDescription>
        </div>
        <TaskActions task={task} />
      </CardContent>
    </Card>
  );
};

const VerticalDots = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
      />
    </svg>
  );
};

export default TaskCard;
