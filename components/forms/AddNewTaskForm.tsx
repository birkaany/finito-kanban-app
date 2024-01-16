"use client";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DialogContent, DialogTrigger } from "../ui/dialog";
import { FormEvent, useState } from "react";

export function AddNewTaskForm() {
  const [newBoard, setNewBoard] = useState({
    title: "",
    columns: [],
  });
  const handleChange = (e: any) => {
    setNewBoard({ ...newBoard, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(newBoard);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" size={"sm"}>
          New Board
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card>
          <CardHeader>
            <CardTitle>Create New Board</CardTitle>
            <CardDescription>
              Enter the details for your new board below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="board-title">Board Title</Label>
                <Input id="board-title" placeholder="Enter board title" />
              </div>
              <fieldset className="border p-4 rounded-md space-y-2">
                <legend className="font-semibold text-lg">Columns</legend>
                <div className="flex space-x-2 items-center">
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="column-1">Column 1</Label>
                    <Input id="column-1" placeholder="Enter column name" />
                  </div>
                  <Button variant="outline">
                    <span className="material-icons">clear</span>
                  </Button>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="column-2">Column 2</Label>
                    <Input id="column-2" placeholder="Enter column name" />
                  </div>
                  <Button variant="outline">
                    <span className="material-icons">clear</span>
                  </Button>
                </div>
              </fieldset>
              <Button className="w-full" variant="outline">
                Add Column
              </Button>
              <Button type="submit" className="w-full">
                Create Board
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
