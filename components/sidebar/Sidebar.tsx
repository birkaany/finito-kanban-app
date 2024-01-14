"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import BoardList from "./BoardList";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const { mutate: addBoard } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/createBoard", {
        method: "POST",
        body: JSON.stringify({ title: "New Board" }),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
    },
  });
  const handleCreateBoard = () => {
    addBoard();
  };
  return (
    <aside className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <CircuitBoardIcon className="h-6 w-6" />
            <span className="">Finito</span>
          </Link>
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <BoardList />
        <div className="p-4">
          <Button className="w-full" size="sm" onClick={handleCreateBoard}>
            Create New Board
          </Button>
        </div>
        <div className="mt-auto p-4">
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <MoonIcon className="h-4 w-4" />
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};
function CircuitBoardIcon(props: any) {
  return (
    <svg
      {...props}
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M11 9h4a2 2 0 0 0 2-2V3" />
      <circle cx="9" cy="9" r="2" />
      <path d="M7 21v-4a2 2 0 0 1 2-2h4" />
      <circle cx="15" cy="15" r="2" />
    </svg>
  );
}
function BellIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
function MoonIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
export default Sidebar;
