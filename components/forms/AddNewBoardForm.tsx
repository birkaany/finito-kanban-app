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
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";

export function AddNewBoardForm() {
  const { data, mutate } = useSWR("/api/dashboard/boards", fetcher);

  const [newBoard, setNewBoard] = useState({
    id: "",
    title: "",
    columns: [
      {
        title: "",
      },
    ],
  });

  const handleChange = (e: any) => {
    setNewBoard({ ...newBoard, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch(`/api/dashboard/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoard),
    }).then(() => {
      mutate("/api/dashboard/boards", true);
    });
    setNewBoard({
      id: "",
      title: "",
      columns: [
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
                <Input
                  id="board-title"
                  placeholder="Enter board title"
                  name="title"
                  onChange={handleChange}
                  required
                />
              </div>
              <fieldset className="border p-4 rounded-md space-y-2">
                <legend className="font-semibold text-lg">Columns</legend>
                {newBoard.columns?.map((column, index) => (
                  <div className="flex w-full gap-2" key={index}>
                    <Input
                      id="column-1"
                      required
                      placeholder="eg. In Progress"
                      onChange={(e) => {
                        setNewBoard((prevBoard) => {
                          const updatedColumns = prevBoard.columns?.map(
                            (col, i) =>
                              i === index ? { title: e.target.value } : col
                          );

                          return {
                            ...prevBoard,
                            columns: updatedColumns,
                          };
                        });
                      }}
                    />

                    <Button
                      variant="outline"
                      onClick={() => {
                        setNewBoard((prevBoard) => {
                          const updatedColumns = prevBoard.columns?.filter(
                            (col, i) => i !== index
                          );

                          return {
                            ...prevBoard,
                            columns: updatedColumns,
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
              </fieldset>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setNewBoard({
                    ...newBoard,
                    columns: [
                      ...(newBoard.columns || []),
                      {
                        title: "",
                      },
                    ],
                  });
                }}
              >
                Add Column
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={!newBoard.title || newBoard.columns.length < 1}
              >
                Create Board
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
