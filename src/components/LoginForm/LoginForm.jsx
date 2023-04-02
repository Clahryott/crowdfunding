// import { useState } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";

// function LoginForm() {
//   const [, setLoggedIn] = useOutletContext();

//   // State
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });

//   // Hooks
//   const navigate = useNavigate();

//   // Actions
//   const handleChange = (event) => {
//     const { id, value } = event.target;

//     setCredentials((prevCredentials) => ({
//       ...prevCredentials,
//       [id]: value, //this will override the prevCredentials and setting it as the state. Javascript works from top to bottom.
//     }));
//   };

//   const postData = async () => {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}api-token-auth/`,
//       {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       }
//     );
//     return response.json();
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (credentials.username && credentials.password) {
//       const { token } = await postData();
//       window.localStorage.setItem("token", token);
//       setLoggedIn(true);
//       navigate("/");
//     }
//   };
// //       if (token !==undefined) {}
// //       window.localStorage.setItem("token", token);
// //       navigate("/");

// //       setLoggedIn(true);

// //       navigate("/");
// //         } else {
// //           setLoggedIn(false);
// //         }
// //     }
// // }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           onChange={handleChange}
//           placeholder="Enter username"
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           onChange={handleChange}
//           placeholder="Enter username"
//         />
//       </div>
//       <button type="submit">Login</button>
//     </form>
//   );
// }


// export default LoginForm;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

function LoginForm() {
  // State
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // const [loggedIn, setLoggedIn] = useState(false);

  const { loggedIn, setToken } = useContext(AuthContext)

  // Hooks
  const navigate = useNavigate();

  // Actions
  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    console.log(import.meta.env.VITE_API_URL);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api-token-auth/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
      try {
        const { token } = await postData();
        window.localStorage.setItem("token", token);
        setToken(token)
        // setLoggedIn(true);
        navigate("/");
      } catch (error) {
        // setLoggedIn(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          placeholder="Enter username"
          value={credentials.username}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Enter password"
          value={credentials.password}
        />
      </div>
      <button type="submit">Login</button>
      {loggedIn === false && <div>Login failed</div>}
    </form>
  );
}

export default LoginForm;
