"use client";
import Link from "next/link";
import BoardListItem from "./BoardListItem";
import { useEffect, useState } from "react";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchBoards = async () => {
      const res = await fetch("/api/getBoards", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setBoards(data);
    };
    fetchBoards();
  }, [boards]);
  return (
    <div className="flex-1 overflow-auto py-2">
      <div className="grid items-start px-4 text-sm font-medium">
        {boards.map((board) => (
          <BoardListItem key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};
function PackageIcon(props: any) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default BoardList;
