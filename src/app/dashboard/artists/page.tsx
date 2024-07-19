import AlbumsTable from "@/app/dashboard/(albums)/albums-table";
import { ArtistsTable } from "@/app/dashboard/artists/components/artists-table";
import { SongsTable } from "@/app/dashboard/songs/components/songs-table";

export default function ArtistsPage() {
  return (
    <div className="w-full min-h-screen flex fkex-col">
      <ArtistsTable />
    </div>
  );
}
