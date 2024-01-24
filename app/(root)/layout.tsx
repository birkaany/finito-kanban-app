import LoginButton from "@/components/LoginButton";
import Logo from "@/components/Logo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className=" px-6 py-3 flex justify-between">
        <Logo />
        <LoginButton />
      </header>
      {children}
      <footer>Footer</footer>
    </>
  );
}
