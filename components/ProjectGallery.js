import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";

const ProjectGallery = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to handle errors

    const fetchProjects = async () => {
        try {
            setLoading(true); // Ensure loading starts
            setError(null); // Reset error state
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
            setProjects(response.data);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Failed to fetch projects. Please try again later."); // Set error message
        } finally {
            setLoading(false); // Ensure loading ends
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="py-12 bg-gradient-to-b from-blue-50 to-blue-100">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
                My Work
            </h2>
            {loading ? (
                <p className="text-center text-xl text-gray-600 animate-pulse">Loading...</p>
            ) : error ? (
                <p className="text-center text-xl text-red-500">{error}</p>
            ) : projects.length === 0 ? (
                <p className="text-center text-xl text-gray-600">No projects available at the moment.</p>
            ) : (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-12"
                    style={{ animation: "fadeIn 1.5s ease-in-out" }}
                >
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            title={project.title}
                            link={project.link}
                            imageUrl={project.imageUrl}
                            videoUrl={project.videoUrl}
                            frontendRepo={project.frontendGithubLink}
                            backendRepo={project.backendGithubLink}
                            description={project.projectDescription}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProjectGallery;
