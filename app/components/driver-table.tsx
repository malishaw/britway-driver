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
  FilterFn,
  FilterFns
} from "@tanstack/react-table";
import { ArrowUpDown, PenIcon, TrashIcon, Eye } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { IDriverData } from "../typings/interfaces/driverData";
import ConfirmationDialog from "./shared/confirmation-dialog/ConfirmationDialog";
import { useCustomNavigation } from "../hooks";


export type Driver = {
  id: string;
  uniqueId: string;
  photo: string;
  name: string;
  email: string;
  phone: string;
};

export const columns: ColumnDef<Driver>[] = [
  {
    id: "photo",
    header: "Photo",
    accessorKey: "photo",
    cell: ({ row }) => {
      const photo = row.original.photo;
      const name = row.original.name;
  
      return (
        <Avatar>
          {photo ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-full text-gray-600">
              <AvatarImage src={photo} alt="photo" />
            </div>
          ) : (
            <AvatarFallback>
              <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-full text-gray-600 font-semibold">
                {name.substring(0, 2).toUpperCase()}
              </div>
            </AvatarFallback>
          )}
        </Avatar>
      );
    },
  },
  
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "uniqueId",
    header: "Unique ID",
  },
];

export function DriversTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const {navigate} = useCustomNavigation();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = React.useState<Driver | null>(
    null
  );

  const handleOnClickView = (row:Driver) => {
    navigate(`/driver-details/${row.id}`);
  }

  const handleOnClickEdit = (row:Driver) => {
    navigate(`/driver/${row.id}/update`);
  }

  const handleOnClickDelete = (row:Driver) => {
    setSelectedDriver(row);
  }

  const defaultFilterFns: Partial<Record<keyof FilterFns, FilterFn<any>>> = {
    dateBetweenFilterFn: () => true, 
  };

  const table = useReactTable({
    data,
    columns: [
      ...columns,
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          return (
            <div className="flex gap-2">
              <Eye onClick={() => handleOnClickView(row.original)} />
              <PenIcon onClick={() => handleOnClickEdit(row.original)} />
              <TrashIcon onClick={() => handleOnClickDelete(row.original)} />
            </div>
          );
        },
      },
    ],
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
    filterFns: defaultFilterFns as Record<keyof FilterFns, FilterFn<any>>,
  });

  React.useEffect(() => {
    fetchDrivers();
  }, []);


  const fetchDrivers = () => {
    try {
      axios.get("/api/driver").then((response) => {
        const preparedData = response.data
          .map((driver: IDriverData) => ({
            id: driver.id,
            uniqueId: driver.generalData.uniqueId,
            name: driver.generalData.displayName,
            email: driver.generalData.email,
            phone: driver.personalData?.mobileNumber,
            photo: driver.personalData?.photo,
          }))
          .reverse();
        setData(preparedData);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const handleDelete = () => {
    try {
      axios.delete(`/api/driver/${selectedDriver?.id}`).then((response) => {
        fetchDrivers();
        handleOnCancelDelete();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnCancelDelete = () => {
    setSelectedDriver(null);
  }

  return (
    <div className="w-full">
      <ConfirmationDialog
        title={"Are you sure?"}
        description={"Do you want to delete this driver?"}
        onConfirm={handleDelete}
        onDecline={handleOnCancelDelete}
        open={selectedDriver !== null}
      />
      <div className="flex items-center pb-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
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
