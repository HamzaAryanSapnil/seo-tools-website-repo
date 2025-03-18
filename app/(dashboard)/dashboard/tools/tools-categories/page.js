import CategoriesForm from '@/components/categories-form';
import { columns } from '@/components/ReusableTable/column';
import { DataTable } from '@/components/ReusableTable/data-table';
import ToolsCategoryForm from '@/components/tools-categories-form';
import { payments } from '@/data/payments';
import React from 'react'

const ToolsCategoriesPage = () => {
  return (
    <div className="min-h-screen w-full container mx-auto py-10 max-w-7xl  p-6 bg-white shadow-lg rounded-2xl border border-gray-200 grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* categories form */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Create New Tools Category</h2>
        <ToolsCategoryForm />
      </div>
      {/* categories table */}
      <div className="md:col-span-2 space-y-6">
        <DataTable
          columns={columns}
          data={payments}
          filterInputPlaceholder={"Search Pages by Title"}
          filterInputColumn={"title"}
        />
      </div>
    </div>
  );
}

export default ToolsCategoriesPage
