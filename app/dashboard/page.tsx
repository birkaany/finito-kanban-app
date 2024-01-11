import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <Sidebar />
    </div>
  );
}
