import { motion } from "framer-motion";

const Services = () => {
    const services = [
        {
            title: "Machine Learning & AI Development",
            description:
                "I create custom AI models and solutions, leveraging tools like TensorFlow, Scikit-learn, and OpenAI API to deliver predictive analytics and data-driven insights.",
            image: "/ai-icon.png",
        },
        {
            title: "Full-Stack Web Development",
            description:
                "I build scalable, responsive web applications using React.js, Node.js, MongoDB, and Firebase, ensuring modern and robust solutions.",
            image: "/web-development.png",
        },
        {
            title: "Data Analytics & Visualization",
            description:
                "Transforming raw data into actionable insights with compelling visualizations to drive decision-making.",
            image: "/data-analytics.png",
        },
        {
            title: "SaaS Application Development",
            description:
                "Designing cloud-based SaaS applications with AI-powered features for modern business needs.",
            image: "/saas-products.png",
        },
        {
            title: "Educational AI Tools",
            description:
                "Developing AI-driven applications like Student Performance Predictors to enhance learning experiences.",
            image: "/Educational AI Tools.png",
        },
        {
            title: "API Integration & Automation",
            description:
                "Seamless integration of APIs like Google Gemini and OpenAI, coupled with workflow automation for improved efficiency.",
            image: "/API Integration & Automation.png",
        },
    ];

    return (
        <section className="py-12 bg-gradient-to-b from-gray-100 to-gray-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Title */}
                <motion.h2
                    className="text-4xl font-extrabold text-center text-gray-800 mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    My Services
                </motion.h2>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform overflow-hidden flex flex-col"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2,
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {/* Image Section */}
                            <div className="h-48 w-full">
                                <motion.img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            {/* Text Section */}
                            <div className="p-6 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
