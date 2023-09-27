import { backEndApi } from "./utilities"
import { useState } from "react"
import { useOutletContext,useNavigate } from "react-router-dom"

export default function RegisterPage(){
    const navigate = useNavigate()
    const {user,setUser} = useOutletContext()
    const [password, setPassword]= useState('')
    const [userName,setUserName] = useState('')
    const [weight, setWeight] = useState('')
    const[sex,setSex] = useState('')
    const [status, setStatus] = useState('')
    const signUp = async(e) => {
        e.preventDefault()
        let response = await backEndApi.post("users/signup/", {
            email: userName,
            password: password,
            weight: weight,
            sex: sex,
        }).catch((error)=>{
            console.log(error.response.data.detail);
            setStatus(error.response.data.detail)
        })
        let responseUser = response.data.user
        let token = response.data.token
        backEndApi.defaults.headers.common['Authorization'] = `Token ${token}`
        setUser(responseUser)
        localStorage.setItem("Token",token)
        navigate("/")
        console.log(response)
    }
    
    return(
        <div>
            <form className="register" onSubmit={(e)=>signUp(e)}>
                <h5>Signup</h5>
                {status? <><h3>{status}</h3></>:null}
                <input type="email" placeholder="enter email" onChange={(event) => setUserName(event.target.value)} />
                <input type="password" placeholder='enter password' onChange={(event) => setPassword(event.target.value)} />
                <input type="number" placeholder='weight in lbs ex. 150' onChange={(event) => setWeight(event.target.value)} />
                <input type="text" placeholder='enter sex ex. M or F' onChange={(event) => setSex(event.target.value)} />
                <input type="submit" />
            </form>
        </div>
    )
}