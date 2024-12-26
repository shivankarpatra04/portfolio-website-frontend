import { useState } from "react";

const ProjectCard = ({ title, link, imageUrl, videoUrl, frontendRepo, backendRepo, description }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-white rounded-lg shadow-md transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full aspect-video overflow-hidden rounded-t-lg relative">
                {isHovered && videoUrl ? (
                    <video
                        src={videoUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline // Ensures video plays on all devices
                    />
                ) : (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm mt-2">{description}</p>
                <div className="mt-4">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        View Project
                    </a>
                    {frontendRepo && (
                        <a
                            href={frontendRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-600 hover:underline mt-2"
                        >
                            Frontend Repo
                        </a>
                    )}
                    {backendRepo && (
                        <a
                            href={backendRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-600 hover:underline mt-2"
                        >
                            Backend Repo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
