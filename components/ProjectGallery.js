import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";

const ProjectGallery = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await axios.get("https://portfolio-website-backend-five.vercel.app/api/projects");
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
        <section id="projects" className="py-12 bg-gradient-to-b from-blue-50 to-blue-100">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
                My Work
            </h2>
            {loading ? (
                <p className="text-center text-xl text-gray-600 animate-pulse">Loading...</p>
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
