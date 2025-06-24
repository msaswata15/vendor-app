// components/VendorForm.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function VendorForm({ vendor = {} }) {
    const [form, setForm] = useState({
        vendorName: vendor.vendorName || '',
        bankAccountNo: vendor.bankAccountNo || '',
        bankName: vendor.bankName || '',
        addressLine1: vendor.addressLine1 || '',
        addressLine2: vendor.addressLine2 || '',
        city: vendor.city || '',
        country: vendor.country || '',
        zipCode: vendor.zipCode || '',
    });

    const router = useRouter();
    const isEdit = !!vendor._id;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEdit ? `/api/vendors/${vendor._id}` : '/api/vendors';
        const method = isEdit ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            router.push('/');
        } else {
            alert('Error saving vendor');
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8 space-y-6"
            >
                <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
                    {isEdit ? 'Edit Vendor' : 'Create Vendor'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Vendor Name<span className="text-red-500">*</span></label>
                        <input
                            required
                            name="vendorName"
                            value={form.vendorName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-slate-50"
                            placeholder="Vendor Name"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Bank Account No.<span className="text-red-500">*</span></label>
                        <input
                            required
                            name="bankAccountNo"
                            value={form.bankAccountNo}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-slate-50 font-mono"
                            placeholder="Account Number"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Bank Name<span className="text-red-500">*</span></label>
                        <input
                            required
                            name="bankName"
                            value={form.bankName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-slate-50"
                            placeholder="Bank Name"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Address Line 1</label>
                        <input
                            name="addressLine1"
                            value={form.addressLine1}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-slate-50"
                            placeholder="Street, Building, etc."
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Address Line 2<span className="text-red-500">*</span></label>
                        <input
                            required
                            name="addressLine2"
                            value={form.addressLine2}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-slate-50"
                            placeholder="Apt, Suite, etc."
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">City</label>
                        <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-slate-50"
                            placeholder="City"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Country</label>
                        <input
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-slate-50"
                            placeholder="Country"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-medium mb-1">Zip Code</label>
                        <input
                            name="zipCode"
                            value={form.zipCode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-slate-50"
                            placeholder="Zip Code"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.push('/vendors')}
                        className="px-6 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        {isEdit ? (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Update
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                Create
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
