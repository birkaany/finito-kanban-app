import logo from "@/public/logo.svg";
import logoIcon from "@/public/logo-icon.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src={logo}
      alt="finito logo"
      width={100}
      height={50}
      sizes="(max-width: 768px) 100vw"
    />
  );
};

export default Logo;
