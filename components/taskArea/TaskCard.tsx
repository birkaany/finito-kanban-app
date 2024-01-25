import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

type TaskCardProps = {
  title: string;
};
const TaskCard = ({ task }: { task: TaskCardProps }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-3">
        <CardTitle className="text-base">{task.title}</CardTitle>
        <CardDescription>0 of 3 Subtasks</CardDescription>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
