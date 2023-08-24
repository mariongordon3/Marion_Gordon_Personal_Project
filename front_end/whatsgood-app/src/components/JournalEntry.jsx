import PlateEntry from "./PlateEntry"
import { useOutletContext } from "react-router-dom"
import { backEndApi } from "./utilities"
export default function JournalEntry(props){
    const { journal,foodData,setFoodName,foodName,foodList,foodAmount,setFoodAmount }  = props
    const { plateList,setPlateList,journalList,setJournalList,user,setUser}= useOutletContext()
    const plate_maker=()=>{
        let response = backEndApi.post(`journal/${journal.id}/plate/1/`).then((response)=>{ console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
        window.location.reload()
    }
    const deleteJournal=()=>{
        console.log(user)
        let response = backEndApi.delete(`journal/${journal.id}/`,{"username":user}).then((response)=>{ console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
        window.location.reload()
    }
    return(
        <div>
            <div className="journal">
           {journal.created_at}
            <button onClick={deleteJournal}>delete journal</button>
                <>
                <button onClick={plate_maker}>start plate</button>
                    {journal.plates.map((plate,index)=>{
                        return <PlateEntry key={plate.id} journal={journal} plate={plate} foodData={foodData} setFoodName={setFoodName} foodName={foodName} journalList={journalList} foodList={foodList} foodAmount={foodAmount} setFoodAmount={setFoodAmount} />
                    })}
                </>
            </div>
        </div>
    )
}