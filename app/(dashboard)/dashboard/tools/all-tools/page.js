import { columns } from "@/components/ReusableTable/column";
import { DataTable } from "@/components/ReusableTable/data-table";
import { payments } from "@/data/payments";
import axios from "axios";
import React from "react";

const AllToolsPage = async () => {
  const res = await axios("http://localhost:3000/api/admin/tools");
  const tools = res?.data || [];



  

 

  
 
  
  

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage All Tools</h2>
      </div>
      <DataTable
        columns={columns}
        initialData={tools}
        filterInputPlaceholder={"Search Pages by name"}
        filterInputColumn={"name"}
        fetchUrl={"http://localhost:3000/api/admin/tools"}
      />
    </div>
  );
};

export default AllToolsPage;
