import { useOutletContext,useNavigate } from "react-router-dom"
import { useState } from "react"
import { backEndApi } from "./utilities"
export default function LogIn(){
    const navigate = useNavigate()
    const {user,setUser} = useOutletContext()
    const [password, setPassword]= useState('')
    const [userName,setUserName] = useState('')
    const [status, setStatus] = useState('')
    const signUp = async(e) => {
        e.preventDefault()
        let response = await backEndApi.post("users/login/", {
            "email": userName,
            "password": password,
        }).catch((error)=>{
            console.log(error.response.data.detail);
            setStatus(error.response.data.detail);
        });
        let responseUser = response.data.user
        let token = response.data.token
        backEndApi.defaults.headers.common['Authorization'] = `Token ${token}`
        setUser(responseUser)
        localStorage.setItem("Token",token)
        navigate("/")
    }
    return(
        <div>
            <form className="login" name='loginForm' onSubmit={(e)=>signUp(e)}>
                <h5>Login</h5>
                {status? <><h3>{status}</h3></>:null}
                <input type="email" placeholder="enter email" onChange={(event) => setUserName(event.target.value)} />
                <input type="password" placeholder='enter password' onChange={(event) => setPassword(event.target.value)} />
                <input type="submit" />
            </form>
        </div>
    )
}