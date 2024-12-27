import { useState } from "react";

const AboutMe = () => {
    const [hoveredButton, setHoveredButton] = useState(null);

    return (
        <section className="py-12 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    About Me
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Profile Image */}
    <div
        className="flex justify-center"
        style={{ animation: "slideInLeft 1.5s ease-in-out" }}
    >
        <div
            className="relative w-72 h-72 flex items-center justify-center bg-blue-600 rounded-full shadow-lg"
        >
            <img
                src="/profile.png" // Replace with your profile image path
                alt="Shivankar Patra"
                className="w-64 h-64 rounded-full shadow-lg border-4 border-white object-cover hover:scale-105 transition-transform duration-300"
            />
        </div>
    </div>
</div>


                    {/* About Me Content */}
                    <div>
                        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                            Hello, I'm <span className="font-bold text-gray-900">Shivankar Patra</span>, a dedicated software developer with expertise in{" "}
                            <span className="text-blue-600 font-semibold">AI-Powered Applications</span>,{" "}
                            <span className="text-blue-600 font-semibold">Full-Stack Development</span>, and{" "}
                            <span className="text-blue-600 font-semibold">Automation Tools</span>.
                        </p>
                        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                            My professional journey has led me to build innovative applications like:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-6">
                            <li>
                                <strong className="text-gray-900">Content-Gini</strong>: An AI-powered tool designed to help creators respond intelligently to YouTube comments, streamlining engagement.
                            </li>
                            <li>
                                <strong className="text-gray-900">Relationest</strong>: A relationship advisor app that provides personalized advice using advanced AI models.
                            </li>
                            <li>
                                <strong className="text-gray-900">Job Application Tracker</strong>: A web-based SaaS product to organize and manage job applications, enhancing productivity for job seekers.
                            </li>
                        </ul>
                        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                            My projects are a testament to my ability to transform ideas into impactful solutions. I specialize in delivering seamless user experiences backed by powerful AI integrations.
                        </p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-6">Skills & Expertise</h3>
                        <ul className="list-disc list-inside text-gray-700 mt-4">
                            <li>AI-Powered Tools using OpenAI, LangChain, and Google Gemini APIs</li>
                            <li>Full-Stack Development with React.js, Node.js, MongoDB, and Firebase</li>
                            <li>Machine Learning frameworks like TensorFlow and Scikit-learn</li>
                            <li>Custom API Development and Data-Driven Applications</li>
                            <li>Automation Scripts and Web Scraping Bots</li>
                        </ul>
                        <p className="text-lg text-gray-700 mt-4">
                            I’m always looking for exciting freelance opportunities where I can collaborate on meaningful projects. Let’s create something amazing together!
                        </p>
                        <div className="mt-8 flex flex-col md:flex-row gap-4">
                            {/* LinkedIn Button */}
                            <a
                                href="https://www.linkedin.com/in/shivankar-patra/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-block px-6 py-3 rounded-full text-lg shadow-lg transition-transform duration-300 ${hoveredButton === "linkedin"
                                    ? "bg-blue-700 text-white scale-105"
                                    : "bg-blue-600 text-white hover:scale-105"
                                    }`}
                                onMouseEnter={() => setHoveredButton("linkedin")}
                                onMouseLeave={() => setHoveredButton(null)}
                            >
                                Connect on LinkedIn
                            </a>
                            {/* GitHub Button */}
                            <a
                                href="https://github.com/shivankarpatra04"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-block px-6 py-3 rounded-full text-lg shadow-lg transition-transform duration-300 ${hoveredButton === "github"
                                    ? "bg-gray-900 text-white scale-105"
                                    : "bg-gray-800 text-white hover:scale-105"
                                    }`}
                                onMouseEnter={() => setHoveredButton("github")}
                                onMouseLeave={() => setHoveredButton(null)}
                            >
                                View GitHub Profile
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
