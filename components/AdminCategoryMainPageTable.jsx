"use client";

import axios from "axios";
import { categoryColumns } from "./ReusableTable/Category-Table/categoryColumn";
import { DataTable } from "./ReusableTable/data-table";

import React, { useState } from "react";

const AdminCategoryMainPageTable = ({ categories }) => {
  const [categoriesData, setCategoriesData] = useState(categories || []);

  const refreshData = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/getCategory");
    const categories = res.data.data;
    return categories;
  };
  return (
    <div className="md:col-span-2 space-y-6">
      <DataTable
        columns={categoryColumns}
        initialData={categoriesData}
        filterInputPlaceholder={"Search Pages by Name"}
        filterInputColumn={"name"}
        filterSelectColumn="title"
        filterSelectLabel="Filter by Title"
        filterSelectPlaceholder="All Titles"
        firstSearchInputPlaceholder={"name"}
        secondSearchInputPlaceholder={"title"}
        refreshDataInComponent={refreshData}
        meta={{
          entityType: "category",
          handleSingleDelete: async (id) => {
            // Implement single category delete
            const result = await deleteCategory(id);
            if (result.status === "SUCCESS") {
              setCategoriesData((prev) => prev.filter((cat) => cat._id !== id));
            }
          },
        }}
      />
    </div>
  );
};

export default AdminCategoryMainPageTable;
