import Ingredient from "./Ingredient"
import { backEndApi } from "./utilities"
import { useState } from "react"
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export default function PlateEntry(props){
    const { journal,plate,setFoodName,foodData, foodName,setJournalList,journalList,setFoodList,foodList,foodAmount,setFoodAmount,unit,setUnit,setPlateList,setClick,click } = props
    const targetTimeZone = 'America/Chicago';
    const formattedCreatedAt = format(
        utcToZonedTime(plate.created_at, targetTimeZone),
        'yyyy-MM-dd HH:mm:ss'
      );
    const [data,setData] = useState(null)
    const onClickHandler = (event) =>{
        console.log(data)
        let response = backEndApi.post(`journal/${journal.id}/plate/${plate.id}/ingredient/1`,{data}).then((response)=>{ console.log(response)
        setClick(!click)
        }).catch((error)=>{
            console.log(error)
        })
        
    }
    const delete_plate = ()=>{
        let response = backEndApi.delete(`journal/${journal.id}/plate/${plate.id}/`).then((response)=>{ console.log(response)
        setClick(!click)
        }).catch((error)=>{
            console.log(error)
        })

    }
    return(
    <div className="ingredient">
        <h4>Meal Time {formattedCreatedAt}</h4>
        <form className = 'foodQuery' name='foodForm' onSubmit={(event) => {event.preventDefault()}}>
                <input
                type="text"
                placeholder="enter food"
                onChange={(event) => setFoodName(event.target.value)}
                />
                <label>
                    <select className='selector' name="units" id="units" 
                        onChange={(e)=>{
                            const foodPick = foodData?.find((x)=> e.target.value == x.fdcId)
                            setData(foodPick)
                }}>     <option>select food: name,brand,serving size</option>
                        {foodData?foodData.map((food)=>{
                        return <option key={food.fdcId} value={food.fdcId}>{food.description},{food.brandName},{food.servingSize},{food.servingSizeUnit}</option>}):null}
                    </select>
                </label>
                <button type="submit" onClick={onClickHandler}>
                add food
                </button>
            </form>
        <ul>
            <>
                {plate.ingredients.map((ingredient)=>{
                    return <Ingredient key={ingredient.id} journal={journal} plate={plate} ingredient={ingredient} setFoodName={setFoodName} foodName={foodName} journalList={journalList} foodData={foodData} foodList={foodList} onClickHandler={onClickHandler} foodAmount={foodAmount}setFoodList={setFoodList}setFoodAmount={setFoodAmount} unit={unit} setUnit={setUnit} setClick={setClick} click ={click}/>
                })}
            </>
            
        </ul>
        <button onClick={delete_plate}>delete plate</button>
    </div>
    )
}