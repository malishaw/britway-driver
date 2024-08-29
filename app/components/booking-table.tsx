"use client";

import * as React from "react";
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

declare module "@tanstack/table-core" {
  interface FilterFns {
    dateBetweenFilterFn: FilterFn<unknown>;
  }
}

const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value) => {
  const dateTime = row.getValue(columnId) as string;
  const [start, end] = value;
  if (!dateTime) {
    return false;
  }

  const date = dateTime.split(" ")[0];

  if (start && !end) {
    return date >= start;
  }
  if (!start && end) {
    return date <= end;
  }
  if (start && end) {
    return date >= start && date <= end;
  }
  return true;
};

export function BookingTable({ data = [] }: { data: Booking[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'journeyDate', desc: true }
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
    { accessorKey: "driver", header: "Driver" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "driverIncome", header: "Driver Income" },
    { accessorKey: "total", header: "Total" },
    { accessorKey: "payments", header: "Payments" },
    // { accessorKey: "vehicle", header: "Vehicle" },
    // { accessorKey: "vehicleType", header: "Vehicle Type" },
    // { accessorKey: "discount", header: "Discount" },
    { accessorKey: "passengerName", header: "Passenger Name" },
    // { accessorKey: "flightNumber", header: "Flight Number" },
    // { accessorKey: "flightLandingTime", header: "Flight Landing Time" },
    // { accessorKey: "arrivingFrom", header: "Arriving From" },
    // { accessorKey: "flightDepartureNumber", header: "Flight Departure Number" },
    // { accessorKey: "serviceDuration", header: "Service Duration" },
    // { accessorKey: "serviceType", header: "Service Type" },
    // { accessorKey: "flightDepartureTime", header: "Flight Departure Time" },
    // { accessorKey: "flightDepartureTo", header: "Flight Departure To" },
    { accessorKey: "phoneNumber", header: "Phone Number" },
    { accessorKey: "pickup", header: "Pickup" },
    { accessorKey: "dropoff", header: "Dropoff" },
    { accessorKey: "via", header: "Via" },
    { accessorKey: "passengers", header: "Passengers" },
    // { accessorKey: "suitcases", header: "Suitcases" },
    // { accessorKey: "carryOn", header: "Carry On" },
    // { accessorKey: "childSeats", header: "Child Seats" },
    // { accessorKey: "boosterSeats", header: "Booster Seats" },
    // { accessorKey: "infantSeats", header: "Infant Seats" },
    // { accessorKey: "wheelchairs", header: "Wheelchairs" },
    { accessorKey: "waitingTime", header: "Waiting Time" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "meetGreet", header: "Meet & Greet" },
    { accessorKey: "source", header: "Source" },
    { accessorKey: "customer", header: "Customer" },
    // { accessorKey: "departments", header: "Departments" },
    { accessorKey: "leadName", header: "Lead Name" },
    { accessorKey: "leadEmail", header: "Lead Email" },
    { accessorKey: "leadPhoneNumber", header: "Lead Phone Number" },
    { accessorKey: "createdAt", header: "Created At" },
    { accessorKey: "updatedAt", header: "Updated At" },
    { accessorKey: "id", header: "ID" },
    // { accessorKey: "currency", header: "Currency" },
    {
      accessorKey: "trackingHistory",
      header: "Tracking History",
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">{`${getValue()}`}</span>
      ),
    },
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

  return (
    <div className="overflow-auto">
      <div className="flex items-center gap-5 pb-4 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
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
                "w-[280px] justify-start text-left font-normal",
                !dateTo && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, "PPP") : <span>Pick a End Date</span>}
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
