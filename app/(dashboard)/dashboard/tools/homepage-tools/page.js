
import { columns } from '@/components/ReusableTable/column';
import { DataTable } from '@/components/ReusableTable/data-table';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'

const HomePageToolsManagement = async () => {
    const res = await axios("http://localhost:3000/api/admin/tools");
    const tools = res?.data || [];
    const homepageTools = tools?.filter((tool) => tool?.homepage);
    console.log("homepage tools: ",homepageTools);
    

  if (!homepageTools?.length) {
    return (
      <div className="flex justify-center items-center">
        No homepage tools found
      </div>
    );
  }
  

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage Homepage Tools</h2>
        <Link href={"/dashboard/tools/tools-categories"}>
          <Button className="">Create New Tools Category</Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={homepageTools} // Now properly filtered
        filterInputPlaceholder={"Search Pages by name"}
        filterInputColumn={"name"}
      />
    </div>
  );
}

export default HomePageToolsManagement
