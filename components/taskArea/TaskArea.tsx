import { getColumns } from "@/actions/boardActions";
import TaskColumn from "./TaskColumn";

const TaskArea = async ({ boardId }: { boardId: string }) => {
  const taskColumns = await getColumns(boardId);

  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex gap-4">
          {Array.isArray(taskColumns) &&
            taskColumns.map((column) => {
              return <TaskColumn key={column.id} column={column} />;
            })}
        </div>
      </main>
    </div>
  );
};

export default TaskArea;
