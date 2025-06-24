// pages/api/vendors/[id].js
import dbConnect from '../../../lib/mongodb';
import Vendor from '../../../models/Vendor';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
    await dbConnect();

    const { method, query: { id } } = req;

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    switch (method) {
        case 'GET':
            const vendor = await Vendor.findById(id);
            if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
            res.status(200).json(vendor);
            break;

        case 'PUT':
            const updated = await Vendor.findByIdAndUpdate(id, req.body, { new: true });
            if (!updated) return res.status(404).json({ error: 'Vendor not found' });
            res.status(200).json(updated);
            break;

        case 'DELETE':
            const deleted = await Vendor.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ error: 'Vendor not found' });
            res.status(204).end();
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
