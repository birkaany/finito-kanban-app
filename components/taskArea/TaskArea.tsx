import React from "react";
import TaskAreaHeader from "./TaskAreaHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import TaskColumn from "./TaskColumn";

const TaskArea = () => {
  return (
    <div className="flex flex-col">
      <TaskAreaHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {/* <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Board 1</h1>
        </div> */}
        <div className="flex gap-4">
          <TaskColumn />
          <TaskColumn />
        </div>
      </main>
    </div>
  );
};

export default TaskArea;
