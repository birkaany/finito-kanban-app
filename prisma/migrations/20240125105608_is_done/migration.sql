-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT;
