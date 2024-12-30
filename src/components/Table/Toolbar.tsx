// components/table/Toolbar.tsx
import { ActionIcon, Button, Checkbox, Input, Popover, Select, Title } from "rizzui";
import { type Table as ReactTableType } from "@tanstack/react-table";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { BaseRecord } from "@/utils/types";
import { renderOptionDisplayValue } from "./utils";
import { useRouter } from "next/navigation";

interface TableToolbarProps<T extends BaseRecord> {
  table: ReactTableType<T>;
  statusOptions?: { label: string; value: string }[];
}

export default function TableToolbar<TData extends BaseRecord>({
  table,
  statusOptions,
}: TableToolbarProps<TData>) {
  const isFiltered = table.getState().globalFilter || table.getState().columnFilters.length > 0;

const router = useRouter();
const currentUrl = new URL(window.location.href);

  return (
    <div className="flex items-center justify-between w-full mb-5 mt-5">
      <Input
        type="search"
        placeholder="Search by anything..."
        value={table.getState().globalFilter ?? ""}
        onClear={() => table.setGlobalFilter("")}
        onChange={(e) => {
          const params = new URLSearchParams(currentUrl.search);
          params.set('search', e.target.value);
          router.push(`${currentUrl.pathname}?${params.toString()}`);
          table.setGlobalFilter(e.target.value);
        }}
        inputClassName="h-9"
        clearable={true}
        prefix={<MagnifyingGlassIcon className="size-4" />}
      />
      <div className="flex items-center gap-4">
        {statusOptions && table.getColumn("status") && (
          <Select
            options={statusOptions}
            value={table.getColumn("status")?.getFilterValue() ?? []}
            onChange={(e) => table.getColumn("status")?.setFilterValue(e)}
            getOptionValue={(option: { value: any }) => option.value}
            getOptionDisplayValue={(option: { value: string }) =>
              renderOptionDisplayValue(option.value)
            }
            placeholder="Status..."
            displayValue={(selected: string) => renderOptionDisplayValue(selected)}
            className={"w-32"}
            dropdownClassName="!z-20 h-auto"
            selectClassName="h-[38px] ring-0"
          />
        )}

        {isFiltered && (
          <Button
            onClick={() => {
              table.resetGlobalFilter();
              table.resetColumnFilters();
            }}
            variant="flat"
            className="gap-2"
          >
            <TrashIcon className="size-4" /> Clear
          </Button>
        )}

        {table && (
          <Popover
            shadow="sm"
            placement="bottom-end"
          >
            <Popover.Trigger>
              <ActionIcon title={"Toggle Columns"}>
                <AdjustmentsHorizontalIcon className="size-[18px]" />
              </ActionIcon>
            </Popover.Trigger>
            <Popover.Content className="z-0">
              <>
                <Title
                  as="h6"
                  className="!mb-4 text-sm font-semibold"
                >
                  Toggle Columns
                </Title>
                <div className="grid grid-cols-1 gap-4">
                  {table.getAllLeafColumns().map((column) => {
                    return (
                      typeof column.columnDef.header === "string" &&
                      column.columnDef.header.length > 0 && (
                        <Checkbox
                          size="sm"
                          key={column.id}
                          label={<>{column.columnDef.header}</>}
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                          iconClassName="size-4 translate-x-0.5"
                        />
                      )
                    );
                  })}
                </div>
              </>
            </Popover.Content>
          </Popover>
        )}
      </div>
    </div>
  );
}