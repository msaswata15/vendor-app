// pages/vendors/create.js
import VendorForm from "../../components/VendorForm";
import { useSession } from "next-auth/react";

export default function CreateVendor() {
    const { data: session, status } = useSession();
    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") {
        if (typeof window !== "undefined") window.location.href = "/api/auth/signin";
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <VendorForm />
        </div>
    );
}
