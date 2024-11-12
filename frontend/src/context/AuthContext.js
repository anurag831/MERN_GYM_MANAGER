import {createContext, useReducer} from 'react'
import {useEffect} from 'react'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN' :
            return {user : action.payload}
        case 'LOGOUT' :
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer( authReducer , {
        user: null
    })

    // When the application loads for the first time, we check if any user is already logged in and if there is then we set the global 'user' state accordingly
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
            dispatch({type:'LOGIN', payload: user})
        }
    }, [])

    console.log("AuthContext state : ", state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}