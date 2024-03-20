"use client";

import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import TaskColumn from "@/components/taskArea/TaskColumn";
import { useParams } from "next/navigation";

const BoardPage = () => {
  const { boardId } = useParams();
  const {
    data: board,
    error,
    isLoading,
  } = useSWR(`/api/dashboard/boards/${boardId}`, fetcher);

  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex gap-4 items-start">
          {isLoading && <div>Loading...</div>}
          {Array.isArray(board) &&
            board.map((column: any, id) => (
              <TaskColumn
                id={column.id}
                key={column.id}
                title={column.title}
                tasks={column.task}
              />
            ))}
        </div>
      </main>
    </div>
  );
};

export default BoardPage;
