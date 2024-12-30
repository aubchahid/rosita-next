import { ActionIcon, Select, SelectOption, Text } from "rizzui";
import { type Table as ReactTableType } from "@tanstack/react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

function PaginationNumbers<TData>({
  table,
}: {
  table: ReactTableType<TData>;
}) {
  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  // If total pages is less than 7, show all pages
  if (pageCount <= 7) {
    return [...Array(pageCount)].map((_, idx) => (
      <ActionIcon
        key={idx}
        rounded="lg"
        variant={currentPage === idx ? "solid" : "outline"}
        onClick={() => table.setPageIndex(idx)}
        className={`text-sm ${
          currentPage === idx
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "text-gray-900 shadow-sm hover:bg-gray-50"
        }`}
      >
        {idx + 1}
      </ActionIcon>
    ));
  }

  // Show first page, current page ±2, last page, and ellipsis
  const pages = [];
  const shouldShowLeftDots = currentPage > 3;
  const shouldShowRightDots = currentPage < pageCount - 4;

  if (shouldShowLeftDots) {
    pages.push(
      <ActionIcon
        key={0}
        rounded="lg"
        variant="outline"
        onClick={() => table.setPageIndex(0)}
        className="text-sm text-gray-900 shadow-sm hover:bg-gray-50"
      >
        1
      </ActionIcon>,
      <div key="leftDots" className="px-2 text-gray-500">
        ...
      </div>
    );
  }

  // Calculate range around current page
  const startPage = Math.max(
    shouldShowLeftDots ? currentPage - 1 : 0,
    0
  );
  const endPage = Math.min(
    shouldShowRightDots ? currentPage + 1 : pageCount - 1,
    pageCount - 1
  );

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <ActionIcon
        key={i}
        rounded="lg"
        variant={currentPage === i ? "solid" : "outline"}
        onClick={() => table.setPageIndex(i)}
        className={`text-sm ${
          currentPage === i
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "text-gray-900 shadow-sm hover:bg-gray-50"
        }`}
      >
        {i + 1}
      </ActionIcon>
    );
  }

  if (shouldShowRightDots) {
    pages.push(
      <div key="rightDots" className="px-2 text-gray-500">
        ...
      </div>,
      <ActionIcon
        key={pageCount - 1}
        rounded="lg"
        variant="outline"
        onClick={() => table.setPageIndex(pageCount - 1)}
        className="text-sm text-gray-900 shadow-sm hover:bg-gray-50"
      >
        {pageCount}
      </ActionIcon>
    );
  }

  return pages;
}

export default function TablePagination<TData extends Record<string, any>>({
  table,
}: {
  table: ReactTableType<TData>;
}) {
  const router = useRouter();
  const currentUrl = new URL(window.location.href);

  return (
    <div className="flex w-full items-center justify-between @container mt-5">
      <div className="hidden @2xl:block">
        <Text>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </Text>
      </div>
      <div className="flex w-full items-center justify-between gap-6 @2xl:w-auto @2xl:gap-12">
        <div className="flex items-center gap-4">
          <Text className="hidden font-medium text-gray-900 @md:block">
            Rows per page
          </Text>
          <Select
            options={options}
            className="w-[70px]"
            value={table.getState().pagination.pageSize}
            onChange={(v: SelectOption) => {
              table.setPageSize(Number(v.value));
              router.push(`${currentUrl.pathname}?limit=${v.value}`);
            }}
            selectClassName="font-semibold text-sm ring-0 shadow-sm h-9"
            optionClassName="justify-center font-medium"
          />
        </div>
        <Text className="hidden font-medium text-gray-900 @3xl:block">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount().toLocaleString()}
        </Text>
        <div className="flex items-center gap-2">
          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to first page"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <ChevronDoubleLeftIcon className="size-5" />
          </ActionIcon>
          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <ChevronLeftIcon className="size-5" />
          </ActionIcon>
          
          {/* Numbered pagination */}
          <div className="flex items-center gap-2">
            <PaginationNumbers table={table} />
          </div>

          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <ChevronRightIcon className="size-5" />
          </ActionIcon>
          <ActionIcon
            rounded="lg"
            variant="outline"
            aria-label="Go to last page"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <ChevronDoubleRightIcon className="size-5" />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
}