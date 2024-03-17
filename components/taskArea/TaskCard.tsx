import { TaskProps } from "@/types/type";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { TaskActions } from "./TaskActions";

const TaskCard = ({ task }: { task: TaskProps }) => {
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

export default TaskCard;
