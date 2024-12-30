/* eslint-disable @typescript-eslint/no-unused-vars */
// types/table.ts

// Base interface for all table records
export interface BaseRecord {
  id: string;
}

// Define your specific types
export interface Person extends BaseRecord {
  name: string;
  email: string;
  avatar: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
}

export interface User extends BaseRecord {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface Role extends BaseRecord {
  name: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Generic table configuration type
export interface TableConfiguration<T extends BaseRecord> {
  enableSelection?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  enableGlobalFilter?: boolean;
  enableColumnFilters?: boolean;
  statusOptions?: { label: string; value: string }[];
  defaultPageSize?: number;
}

// Type for defining column configurations
export interface ColumnConfig<T> {
  header: string;
  accessorKey: keyof T;
  size?: number;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cell?: (info: any) => React.ReactNode;
}