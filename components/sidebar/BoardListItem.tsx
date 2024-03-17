"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import clsx from "clsx";

const BoardListItem = ({ board }: { board: any }) => {
  const params = useParams();
  const isActive = params.boardId === board.id;

  const activeClass =
    "bg-accent dark:bg-gray-700 text-gray-900 dark:text-gray-50 ";
  return (
    <Button
      asChild
      className={`flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 
      ${isActive ? activeClass : ""}`}
      variant={"ghost"}
    >
      <Link href={`/dashboard/${board.id}`}>
        <HomeIcon className="h-4 w-4" />
        <span className="truncate">{board.title}</span>
      </Link>
    </Button>
  );
};

function HomeIcon(props: any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
export default BoardListItem;
