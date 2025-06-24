// pages/api/vendors/index.js
import dbConnect from '../../../lib/mongodb';
import Vendor from '../../../models/Vendor';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
    await dbConnect();

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { method } = req;

    switch (method) {
        case 'GET':
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;

            const vendors = await Vendor.find().skip(skip).limit(limit);
            const count = await Vendor.countDocuments();
            res.status(200).json({ vendors, totalPages: Math.ceil(count / limit) });
            break;
        case 'POST':
            try {
                const vendor = await Vendor.create(req.body);
                res.status(201).json(vendor);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
