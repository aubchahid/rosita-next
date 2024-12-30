// configs/tableConfigs.ts
import { createColumnHelper } from "@tanstack/react-table";
import { type Person, type Role, type TableConfiguration } from "@/utils/types";
import { AvatarCard, DateCell, getStatusBadge } from "./utils";
import { Checkbox } from "rizzui";
import { User } from "@/utils/types/user";

// Person Table Configuration
const personColumnHelper = createColumnHelper<Person>();

export const personTableConfig: TableConfiguration<Person> = {
    enableSelection: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    statusOptions: [
        { label: "Paid", value: "paid" },
        { label: "Pending", value: "pending" },
        { label: "Overdue", value: "overdue" },
    ],
    defaultPageSize: 10,
};

export const personColumns = [
    personColumnHelper.accessor("id", {
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
    personColumnHelper.accessor("name", {
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
    personColumnHelper.accessor("status", {
        id: "status",
        size: 120,
        header: "Status",
        cell: (info) => getStatusBadge(info.getValue())
    })
];

// User Table Configuration
const userColumnHelper = createColumnHelper<User>();

export const userTableConfig: TableConfiguration<User> = {
    enableSelection: true,
    enablePagination: true,
    enableColumnVisibility: true,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    statusOptions: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ],
    defaultPageSize: 10,
};

export const userColumns = [
    userColumnHelper.accessor("firstName", {
        size: 200,
        header: "full name",
        cell: ({ row: { original } }) => (
            <AvatarCard
                src={original.email}
                name={original.firstName}
                description={original.email.toLowerCase()}
            />
        ),
    }),    
    userColumnHelper.accessor("age", {
        id: "age",
        size: 80,
        header: "Age",
        cell: ({ row: { original } }) => (
            <span>{original.age}</span>
        ),
    }),
    userColumnHelper.accessor("gender", {
        id: "gender",
        size: 80,
        header: "Gender",
        cell: ({ row: { original } }) => (
            <span>{original.gender}</span>
        ),
    }),
    userColumnHelper.accessor("status", {
        id: "status",
        size: 120,
        header: "Status",
        cell: (info) => getStatusBadge(info.getValue() ?? 'active')
    })
];

// Role Table Configuration
const roleColumnHelper = createColumnHelper<Role>();

export const roleTableConfig: TableConfiguration<Role> = {
    enableSelection: false,
    enablePagination: true,
    enableColumnVisibility: true,
    enableGlobalFilter: true,
    enableColumnFilters: false,
    defaultPageSize: 10,
};

export const roleColumns = [
    roleColumnHelper.accessor("name", {
        size: 200,
        header: "Role Name",
    }),
    roleColumnHelper.accessor("permissions", {
        size: 300,
        header: "Permissions",
        cell: ({ getValue }) => getValue().join(", "),
    }),
    roleColumnHelper.accessor("createdAt", {
        size: 200,
        header: "Created At",
        cell: ({ row }) => <DateCell date={row.original.createdAt} />,
    }),
    roleColumnHelper.accessor("updatedAt", {
        size: 200,
        header: "Updated At",
        cell: ({ row }) => <DateCell date={row.original.updatedAt} />,
    }),
];