import { columns } from "@/components/ReusableTable/column";
import { DataTable } from "@/components/ReusableTable/data-table";
import { payments } from "@/data/payments";

async function getData() {
  // Fetch data from your API here.
  return {
    data: payments,
  }
}

export default async function DemoPage() {
  const {data} = await getData();
  
  

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} filterInputPlaceholder={"Search Pages by Title"} filterInputColumn={"title"} />
    </div>
  );
}
