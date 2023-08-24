import Ingredient from "./Ingredient"
import { backEndApi } from "./utilities"
import { useState } from "react"
export default function PlateEntry(props){
    const { journal,plate,setFoodName,foodData, foodName,journalList,foodList,foodAmount,setFoodAmount} = props
    const [data,setData] = useState(null)
    const onClickHandler = (event) =>{
        console.log(data)
        let response = backEndApi.post(`journal/${journal.id}/plate/${plate.id}/ingredient/1`,{data}).then((response)=>{ console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
        // window.location.reload()
    }
    const plate_maker=()=>{
        let response = backEndApi.post(`journal/${journal.id}/plate/${plate.id}/`).then((response)=>{ console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
        window.location.reload()
    }
    const delete_plate = ()=>{
        let response = backEndApi.delete(`journal/${journal.id}/plate/${plate.id}/`).then((response)=>{ console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
        window.location.reload()

    }
    return(
    <div className="ingredient">
        <h3>{plate.id}</h3>
        <h3>{plate.created_at}</h3>
        <form className = 'foodQuery' onSubmit={(event) => {event.preventDefault()}}>
                <input
                type="text"
                placeholder="enter food"
                onChange={(event) => setFoodName(event.target.value)}
                />
                <label>
                    <select className='selector' name="units" id="units" 
                        onChange={(e)=>{
                            // console.log(e.target.value)
                            const foodPick = foodData?.find((x)=> e.target.value == x.fdcId)
                            setData(foodPick)
                }}>     <option>select food</option>
                        {foodData?foodData.map((food)=>{
                        return <option key={food.fdcId} value={food.fdcId}>{food.description},{food.brandName},{food.servingSize},{food.servingSizeUnit}</option>}):null}
                    </select>
                </label>
                <button type="submit" onClick={onClickHandler}>
                add food
                </button>
            </form>
        <ul>
            {/* foodList? foodList.map((food)=>{
                return <li>food.description<li><button>delete</button>
            }) */}
            <>
                {plate.ingredients.map((ingredient)=>{
                    return <Ingredient key={ingredient.id} journal={journal} plate={plate} ingredient={ingredient} setFoodName={setFoodName} foodName={foodName} journalList={journalList} foodData={foodData} foodList={foodList} onClickHandler={onClickHandler} foodAmount={foodAmount} setFoodAmount={setFoodAmount}/>
                })}
            </>
            
        </ul>
        <button onClick={plate_maker}>save plate</button>
        <button onClick={delete_plate}>delete plate</button>
    </div>
    )
}