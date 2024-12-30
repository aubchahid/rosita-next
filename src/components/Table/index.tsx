// components/table/GenericTable.tsx
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Empty, SearchNotFoundIcon, Table } from "rizzui";
import { BaseRecord, TableConfiguration } from "@/utils/types";
import TablePagination from "./Pagination";
import TableToolbar from "./Toolbar";
import { flexRender } from "@tanstack/react-table";

interface GenericTableProps<T extends BaseRecord> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  config: TableConfiguration<T>;
}

export default function GenericTable<T extends BaseRecord>({
  data,
  columns,
  config,
}: GenericTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: config.enableSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: config.defaultPageSize || 10,
      },
    },
  });

  return (
    <div className="w-full">
      {(config.enableGlobalFilter || config.enableColumnFilters) && (
        <TableToolbar
          table={table}
          statusOptions={config.statusOptions}
        />
      )}

      <div className="w-full overflow-x-auto overflow-y-hidden custom-scrollbar">
        <Table
          className="!shadow-none !border-0"
          style={{
            width: table.getTotalSize(),
          }}
        >
          <Table.Header className="!bg-gray-100 !border-y-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Head
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: header.getSize(),
                    }}
                    className="!text-start"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Head>
                ))}
              </Table.Row>
            ))}
          </Table.Header>

          <Table.Body>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      className="!text-start"
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={table.getAllColumns().length}
                  className="text-center h-40"
                >
                  <Empty image={<SearchNotFoundIcon />} text="No Result Found" />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {config.enablePagination && <TablePagination table={table} />}
    </div>
  );
}