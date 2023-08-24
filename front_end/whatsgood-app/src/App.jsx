import Navbar from "./components/Navbar"
import { useState,useEffect } from "react"
import { Outlet } from "react-router-dom";
import { backEndApi } from "./components/utilities";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [foodName,setFoodName] = useState('')
  const [foodData,setFoodData] = useState([])
  const [foodAmount, setFoodAmount] = useState(0)
  const [foodList, setFoodList] = useState([])
  const [plateList,setPlateList] = useState([])
  const [journalList,setJournalList] = useState([])
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
      <Outlet context={{foodName,setFoodName,foodData,setFoodData,foodList, setFoodList, user,setUser,plateList,setPlateList,journalList,setJournalList,foodAmount, setFoodAmount}}/>
    </div>
  )
}