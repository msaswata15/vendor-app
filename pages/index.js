// pages/vendors/index.js
import useSWR from "swr";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const fetcher = url => fetch(url).then(res => res.json());

export default function VendorList() {
    const { data: session, status } = useSession();
    const [page, setPage] = useState(1);
    const { data, mutate } = useSWR(`/api/vendors?page=${page}&limit=5`, fetcher);

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <button onClick={() => signIn()}>Sign in with Google</button>;

    const handleDelete = async (id) => {
        if (confirm('Delete vendor?')) {
            await fetch(`/api/vendors/${id}`, { method: 'DELETE' });
            mutate();
        }
    };

    return (
        <>
            <h1>Vendors Dashboard</h1>
            <button onClick={() => signOut()}>Logout</button>
            <br />
            <Link href="/vendors/create">Create Vendor</Link>
            <table border="1">
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Bank Account No</th>
                        <th>Bank Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.vendors?.map(v => (
                        <tr key={v._id}>
                            <td>{v.vendorName}</td>
                            <td>{v.bankAccountNo}</td>
                            <td>{v.bankName}</td>
                            <td>
                                <Link href={`/vendors/${v._id}`}>Edit</Link> |
                                <button onClick={() => handleDelete(v._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</button>
            <span> Page {page} </span>
            <button disabled={page >= (data?.totalPages || 1)} onClick={() => setPage(p => p + 1)}>Next</button>
        </>
    );
}
