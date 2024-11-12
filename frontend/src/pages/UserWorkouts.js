import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Workoutdetails from "../components/Workoutdetails";

const UserWorkouts = () => {
  const { user } = useAuthContext();
  const params = useParams();
  const user_id = params.id;
  const [workouts, setWorkouts] = useState([]);

  let role = null;
  if(user){
    role = user.role
  }

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/" + user_id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    if (role === "admin") {
      fetchWorkouts();
    }
  }, [role, user_id, user.token]);


  return (<>
    {workouts && workouts.map((workout)=>{
        return (
          <Workoutdetails key={workout._id} workout={workout} />
        )
    })}
    {workouts.length === 0 && <div style={{"textAlign":"center"}} ><h2>No workouts added yet</h2></div>}
  </>)
};

export default UserWorkouts;
