import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BoardPage from "./page-client";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return <BoardPage />;
}
