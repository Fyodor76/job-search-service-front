import { Metadata } from "next";
import "../styles/globals.scss";
import block from "bem-cn-lite";
import Script from "next/script";

const b = block("main");

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={b()}>{children}</div>
      </body>
    </html>
  );
}
