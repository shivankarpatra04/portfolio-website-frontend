import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
        // Handle project creation
        res.status(201).json({ message: 'Project created successfully!' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}