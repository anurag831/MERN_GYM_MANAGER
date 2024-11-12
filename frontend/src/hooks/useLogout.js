// A hook always returns something and to perform tasks like singup and logout we create functions in our custom
// hook whichs does the job and we return that function along with other information if required, we do not
// write the logic directly inside the hook's body, rather we create a function inside the hook and return the
// function in the hook, and for exporting we export the entire hook.

import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch : workoutsDispatch } = useWorkoutsContext()
  const logout = () => {
    // delete user from local storage
    localStorage.removeItem("user");

    // update global state
    dispatch({ type: "LOGOUT" });

    // update the global workout state
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
  };

  return {logout}
};
