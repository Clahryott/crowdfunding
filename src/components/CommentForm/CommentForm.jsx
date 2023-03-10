import React, { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function CommentForm(props) {
    const authToken = window.localStorage.getItem("token")
    const { project } = props;
    const [loggedIn] = useOutletContext();

    const [comments, setComments] = useState({
        "body": "",
        "project": null
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setComments((prevComments) => ({
        ...prevComments,
        [id]: value,
        project: project.title, 
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loggedIn) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}comments/`,
                    {
                    method: "post",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify(comments),
                }
                );
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                location.reload();
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            }
        } else {
        // redirect to login page
        navigate(`/login`);
        }

    };

    return (
        <>
        {loggedIn ? 
        <div>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="body">Comment:</label>
            <input
                type="text"
                id="body"
                placeholder="Enter Comment"
                onChange={handleChange}
            />
            </div>
            <button type="submit">Submit Comment</button>
        </form>
        </div>
        : (<p>Login to send a comment</p>) }
        </>
    );
}

export default CommentForm;