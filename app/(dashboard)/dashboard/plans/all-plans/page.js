import { columns } from "@/components/ReusableTable/column";
import { DataTable } from "@/components/ReusableTable/data-table";
import { payments } from "@/data/payments";
import React from "react";

const AllPlansTable = () => {
  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={payments}
        filterInputPlaceholder={"Search Pages by Title"}
        filterInputColumn={"title"}
      />
    </div>
  );
};

export default AllPlansTable;
