import { useEffect, useState, useRef } from "react";
import { getSession, signOut } from "next-auth/react";
import axios from "axios";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return { redirect: { destination: "/admin/login", permanent: false } };
    }
    return { props: { session } };
}

export default function Dashboard({ session }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        frontendRepo: "",
        backendRepo: "",
        projectDescription: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    // Refs for file inputs
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);

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

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            link: project.link,
            frontendRepo: project.frontendGithubLink || "",
            backendRepo: project.backendGithubLink || "",
            projectDescription: project.projectDescription || "",
        });
    };

    const resetForm = () => {
        setEditingProject(null);
        setFormData({
            title: "",
            link: "",
            frontendRepo: "",
            backendRepo: "",
            projectDescription: "",
        });
        setImageFile(null);
        setVideoFile(null);
        if (imageInputRef.current) imageInputRef.current.value = "";
        if (videoInputRef.current) videoInputRef.current.value = "";
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("link", formData.link);
        data.append("frontendRepo", formData.frontendRepo);
        data.append("backendRepo", formData.backendRepo);
        data.append("projectDescription", formData.projectDescription);
        if (imageFile) data.append("imageFile", imageFile);
        if (videoFile) data.append("videoFile", videoFile);

        try {
            if (editingProject) {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${editingProject._id}`, data);
                alert("Project updated successfully!");
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, data);
                alert("Project added successfully!");
            }
            fetchProjects();
            resetForm();
        } catch (err) {
            console.error("Error saving project:", err);
            alert("An error occurred. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this project?")) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`);
                fetchProjects();
            } catch (err) {
                console.error("Error deleting project:", err);
            }
        }
    };

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
                    <p>Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p>No projects found.</p>
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
