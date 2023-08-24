import { useState } from "react"
import { backEndApi } from "./utilities"
export default function Ingredient(props){
    const { ingredient,journal,plate,foodData,setFoodName,foodName,journalList,foodList,onClickHandler,foodAmount,setFoodAmount} = props
    const delete_ingredient = ()=>{
        let response = backEndApi.delete(`journal/${journal.id}/plate/${plate.id}/ingredient/${ingredient.id}`).then((response)=>{ console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
        window.location.reload()
    }
    const addFood = ()=>{
        let response = backEndApi.put(`journal/${journal.id}/plate/${plate.id}/ingredient/${ingredient.id}`,{'amount':foodAmount}).then((response)=>{ console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
        window.location.reload()
    }
    return(
        <div>
            <li>{ingredient?ingredient.name:null},Amount: {ingredient?ingredient.amount_consumed:null}</li>
            <label>Choose units:
                <select name="units" id="units">
                    <option>g</option>
                    <option>mg</option>
                    <option>oz</option>
                </select>
                <input type="text" 
                placeholder="enter amount" onChange={(e)=>{
                    setFoodAmount(e.target.value)
                }}
                />
            </label>
            <button onClick={addFood}>add amount</button>
            <button onClick={delete_ingredient}>delete</button>
        </div>
    )
}


// return(
//     <div className="ingredient">
//         <h3>{plate.id}</h3>
//         <h3>{plate.created_at}</h3>
//         <form className = 'foodQuery' onSubmit={(event) => {event.preventDefault()}}>
//                 <input
//                 type="text"
//                 placeholder="enter food"
//                 onChange={(event) => setFoodName(event.target.value)}
//                 />
//                 <label>Choose food:
//                     <select className='selector' name="units" id="units">
//                         {foodData?foodData.map((food)=>{
//                         return <option key={food.fdcId}>{food.description},{food.brandName},{food.servingSize},{food.servingSizeUnit}</option>}):null}
//                     </select>
//                 </label>
//                 <button type="submit" onClick={onClickHandler}>
//                 add food
//                 </button>
//             </form>
//         <ul>
//             {/* foodList? foodList.map((food)=>{
//                 return <li>food.description<li><button>delete</button>
//             }) */}
//             <>
//                 {plate.ingredients.map((ingredient)=>{
//                     return <Ingredient key={ingredient.id} ingredient={ingredient}/>
//                 })}
//             </>
            
//         </ul>
//         <button onClick={plate_maker}>save plate</button>
//         <button onClick={delete_plate}>delete plate</button>
//     </div>