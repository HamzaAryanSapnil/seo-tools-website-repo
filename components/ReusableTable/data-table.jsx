"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useMemo, useState } from "react";
import { DataTablePagination } from "./tablePagination";
import { DataTableViewOptions } from "./toggleColumnVisibility";
import axios from "axios";
import {
  deleteMultipleToolsServerAction,
  deleteToolServerAction,
} from "@/lib/actions/updateTool";
import { toast } from "sonner";

export function DataTable({
  columns,
  initialData,
  filterInputPlaceholder,
  filterInputColumn,
  fetchUrl,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    try {
      setLoading(true);
      const res = await axios(fetchUrl);
      setData(res?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  //  const handleSingleDelete = async (id) => {
  //    try {
  //      const result = await deleteToolServerAction(id);
  //      if (result.status === "SUCCESS") {
  //        // Optimistic update
  //        setData((prev) => prev.filter((item) => item._id !== id));
  //        toast.success(result.message);
  //      } else {
  //        toast.error(result.error);
  //      }
  //      refreshData();
  //    } catch (error) {
  //      toast.error("Failed to delete tool");
  //      console.error("Delete error:", error);
  //    }
  //  };

  const enhancedColumns = useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        meta: {
          ...col.meta,
          handleSingleDelete: async (id) => {
            const prevData = [...data];
            try {
              // Optimistic update
              setData((prev) => prev.filter((item) => item._id !== id));
              const result = await deleteToolServerAction(id);
              if (result.status !== "SUCCESS") throw new Error(result.error);
              toast.success(result.message);
            } catch (error) {
              setData(prevData);
              toast.error(error.message);
            }
          },
          refreshData,
        },
      })),
    [columns, data, refreshData]
  );

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows.map((row) => {
    console.log(row);
    return row.original;
  });

const handleDeleteRows = async () => {
  try {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original._id);

    if (!selectedIds.length) {
      toast.error("No tools selected");
      return;
    }

    const result = await deleteMultipleToolsServerAction(selectedIds);

    if (result.status === "SUCCESS") {
      toast.success(result.message);
      await refreshData();
      table.resetRowSelection();
    }
  } catch (error) {
    toast.error("Failed to delete tools");
  }
};

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={filterInputPlaceholder}
          value={
            table.getColumn(filterInputColumn)?.getFilterValue()
              ? table.getColumn(filterInputColumn)?.getFilterValue()
              : ""
          }
          onChange={(e) => {
            table.getColumn(filterInputColumn)?.setFilterValue(e.target.value);
          }}
          className="max-w-sm"
        />

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} className={"ml-auto"}>
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={"end"}>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className={"capitalize"}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
        <DataTableViewOptions table={table} />
        {selectedRows.length > 0 && (
          <Button
            variant={"destructive"}
            className={"ml-2"}
            onClick={handleDeleteRows}
          >
            Delete
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={enhancedColumns.length} // Use enhancedColumns instead of columns
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div> */}
      </div>
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      {/* <DataTablePagination/> */}

      <DataTablePagination table={table} />
    </div>
  );
}
