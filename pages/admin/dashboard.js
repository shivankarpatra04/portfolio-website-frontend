import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    console.log('Session on server-side:', session);

    if (!session) {
        return { redirect: { destination: "/admin/login", permanent: false } };
    }
    return { props: { session } };
}

export default function Dashboard({ session }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
            setProjects(res.data);
        } catch (err) {
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div>Projects data loaded successfully</div>
            )}
        </div>
    );
}
