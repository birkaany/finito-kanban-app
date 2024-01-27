"use client";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { DialogContent } from "../ui/dialog";
import { FormEvent, useState } from "react";
import { updateTask } from "@/actions/boardActions";
import { Textarea } from "../ui/textarea";
import { TaskProps } from "@/types/type";

export function EditTaskForm({
  task,
  open,
  onOpenChange,
}: {
  task: TaskProps;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [updatedTask, setUpdatedTask] = useState<TaskProps>({
    title: task.title,
    description: task.description,
    subtasks: task.subtasks,
  });

  const handleChange = (e: any) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    task.id && updateTask(task.id, updatedTask);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Card>
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
            <CardDescription>
              Enter the details for your new card below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  placeholder="Enter task title"
                  name="title"
                  onChange={handleChange}
                  value={updatedTask.title}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                  recharge the batteries a little."
                  name="description"
                  onChange={handleChange}
                  value={updatedTask.description || ""}
                />
              </div>
              <fieldset className="border p-4 rounded-md space-y-2">
                <legend className="font-semibold text-sm">Subtasks</legend>
                {updatedTask.subtasks?.map(({ id, title }) => (
                  <div className="flex w-full gap-2" key={id}>
                    <Input
                      id="subtask-title"
                      placeholder="eg. Buy milk"
                      value={title}
                      onChange={(e) => {
                        setUpdatedTask({
                          ...updatedTask,
                          subtasks: updatedTask.subtasks?.map((subtask) => {
                            if (subtask.id === id) {
                              return {
                                ...subtask,
                                title: e.target.value,
                              };
                            }
                            return subtask;
                          }),
                        });
                      }}
                    />

                    <Button variant="outline" onClick={() => {}}>
                      <span className="material-icons">
                        <DeleteIcon />
                      </span>
                    </Button>
                  </div>
                ))}
                {/* <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    setNewTask({
                      ...newTask,
                      subtasks: [
                        ...newTask.subtasks,
                        {
                          title: "",
                        },
                      ],
                    });
                  }}
                >
                  Add Subtask
                </Button> */}
              </fieldset>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  !updatedTask.title || (updatedTask.subtasks?.length ?? 0) < 1
                }
              >
                Update Task
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

const DeleteIcon = () => {
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
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
