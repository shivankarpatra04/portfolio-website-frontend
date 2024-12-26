import { useState } from "react";
import { motion } from "framer-motion";

const ContactMe = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Message sent successfully:", data.message);
                setIsSubmitted(true);
                setFormData({ name: "", email: "", message: "" });
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                alert("Failed to send your message. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again later.");
        }
    };


    return (
        <section className="py-12 bg-gradient-to-b from-blue-50 to-blue-100" id="contact">
            <div className="max-w-5xl mx-auto px-6">
                <motion.h2
                    className="text-4xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Contact Me
                </motion.h2>

                {/* Form */}
                <div className="bg-white shadow-lg rounded-lg p-8">
                    {isSubmitted ? (
                        <p className="text-center text-green-600 text-lg">
                            Your message has been sent successfully! 🎉
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="message"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Message"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>

                {/* Social Media Links */}
                <div className="mt-8 flex justify-center space-x-6">
                    <a
                        href="https://www.linkedin.com/in/shivankar-patra/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:scale-110 transition duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11.5 19h-3v-11h3v11zm-1.5-12.316c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm13.5 12.316h-3v-5.5c0-1.661-3-1.539-3 0v5.5h-3v-11h3v1.539c1.396-2.586 6-2.777 6 2.475v6.986z" />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/shivankarpatra04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:scale-110 transition duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.997.108-.776.419-1.305.762-1.604-2.665-.3-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.302-.535-1.518.117-3.166 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.398 3.003-.403 1.02.005 2.047.137 3.005.403 2.292-1.552 3.299-1.23 3.299-1.23.653 1.648.242 2.864.119 3.166.77.84 1.236 1.911 1.236 3.221 0 4.61-2.805 5.624-5.475 5.92.431.372.815 1.103.815 2.222v3.293c0 .322.216.694.825.576 4.765-1.585 8.201-6.084 8.201-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a
                        href="mailto:shivankar.patra.official@gmail.com"
                        className="text-red-600 hover:scale-110 transition duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 4h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-12c0-1.103-.897-2-2-2zm0 2v1.511l-8 4.989-8-4.989v-1.511h16zm-16 12v-9.989l8 5 8-5v9.989h-16z" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactMe;
