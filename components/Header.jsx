import React from "react";

export default function Header() {
  return (
    <main className="h-20 z-0 bg-black text-black grid grid-cols-8 gap-px border-b border-black font-light">
      <div className="col-span-3 bg-white"></div>
      <div className="col-span-3 bg-white flex items-center justify-center">TREVOR WESTIN</div>
      <div className="col-span-1 bg-white"></div>
      <div className="col-span-1 bg-white"></div>
    </main>
  );
}
