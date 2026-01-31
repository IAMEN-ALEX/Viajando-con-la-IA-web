import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    // Server-Side Guard: Instant Redirect if no token
    if (!token) {
        redirect("/");
    }

    return (
        <>
            {children}
        </>
    );
}
