import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    
    if (!session) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        };
    }
    
    return { 
        props: { 
            session,
            initialAuth: true 
        } 
    };
}

export default function Dashboard({ session, initialAuth }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const session = await getSession();
            if (!session) {
                router.replace('/admin/login');
            } else {
                setIsAuthenticated(true);
                fetchProjects();
            }
        };

        checkAuth();
    }, [router]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
            setProjects(response.data);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Failed to load projects. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            router.replace('/admin/login');
        } catch (error) {
            console.error('Signout error:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

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

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="bg-white p-6 rounded shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <form onSubmit={handleFormSubmit} className="mb-8">
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="block mb-4 p-2 border rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Project Link"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="block mb-4 p-2 border rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Frontend Repository"
                        value={formData.frontendRepo}
                        onChange={(e) => setFormData({ ...formData, frontendRepo: e.target.value })}
                        className="block mb-4 p-2 border rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Backend Repository"
                        value={formData.backendRepo}
                        onChange={(e) => setFormData({ ...formData, backendRepo: e.target.value })}
                        className="block mb-4 p-2 border rounded w-full"
                    />
                    <textarea
                        placeholder="Project Description"
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        className="block mb-4 p-2 border rounded w-full"
                        rows="4"
                    ></textarea>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        ref={imageInputRef}
                        className="block mb-4"
                    />
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files[0])}
                        ref={videoInputRef}
                        className="block mb-4"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        {editingProject ? "Update Project" : "Add Project"}
                    </button>
                    {editingProject && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>
            </div>

            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
                {loading ? (
                    <p className="text-center text-xl text-gray-600 animate-pulse">Loading...</p>
                ) : projects.length === 0 ? (
                    <p className="text-center text-xl text-gray-600">No projects found.</p>
                ) : (
                    <ul>
                        {projects.map((project) => (
                            <li
                                key={project._id}
                                className="flex justify-between items-center border-b py-2"
                            >
                                <div>
                                    <strong>{project.title}</strong>
                                    {project.frontendGithubLink && (
                                        <>
                                            {" - "}
                                            <a
                                                href={project.frontendGithubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500"
                                            >
                                                Frontend Repo
                                            </a>
                                        </>
                                    )}
                                    {project.backendGithubLink && (
                                        <>
                                            {" - "}
                                            <a
                                                href={project.backendGithubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500"
                                            >
                                                Backend Repo
                                            </a>
                                        </>
                                    )}
                                    <p className="text-gray-600">{project.projectDescription}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
