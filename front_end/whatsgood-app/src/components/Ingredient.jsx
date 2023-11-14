import { useState } from "react"
import { backEndApi } from "./utilities"
export default function Ingredient(props){
    const { ingredient,journal,plate,foodAmount,setFoodAmount,setClick,click } = props
    const delete_ingredient = ()=>{
        let response = backEndApi.delete(`journal/${journal.id}/plate/${plate.id}/ingredient/${ingredient.id}`).then((response)=>{ console.log(response)
        setClick(!click)
        }).catch((error)=>{
            console.log(error)
        })
    }
    const addFood = ()=>{
        let response = backEndApi.put(`journal/${journal.id}/plate/${plate.id}/ingredient/${ingredient.id}`,{'amount':foodAmount}).then((response)=>{ console.log(response)
        setClick(!click)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <div>
            <li>{ingredient?ingredient.name:null},Amount: {ingredient?ingredient.amount_consumed:null}</li>
            <input type="text" 
            placeholder="enter amount" onChange={(e)=>{
                setFoodAmount(e.target.value)
            }}></input>
            <button onClick={addFood}>add amount</button>
            <button onClick={delete_ingredient}>delete</button>
        </div>
    )
}

// const foodPick = foodData?.find((x)=> e.target.value == x.fdcId)
//                             setData(foodPick)