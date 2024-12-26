import { motion } from "framer-motion";

const SkillsAndTools = () => {
    const skills = [
        {
            category: "Frontend Development",
            tools: [
                { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                { name: "Tailwind CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
                { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            ],
        },
        {
            category: "Backend Development",
            tools: [
                { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
                { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            ],
        },
        {
            category: "AI/ML & Automation",
            tools: [
                { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
                { name: "OpenAI API", logo: "https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png" },
                { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
            ],
        },
    ];

    return (
        <section className="py-12 bg-gradient-to-b from-blue-50 to-blue-100">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                {/* Section Title */}
                <motion.h2
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Skills and Tools
                </motion.h2>

                {/* Skills Grid */}
                {skills.map((skillCategory, index) => (
                    <motion.div
                        key={index}
                        className="mb-16 w-full"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        {/* Category Title */}
                        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                            {skillCategory.category}
                        </h3>

                        {/* Tools */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                            {skillCategory.tools.map((tool, toolIndex) => (
                                <motion.div
                                    key={toolIndex}
                                    className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6 text-center"
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: toolIndex * 0.1 }}
                                >
                                    <img
                                        src={tool.logo}
                                        alt={tool.name}
                                        className="w-16 h-16 mb-4"
                                    />
                                    <p className="text-md font-medium text-gray-700">{tool.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SkillsAndTools;
