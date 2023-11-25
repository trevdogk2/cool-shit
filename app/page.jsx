import React from "react";
import Image from "next/image";
import PageCrack from "@/components/PageCrack";
import Header from "@/components/Header";

export default function Home() {
  return (
    <PageCrack>
      <main className="min-h-screen text-black flex flex-col">
        <Header />
        <div className="h-20"></div>
      </main>
    </PageCrack>
  );
}
