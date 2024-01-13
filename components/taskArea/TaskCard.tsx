import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

const TaskCard = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-3">
        <CardTitle className="text-base">Task 4</CardTitle>
        <CardDescription>0 of 3 Subtasks</CardDescription>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
