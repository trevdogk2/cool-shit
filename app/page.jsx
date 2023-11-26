import Atom from "@/components/threejs/Atom";
import PageCrack from "@/components/PageCrack";

export default function Home() {
  return (
    // <PageCrack>
    <div className="h-screen w-full bg-white pt-20">
      <div className="w-[900px] h-[900px] grid grid-rows-1 grid-cols-1">
        <Atom />
      </div>
    </div>
    // </PageCrack>
  );
}
