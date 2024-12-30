'use client'

import { ActionIcon, Button, Drawer, Text } from "rizzui";
import DashboardTable from "./main-table";
import { User } from "@/utils/types/user";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import CreateUserForm from "./new-user-form";
import { toast } from "sonner";


const Dashboard = ({ users }: { users: User[] }) => {
    const [drawerState, setDrawerState] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => toast.success('My first toast')}>
                Give me a toast
            </Button>
            <Button onClick={() => setDrawerState(true)}>Custom Size Drawer</Button>
            <DashboardTable users={users} />
            <Drawer
                isOpen={drawerState}
                onClose={() => setDrawerState(false)}
                customSize={600}
                placement="left"
                enableResizer={true}
            >
                <div className="flex min-h-full flex-col py-4 px-5">
                    <header className="flex items-center justify-between">
                        <Text>New User</Text>
                        <ActionIcon
                            size="sm"
                            variant="outline"
                            onClick={() => setDrawerState(false)}
                        >
                            <XMarkIcon
                                className="h-auto w-5"
                                strokeWidth={1.5}
                            />
                        </ActionIcon>
                    </header>
                    <CreateUserForm />
                </div>
            </Drawer>
        </>

    )
}

export default Dashboard;