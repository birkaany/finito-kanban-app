import Sidebar from "@/components/sidebar/Sidebar";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TaskArea from "@/components/taskArea/TaskArea";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <TaskArea />
    </div>
  );
}
