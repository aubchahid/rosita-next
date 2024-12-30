import React from "react";
import Dashboard from "@/modules";
import { UserResponse } from "@/utils/types/user";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dashboard = async ({searchParams}: {searchParams: any}) => {
    
    const sp = await searchParams;
    const baseUrl = 'https://dummyjson.com/users';
    const url = new URL(sp.search ? `${baseUrl}/search` : baseUrl);
    
    url.searchParams.set('limit', sp.limit ?? 10);
    if (sp.search) {
      url.searchParams.set('q', sp.search);
    }
    
    const response = await fetch(url);
    const data: UserResponse = await response.json();
    
    return (
        <div>
            <h1>Dashboard</h1>
            {data.users &&
            <Dashboard users={data.users ?? []} />}
        </div>
    )
};

export default dashboard;