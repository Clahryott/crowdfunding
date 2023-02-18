//import React from "react";??

import { oneProject } from "../data";

import {useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function ProjectPage() {
    //state
    const [project, setProjectData] = useState({ pledges: []});

    //hooks
    const { id } = useParams();

    //effects
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setProjectData(data);
            })
    }, []);

  return (
    <div>
      <h2>{project.title}</h2>
      <h3>Created at: {project.date_created}</h3>
      <h3>{`Status: ${project.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {project.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
              {pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectPage;