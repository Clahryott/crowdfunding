import { useState, useEffect } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

// Data
//import { allProjects } from "../data";

function HomePage() {
    ///State
    const [projectList, setProjectList] = useState([]);
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}projects`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setProjectList(data);
            });
    }, []);
    
    
    return (
       // <div>
         //   <h1>Cro</h1>
       // </div>
        <div id="project-list">
            {projectList.map((project, key) => {
                return <ProjectCard key={key} projectData={project} />;
            })}
        </div>
    );
}

export default HomePage;