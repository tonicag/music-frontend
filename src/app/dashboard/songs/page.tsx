import AlbumsTable from "@/app/dashboard/(albums)/albums-table";
import SongsTable from "@/app/dashboard/songs/components/songs-table";

export default function SongsPage() {
  return (
    <div className="w-full min-h-screen flex fkex-col">
      <SongsTable />
    </div>
  );
}
