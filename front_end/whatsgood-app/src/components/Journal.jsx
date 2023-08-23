import { useState,useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import axios from "axios"
import Journal_entry from "./JournalEntry"
export function Journal(){
    const {foodName,setFoodName,foodData,setFoodData,foodamount,setFoodAmount}= useOutletContext()
    const onClickHandler = (event) =>{
        console.log(foodData)
        event.target.value= ""
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
        <div >
            <form className = 'foodQuery' onSubmit={(event) => {event.preventDefault()}}>
                <input
                type="text"
                placeholder="enter food"
                onChange={(event) => setFoodName(event.target.value)}
                />
                <label>Choose food:
                    <select className='selector' name="units" id="units">
                        {foodData?foodData.map((food,index)=>{
                        return <option key={index}>{food.description},{food.brandName},{food.servingSize},{food.servingSizeUnit}</option>}):null}
                    </select>
                </label>
                <button type="submit" onClick={onClickHandler}>
                add food
                </button>
            </form>
            {/* use this for entries */}
            {/* {pokeList.length>0?pokeList.map((pokemon)=>{ return <PokeCard key={pokemon.pokeName} name={pokemon.pokeName} moves1={pokemon.moves1} moves2={pokemonData.moves2} moves3={pokemon.moves3} moves4={pokemon.moves4} pokemonImg={pokemon.pokemonImg} type={pokemon.type} /> }):"No Pokemon Caught Yet"} */}
            Date: 09/27/2023
            {/* created at */}
            <Journal_entry />
            Date: 09/28/2023
            <Journal_entry />
        </div>
    )
}




