import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/Header/Header";
import block from "bem-cn-lite";

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
        <div className={b()}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
