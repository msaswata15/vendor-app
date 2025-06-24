import useSWR from "swr";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const fetcher = url => fetch(url, { credentials: 'include' }).then(res => res.json());

export default function VendorList() {
    const { data: session, status } = useSession();
    const [page, setPage] = useState(1);
    const { data, mutate, error } = useSWR(`/api/vendors?page=${page}&limit=5`, fetcher);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse"></div>
                    <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                    <span className="text-slate-600 font-medium ml-4">Loading...</span>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        if (typeof window !== "undefined") window.location.href = "/";
        return null;
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading vendors...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-red-600 font-medium text-center">Error loading vendors</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                                Vendors Dashboard
                            </h1>
                            <p className="text-slate-600 mt-1">Manage your vendor relationships</p>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <span className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Logout</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Actions Bar */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/vendors/create"
                            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <span className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Create Vendor</span>
                            </span>
                        </Link>
                        
                        <div className="flex items-center space-x-3">
                            <button
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                                    page <= 1 
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                        : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg border border-slate-200'
                                }`}
                                onClick={() => setPage(p => p - 1)}
                                disabled={page <= 1}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            
                            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl font-medium border border-blue-200">
                                Page {page}
                            </div>
                            
                            <button
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                                    page >= (data?.totalPages || 1) 
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                        : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg border border-slate-200'
                                }`}
                                onClick={() => setPage(p => p + 1)}
                                disabled={page >= (data?.totalPages || 1)}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Vendor Cards */}
                <div className="space-y-4">
                    {data?.vendors?.map((v, index) => (
                        <div 
                            key={v.bankAccountNo} 
                            className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:bg-white/90 hover:scale-[1.02]"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Vendor Name</p>
                                        <p className="text-lg font-semibold text-slate-800">{v.vendorName}</p>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Account Number</p>
                                        <p className="text-lg font-mono text-slate-700 bg-slate-100 rounded-lg px-3 py-1 inline-block">
                                            {v.bankAccountNo}
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Bank Name</p>
                                        <p className="text-lg font-semibold text-slate-800">{v.bankName}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3 ml-6">
                                    <Link
                                        href={`/vendors/${v.bankAccountNo}`}
                                        className="group/edit relative px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                                    >
                                        <span className="flex items-center space-x-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span>Edit</span>
                                        </span>
                                    </Link>
                                    
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this vendor?')) {
                                                fetch(`/api/vendors/${v.bankAccountNo}`, { method: 'DELETE' }).then(() => mutate());
                                            }
                                        }}
                                        className="group/delete relative px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                                    >
                                        <span className="flex items-center space-x-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span>Delete</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {(!data?.vendors || data.vendors.length === 0) && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">No vendors found</h3>
                        <p className="text-slate-600 mb-6">Get started by creating your first vendor</p>
                        <Link
                            href="/vendors/create"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Create First Vendor</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}