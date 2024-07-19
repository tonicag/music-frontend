import { LibraryIcon, ListMusicIcon, MusicIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-full w-full flex flex-col p-2 gap-2 border-r-[2px] border-pink-300">
      <Link href={"/dashboard"}>
        <div className="flex justify-center mt-2">
          <h1 className="text-[24px] font-semibold text-gray-600">
            Sound<span className="font-light text-pink-500">zzz</span>
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-2 mt-20">
        <Link
          className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 rounded-lg text-sm text-gray-500 font-normal"
          href={"/dashboard/"}
        >
          <LibraryIcon className="stroke-pink-300" />
          Albums
        </Link>
        <Link
          className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 rounded-lg text-sm text-gray-500 font-normal"
          href={"/dashboard/songs"}
        >
          <MusicIcon className="stroke-pink-300" />
          Songs
        </Link>
        <Link
          className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 rounded-lg text-sm text-gray-500 font-normal"
          href={"/dashboard/artists"}
        >
          <UserIcon className="stroke-pink-300" />
          Artists
        </Link>
      </div>
    </div>
  );
}
