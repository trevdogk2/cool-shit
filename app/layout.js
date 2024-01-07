import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageCrack from "@/components/PageCrack";
import ConsoleArt from "@/components/ConsoleArt";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "cool shit",
  description: "...cool shit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ConsoleArt />
        <PageCrack toggle={false}>
          <Header />
          {children}
        </PageCrack>
      </body>
    </html>
  );
}
