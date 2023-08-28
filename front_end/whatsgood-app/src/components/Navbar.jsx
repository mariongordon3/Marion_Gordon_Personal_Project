
import { Link } from "react-router-dom";
import { backEndApi } from "./utilities";
import { useNavigate } from "react-router-dom";

export default function Navbar(props){
    const navigate = useNavigate()
    const {setUser,user} = props
    const logOut = async()=>{
        let response = await backEndApi.post("users/logout/")
        console.log(response.status)
        if(response.status === 204){
            localStorage.removeItem("Token")
            setUser(null)
            navigate("/login")
            delete backEndApi.defaults.headers.common['Authorization']
            window.location.reload()
        }
    }
    return( 
        <nav>
            {user?
            <>
                <Link to="/" >home</Link>
                <Link to="/journal">journal</Link>
                <button onClick={logOut}>logout</button>
            </>
            :
            <>
                <Link to="/Register">register</Link>
                <Link to="/Login">login</Link>
            </>}
        </nav>
    );
}

