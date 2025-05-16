import { Sidebar } from "./componentes/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="relative grid grid-cols-1 md:grid-cols-2 min-h-svh bg-(--color-base-300) text-white overflow-hidden">
            <Sidebar />
            {children}
        </section>
    );
}