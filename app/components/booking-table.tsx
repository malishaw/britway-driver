"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Booking } from "../typings";

export const columns: ColumnDef<Booking>[] = [
  { accessorKey: "Journey date" },
  { accessorKey: "Ref ID" },
  { accessorKey: "Driver" },
  { accessorKey: "Status" },
  { accessorKey: "Driver income" },
  { accessorKey: "Total" },
  { accessorKey: "Payments" },
  { accessorKey: "Vehicle" },
  { accessorKey: "Vehicle type" },
  { accessorKey: "Total (net)" },
  { accessorKey: "Discount" },
  { accessorKey: "Passenger name" },
  { accessorKey: "Flight number" },
  { accessorKey: "Flight landing time" },
  { accessorKey: "Arriving from" },
  { accessorKey: "Flight departure number" },
  { accessorKey: "Service duration" },
  { accessorKey: "Service type" },
  { accessorKey: "Flight departure time" },
  { accessorKey: "Flight departure to" },
  { accessorKey: "Phone number" },
  { accessorKey: "Pickup" },
  { accessorKey: "Dropoff" },
  { accessorKey: "Via" },
  { accessorKey: "Passengers" },
  { accessorKey: "Suitcases" },
  { accessorKey: "Carry-on" },
  { accessorKey: "Child seats" },
  { accessorKey: "Booster seats" },
  { accessorKey: "Infant seats" },
  { accessorKey: "Wheelchairs" },
  { accessorKey: "Waiting time" },
  { accessorKey: "Email" },
  { accessorKey: "Meet & Greet" },
  { accessorKey: "Source" },
  { accessorKey: "Customer" },
  { accessorKey: "Departments" },
  { accessorKey: "Lead name" },
  { accessorKey: "Lead email" },
  { accessorKey: "Lead phone number" },
  { accessorKey: "Created at" },
  { accessorKey: "Updated at" },
  { accessorKey: "ID" },
  { accessorKey: "Currency" },
  {
    accessorKey: "Tracking History",
    cell: ({ getValue }) => (
      <span className="whitespace-nowrap">{`${getValue()}`}</span>
    ),
  },
];

export function BookingTable({ data = [] }: { data: Booking[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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

  return (
    <div className="overflow-auto">
      <div className="flex items-center pb-4 ">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("Email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
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
        </div>
      </div>
    </div>
  );
}
