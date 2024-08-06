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

// export const columns: ColumnDef<Booking>[] = [
//   { accessorKey: "journeyDate" }, 
//   { accessorKey: "refId" },
//   { accessorKey: "driver" },
//   { accessorKey: "status" },
//   { accessorKey: "driverIncome" },
//   { accessorKey: "total" },
//   { accessorKey: "payments" },
//   { accessorKey: "vehicle" },
//   { accessorKey: "vehicleType" },
//   { accessorKey: "total" },
//   { accessorKey: "discount" },
//   { accessorKey: "passengerName" },
//   { accessorKey: "flightNumber" },
//   { accessorKey: "flightLandingTime" },
//   { accessorKey: "arrivingFrom" },
//   { accessorKey: "flightDepartureNumber" },
//   { accessorKey: "serviceDuration" },
//   { accessorKey: "serviceType" },
//   { accessorKey: "flightDepartureTime" },
//   { accessorKey: "flightDepartureTo" },
//   { accessorKey: "phoneNumber" },
//   { accessorKey: "pickup" },
//   { accessorKey: "dropoff" },
//   { accessorKey: "via" },
//   { accessorKey: "passengers" },
//   { accessorKey: "suitcases" },
//   { accessorKey: "carryOn" },
//   { accessorKey: "childSeats" },
//   { accessorKey: "boosterSeats" },
//   { accessorKey: "infantSeats" },
//   { accessorKey: "wheelchairs" },
//   { accessorKey: "waitingTime" },
//   { accessorKey: "email" },
//   { accessorKey: "meetGreet" },
//   { accessorKey: "source" },
//   { accessorKey: "customer" },
//   { accessorKey: "departments" },
//   { accessorKey: "leadName" },
//   { accessorKey: "leadEmail" },
//   { accessorKey: "leadPhoneNumber" },
//   { accessorKey: "createdAt" },
//   { accessorKey: "updatedAt" },
//   { accessorKey: "id" },
//   { accessorKey: "currency" },
//   {
//     accessorKey: "Tracking History",
//     cell: ({ getValue }) => (
//       <span className="whitespace-nowrap">{`${getValue()}`}</span>
//     ),
//   },
// ];

export const columns: ColumnDef<Booking>[] = [
  { accessorKey: "journeyDate", header: "Journey Date" },
  { accessorKey: "refId", header: "Reference ID" },
  { accessorKey: "driver", header: "Driver" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "driverIncome", header: "Driver Income" },
  { accessorKey: "total", header: "Total" },
  { accessorKey: "payments", header: "Payments" },
  { accessorKey: "vehicle", header: "Vehicle" },
  { accessorKey: "vehicleType", header: "Vehicle Type" },
  { accessorKey: "discount", header: "Discount" },
  { accessorKey: "passengerName", header: "Passenger Name" },
  { accessorKey: "flightNumber", header: "Flight Number" },
  { accessorKey: "flightLandingTime", header: "Flight Landing Time" },
  { accessorKey: "arrivingFrom", header: "Arriving From" },
  { accessorKey: "flightDepartureNumber", header: "Flight Departure Number" },
  { accessorKey: "serviceDuration", header: "Service Duration" },
  { accessorKey: "serviceType", header: "Service Type" },
  { accessorKey: "flightDepartureTime", header: "Flight Departure Time" },
  { accessorKey: "flightDepartureTo", header: "Flight Departure To" },
  { accessorKey: "phoneNumber", header: "Phone Number" },
  { accessorKey: "pickup", header: "Pickup" },
  { accessorKey: "dropoff", header: "Dropoff" },
  { accessorKey: "via", header: "Via" },
  { accessorKey: "passengers", header: "Passengers" },
  { accessorKey: "suitcases", header: "Suitcases" },
  { accessorKey: "carryOn", header: "Carry On" },
  { accessorKey: "childSeats", header: "Child Seats" },
  { accessorKey: "boosterSeats", header: "Booster Seats" },
  { accessorKey: "infantSeats", header: "Infant Seats" },
  { accessorKey: "wheelchairs", header: "Wheelchairs" },
  { accessorKey: "waitingTime", header: "Waiting Time" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "meetGreet", header: "Meet & Greet" },
  { accessorKey: "source", header: "Source" },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "departments", header: "Departments" },
  { accessorKey: "leadName", header: "Lead Name" },
  { accessorKey: "leadEmail", header: "Lead Email" },
  { accessorKey: "leadPhoneNumber", header: "Lead Phone Number" },
  { accessorKey: "createdAt", header: "Created At" },
  { accessorKey: "updatedAt", header: "Updated At" },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "currency", header: "Currency" },
  {
    accessorKey: "trackingHistory",
    header: "Tracking History",
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
