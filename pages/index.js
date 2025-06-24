import useSWR from "swr";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { 
    Building2, 
    Plus, 
    Edit3, 
    Trash2, 
    ChevronLeft, 
    ChevronRight, 
    LogOut, 
    User,
    Loader2
} from "lucide-react";

const fetcher = url => fetch(url).then(res => res.json());

export default function VendorList() {
    const { data: session, status } = useSession();
    const [page, setPage] = useState(1);
    const { data, mutate } = useSWR(`/api/vendors?page=${page}&limit=5`, fetcher);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full mx-4">
                    <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Vendor Management</h2>
                    <p className="text-gray-600 mb-8">Please sign in to access your vendor dashboard</p>
                    <button 
                        onClick={() => signIn()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
                    >
                        <User className="w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    const handleDelete = async (id) => {
        if (confirm('Delete vendor?')) {
            await fetch(`/api/vendors/${id}`, { method: 'DELETE' });
            mutate();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                            <h1 className="text-2xl font-bold text-gray-900">Vendors Dashboard</h1>
                        </div>
                        
                        <button 
                            onClick={() => signOut()}
                            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Action Bar */}
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Manage Vendors</h2>
                        <p className="text-gray-600">Create, edit, and manage your vendor information</p>
                    </div>
                    
                    <Link href="/vendors/create" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center transition-colors shadow-sm">
                        <Plus className="w-5 h-5 mr-2" />
                        Create Vendor
                    </Link>
                </div>

                {/* Stats Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                            <p className="text-2xl font-bold text-gray-900">{data?.vendors?.length || 0}</p>
                        </div>
                    </div>
                </div>

                {/* Vendors Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vendor Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bank Account No
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bank Name
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data?.vendors?.map(v => (
                                    <tr key={v._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                    <span className="text-white font-semibold text-sm">
                                                        {v.vendorName?.charAt(0)?.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {v.vendorName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 font-mono">
                                                {v.bankAccountNo}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 font-medium">
                                                {v.bankName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link href={`/vendors/${v._id}`} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit3 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(v._id)}
                                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {(!data?.vendors || data.vendors.length === 0) && (
                        <div className="text-center py-12">
                            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
                            <p className="text-gray-600 mb-6">Get started by creating your first vendor</p>
                            <Link href="/vendors/create" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center transition-colors">
                                <Plus className="w-5 h-5 mr-2" />
                                Create Vendor
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {data?.vendors && data.vendors.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Page <span className="font-medium">{page}</span> of{' '}
                                <span className="font-medium">{data?.totalPages || 1}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <button
                                    disabled={page <= 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    <span className="ml-1 hidden sm:inline">Previous</span>
                                </button>
                                
                                <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg">
                                    Page {page}
                                </span>
                                
                                <button
                                    disabled={page >= (data?.totalPages || 1)}
                                    onClick={() => setPage(p => p + 1)}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                                >
                                    <span className="mr-1 hidden sm:inline">Next</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}