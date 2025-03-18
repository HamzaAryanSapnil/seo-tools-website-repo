import { columns } from "@/components/ReusableTable/column";
import { DataTable } from "@/components/ReusableTable/data-table";
import { payments } from "@/data/payments";
import React from "react";

const AllToolsPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage All Tools</h2>
      </div>
      <DataTable
        columns={columns}
        data={payments}
        filterInputPlaceholder={"Search Pages by Title"}
        filterInputColumn={"title"}
      />
    </div>
  );
};

export default AllToolsPage;
