import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-full w-full flex flex-col">
      <Link href={"/dashboard"}>Albums</Link>
      <Link href={"/dashboard"}>Songs</Link>
      <Link href={"/dashboard"}>Artists</Link>
    </div>
  );
}
