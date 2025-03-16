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

import { useState } from "react";
import { DataTablePagination } from "./tablePagination";
import { DataTableViewOptions } from "./toggleColumnVisibility";

export function DataTable({
  columns,
  data,
  filterInputPlaceholder,
  filterInputColumn,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
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

  const seletedRows = table.getSelectedRowModel().rows.map((row) => {
    console.log(row);
    return row.original;
  });

  const handleDeleteRows = () => {
    const selectedData = table.getSelectedRowModel().rows.map((row) => {
      console.log(row); // Check the full row structure
      return row.id; // Extract the original data
    });

    if (selectedData.length === 0) {
      alert("No rows selected");
      return;
    }

    console.log("Deleting rows:", selectedData);

    // Example: Call API or update state
    // deleteRows(selectedRows);

    table.resetRowSelection(); // Reset selection after action
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
        {seletedRows.length > 0 && (
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
                  colSpan={columns.length}
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

      <DataTablePagination  table={table} />
    </div>
  );
}
