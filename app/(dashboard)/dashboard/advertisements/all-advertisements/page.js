import { adColumns } from '@/components/ReusableTable/AdvertisementColumn/AdColumn';

import { DataTable } from '@/components/ReusableTable/data-table';
import { Button } from '@/components/ui/button';
import { payments } from '@/data/payments';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'

const ManageAdvertisements = async () => {
  const res = await axios.get("http://localhost:3000/api/admin/advertisements");
  const allAd = res.data;

  
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage All Advertisements</h2>
        <Link href={"/dashboard/advertisements/create-advertisement"}>
          <Button className="/dashboard/advertisements/create-advertisement">
            Create New Advertise
          </Button>
        </Link>
      </div>
      <DataTable
        columns={adColumns}
        initialData={allAd}
        filterInputPlaceholder={"Search Pages by Title"}
        filterInputColumn={"title"}
      />
    </div>
  );
}

export default ManageAdvertisements
