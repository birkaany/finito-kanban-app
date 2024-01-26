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

import { DialogContent, DialogTrigger } from "../ui/dialog";
import { FormEvent, useState } from "react";
import { addTask } from "@/actions/boardActions";
import { Textarea } from "../ui/textarea";

export function ViewTaskForm({ columnId }) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    subtasks: [
      {
        title: "",
      },
    ],
  });

  const handleChange = (e: any) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    addTask(newTask, columnId);
    setNewTask({
      title: "",
      description: "",
      subtasks: [
        {
          title: "",
        },
      ],
    });
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card>
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
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
                  required
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
                  required
                />
              </div>
              <fieldset className="border p-4 rounded-md space-y-2">
                <legend className="font-semibold text-sm">Subtasks</legend>
                {newTask.subtasks.map((subtask, index) => (
                  <div className="flex w-full gap-2" key={index}>
                    <Input
                      id="subtask-title"
                      required
                      placeholder="eg. Buy milk"
                      onChange={(e) => {
                        setNewTask((prevBoard) => {
                          const updatedTask = prevBoard.subtasks.map((col, i) =>
                            i === index ? { title: e.target.value } : col
                          );

                          return {
                            ...prevBoard,
                            subtasks: updatedTask,
                          };
                        });
                      }}
                    />

                    <Button
                      variant="outline"
                      onClick={() => {
                        setNewTask((prevBoard) => {
                          const updatedTask = prevBoard.subtasks.filter(
                            (col, i) => i !== index
                          );

                          return {
                            ...prevBoard,
                            subtasks: updatedTask,
                          };
                        });
                      }}
                    >
                      <span className="material-icons">
                        <DeleteIcon />
                      </span>
                    </Button>
                  </div>
                ))}
                <Button
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
                </Button>
              </fieldset>

              <Button
                type="submit"
                className="w-full"
                disabled={!newTask.title || newTask.subtasks.length < 1}
              >
                Create Task
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
