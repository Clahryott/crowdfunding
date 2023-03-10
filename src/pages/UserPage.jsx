import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function UserPage() {
    // State
    const [user, setUser] = useState({});
    // const [loggedIn] = useRouterContext()

    // Hooks
    const {id} = useParams();

    // Effects
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}users/${id}`);
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
}, []);


    return (
        <div className="user-detail">
            <h2>{user.username}</h2>
            <img src={user.avatar} />
            <h3>Bio: {user.bio}</h3>
            <p>-------------------------------</p>
                <div>
                    <h3>{user.username}'s Projects:</h3>
                    <ul>
                    {user.projects &&
                        user.projects.map((projectData, key) => (
                            <li key={key}>
                            {projectData.title} - {projectData.date_created}
                            </li>
                        ))
                    }
                    </ul>
                </div>

            <p>-------------------------------</p>
                <div>
                    <h3>{user.username} Comment Feed:</h3>
                    <ul>
                    {user.comments &&
                        user.comments.map((commentData, key) => (
                            <li key={key}>
                            {commentData.created} - {commentData.project}: says {commentData.body}
                            </li>
                        ))
                    }
                    </ul>
                </div>

            <p>-------------------------------</p>
                <div>
                    <h3>{user.username} Pledges Feed:</h3>
                    <ul>
                        {user.pledges &&
                            user.pledges.map((pledgeData, key) => (
                                <li key={key}>
                                    {pledgeData.date_pledged}: ${pledgeData.amount} for {pledgeData.project}
                                    <p>{pledgeData.comment}</p>
                                </li>
                            ))}
                    </ul>
                </div>
        </div>
    );
}

export default UserPage;

{/* <p className="kl-to-do">Add comments: w/ avatar (usermodel),</p>
<p className="kl-to-do">Avatar next to pledge item? part of diff model (users) how to call?</p>
<p className="kl-to-do">Will I need to change db scheme to FK avatar to be accessible to pledge and comment?</p>  */}


// Ctrl + D = select all the same fields
// Alt to ASYNC change:
    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
    //     .then(results => {
    //         return results.json();
    //     })
    //     .then((data) => {
    //         setProject(data);
    //     });

    // }, []);


