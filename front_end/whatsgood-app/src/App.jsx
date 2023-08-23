import Navbar from "./components/Navbar"
import { useState,useEffect } from "react"
import { Outlet } from "react-router-dom";
import { backEndApi } from "./components/utilities";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [foodName,setFoodName] = useState('')
  const [foodData,setFoodData] = useState([])
  const [foodamount, setFoodAmount] = useState(0)
  const [foodList, setFoodList] = useState([])
  const [user,setUser] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(user)
  },[user])

  const whoAmI = async() =>{
    let token = localStorage.getItem("Token")
    if (token){
      backEndApi.defaults.headers.common['Authorization'] = `Token ${token}`
      let response = await backEndApi.get("users/info/")
      setUser(response.data)
      navigate('/')
    }

    else{
      navigate('/login')
    }
  }

  useEffect(()=>{
    whoAmI()
  },[])

  return (
    <div className='page'>
      <Navbar setUser={setUser} user ={user}/>
      <Outlet context={{foodName,setFoodName,foodData,setFoodData,foodamount,setFoodAmount,foodList, setFoodList, user,setUser}}/>
    </div>
  )
}