import Navbar from "./components/Navbar"
import { useState,useEffect } from "react"
import { Outlet } from "react-router-dom";
import { backEndApi } from "./components/utilities";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [foodName,setFoodName] = useState('')
  const [foodData,setFoodData] = useState([])
  const [foodAmount, setFoodAmount] = useState(0)
  const [unit,setUnit] = useState('')
  const [foodList, setFoodList] = useState([])
  const [plateList,setPlateList] = useState([])
  const [journalList,setJournalList] = useState([])
  const [user,setUser] = useState(null)
  const [click,setClick] = useState(false)
  const navigate = useNavigate()

  console.log(journalList)
  const whoAmI = async() =>{
    let token = localStorage.getItem("Token")
    if (token){
      backEndApi.defaults.headers.common['Authorization'] = `Token ${token}`
      let response = await backEndApi.get("users/info/")
      console.log(response.data)
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

  useEffect(()=>{
    backEndApi.get("journal").then((response)=>{
      const journals = response.data
      setJournalList(journals)
      setPlateList(response.data[journals.length-1].plates)
  }).catch((error)=>{
      console.log(error)
  })
  },[click,user])
  

  return (
    <div className='page'>
      <Navbar setUser={setUser} user ={user}/>
      <Outlet context={{foodName,setFoodName,foodData,setFoodData,foodList, setFoodList, user,setUser,plateList,setPlateList,journalList,setJournalList,foodAmount, setFoodAmount,unit,setUnit,setClick,click}}/>
    </div>
  )
}