import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateProjectPage(){
    const [projects, setProjects] = useState({
        // from JSON Raw Body in Deployed (default values)
        // this is what you return at the bottom - your list might look different to mine. If so, don't worry!
        "title": "",
        "description": "",
        "goal": null,
        "image": "",
        "is_open": "true",
        "date_created":null
    });
    const { id } = useParams();
    // copies the original data, replaces the old data for each id/value pair to what is input in the form (changes state). this will be submitted to API below
    const handleChange = (event) => {
        const { id, value } = event.target;
        setProjects((prevProjects) => ({
        ...prevProjects,
        [id]: value,
        }));
    };
    const navigate = useNavigate();
    const authToken = window.localStorage.getItem("token");
    const postData = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}projects/`,
            {
                method: "post",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify(projects),
            }
        );
        return response.json();
    };
// if authtoken exists, post the data on submit, wait for the response and nav back to home page
    const handleSubmit = async(event) => {
    event.preventDefault();
    if (authToken) {
        const postProject = await postData();
        navigate("/");
    }
};
    return(
        <div className="container">
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                placeholder="Enter title"
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="description">Description:</label>
            <input
                type="text"
                id="description"
                placeholder="Enter description"
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="goal">Goal:</label>
            <input
                type="number"
                id="goal"
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="image">Image:</label>
            <input
                type="text"
                id="image"
                placeholder="Enter Image address"
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="is_open">is open:</label>
            <input
                type="checkbox"
                id="is_open"
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="date_created">Date Created:</label>
            <input
                type="date"
                id="date_created"
                onChange={handleChange}
            />
            </div>
            <button onClick={handleSubmit} type="submit">Create Project</button>
        
        </form>
        </div>
    );
}
export default CreateProjectPage;









