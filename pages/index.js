import HeroSection from "../components/HeroSection";
import ProjectGallery from "../components/ProjectGallery";
import AboutMe from "../components/Aboutme";
import Services from "../components/Services";
import WhatIDo from "../components/WhatIDo";
import SkillsAndTools from "../components/SkillsAndTools";
import ContactMe from "../components/ContactMe";

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <HeroSection />

            {/* What I Do Section */}
            <WhatIDo />

            {/* Project Gallery */}
            <ProjectGallery />

            {/* About Me Section */}
            <AboutMe />

            {/* Skills And Tools Section */}
            <SkillsAndTools />

            {/* Services Section */}
            <Services />

            {/* Contact Me */}
            <ContactMe />




        </div>
    );
}