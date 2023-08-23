import { useOutletContext } from "react-router-dom"
export default function HomePage(){
  const {user,setUser} = useOutletContext()
    return(
        <div>
          <h3>
            welcome {user}
          </h3>
        </div>
    )
}