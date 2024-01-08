import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* <Header /> */}

      <div className="flex h-full items-start">
        {/* <Sidebar />
        <Boards /> */}
        {children}
      </div>
    </div>
  );
}
