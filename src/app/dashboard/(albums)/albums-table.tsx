import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default function AlbumsTable() {
  return (
    <div className="w-full h-full">
      <p>Albums</p>
      <p className="text-sm text-gray-500">Manage your albums.</p>
    </div>
  );
}
