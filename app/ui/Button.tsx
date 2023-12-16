export default function Button({
  children,
  variant = "primary",
  size = "small",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "destructive";
  size?: "small" | "large";
}) {
  const typeClass = {
    primary: "bg-primaryColor hover:bg-primaryLightColor text-white",
    secondary: "bg-linesLight hover:bg-mediumGrey text-primaryColor",
    destructive: "bg-red hover:bg-lightRed text-white",
  };
  return (
    <button
      className={`text-base flex font-bold antialiased items-center justify-center rounded-3xl px-6   gap-2 transition-all ${
        typeClass[variant]
      }
      ${size === "small" ? "py-2" : "py-3"}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
