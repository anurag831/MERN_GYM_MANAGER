import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user/users", 
        {
          headers : { 'Authorization' : `Bearer ${user.token}`}
        }
      );
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };

    if (user.role === "admin") {
      fetchUsers();
    }
  }, [user]);


  return (
    <div style={{"textAlign":"center"}}>
      <h2>User's List</h2>
      {users &&
        users.map((user) => (
          <div key={user._id} className="UserDetails">
            <span><h4>{user.email.split("@")[0]}</h4></span>
            <Link to={'/userWorkouts/' + user._id} ><button>See Workouts:-</button></Link>
          </div>
        ))}
    </div>
  );
};

export default Admin;
