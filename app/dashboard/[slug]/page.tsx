import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TaskArea from "@/components/taskArea/TaskArea";
import { getColumns } from "@/actions/boardActions";

type DashboardProps = {
  params: {
    slug: string;
  };
};
export default async function Dashboard({ params }: DashboardProps) {
  console.log({ params });
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return <TaskArea boardId={params.slug} />;
}
