"use client";

import * as React from "react";
import axios from "axios";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Booking } from "../typings";
import { GetServerSideProps } from "next";
import DriverCell from "./DriverCell";

import Spinner from "@/components/ui/spinner"; // Import a Spinner component

declare module "@tanstack/table-core" {
  interface FilterFns {
    dateBetweenFilterFn: FilterFn<unknown>;
  }
}

const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value) => {
  const dateTime = row.getValue(columnId) as string;
  if (!dateTime) return false; // Skip if no date

  // Extract the date part
  const [day, month, year] = dateTime.split("/").map(Number);
  const rowDate = new Date(year, month - 1, day); // Convert to Date object

  const [start, end] = value.map((date: string) => {
    if (!date) return null;
    const [sDay, sMonth, sYear] = date.split("/").map(Number);
    return new Date(sYear, sMonth - 1, sDay);
  });

  if (start && end) return rowDate >= start && rowDate <= end;
  if (start) return rowDate >= start;
  if (end) return rowDate <= end;
  return true;
};

export function BookingTable({ data = [] }: { data: Booking[] }) {
  const [loading, setLoading] = React.useState(true);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "journeyDate", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [dateFrom, setDateFrom] = React.useState<Date>();
  const [dateTo, setDateTo] = React.useState<Date>();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "journeyDate",
      header: "Journey Date",
      filterFn: "dateBetweenFilterFn",
    },
    { accessorKey: "refId", header: "Reference ID" },
    {
      accessorKey: "driver",
      header: "Driver",
      cell: ({ getValue }) => {
        const driver = getValue() as string;
        return <DriverCell driver={driver} />;
      },
    },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "driverIncome", header: "Driver Income" },
    { accessorKey: "total", header: "Total" },
    { accessorKey: "payments", header: "Payments" },
    { accessorKey: "fleetOperator", header: "Fleet operator" },
    { accessorKey: "passengerName", header: "Passenger Name" },
    { accessorKey: "phoneNumber", header: "Phone Number" },
    { accessorKey: "pickup", header: "Pickup" },
    { accessorKey: "dropoff", header: "Dropoff" },
    { accessorKey: "via", header: "Via" },
    { accessorKey: "passengers", header: "Passengers" },
    { accessorKey: "waitingTime", header: "Waiting Time" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "meetGreet", header: "Meet & Greet" },
    { accessorKey: "source", header: "Source" },
    { accessorKey: "customer", header: "Customer" },
    { accessorKey: "leadName", header: "Lead Name" },
    { accessorKey: "leadEmail", header: "Lead Email" },
    { accessorKey: "leadPhoneNumber", header: "Lead Phone Number" },
    { accessorKey: "createdAt", header: "Created At" },
    { accessorKey: "updatedAt", header: "Updated At" },
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "trackingHistory",
      header: "Tracking History",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{`${getValue()}`}</span>
      ),
    },
    { accessorKey: "action", header: "Action" },
  ];

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
    filterFns: {
      dateBetweenFilterFn: dateBetweenFilterFn,
    },
  });

  React.useEffect(() => {
    table
      .getColumn("journeyDate")
      ?.setFilterValue([
        dateFrom ? format(dateFrom, "dd/MM/yyyy") : "",
        dateTo ? format(dateTo, "dd/MM/yyyy") : "",
      ]);
  }, [dateFrom, dateTo]);

  React.useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full">
      {/* Filter controls - full width without horizontal scroll */}
      <div className="flex flex-wrap items-center gap-4 pb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateFrom && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom ? (
                format(dateFrom, "PPP")
              ) : (
                <span>Pick a Start Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={setDateFrom}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateTo && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, "PPP") : <span>Pick an End Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={setDateTo}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => {
            setDateFrom(undefined);
            setDateTo(undefined);
          }}
        >
          Clear Filter
        </Button>

        <p className="ml-auto">
          {table.getFilteredRowModel().rows.length} Bookings
        </p>
      </div>

      {/* Table container with contained horizontal and vertical scrolling */}
      <div 
        ref={tableContainerRef}
        className="relative border rounded-md w-full"
      >
        <div className="overflow-auto max-h-[70vh]" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e0 #f7fafc'
        }}>
          <Table>
            <TableHeader className="sticky top-0 z-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-gray-200">
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id}
                      className="px-4 py-3 font-medium text-sm sticky top-0 z-20 bg-gray-200 shadow-sm"
                      style={{
                        whiteSpace: 'nowrap',
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'rgb(229, 231, 235)', /* Matching bg-gray-200 */
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id}
                        className="px-4 py-3"
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '300px'
                        }}
                      >
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
      </div>

      {/* Pagination controls - full width without horizontal scroll */}
      <div className="w-full flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center space-x-6">
          <span className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
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
    </div>
  );
}