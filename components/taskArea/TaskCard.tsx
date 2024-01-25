import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { getSubtasks } from "@/actions/boardActions";

type TaskCardProps = {
  title: string;
};
const TaskCard = async ({ task }: { task: TaskCardProps }) => {
  const subTasks = await getSubtasks(task.id);
  const doneSubtasks =
    Array.isArray(subTasks) && subTasks.filter((subtask) => subtask.isDone);
  console.log({ doneSubtasks });
  return (
    <Card className="w-full">
      <CardContent className="p-3">
        <CardTitle className="text-base">{task.title}</CardTitle>
        <CardDescription>{`${doneSubtasks.length} of ${subTasks.length} Subtasks`}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
