import { useState,useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import axios from "axios"
import Journal_entry from "./JournalEntry"
import { backEndApi } from "./utilities"

export function Journal(){
    const {foodName,setFoodName,foodData,setFoodData,foodAmount,setFoodAmount,foodList, setFoodList, user,setUser,plateList,setPlateList,journalList,setJournalList}= useOutletContext()
    const journal_maker=()=>{
        console.log(user)
        let response = backEndApi.post("journal/1/",{"username":user}).then((response)=>{ console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
        window.location.reload()
    }
    useEffect(()=>{
        axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=4aoaIKsciqsf7EfdYfXZOl3XgW2n8179rwc9gZRW&query=${foodName}&dataType=Branded`).then((response) =>{
            const foodSearch = response.data.foods
            setFoodData(foodSearch)
        }).catch((error) =>{
            console.log(error)
        })
    },[foodName])

    useEffect(()=>{
        backEndApi.get("journal").then((response)=>{
            const journals = response.data
            journals.map((journal)=>{
                setJournalList(journals)
            })
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    return(
        <div >
            Entry
            <div>
            <div className="journal">
            <button onClick={journal_maker}>start journal</button>
            </div>
        </div>
            <>
                {journalList?journalList.map((journal,index)=>{
                    return <Journal_entry key={journal.id} journal={journal} foodData={foodData} setFoodName={setFoodName} foodName={foodName} foodList={foodList} foodAmount={foodAmount} setFoodAmount={setFoodAmount}/>
                }):null}
            </>
        </div>
    )
}




