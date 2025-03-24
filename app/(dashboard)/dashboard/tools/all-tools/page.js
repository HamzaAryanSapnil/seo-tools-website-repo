import { columns } from "@/components/ReusableTable/column";
import { DataTable } from "@/components/ReusableTable/data-table";
import { payments } from "@/data/payments";
import React from "react";

const AllToolsPage = async () => {

  const response = await fetch("http://localhost:3000/api/admin/tools");
  // const response = await fetch("/api/admin/tools");
  // const tools = await allTools.json();
  const tools = await response.json();
 
  
  

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage All Tools</h2>
      </div>
      <DataTable
        columns={columns}
        data={tools}
        filterInputPlaceholder={"Search Pages by Title"}
        filterInputColumn={"title"}
      />
    </div>
  );
};

export default AllToolsPage;
