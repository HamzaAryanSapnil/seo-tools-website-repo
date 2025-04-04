"use client";



import { DataTable } from "@/components/ReusableTable/data-table";

import { useState } from "react";
import { toast } from "sonner";

const PlansDataTable = ({plans}) => {
  const [plansData, setPlansData] = useState(plans || []);
  return (
    <DataTable
      columns={columns}
      initialData={plansData}
      filterInputPlaceholder={"Search Plans by Title"}
      filterInputColumn={"title"}
      firstSearchInputPlaceholder={"name"}
      secondSearchInputPlaceholder={"title"}
      thirdSearchInputPlaceholder={"and types"}
      filterSelectColumn={"type"}
      refreshDataInComponent={refreshAds}
      meta={{
        entityType: "advertisement",
        handleSingleDelete: async (id) => {
          const result = await (id);
          if (result.status === "SUCCESS") {
            setAdData((prev) => prev.filter((ad) => ad._id !== id));
            refreshAds();
            toast.success(result.message);
          }
        },
      }}
    />
  );
};

export default PlansDataTable;
