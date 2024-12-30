import { type Person } from "@/utils/types";
import { ActionIcon, Checkbox } from "rizzui";
import { createColumnHelper } from "@tanstack/react-table";
import { AvatarCard, DateCell, getStatusBadge } from "./utils";

import { PlusCircleIcon } from "@heroicons/react/16/solid";

const columnHelper = createColumnHelper<Person>();

export const defaultColumns = [
  columnHelper.accessor("id", {
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-2"
        inputClassName="bg-white"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-2"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),

  columnHelper.accessor("name", {
    size: 280,
    header: "Customer",
    cell: ({ row: { original } }) => (
      <AvatarCard
        src={original.avatar}
        name={original.name}
        description={original.email.toLowerCase()}
      />
    ),
  }),

  columnHelper.accessor("dueDate", {
    size: 180,
    header: "Due Date",
    cell: ({ row }) => <DateCell date={new Date(row.original.dueDate)} />,
  }),

  columnHelper.accessor("amount", {
    size: 120,
    header: "Amount",
    cell: ({ row }) => <span className="font-medium">$ {row.original.amount}</span>,
  }),

  columnHelper.accessor("status", {
    size: 120,
    header: "Status",
    cell: (info) => getStatusBadge(info.renderValue()!),
  }),

  columnHelper.accessor("avatar", {
    size: 120,
    header: "",
    cell: () => (
    <ActionIcon variant="flat" size="sm">
      <PlusCircleIcon />
    </ActionIcon>
    ),
  }),
];
