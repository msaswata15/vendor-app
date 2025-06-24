// pages/vendors/[id].js
import VendorForm from "../../components/VendorForm";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcher = url => fetch(url).then(res => res.json());

export default function EditVendor() {
    const { data: session } = useSession();
    const router = useRouter();
    const { id } = router.query;

    const { data: vendor } = useSWR(id ? `/api/vendors/${id}` : null, fetcher);

    if (!session) return <p>Not authenticated</p>;
    if (!vendor) return <p>Loading...</p>;

    return (
        <>
            <h1>Edit Vendor</h1>
            <VendorForm vendor={vendor} />
        </>
    );
}
