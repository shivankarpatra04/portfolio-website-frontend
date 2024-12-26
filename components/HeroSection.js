import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/tech-background.webm" // Path to your video file
        autoPlay
        loop
        muted
      ></video>

      {/* Dark Overlay for Text Visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center text-white"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Welcome to <span className="text-yellow-300">My Portfolio</span>
        </h1>
        <p className="text-lg md:text-xl mt-4">
          I create innovative solutions with technology.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition duration-300"
          onClick={() => {
            const projectSection = document.getElementById('projects')
            projectSection.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Explore My Work
        </motion.button>
      </motion.div>

    </section>);
};

export default HeroSection;
