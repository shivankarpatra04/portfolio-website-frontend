import { motion } from "framer-motion";

const WhatIDo = () => {
    const skills = [
        {
            icon: "🤖",
            title: "AI-Powered Solutions",
            description: "Build intelligent applications using advanced AI models like GPT, OpenAI APIs, and Google Gemini.",
        },
        {
            icon: "🔗",
            title: "Custom API Development",
            description: "Design and implement secure APIs tailored to business requirements, ensuring seamless integrations.",
        },
        {
            icon: "📊",
            title: "Data-Driven Applications",
            description: "Develop tools to process, visualize, and extract actionable insights from data efficiently.",
        },
        {
            icon: "⚙️",
            title: "Process Automation",
            description: "Automate workflows and repetitive tasks to improve efficiency and save time.",
        },
        {
            icon: "🕸️",
            title: "Web Scraping & Extraction",
            description: "Scrape and organize web data into usable formats, adhering to ethical practices.",
        },
        {
            icon: "📂",
            title: "SaaS Product Development",
            description: "Create scalable SaaS applications with modern tech stacks, tailored to your unique needs.",
        },
    ];

    return (
        <section className="py-12 bg-gradient-to-b from-gray-100 to-gray-200" id="what-i-do">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Title */}
                <motion.h2
                    className="text-4xl font-extrabold text-center text-gray-800 mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    What I Do
                </motion.h2>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl text-center transition duration-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="text-5xl mb-4"
                                whileHover={{ rotate: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {skill.icon}
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
                            <p className="text-gray-700">{skill.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatIDo;
