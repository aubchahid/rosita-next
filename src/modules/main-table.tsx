'use client'

import GenericTable from "@/components/Table";
import { userColumns, userTableConfig } from "@/components/Table/table-config";
import { User } from "@/utils/types/user";

export default function DashboardTable({users}:{ users: User[]}) {
  
  return (
    <>    
      <GenericTable
        data={users}
        columns={userColumns}
        config={userTableConfig}
      />
    </>
  );
}