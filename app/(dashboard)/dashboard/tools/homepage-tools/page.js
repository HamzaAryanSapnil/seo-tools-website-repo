import { columns } from '@/components/ReusableTable/column';
import { DataTable } from '@/components/ReusableTable/data-table';
import { Button } from '@/components/ui/button';
import { payments } from '@/data/payments';
import Link from 'next/link';
import React from 'react'

const HomePageToolsManagement = () => {
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
        data={payments}
        filterInputPlaceholder={"Search Pages by Title"}
        filterInputColumn={"title"}
      />
    </div>
  );
}

export default HomePageToolsManagement
