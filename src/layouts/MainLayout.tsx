"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
    
    return (
        <div className="p-5 m-5">
            {children}
        </div>
    );
}