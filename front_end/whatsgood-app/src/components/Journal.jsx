import { useState,useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import axios from "axios"
import Journal_entry from "./JournalEntry"
import { backEndApi } from "./utilities"

export function Journal(){
    const {foodName,setFoodName,foodData,setFoodData,foodAmount,setFoodAmount,foodList, setFoodList, user,setUser,plateList,setPlateList,journalList,setJournalList,unit,setUnit,setClick,click}= useOutletContext()
    const journal_maker=()=>{
        let response = backEndApi.post("journal/1/",{"username":user}).then((response)=>{ console.log(response.data)
        setClick(!click)
        }).catch((error)=>{
            console.log(error)
        })
    }
    
    useEffect(()=>{
        axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=4aoaIKsciqsf7EfdYfXZOl3XgW2n8179rwc9gZRW&query=${foodName}&dataType=Branded`).then((response) =>{
            const foodSearch = response.data.foods
            setFoodData(foodSearch)
        }).catch((error) =>{
            console.log(error)
        })
    },[foodName])

    return(
        <div className="journal" >
            <div>
            <div className="journal">
            <button onClick={journal_maker}>start new journal</button>
            </div>
        </div>
            <>
                {journalList?journalList.map((journal,index)=>{
                    return <Journal_entry key={journal.id} journal={journal} foodData={foodData} setFoodName={setFoodName} foodName={foodName} setFoodList={setFoodList} setPlateList={setPlateList} foodList={foodList} foodAmount={foodAmount} setFoodAmount={setFoodAmount} user={user} unit ={unit} setUnit ={setUnit} journalList={journalList} setJournalList={setJournalList} setClick={setClick} click ={click}/>
                }):null}
            </>
        </div>
    )
}




