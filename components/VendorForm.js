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
            router.push('/vendors');
        } else {
            alert('Error saving vendor');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Vendor Name*: <input required name="vendorName" value={form.vendorName} onChange={handleChange} /></label><br />
            <label>Bank Account No.*: <input required name="bankAccountNo" value={form.bankAccountNo} onChange={handleChange} /></label><br />
            <label>Bank Name*: <input required name="bankName" value={form.bankName} onChange={handleChange} /></label><br />
            <label>Address Line 1: <input name="addressLine1" value={form.addressLine1} onChange={handleChange} /></label><br />
            <label>Address Line 2*: <input required name="addressLine2" value={form.addressLine2} onChange={handleChange} /></label><br />
            <label>City: <input name="city" value={form.city} onChange={handleChange} /></label><br />
            <label>Country: <input name="country" value={form.country} onChange={handleChange} /></label><br />
            <label>Zip Code: <input name="zipCode" value={form.zipCode} onChange={handleChange} /></label><br />
            <button type="submit">{isEdit ? "Update" : "Create"}</button>
        </form>
    );
}
