"use client";

import { fetcher } from "@/app/lib/fetcher";
import BoardListItem from "./BoardListItem";
import useSWR from "swr";

const BoardList = () => {
  const { data, error, isLoading } = useSWR("/api/dashboard/boards", fetcher);
  return (
    <div className="flex-1 overflow-auto py-2">
      <div className="grid items-start px-4 text-sm font-medium">
        {isLoading && <div>Loading boards...</div>}
        {Array.isArray(data) &&
          data.map((board: any) => (
            <BoardListItem key={board.id} board={board} />
          ))}
      </div>
    </div>
  );
};

export default BoardList;
