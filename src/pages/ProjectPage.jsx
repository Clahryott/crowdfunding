import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PledgeForm from "../components/PledgeForm/PledgeForm";
import CommentForm from "../components/CommentForm/CommentForm";

function ProjectPage() {
    // State
    const [project, setProject] = useState({});

    // Hooks
    const { id } = useParams();

    // Effects
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}projects/${id}`);
                const data = await response.json();
                setProject(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProject();
}, []);


    return (
        <div className="project-detail">
            <h2>{project.title}</h2>
            <h4>Started by Tree-Hugger: {project.owner}  </h4>
            <img src={project.image} />

            <br />
            <table>
                <tr>
                    <th>Start Date</th>
                    <th>Deadline</th>
                    <th>Status:</th>
                </tr>
                <tr>
                    <td>{new Date(project.date_created).toLocaleDateString()}</td>
                    <td>{new Date(project.deadline).toLocaleDateString()}</td>
                    <td>{project.is_open ? <p>Active</p> : <p>Inactive</p>}</td>
                </tr>
            </table>
        
            <p>-------------------------------</p>
            <div className="status-card">
                <h3>{project.funding_status} Project!</h3>
                <h4>Goal: ${project.goal} | Total Pledges: ${project.sum_pledges}</h4>
                <h4>Balance: ${project.goal_balance}</h4>
            </div>

            <p>-------------------------------</p>
            {/* if project comments exist, post them */}
            <CommentForm project={project} />
                <div>
                    <h3>Comments:</h3>
                    <ul>
                    {project.comments &&
                        project.comments.map((commentData, key) => (
                            <li key={key}>
                                {new Date(commentData.created).toLocaleString()}: 
                                <p>{commentData.commenter} says "{commentData.body}"</p>
                                
                            </li>
                        ))
                    }
                    </ul>
                </div>

            <p>-------------------------------</p>
            {/* if pledges exist, post them */}
            <PledgeForm project={project} /> 
                <div>
                    <h3>Pledges:</h3>
                    <ul>
                        {project.pledges &&
                            project.pledges.map((pledgeData, key) => (
                                <li key={key}>
                                    {new Date(pledgeData.date_pledged).toLocaleString()}: 
                                    <p>${pledgeData.amount} from {pledgeData.supporter}</p>
                                    <p>{pledgeData.comment}</p>
                                </li>
                            ))}
                    </ul>
                </div>
        </div>
    );
}

export default ProjectPage;